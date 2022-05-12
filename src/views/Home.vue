<script setup lang="ts">
import {ref, reactive, shallowRef, onMounted} from 'vue'
import { ElMessage } from 'element-plus'
import webhdComponent from './components/webhd.vue'
import subhdComponent from './components/subhd.vue'
import gaoqingComponent from './components/gaoqing.vue'
import doubanComponent from './components/douban.vue'
import shooterComponent from './components/shooter.vue'
import torlockComponent from './components/torlock.vue'
import ytsMxComponent from './components/ytsMx.vue'
import yysubComponent from './components/yysub.vue'
import ddrkComponent from './components/ddrk.vue'
import iframeComponent from './components/iframeComponent.vue'

onMounted(() => {
  // new Notification('NOTIFICATION_TITLE', { body: 'NOTIFICATION_BODY' })

})

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
  if (_selectedMenu === '豆瓣搜索') searchFromDouban()
  if (_selectedMenu === '射手') searchFromShooter()
  if (_selectedMenu === 'torlock.com') searchFromTorlock()
  if (_selectedMenu === 'yts.mx') searchFromYtsMx()
  if (_selectedMenu === '人人影视') searchFromYysub()
  if (_selectedMenu === '低端影视') searchFromDdrk()
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
//豆瓣搜索搜索
function searchFromDouban(){
  loading.value = true
  //@ts-ignore
  window.myAPI.searchFromDouban(input.value).then((res)=>{
    console.log('豆瓣搜索的搜索结果',res)
    tableData.value = res
    componentName.value = doubanComponent
  }).finally(() => {
    loading.value = false
  })
}
//射手搜索
function searchFromShooter(){
  loading.value = true
  //@ts-ignore
  window.myAPI.searchFromShooter(input.value).then((res)=>{
    console.log('射手的搜索结果',res)
    tableData.value = res
    componentName.value = shooterComponent
  }).finally(() => {
    loading.value = false
  })
}
//torlock搜索
function searchFromTorlock(){
  loading.value = true
  //@ts-ignore
  window.myAPI.searchFromTorlock(input.value).then((res)=>{
    console.log('torlock的搜索结果',res)
    tableData.value = res
    componentName.value = torlockComponent
  }).finally(() => {
    loading.value = false
  })
}
//yts.mx搜索
function searchFromYtsMx(){
  loading.value = true
  //@ts-ignore
  window.myAPI.searchFromYtsMx(input.value).then((res)=>{
    console.log('yts.mx的搜索结果',res)
    tableData.value = res
    componentName.value = ytsMxComponent
  }).finally(() => {
    loading.value = false
  })
}
//yysub.net 人人影视搜索
function searchFromYysub(){
  loading.value = true
  //@ts-ignore
  window.myAPI.searchFromYysub(input.value).then((res)=>{
    console.log('人人影视的搜索结果',res)
    tableData.value = res
    componentName.value = yysubComponent
  }).finally(() => {
    loading.value = false
  })
}
// 跳转到iframe页面
const iframeUrl = ref('')
function menuItemJump(url:string) {
  iframeUrl.value = url
  componentName.value = iframeComponent
}
//ddrk.me 低端影视搜索
function searchFromDdrk(){
  loading.value = true
  //@ts-ignore
  window.myAPI.searchFromDdrk(input.value).then((res)=>{
    console.log('低端影视的搜索结果',res)
    tableData.value = res
    componentName.value = ddrkComponent
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
            <el-input v-model="input" placeholder="输入名称" autofocus
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
          <el-scrollbar height="100%">
            <el-menu
              :default-active="defaultActiveMenu"
              :default-openeds="['1', '2']"
              class="aside-menu"
            >
              <el-sub-menu index="1">
                <template #title>
                  <span>视频</span>
                </template>
                <el-menu-item index="1-1" @click="menuItemClick('webhd.cc')">webhd.cc (推荐)</el-menu-item>
                <el-menu-item index="1-2" @click="menuItemClick('豆瓣搜索')">豆瓣搜索</el-menu-item>
                <el-menu-item index="1-3" @click="menuItemClick('gaoqing.fm')">高清fm</el-menu-item>
                <el-menu-item index="1-4" @click="menuItemClick('低端影视')">低端影视</el-menu-item>
                <el-menu-item index="1-5" @click="menuItemClick('torlock.com')">torlock.com (需翻墙)</el-menu-item>
                <el-menu-item index="1-6" @click="menuItemClick('yts.mx')">yts.mx</el-menu-item>

              </el-sub-menu>
              <el-sub-menu index="2">
                <template #title>
                  <span>字幕</span>
                </template>
                <el-menu-item index="2-1" @click="menuItemClick('subhd.tv')">subhd.tv (推荐)</el-menu-item>
                <el-menu-item index="2-2" @click="menuItemClick('人人影视')">人人影视</el-menu-item>
                <el-menu-item index="2-3" @click="menuItemClick('射手')">射手</el-menu-item>

              </el-sub-menu>
              <el-sub-menu index="3">
                <template #title>
                  <span>视频网站</span>
                </template>
                <el-menu-item index="3-1" @click="menuItemJump('https://movie.douban.com/')">豆瓣电影</el-menu-item>

              </el-sub-menu>
            </el-menu>
          </el-scrollbar>
        </el-aside>

        <el-main>
          <keep-alive>
            <component
                :is="componentName"
                :tableData="tableData"
                :iframeUrl="iframeUrl"
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
  padding: 20px 0 0;

  .el-header {
    height: unset;
  }

  .el-container {
    .el-aside {
      margin: 20px 0 20px 20px;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 0 15px rgba(0, 0, 0, .15);

      .el-scrollbar {
        .el-menu {
          border-right: none;

          .el-menu-item.is-active {
            background: #fbf9e3;
          }
        }
      }
    }

    .el-main {
      height: calc(100vh - 108px);
    }
  }
}
</style>
