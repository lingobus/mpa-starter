<i18n>
{
  "en-US": {
    "greeting": "Hello Vue"
  },
  "zh-CN": {
    "greeting": "你好 Vue"
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
  font-size: 64px
</style>

<style lang="stylus">
.zh-CN .component-i18n p
  color: red
</style>

<script>
  import ElButton from 'element-ui/lib/button'
  import cookies from 'cookies-js'

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
        const prevLocale = $LB.locale
        if (locale === prevLocale) return

        const defaultLocale = 'en-US'
        const l = window.location
        var url, pathname
        cookies.set('locale', locale)

        if (locale === defaultLocale) {
          // 默认locale没有前缀
          pathname = l.pathname.replace(`/${prevLocale.toLowerCase()}`, '')
          url = `//${l.host}${pathname}${l.search}${l.hash}`
        } else {
          // 其他的locale需要增加前缀，比如 https://www.lingobus.com/zh-CN/teacher-overview
          pathname = l.pathname.replace(`/${prevLocale.toLowerCase()}`, `/${locale.toLowerCase()}`)
          url = `//${l.host}/${locale.toLowerCase()}${pathname === '/' ? '' : pathname}${l.search}${l.hash}`
        }
        // 更新history并且reload
        console.log(url)
        location.replace(url)
      }
    }
  }
</script>
