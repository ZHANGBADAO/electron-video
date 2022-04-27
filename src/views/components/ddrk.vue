<template>
  <el-table v-loading="props.loading" :data="props.tableData" height="620" border stripe style="width: 100%">
    <el-table-column label="名字" width="400">
      <template #default="scope">
        <div v-html="scope.row.nameCn" style="cursor: pointer" @click="openBrowser(scope.row.url)"></div>
      </template>
    </el-table-column>
    <el-table-column label="描述">
      <template #default="scope">
        <div v-html="scope.row.desc"></div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import {onMounted} from "vue";

const props = defineProps({
  tableData: Array,
  loading: Boolean,
})
onMounted(() => {
})
//点击链接打开浏览器
function openBrowser(url:string) {
  //@ts-ignore
  window.myAPI.openBrowser(url)
}
</script>
<style scoped>

</style>
