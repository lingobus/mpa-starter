/**
 * pub-webpack-plugin:
 * 1. inject block webpackEmitedJs with emited js to pug template;
 * 2. inject block webpackEmitedCss with emited css to pug template;
 * 3. copy pug template and it's dependencies to build path
 * 4. support require('*') in pug
 * 5. pug hot reload
 */

const path = require('path')
const AsyncSeriesWaterfallHook = require('tapable').AsyncSeriesWaterfallHook;
const pug = require('pug');
const fs = require('fs');
const fsExtra = require('fs-extra')
const SingleEntryPlugin = require("webpack/lib/SingleEntryPlugin");
const vm = require("vm");

new AsyncSeriesWaterfallHook(['pluginArgs'])

module.exports = class PugWebpackPlugin {
  constructor (options) {
    this.options = options
    this.name = 'pug-webpack-plugin'
  }
  apply (compiler) {
    // callback is called when css,js is emited
    compiler.hooks.emit.tap(this.name, compilation => {
      // read pug template
      const entryFileBuffer = fs.readFileSync(this.options.template)

      // get pug dependences
      const deps = pug.compileClientWithDependenciesTracked(entryFileBuffer, {
        filename: this.options.template
      }).dependencies

      // copy pug dependences to /build for express view engine
      deps.forEach(srcPath => {
        const destPath = path.resolve(this.options.buildPath, path.relative(this.options.srcPath, srcPath))
        fsExtra.copySync(srcPath, destPath)
      })

      // add pug file dependencies to compilation
      compilation.fileDependencies.add(this.options.template)
      deps.forEach(dep => {
        compilation.fileDependencies.add(dep)
      })

      // Get chunks info as json
      // Note: we're excluding stuff that we don't need to improve toJson serialization speed.
      const chunkOnlyConfig = {
        assets: false,
        cached: false,
        children: false,
        chunks: true,
        chunkModules: false,
        chunkOrigins: false,
        errorDetails: false,
        hash: false,
        modules: false,
        reasons: false,
        source: false,
        timings: false,
        version: false
      };

      // get pug template content string
      let content = entryFileBuffer.toString('utf8')

      // inject emited css and js
      let jsBlock = `
block webpackEmitedJs`
      let cssBlock = `
block webpackEmitedCss`
      const allChunks = compilation.getStats().toJson(chunkOnlyConfig).chunks
      const chunks = filterChunks(allChunks)
      chunks.forEach(chunk => {
        chunk.files.forEach(name => {
          if (/\.css$/.test(name)) { // append css link
            cssBlock += `
  link(rel="stylesheet" href="${this.options.publicPath + name}")`
          } else { // append js script
            jsBlock += `
  script(src="${this.options.publicPath + name}")`
          }
        })
      })

      // append block webpackEmitedJs and block webpackEmitedCss to pug template content
      content += `
${jsBlock}
${cssBlock}
      `
      /**
       *  Now we must handle require in pug template, let loader system do it for you.
       */
      function randomIdent() {
        return "xxxHTMLLINKxxx" + Math.random() + Math.random() + "xxx";
      }

      // find and replace require('*') with xxxHTMLLINKxxx*xxx placeholder
      const destPath = path.resolve(
        this.options.buildPath,
        this.options.output,
      )

      let requireCount = 0
      content = content.replace(/require\(['|"]([^()]*)['|"]\)/g, (match, url) => {
        requireCount++
        // generate placeloader
        const ident = randomIdent()

        // get the full resource path
        const resourcePath = path.join(this.options.template.substring(0, this.options.template.lastIndexOf('/')), url)

        // create child compiler to handle require
        const childCompiler = compilation.createChildCompiler(url, {
          filename: url,
          publicPath: this.options.publicPath
        });

        new SingleEntryPlugin(compilation.compiler.context, resourcePath).apply(childCompiler)
        childCompiler.runAsChild((err, entries, childCompilation) => {
          // run the emited js source, get hashed url or base64 content back and replace the placeholer with it
          const source = childCompilation.assets[url] && childCompilation.assets[url].source();
          const hashedUrl = vm.runInThisContext(source)
          content = content.replace(ident, _ => "'" + hashedUrl + "'")
          if (requireCount) requireCount--
          if (!requireCount) {
            fsExtra.outputFileSync(destPath, content)
            if (this.options.reloadPageFn) this.options.reloadPageFn()
          }
        });

        return ident // replace require('*') with placeloader
      })
      if (!requireCount) {
        fsExtra.outputFileSync(destPath, content)
        if (this.options.reloadPageFn) this.options.reloadPageFn()
      }
    })

    /**
     * Return all chunks from the compilation result which match the exclude and include filters
     */
    function filterChunks (chunks, includedChunks, excludedChunks) {
      return chunks.filter(chunk => {
        const chunkName = chunk.names[0];
        // This chunk doesn't have a name. This script can't handled it.
        if (chunkName === undefined) {
          return false;
        }
        // Skip if the chunk should be lazy loaded
        if (typeof chunk.isInitial === 'function') {
          if (!chunk.isInitial()) {
            return false;
          }
        } else if (!chunk.initial) {
          return false;
        }
        // Skip if the chunks should be filtered and the given chunk was not added explicity
        if (Array.isArray(includedChunks) && includedChunks.indexOf(chunkName) === -1) {
          return false;
        }
        // Skip if the chunks should be filtered and the given chunk was excluded explicity
        if (Array.isArray(excludedChunks) && excludedChunks.indexOf(chunkName) !== -1) {
          return false;
        }
        // Add otherwise
        return true;
      });
    }
  }
}