<template>
<el-button @click="getPrintDevice">获取系统打印机列表</el-button>
<el-button @click="startPrint">开始打印</el-button>
</template>

<script setup lang="ts">

const getPrintDevice = () => {
  //@ts-ignore
  console.log(window.myAPI.utils.getAllPrintFn())
}

const startPrint = () => {
  //@ts-ignore
  console.log(window.myAPI.utils.startPrintFn())
}
</script>

<style scoped>

</style>
