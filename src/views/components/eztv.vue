<template>
  <el-table v-loading="props.loading" :data="props.tableData" height="100%"
            border stripe style="width: 100%">
    <el-table-column label="名字" width="600">
      <template #default="scope">
        <div v-html="scope.row.nameCn" style="cursor: pointer"
             @click="openBrowser(scope.row.url)"></div>
      </template>
    </el-table-column>
    <el-table-column label="文件大小">
      <template #default="scope">
        <div v-html="scope.row.size"></div>
      </template>
    </el-table-column>
    <el-table-column label="已发布时间">
      <template #default="scope">
        <div v-html="scope.row.date"></div>
      </template>
    </el-table-column>
    <el-table-column label="做种数">
      <template #default="scope">
        <div v-html="scope.row.seed"></div>
      </template>
    </el-table-column>
    <el-table-column label="视频介绍">
      <template #default="scope">
        <div @click="openBrowser(scope.row.info)" style="cursor: pointer">视频介绍
        </div>
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
function openBrowser(url: string) {
  //@ts-ignore
  window.myAPI.openBrowser(url)
}
</script>
<style scoped>

</style>
