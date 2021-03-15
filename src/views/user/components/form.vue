<template>
  <el-dialog
    :title="((value.id)? 'Editar':'Crear Nuevo')+' Usuario'"
    :visible.sync="value.show"
    :append-to-body="appendToBody"
    @close="$emit('close')"
    @open="onOpen()"
  >
    <el-form>
      <el-form-item prop="name">
        <MdInput v-model="user.name" type="text" icon="edit">Nombre de Usuario</MdInput>
      </el-form-item>
      <el-form-item prop="password">
        <MdInput v-model="user.password" type="password" icon="edit">Contraseña</MdInput>
      </el-form-item>
      <el-form-item prop="confirm_password">
        <MdInput v-model="user.confirm_password" type="password" icon="edit">Confirmar Contraseña</MdInput>
      </el-form-item>
      <el-form-item prop="roles">
        <el-select v-model="user.roles" placeholder="seleccione roles" clearable multiple>
          <el-option
            v-for="role in rolesList"
            :key="role.name"
            :label="role.label"
            :value="role.name"
          />
        </el-select>

      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="handleCancel()">Cancelar</el-button>
      <el-button type="primary" @click="handleConfirm()">Confirmar</el-button>
    </span>
  </el-dialog>
</template>

<script>
import userResource from '@/api/user'
import roleResource from '@/api/role'
import MdInput from '@/components/MDinput'
export default {
  name: 'UserForm',
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
      user: {},
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
    this.getRoles()
  },
  methods: {
    getRoles() {
      const app = this
      roleResource.list({}, { pagination: false }).then(resp => {
        app.rolesList = resp.data.docs
        console.log(resp)
      }).catch(err => {
        console.log(err)
        this.error = err
      })
    },
    restenComponent() {
      this.error = null
      this.user = {}
      this.value.id = null
    },
    handleCancel() {
      this.value.show = false
      this.$emit('cancel')
      this.restenComponent()
    },
    handleConfirm() {
      if (this.user.password !== this.user.confirm_password) {
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
        userResource.update(this.user.id, this.user)
          .then((data) => {
            app.onSuccess(data)
            app.$message({
              showClose: true,
              message: 'user, actualizada exitosamente.',
              type: 'success'
            })
            app.value.show = false
          })
          .catch((err) => {
            app.error = err
          })
      } else {
        userResource.store(this.user)
          .then((data) => {
            app.onSuccess(data)
            app.$message({
              showClose: true,
              message: 'user, Creada exitosamente.',
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
      this.restenComponent()
    },
    onOpen() {
      const app = this
      if (this.value.id) {
        userResource.get(this.value.id).then((data) => {
          app.user = data
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
