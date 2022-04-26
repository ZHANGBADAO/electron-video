<template>
<el-button @click="getPrintDevice">获取系统打印机列表</el-button>
<el-button @click="startPrint">开始打印</el-button>
</template>

<script setup lang="ts">

const getPrintDevice = () => {
  //@ts-ignore
  window.myAPI.utils.getAllPrintFn().then(res => {
    console.log(res);
  });
}

const startPrint = () => {
  //@ts-ignore
  window.myAPI.utils.startPrintFn().then(res => {
    console.log(res);
  });
}
</script>

<style scoped>

</style>
