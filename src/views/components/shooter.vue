<template>
  <el-table v-loading="props.loading" :data="props.tableData" height="680" border stripe style="width: 100%">
    <el-table-column label="名字">
      <template #default="scope">
        <div v-html="scope.row.nameCn"></div>
      </template>
    </el-table-column>
    <el-table-column label="字幕语言">
      <template #default="scope">
        <div v-html="scope.row.subLanguage"></div>
      </template>
    </el-table-column>
    <el-table-column label="片源版本">
      <template #default="scope">
        <div v-html="scope.row.match"></div>
      </template>
    </el-table-column>
    <el-table-column label="字幕地址">
      <template #default="scope">
        <span style="cursor: pointer" @click="openBrowser(scope.row.url)">{{scope.row.url}}</span>
      </template>
    </el-table-column>
    <el-table-column label="字幕格式">
      <template #default="scope">
        <div v-html="scope.row.subType"></div>
      </template>
    </el-table-column>
    <el-table-column label="次数">
      <template #default="scope">
        <div v-html="scope.row.count"></div>
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
