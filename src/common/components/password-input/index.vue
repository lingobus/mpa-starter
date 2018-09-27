<template lang="jade">
  .password-input
    el-input(
      :value="value",
      @input="inputHandle",
      :placeholder="placeholder",
      :type="type"
    )
    el-button.input-toggle-type(type="text", @click="clickHandle")
      img(:src="icon")
</template>

<script>
import ElInput from 'element-ui/lib/input'
import ElButton from 'element-ui/lib/button'

import IconCloseEye from './img/close-eye.svg'
import IconOpenEye from './img/open-eye.svg'

export default {
  name: "PasswordInput",
  components : {
    ElInput,
    ElButton,
  },

  props: {
    value: [String, Number],
    placeholder: String,
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