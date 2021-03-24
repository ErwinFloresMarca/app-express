<template>
  <div>
    <!--  -->
  </div>
</template>

<script>
import barcodeReader from '@/api/barcodeReader'

export default {
  name: 'PruebaBarcodeReader',
  data() {
    return {
      devices: [],
      selectDevice: null,
      readObject: null
    }
  },
  created() {
    this.getDevices()
  },
  methods: {
    onReadBarcode(info) {
      this.readObject = info
    },
    getDevices() {
      barcodeReader.getDevices().then((data) => {
        console.log(data.data)
      }).catch(err => {
        console.log(err)
      })
    },
    onSelectDevice() {
    }
  }
}
</script>

<style>

</style>
