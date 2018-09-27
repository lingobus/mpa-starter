<template lang="jade">
  el-form.email-login(ref="form", :model="user")
    el-form-item(
      prop="email",
      :rules="rules.email",
    )
      el-input.email-input(
        v-model="user.email",
        :autofocus="true",
        placeholder="Email",
      )
    el-form-item(
      prop="pswd",
      :rules="rules.pswd",
    )
      password-input.password-input(
        v-model="user.pswd",
        placeholder="Password",
      )
    el-button.login-btn(type="primary", @click="handleEmailLogin") Login
</template>

<style lang="stylus" scoped>
  .login-btn
    float right
</style>

<script>

import ElForm from 'element-ui/lib/form'
import ElFormItem from 'element-ui/lib/form-item'
import ElInput from 'element-ui/lib/input'
import ElButton from 'element-ui/lib/button'
import PasswordInput from 'components/password-input/index.vue'
import {validateEmail, validatePassword} from 'utils/_validator.js'
import api from 'api/_email-login.api.js'

export default {
  name: 'email-login',
  mixins: [],
  components: {
    ElInput,
    ElButton,
    PasswordInput,
    ElForm,
    ElFormItem,
  },
  data () {
    return {
      user: {
        email: '',
        pswd: '',
      },
      isExist: true,
      rules: {
        email: {
          validator: (rule, value, cb) => {
            if (!value || !validateEmail(value)) {
              cb(new Error('Email is not valid'))
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
  mounted () {
  },
  methods: {
    handleEmailLogin () {
      this.$refs.form.validate(valid => {
        if (!valid) return
        api.isRegistered({
          email: this.user.email
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
