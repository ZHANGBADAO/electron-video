<template>
  <el-table v-loading="props.loading" :data="props.tableData" height="100%" border stripe style="width: 100%">
    <el-table-column label="海报">
      <template #default="scope">
        <img :src="scope.row.img.replace('small', 'medium')" alt="" style="width: 100px">
      </template>
    </el-table-column>
    <el-table-column label="名字">
      <template #default="scope">
        <span>{{ scope.row.title }} ({{ scope.row.year }})</span>
      </template>
    </el-table-column>
    <el-table-column label="种子地址">
      <template #default="scope">
        <span style="cursor: pointer" @click="openBrowser(scope.row.url)">{{scope.row.url}}</span>
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
