/* eslint-disable */
import { pageInit } from 'utils/_page-common.js'

import ElTabs from 'element-ui/lib/tabs'
import ElTabPane from 'element-ui/lib/tab-pane'
import ElButton from 'element-ui/lib/button'

import EmailRegister from './email-register.vue'
import PhoneRegister from './phone-register.vue'

const TYPE_PHONE = '1'
const TYPE_EMAIL = '2'

pageInit ({
  vue: {
    name: 'Register',
    components: {
      ElTabs,
      ElTabPane,
      ElButton,
      EmailRegister,
      PhoneRegister,
    },
    data () {
      return {
        type: $LB.query.type || TYPE_PHONE,
        TYPE_PHONE,
        TYPE_EMAIL,
      }
    },
    watch: {
      type () {
        location.href = '/register?type=' + this.type
      }
    },
    methods: {
      handleWechatLogin () {

      },
      handleFacebookLogin () {

      }
    }
  }
})
