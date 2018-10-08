const mixin = {
  methods: {
    $success (msg) {
      this.$message({
        message: msg,
        type: 'success'
      })
    },
    $info (msg) {
      this.$message({
        message: msg,
      })
    },
    $warning (msg) {
      this.$message({
        message: msg,
        type: 'warning'
      })
    },
    $error (msg) {
      this.$message.error(msg);
    },
    $apiError (e) {
      if (e.data) {
        this.$error(e.data.msg)
      } else if (e.response) {
        this.$error(e.response.data.msg)
      } else {
        throw e
      }
    }
  }
}

export default mixin
