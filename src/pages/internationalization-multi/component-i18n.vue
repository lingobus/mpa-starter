<i18n>
{
  "en-US": {
    "greeting": "Hello Vue(Text in component can't be crawled by search engines)"
  },
  "zh-CN": {
    "greeting": "你好 Vue(组件中的文本不能被搜索引擎抓取)"
  }
}
</i18n>

<template lang="jade">
  .component-i18n
    p {{$t('greeting')}}
    <br><br>
    el-button(type="primary", @click="setLocale('en-US')") en-us
    el-button(type="primary", @click="setLocale('zh-CN')") zh-cn
</template>

<style lang="stylus" scoped>
p
  color: blue
  font-size: 32px
.zh-CN .component-i18n p
  color: red
</style>

<script>
  import ElButton from 'element-ui/lib/button'
  import { changeLocale } from 'compound-utils/i18n'

  export default {
    name: 'component-i18n',
    mixins: [],
    components: {
      ElButton
    },
    mounted () {
    },
    methods: {
      setLocale (locale) {
        changeLocale(locale)
      }
    }
  }
</script>
