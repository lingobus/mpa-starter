<template lang="jade">
  .password-input
    el-input(
      :value="value",
      :name="name",
      :placeholder="placeholder",
      :type="type",
      :auto-complete="autocomplete",
      @input="inputHandle",
    )
    el-button.input-toggle-type(type="text", @click="clickHandle")
      img(:src="icon")
</template>

<script>
import IconCloseEye from './img/close-eye.svg'
import IconOpenEye from './img/open-eye.svg'

export default {
  name: "PasswordInput",
  components : {
  },

  props: {
    value: [String, Number],
    placeholder: String,
    autocomplete: {
      type: String,
      default: 'off',
    },
    name: {
      type: String,
      default: 'password',
    },
    initialize: Boolean
  },

  data () {
    return {
      type: 'password'
    }
  },

  watch: {
    initialize (newValue) {
      this.type = 'password'
    }
  },

  computed: {
    icon () {
      return this.type === 'password' ? IconCloseEye : IconOpenEye
    }
  },

  methods: {
    inputHandle (value) {
      this.$emit('input', value)
    },
    clickHandle () {
      this.type = this.type === 'text' ? 'password' : 'text'
    }
  }
}
</script>

<style lang="stylus" scoped>
  .password-input
    position: relative
    .input-toggle-type
      position: absolute
      right: 10px
      top: 7px
      cursor pointer
      padding: 0
</style>
<style lang="stylus">
  .password-input
    .el-input
      font-size: 16px
      input
        &::placeholder
          font-size: 14px
</style>