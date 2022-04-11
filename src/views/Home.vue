<script setup lang="ts">
import {ref, reactive} from 'vue'
import { ElMessage } from 'element-plus'

let input = ref('')
let defaultActiveMenu = ref('1-1')
let tableData = ref([])
let loading = ref(false)

//搜索按钮
function searchFn() {
  defaultActiveMenu.value = '1-1'
  menuItemClick('webhd.cc')
}
//左侧导航搜索
function menuItemClick(site:string) {
  if (!input.value) {
    ElMessage.error('请输入关键词')
    return
  }

  if (site === 'webhd.cc') searchFromWebhdcc()
  if (site === 'subhd.tv') searchFromSubhdtv()
}
function menuSelectFn(index:string, indexPath:string, item:object) {
  // defaultActiveMenu.value = index
  console.log(item)
}
//从webhd.cc搜索
function searchFromWebhdcc(){
  loading.value = true
  //@ts-ignore
  window.myAPI.searchFromWebhd(input.value).then((res)=>{
    console.log('webhd.cc的搜索结果',res)
    tableData.value = res
  }).finally(() => {
    loading.value = false
  })
}
//从subhd.tv搜索
function searchFromSubhdtv(){
  loading.value = true
  //@ts-ignore
  window.myAPI.searchFromSubhd(input.value).then((res)=>{
    console.log('subhd.tv的搜索结果',res)
    tableData.value = res
  }).finally(() => {
    loading.value = false
  })
}
//点击链接打开浏览器
function openBrowser(url:string) {
  //@ts-ignore
  window.myAPI.openBrowser(url)
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row :gutter="20" justify="center">
          <el-col :span="8">
            <el-input v-model="input" placeholder="输入名称"
                      @keyup.enter="searchFn"
            />
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="searchFn">搜索</el-button>
          </el-col>
        </el-row>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <el-menu
              @select="menuSelectFn"
              :default-active="defaultActiveMenu"
              :default-openeds="['1', '2']"
              class="el-menu-vertical-demo"
          >
            <el-sub-menu index="1">
              <template #title>
                <span>视频</span>
              </template>
              <el-menu-item index="1-1" @click="menuItemClick('webhd.cc')">webhd.cc</el-menu-item>

            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <span>字幕</span>
              </template>
              <el-menu-item index="2-1" @click="menuItemClick('subhd.tv')">subhd.tv</el-menu-item>

            </el-sub-menu>
          </el-menu>
        </el-aside>

        <el-main>
          <el-table v-loading="loading" :data="tableData" border stripe style="width: 100%">
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
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<style scoped lang="scss">
.common-layout {
  padding: 30px;
}
</style>
