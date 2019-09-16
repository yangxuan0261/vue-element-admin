<template>
  <div>
    <el-dialog title="test dialog" :visible.sync="isDialogShow" @close="onClose()">
      <el-form label-width="80px" label-position="left">
        <el-form-item :label="`${arg1}`">
          <el-input v-model="arg1" />
        </el-form-item>
        <el-form-item :label="`${arg3}`">
          <el-input v-model="arg3" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="onCancel">Cancel</el-button>
        <el-button type="primary" @click="onConfirm">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'MyComponent',
  props: {
    arg1: {
      required: true,
      type: Number
    },
    dialogStatus: {
      required: true,
      type: Boolean,
      default: false
    },
    arg3: {
      type: String,
      default: 'arg3666'
    },
    arg4: {
      type: Array,
      default() {
        return [10, 20, 30, 50, 100]
      }
    },
  },
  data() {
    return {
      isDialogShow: false
    }
  },
  watch: {
    dialogStatus(newVal, oldVal) {
      console.log('--- watch dialogStatus:', newVal)
      this.isDialogShow = newVal
    }
  },
  created() {
    console.log('--- MyComponent created, arg3:', this.arg3)
  },
  destroyed() {
    console.log('--- MyComponent destroyed, arg3:', this.arg3)
  },
  methods: {
    onCancel() {
      this.isDialogShow = false
      console.log('--- onCancel')
      this.$emit('on-my-notify', 'ret onCancel data:123')
    },
    onConfirm() {
      this.isDialogShow = false
      console.log('--- onConfirm')
      this.$emit('on-my-notify', 'ret onConfirm data:456')
    },
    onClose() {
      this.isDialogShow = false
      this.$emit('on-close') // 由这里同志父组件修改 控制变量
    }
  }
}
</script>
