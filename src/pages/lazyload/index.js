/* eslint-disable */
import { pageInit } from 'utils/_page-common.js'
import { lazyloadInit } from 'compound-utils/lazyload'
import MessageMixin from "mixin/message"
import './index.styl'

pageInit ({
  vue: {
    name: 'lasyload',
    mixins: [MessageMixin],
    components: {
    },
    mounted () {
      lazyloadInit()
    }
  }
})
