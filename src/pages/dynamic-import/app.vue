<template lang="pug">
  el-tabs.dynamic-import(v-model="activeTab")
    el-tab-pane(label="Module 1", name="module1")
      async-component1(v-if="activeTab === 'module1'")
    el-tab-pane(label="Module 2", name="module2")
      async-component2(v-if="activeTab === 'module2'")
</template>

<style lang="stylus" scoped>
.dynamic-import
  padding: 100px
</style>

<script>
  import MessageMixin from "mixin/message"

  export default {
    name: 'dynamic-import',
    mixins: [MessageMixin],
    components: {
      'async-component1': () => import(/* webpackChunkName: "pages/dynamic-import/async-component1" */'./async-component1.vue'),
      'async-component2': () => import(/* webpackChunkName: "pages/dynamic-import/async-component2" */'./async-component2.vue'),
    },
    data () {
      return {
        activeTab: 'module1'
      }
    },
    watch: {
      activeTab () {
        import(/* webpackChunkName: "pages/dynamic-import/dynamic-module" */'./dynamic-module.js').then(({ default: sayHello }) => {
          sayHello(this.$info)
        })
      }
    },
    mounted () {
    },
    methods: {
    }
  }
</script>
