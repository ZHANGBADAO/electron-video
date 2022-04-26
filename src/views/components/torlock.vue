<template>
  <el-table v-loading="props.loading" :data="props.tableData" height="620" border stripe style="width: 100%">
    <el-table-column label="名字" width="600">
      <template #default="scope">
        <div v-html="scope.row.nameCn"
             style="cursor: pointer" @click="openBrowser(scope.row.url)"
        ></div>
      </template>
    </el-table-column>
    <el-table-column label="文件大小">
      <template #default="scope">
        <div v-html="scope.row.size"></div>
      </template>
    </el-table-column>
    <el-table-column label="添加时间">
      <template #default="scope">
        <div v-html="scope.row.addTime"></div>
      </template>
    </el-table-column>
    <el-table-column label="做种人数">
      <template #default="scope">
        <div v-html="scope.row.seeds"></div>
      </template>
    </el-table-column>
    <el-table-column label="peers">
      <template #default="scope">
        <div v-html="scope.row.peers"></div>
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
