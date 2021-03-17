<template>
  <el-container style="padding: 10px" direction="vertical">
    <el-header height="">
      LISTA DE PRODUCTOS
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
          prop="nombre"
          label="Nombre"
        />
        <el-table-column
          prop="precio"
          label="Precio"
        />
        <el-table-column
          prop="total"
          label="Total"
        />
        <el-table-column
          prop="foto"
          label="Imagen"
        />
        <el-table-column
          label="Valoracion"
        >
          <template slot-scope="{ row }">
            <el-rate
              v-model="row.valoracion"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value} puntos"
            />
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

      <pagination v-show="paginate.total>0" :total="paginate.total" :page.sync="paginate.page" :limit.sync="paginate.limit" @pagination="getproducts" />

      <product-form v-model="productForm" @on-success="onSuccessForm" />
    </el-container>
  </el-container>
</template>

<script>
import productResource from '@/api/product'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import productForm from './components/form'
export default {
  name: 'ListProduct',
  components: {
    Pagination,
    productForm
  },
  directives: { waves },
  data() {
    return {
      productForm: {
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
    this.getproducts()
  },
  methods: {
    getproducts() {
      const app = this
      productResource.list({}, this.paginate).then(res => {
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
      this.productForm.show = true
    },
    handleEdit(product) {
      this.productForm.id = product._id
      this.productForm.show = true
    },
    handleDelete(product) {
      const app = this
      productResource.destroy(product._id).then(doc => {
        app.getproducts()
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
      this.getproducts()
    }
  }
}
</script>

<style>

</style>
