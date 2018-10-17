# Description

> An newest advanced full feature multi-page website starter

## Features
1. webpack@4.2.0
2. babel 7 with preset-env(using browserslist for browser compatibility)
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
# download repo
git clone https://github.com/lingobus/mpa-starter.git

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

## File naming note
- common components and assets are placed under `src/commom` directory，page related code are placed under `src/pages` directory，page entry must be `src/pages/${pageName}/index.js` or `src/pages/${pageName}/${locale}/index.js`, page template must be `src/pages/${pageName}/index.pug` or `src/pages/${pageName}/${locale}/index.pug`.
- `/src/js/common/lib` hold external assets for sharing with multiple pages and speed up compiling,  but may bring in compatibility problems.

## Asset import note
in styl
```
background: url('~@/img/common@2x.png')
background: url('./img/banner@2x.png')
```

in vue
```
img(src='@/img/common@2x.png')
img(src='./img/banner@2x.png')

background: url('~@/img/common@2x.png')
background: url('./img/banner@2x.png')
```

in pug
```
img(src=require('@/img/common/@2x.png'))
img(src=require('./img/banner@2x.png'))
```