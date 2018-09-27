<template lang="jade">
  el-form.phone-login(ref="form", :model="user")
    el-form-item(
      prop="phone",
      :rules="rules.phone",
    )
      el-input(v-model="user.phone")
      int-tel-input.phone-input(
        :phoneNumber="user.phone",
        @countryChange="countryChange",
        @phoneNumberChange="phoneNumberChange",
        placeholder="Phone"
      )
    el-form-item(
      prop="pswd",
      :rules="rules.pswd",
    )
      password-input.password-input(
        v-model="user.pswd",
        placeholder="Password",
      )
    el-button.login-btn(type="primary", @click="handlePhoneLogin") Login
</template>

<style lang="stylus" scoped>
  .login-btn
    float right
</style>

<script>

import ElForm from 'element-ui/lib/form'
import ElFormItem from 'element-ui/lib/form-item'
import ElButton from 'element-ui/lib/button'

import IntTelInput from 'components/int-tel-input/index.vue'
import PasswordInput from 'components/password-input/index.vue'
import {validatePhone, validatePassword} from 'utils/_validator.js'
import api from 'api/_phone-login.api.js'

export default {
  name: 'phone-login',
  mixins: [],
  components: {
    IntTelInput,
    PasswordInput,
    ElButton,
    ElForm,
    ElFormItem,
  },
  data () {
    return {
      user: {
        countryAbbr: 'us',
        countryCode: null,
        phone: '',
        pswd: '',
      },
      rules: {
        phone: {
          validator: (rule, value, cb) => {
            if (!value || !validatePhone(value)) {
              cb(new Error('Phone is not valid'))
            }
            cb()
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
  watch: {
    'user.phone' () {
      this.$refs.form.validateField('phone')
    },
  },
  mounted () {
  },
  methods: {
    countryChange (country) {
      this.isExist = true
      this.user.countryAbbr = country.code
      this.user.countryCode = country.dialCode
    },
    phoneNumberChange (num) {
      this.isExist = true
      this.user.phone = num
    },
    handlePhoneLogin () {
      this.$refs.form.validate(valid => {
        if (!valid) return
        api.isRegistered({
          phone: this.user.phone
        }).then(registered => {
          if (registered) {
            return api.login(this.user).then(_ => location.href = '/')
          } else {
            this.$error('Not registered')
          }
        }).catch(this.$apiError)
      })
    }
  }
}
</script>
