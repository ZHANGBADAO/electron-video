<script setup lang="ts">
import {ref, reactive, shallowRef} from 'vue'
import { ElMessage } from 'element-plus'
import webhdComponent from './components/webhd.vue'
import subhdComponent from './components/subhd.vue'
import gaoqingComponent from './components/gaoqing.vue'
import doubanComponent from './components/douban.vue'

let input = ref('')//搜索关键词
let _selectedMenu = '' //当前选择的菜单
let defaultActiveMenu = ref('1-1')

let componentName = shallowRef(webhdComponent)//右侧的组件名字
let tableData = ref([])//表格数据
let loading = ref(false)

//搜索按钮
function searchFn() {
  if (!_selectedMenu) {
    _selectedMenu = 'webhd.cc'
  }
  menuItemClick(_selectedMenu)
}
//点击左侧导航
function menuItemClick(site:string) {
  _selectedMenu = site

  if (!input.value) {
    ElMessage.error('请输入关键词')
    return
  }

  if (_selectedMenu === 'webhd.cc') searchFromWebhdcc()
  if (_selectedMenu === 'subhd.tv') searchFromSubhdtv()
  if (_selectedMenu === 'gaoqing.fm') searchFromGaoqing()
  if (_selectedMenu === '豆瓣') searchFromDouban()
}

//从webhd.cc搜索
function searchFromWebhdcc(){
  loading.value = true
  //@ts-ignore
  window.myAPI.searchFromWebhd(input.value).then((res)=>{
    console.log('webhd.cc的搜索结果',res)
    tableData.value = res
    componentName.value = webhdComponent
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
    componentName.value = subhdComponent
  }).finally(() => {
    loading.value = false
  })
}
//gaoqing.fm搜索
function searchFromGaoqing(){
  loading.value = true
  //@ts-ignore
  window.myAPI.searchFromGaoqing(input.value).then((res)=>{
    console.log('gaoqing.fm的搜索结果',res)
    tableData.value = res
    componentName.value = gaoqingComponent
  }).finally(() => {
    loading.value = false
  })
}
//豆瓣搜索
function searchFromDouban(){
  loading.value = true
  //@ts-ignore
  window.myAPI.searchFromDouban(input.value).then((res)=>{
    console.log('豆瓣的搜索结果',res)
    tableData.value = res
    componentName.value = doubanComponent
  }).finally(() => {
    loading.value = false
  })
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
              :default-active="defaultActiveMenu"
              :default-openeds="['1', '2']"
              class="el-menu-vertical-demo"
          >
            <el-sub-menu index="1">
              <template #title>
                <span>视频</span>
              </template>
              <el-menu-item index="1-1" @click="menuItemClick('webhd.cc')">webhd.cc</el-menu-item>
              <el-menu-item index="1-2" @click="menuItemClick('gaoqing.fm')">gaoqing.fm</el-menu-item>
              <el-menu-item index="1-3" @click="menuItemClick('豆瓣')">豆瓣</el-menu-item>

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
          <keep-alive>
            <component
                :is="componentName"
                :tableData="tableData"
                :loading="loading"
            >
            </component>
          </keep-alive>
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
