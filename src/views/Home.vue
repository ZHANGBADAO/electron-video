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
import eztvComponent from './components/eztv.vue'
import iframeComponent from './components/iframeComponent.vue'

let input = ref('')//搜索关键词

let componentName = shallowRef<any>(webhdComponent)//右侧的组件名字
let tableData = ref([])//表格数据
let loading = ref(false)
let _selectedMenu = '' //选择菜单的名字

// 搜索按钮
function searchBtnHandler() {
  menuItemClick(_selectedMenu || 'webhd.cc')
}

//点击左侧导航
function menuItemClick(site: string) {
  _selectedMenu = site

  if (!input.value) {
    ElMessage.error('请输入关键词')
    return
  }

  if (['字幕库', 'subscene', 'BT Hub'].includes(_selectedMenu)) {
    // 打开浏览器搜索
    componentName.value = null
    //@ts-ignore
    window.myAPI.utils.writeTextToClipboard(input.value)
    ElMessage({
      message: '关键词已复制到剪贴板, 请在浏览器粘贴搜索',
      type: 'success',
      duration: 1500,
      onClose: () => {
        _selectedMenu === '字幕库' && openBrowser(`http://zmk.pw`)
        _selectedMenu === 'subscene' && openBrowser(`https://subscene.com/`)
        _selectedMenu === 'BT Hub' && openBrowser(`http://bthub.link/`)
      }
    })
    return;
  }

  if (['A4k字幕网', 'R3字幕网', '蓝光发售日期'].includes(_selectedMenu)) {
    // 打开浏览器搜索
    componentName.value = null
    _selectedMenu === 'A4k字幕网' && openBrowser(`https://www.a4k.net/search?term=${input.value}`)
    _selectedMenu === 'R3字幕网' && openBrowser(`https://r3sub.com/search.php?s=${input.value}`)
    _selectedMenu === '蓝光发售日期' && openBrowser(`https://www.blu-ray.com/search/?quicksearch=1&quicksearch_country=US&quicksearch_keyword=${input.value}&section=bluraymovies`)
    return;
  }

  searchFromWebsite()
}

// 调用主进程的爬虫方法
const siteMap = new Map([
  [
    'webhd.cc',
    {
      component: webhdComponent,
      searchMethod: 'searchFromWebhd'
    }
  ],
  [
    'subhd.tv',
    {
      component: subhdComponent,
      searchMethod: 'searchFromSubhd'
    }
  ],
  [
    'gaoqing.fm',
    {
      component: gaoqingComponent,
      searchMethod: 'searchFromGaoqing'
    }
  ],
  [
    '豆瓣搜索',
    {
      component: doubanComponent,
      searchMethod: 'searchFromDouban'
    }
  ],
  [
    '射手',
    {
      component: shooterComponent,
      searchMethod: 'searchFromShooter'
    }
  ],
  [
    'torlock.com',
    {
      component: torlockComponent,
      searchMethod: 'searchFromTorlock'
    }
  ],
  [
    'yts.mx',
    {
      component: ytsMxComponent,
      searchMethod: 'searchFromYtsMx'
    }
  ],
  [
    '人人影视',
    {
      component: yysubComponent,
      searchMethod: 'searchFromYysub'
    }
  ],
  [
    '低端影视',
    {
      component: ddrkComponent,
      searchMethod: 'searchFromDdrk'
    }
  ],
  [
    'eztv电视剧',
    {
      component: eztvComponent,
      searchMethod: 'searchFromEztv'
    }
  ],
])

function searchFromWebsite() {
  const siteObj = siteMap.get(_selectedMenu)

  loading.value = true
  //@ts-ignore
  window.myAPI[siteObj.searchMethod](input.value).then((res) => {
    console.log(`${_selectedMenu}的搜索结果`, res)
    tableData.value = res
    //@ts-ignore
    componentName.value = siteObj.component
  }).finally(() => {
    loading.value = false
  })
}

// 跳转到iframe页面
const iframeUrl = ref('')

function menuItemJump(url: string) {
  iframeUrl.value = url
  componentName.value = iframeComponent
}

//点击链接打开浏览器
function openBrowser(url: string) {
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
            <el-input v-model="input" placeholder="输入名称" autofocus
                      @keyup.enter="searchBtnHandler"
            />
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="searchBtnHandler">搜索</el-button>
          </el-col>
        </el-row>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <el-scrollbar height="100%">
            <el-menu
              default-active="1-1"
              :default-openeds="['1', '2']"
              class="aside-menu"
            >
              <el-sub-menu index="1">
                <template #title>
                  <span>视频</span>
                </template>
                <el-menu-item index="1-1" @click="menuItemClick('webhd.cc')">
                  webhd.cc (推荐)
                </el-menu-item>
                <el-menu-item index="1-2" @click="menuItemClick('豆瓣搜索')">豆瓣搜索
                </el-menu-item>
                <el-menu-item index="1-3" @click="menuItemClick('gaoqing.fm')">
                  高清fm
                </el-menu-item>
                <el-menu-item index="1-4" @click="menuItemClick('低端影视')">低端影视
                </el-menu-item>
                <el-menu-item index="1-5" @click="menuItemClick('torlock.com')">
                  torlock.com(需翻墙)
                </el-menu-item>
                <el-menu-item index="1-6" @click="menuItemClick('yts.mx')">
                  yts.mx
                </el-menu-item>
                <el-menu-item index="1-7" @click="menuItemClick('eztv电视剧')">
                  eztv电视剧
                </el-menu-item>
                <el-menu-item index="1-8" @click="menuItemClick('BT Hub')">BT
                  Hub(需翻墙)
                </el-menu-item>
                <el-menu-item index="1-9" @click="menuItemClick('蓝光发售日期')">
                  蓝光发售日期
                </el-menu-item>

              </el-sub-menu>
              <el-sub-menu index="2">
                <template #title>
                  <span>字幕</span>
                </template>
                <el-menu-item index="2-1" @click="menuItemClick('subhd.tv')">
                  subhd.tv (推荐)
                </el-menu-item>
                <el-menu-item index="2-2" @click="menuItemClick('人人影视')">人人影视
                </el-menu-item>
                <el-menu-item index="2-3" @click="menuItemClick('射手')">射手
                </el-menu-item>
                <el-menu-item index="2-4" @click="menuItemClick('字幕库')">字幕库
                </el-menu-item>
                <el-menu-item index="2-5" @click="menuItemClick('A4k字幕网')">
                  A4k字幕网
                </el-menu-item>
                <el-menu-item index="2-6" @click="menuItemClick('R3字幕网')">
                  R3字幕网(台版字幕)
                </el-menu-item>
                <el-menu-item index="2-7" @click="menuItemClick('subscene')">
                  subscene
                </el-menu-item>

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
      height: calc(100vh - 148px);
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