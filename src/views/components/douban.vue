<template>
  <el-table v-loading="props.loading" :data="props.tableData" border stripe style="width: 100%">
    <el-table-column label="海报">
      <template #default="scope">
        <img :src="scope.row.imgUrl" alt="" style="width: 100px">
      </template>
    </el-table-column>
    <el-table-column prop="nameCn" label="名字" />
    <el-table-column label="视频地址">
      <template #default="scope">
        <span style="cursor: pointer" @click="openBrowser(scope.row.url)">{{scope.row.url}}</span>
      </template>
    </el-table-column>
    <el-table-column label="评分">
      <template #default="scope">
        {{scope.row.rating_nums}}{{scope.row.rating_people}}
      </template>
    </el-table-column>
    <el-table-column prop="type" label="类型" />
    <el-table-column prop="actor" label="主演" />
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
