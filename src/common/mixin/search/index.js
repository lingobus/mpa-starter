import MessageMixin from "mixin/message"
export default {
  mixins: [MessageMixin],
  components: {
  },
  data () {
    return {
      queryParams: {},
      tableData: [],
      pageSize: 10,
      curPage: 0,
      total: 0,
      loading: false,
    }
  },
  mounted () {
    this.search()
  },
  methods: {
    search () {
      return this.searchImpl(this.curPage, this.pageSize, this.queryParams).then(d => {
        this.tableData = d.items
        this.total = d.total
      }).catch(this.$apiError)
    },
    handleDelete (item) {
      return this.deleteImpl(item).then(_ => {
        this.$success('delete success')
        this.search()
      }).catch(this.$apiError)
    },
    handlePageChange (page) {
      this.curPage = page
      this.search()
    },
    handleEdit (item) {
      this.$router.push(`${location.pathname}/edit/${item.id}`)
    },
    handleAdd () {
      this.$router.push(`${location.pathname}/add`)
    }
  }
}