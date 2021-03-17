<template>
  <el-dialog
    :title="((value.id)? 'Editar':'Crear Nuevo')+' Usuario'"
    :visible.sync="value.show"
    :append-to-body="appendToBody"
    @close="$emit('close')"
    @open="onOpen()"
  >
    <el-form>
      <el-form-item prop="nombre">
        <MdInput v-model="product.nombre" type="text" icon="edit">Nombre de Usuario</MdInput>
      </el-form-item>
      <el-form-item prop="precio">
        <MdInput v-model="product.precio" type="number" icon="edit">Precio</MdInput>
      </el-form-item>
      <el-form-item prop="total">
        <MdInput v-model="product.total" type="number" icon="edit">Cantidad Total</MdInput>
      </el-form-item>
      <el-form-item prop="foto">
        Subir Archivo
      </el-form-item>
      <el-form-item prop="cod_barras">
        Leer codigo de barras
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="handleCancel()">Cancelar</el-button>
      <el-button type="primary" @click="handleConfirm()">Confirmar</el-button>
    </span>
  </el-dialog>
</template>

<script>
import productResource from '@/api/product'
import MdInput from '@/components/MDinput'
export default {
  name: 'ProductForm',
  components: { MdInput },
  props: {
    value: {
      type: Object,
      default: () => {
        return {}
      }
    },
    appendToBody: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      product: {},
      rolesList: [],
      error: null,
      formErrors: {}
    }
  },
  watch: {
    value: function(newValue, oldValue) {
      this.$emit('input', newValue)
    },
    error: function(newValue, oldValue) {
      if (this.error) {
        this.$message({
          showClose: true,
          message: 'Oops, Paso algo inesperado.',
          type: 'error'
        })
      }
    }
  },
  created() {
  },
  methods: {
    resetComponent() {
      this.error = null
      this.product = {}
      this.value.id = null
    },
    handleCancel() {
      this.value.show = false
      this.$emit('cancel')
      this.resetComponent()
    },
    handleConfirm() {
      if (this.product.password !== this.product.confirm_password) {
        this.$message({
          message: 'Las contraseñas no son iguales.',
          type: 'warning',
          showClose: true,
          duration: 3000
        })
        return false
      }
      const app = this
      if (this.value.id) {
        productResource.update(this.value.id, this.product)
          .then((data) => {
            app.onSuccess(data)
            app.$message({
              showClose: true,
              message: 'product, actualizada exitosamente.',
              type: 'success'
            })
            app.value.show = false
          })
          .catch((err) => {
            app.error = err
          })
      } else {
        productResource.store(this.product)
          .then((data) => {
            app.onSuccess(data)
            app.$message({
              showClose: true,
              message: 'product, Creada exitosamente.',
              type: 'success'
            })
            app.value.show = false
          })
          .catch((err) => {
            app.error = err
          })
      }
    },
    onSuccess(data) {
      this.$emit('on-success', data)
      this.resetComponent()
    },
    onOpen() {
      const app = this
      if (this.value.id) {
        productResource.get(this.value.id).then((data) => {
          app.product = data.data
        }).catch((error) => {
          app.error = error
        })
      }
    }
  }
}
</script>

<style>
</style>
