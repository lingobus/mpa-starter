import MessageMixin from "mixin/message"
import ElSelect from 'element-ui/lib/select'
import ElOption from 'element-ui/lib/option'
import ElPagination from 'element-ui/lib/pagination'
import ElTable from 'element-ui/lib/table'
import ElTableColumn from 'element-ui/lib/table-column'
import ElButtonGroup from 'element-ui/lib/button-group'
import ElTooltip from 'element-ui/lib/tooltip'
import ElButton from 'element-ui/lib/button'
import ElInput from 'element-ui/lib/input'
import ElForm from 'element-ui/lib/form'
import ElFormItem from 'element-ui/lib/form-item'

export default {
  mixins: [MessageMixin],
  components: {
    ElSelect,
    ElOption,
    ElPagination,
    ElTable,
    ElTableColumn,
    ElButtonGroup,
    ElTooltip,
    ElButton,
    ElInput,
    ElForm,
    ElFormItem,
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