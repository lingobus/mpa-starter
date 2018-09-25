
import AddPage from './add/add.vue'
import EditPage from './edit/edit.vue'
import SearchPage from './search/search.vue'

const root = "/add-edit-search/"

export default [
  { path: root, component: SearchPage },
  { path: root + 'add', component: AddPage },
  { path: root + 'edit/:id', component: EditPage },
]
