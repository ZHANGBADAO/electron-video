<template>
  <el-table v-loading="props.loading" :data="props.tableData" height="680" border stripe style="width: 100%">
    <el-table-column label="海报">
      <template #default="scope">
        <img :src="scope.row.imgUrl" alt="" style="width: 100px">
      </template>
    </el-table-column>
    <el-table-column prop="nameCn" label="名字(中文)" width="180" />
    <el-table-column prop="season" label="集数" width="180" />
    <el-table-column label="对应片源">
      <template #default="scope">
        <span style="cursor: pointer">{{scope.row.match}}</span>
      </template>
    </el-table-column>
    <el-table-column label="字幕信息">
      <template #default="scope">
        <template v-for="(item, index) in scope.row.desc">
          <el-tag v-if="index === 0" style="margin: 3px">{{item}}</el-tag>
          <el-tag v-else type="info" style="margin: 3px">{{item}}</el-tag>
        </template>
      </template>
    </el-table-column>
    <el-table-column label="字幕地址">
      <template #default="scope">
        <span style="cursor: pointer" @click="openBrowser(scope.row.subUrl)">{{scope.row.subUrl}}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
const props = defineProps({
  tableData: Array,
  loading: Boolean,
})

//点击链接打开浏览器
function openBrowser(url:string) {
  //@ts-ignore
  window.myAPI.openBrowser(url)
}
</script>
<style scoped>

</style>
