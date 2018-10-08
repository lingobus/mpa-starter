/* eslint-disable */
import { pageInit } from 'utils/_page-common.js'
import { lazyloadInit } from 'compound-utils/lazyload'
import './index.styl'

pageInit ({
  vue: {
    name: 'lasyload',
    components: {
    },
    mounted () {
      lazyloadInit()
    }
  }
})
