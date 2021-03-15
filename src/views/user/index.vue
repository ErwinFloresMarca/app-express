<template>
  <el-container style="padding: 10px" direction="vertical">
    <el-header height="">
      LISTA DE USUARIOS
    </el-header>
    <el-container direction="vertical">
      <div class="filter-container">
        <el-input
          v-model="keyword"
          :placeholder="'Palabra clave'"
          style="width: 200px;"
          class="filter-item"
          size="mini"
          @keyup.enter.native="handleFilter"
        />
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleFilter"
        >Buscar</el-button>
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleCreate"
        >Añadir</el-button>
      </div>

      <el-table
        :data="list"
        stripe
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column
          prop="_id"
          label="ID"
        />
        <el-table-column
          prop="name"
          label="Name"
        />
        <el-table-column
          label="Name"
        >
          <template slot-scope="scope">
            <el-tag v-for="role in scope.row.roles" :key="role" type="default" size="mini" effect="dark" :closable="false">{{ role }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="Operaciones"
        >
          <template slot-scope="{ row }">
            <el-button icon="el-icon-edit" type="warning" size="mini" circle @click="handleEdit(row)" />
            <el-button icon="el-icon-delete" size="mini" type="danger" circle @click="handleDelete(row)" />
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="paginate.total>0" :total="paginate.total" :page.sync="paginate.page" :limit.sync="paginate.limit" @pagination="getUsers" />

      <user-form v-model="userForm" @on-success="onSuccessForm" />
    </el-container>
  </el-container>
</template>

<script>
import userResource from '@/api/user'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import userForm from './components/form'
export default {
  name: 'ListUser',
  components: {
    Pagination,
    userForm
  },
  directives: { waves },
  data() {
    return {
      userForm: {
        show: false
      },
      keyword: '',
      list: [],
      paginate: {
        total: 0,
        page: 1,
        pagination: true
      }
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      const app = this
      userResource.list({}, this.paginate).then(res => {
        app.list = res.data.docs
        app.paginate.total = res.data.totalDocs
        app.paginate.page = res.data.page
        app.paginate.limit = res.data.limit
      }).catch(err => {
        console.log(err)
      })
    },
    handleFilter() {
      this.getList()
    },
    handleCreate() {
      this.userForm.show = true
    },
    handleEdit(user) {
      this.userForm.id = user._id
      this.userForm.show = true
    },
    handleDelete(user) {
      const app = this
      userResource.destroy(user._id).then(doc => {
        app.getUsers()
        app.$message({
          message: 'Usuario eliminado.',
          type: 'success',
          showClose: true,
          duration: 3000
        })
      }).catch(err => {
        console.log(err)
        app.$message({
          message: 'Opp, paso algo inesperado',
          type: 'danger',
          showClose: true,
          duration: 3000
        })
      })
    },
    onSuccessForm() {
      this.getUsers
    }
  }
}
</script>

<style>

</style>
