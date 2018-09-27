/* eslint-disable */
import { pageInit } from 'utils/_page-common.js'

import ElForm from 'element-ui/lib/form'
import ElFormItem from 'element-ui/lib/form-item'
import ElButton from 'element-ui/lib/button'
import ElInput from 'element-ui/lib/input'

import PasswordInput from 'components/password-input/index.vue'

import {validatePhone, validateEmail, validatePassword} from 'utils/_validator.js'
import api from 'api/_login.api.js'

pageInit ({
  vue: {
    name: 'Login',
    components: {
      ElForm,
      ElFormItem,
      ElButton,
      ElInput,
      PasswordInput
    },
    data () {
      return {
        user: {
          account: '',
          pswd: '',
        },
        rules: {
          account: {
            validator: (rule, value, cb) => {
              if (value && (validatePhone(value) || validateEmail(value))) cb()
              else cb(new Error('Account is not valid'))
            }
          },
          pswd: {
            validator: (rule, value, cb) => {
              if (!value || !validatePassword(value)) {
                cb(new Error('Password is not valid'))
              }
              cb()
            }
          },
        }
      }
    },
    methods: {
      handleLogin () {
        this.$refs.form.validate(valid => {
          if (!valid) return
          api.isRegistered({
            account: this.user.account
          }).then(registered => {
            if (registered) {
              return api.login(this.user).then(_ => location.href = '/')
            } else {
              this.$error('Not registered')
            }
          }).catch(this.$apiError)
        })
      },
      handleWechatLogin () {

      },
      handleFacebookLogin () {

      }
    }
  }
})
