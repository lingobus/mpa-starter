# Description

> An advanced full feature multi-page website starter

## Features
1. webpack@3.5.4(webpack 4 coming soon)
2. babel@7 with preset-env(using browserslist for browser compatibility)
3. pug(for vue template and html template)
4. vue@2.5.7
5. stylus(stylus -> postcss)
6. postcss with autoprefixer,preset-env(using browserslist for browser compatibility)
7. multiple pages
8. specify one or multiple page(s) for development(production) to speed up your work flow
9. hmr for everything
10. element-ui@2.4.8
11. axios@0.18.0
12. mock data
13. a bunch of solutions......

## Build Setup

``` bash
# install dependencies
yarn or npm install

# serve all pages with hot reload
npm start

# build all pages for production
npm run release

# specify one page
PAGE=login npm start
PAGE=login npm run release

# you can specify multiple pages with ',' as seperator
PAGE=index,login,register npm start
PAGE=index,login,register npm run release

```