<template>
  <el-table v-loading="props.loading" :data="props.tableData" border stripe style="width: 100%">
    <el-table-column label="海报">
      <template #default="scope">
        <img :src="scope.row.imgUrl" alt="" style="width: 100px">
      </template>
    </el-table-column>
    <el-table-column prop="nameCn" label="名字(中文)" width="180" />
    <el-table-column prop="nameEn" label="名字(英文)" width="180" />
    <el-table-column label="视频地址">
      <template #default="scope">
        <span style="cursor: pointer" @click="openBrowser(scope.row.url)">{{scope.row.url}}</span>
      </template>
    </el-table-column>
    <el-table-column label="字幕地址">
      <template #default="scope">
        <span style="cursor: pointer" @click="openBrowser(scope.row.subUrl)">{{scope.row.subUrl}}</span>
      </template>
    </el-table-column>
    <el-table-column label="介绍">
      <template #default="scope">
        <span style="cursor: pointer" @click="openBrowser(scope.row.descUrl)">{{scope.row.descUrl}}</span>
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
  console.log('onMounted')
})
//点击链接打开浏览器
function openBrowser(url:string) {
  //@ts-ignore
  window.myAPI.openBrowser(url)
}
</script>
<style scoped>

</style>
