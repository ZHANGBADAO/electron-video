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
import x1337Component from './components/1337x.vue'
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

  if (['字幕库', 'subscene', 'BT Hub','海盗湾'].includes(_selectedMenu)) {
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
        _selectedMenu === '海盗湾' && openBrowser(`https://thepiratebay.org/index.html`)
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
  [
    '1337x',
    {
      component: x1337Component,
      searchMethod: 'searchFrom1337x'
    }
  ],
])

// 视频菜单
const videoMenuArr = [
  {
    name: 'webhd.cc (推荐)',
    value: 'webhd.cc'
  },
  {
    name: '豆瓣搜索',
    value: '豆瓣搜索'
  },
  {
    name: '高清fm',
    value: 'gaoqing.fm'
  },
  {
    name: '低端影视',
    value: '低端影视'
  },
  {
    name: '1337x(需翻墙)',
    value: '1337x'
  },

  {
    name: 'yts.mx',
    value: 'yts.mx'
  },
  {
    name: 'eztv电视剧',
    value: 'eztv电视剧'
  },
  {
    name: '海盗湾(需翻墙)',
    value: '海盗湾'
  },
  {
    name: 'BT Hub(需翻墙)',
    value: 'BT Hub'
  },
  {
    name: 'torlock.com(需翻墙)',
    value: 'torlock.com'
  },
  {
    name: '蓝光发售日期',
    value: '蓝光发售日期'
  },

]

//字幕菜单
const subtitleMenuArr = [
  {
    name: 'subhd.tv (推荐)',
    value: 'subhd.tv'
  },
  {
    name: '人人影视',
    value: '人人影视'
  },
  {
    name: '射手',
    value: '射手'
  },
  {
    name: '字幕库',
    value: '字幕库'
  },
  {
    name: 'A4k字幕网',
    value: 'A4k字幕网'
  },
  {
    name: 'R3字幕网(台版字幕)',
    value: 'R3字幕网'
  },
  {
    name: 'subscene',
    value: 'subscene'
  },

]

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

                <el-menu-item v-for="(item, index) in videoMenuArr"
                              :index="`1-${index+1}`"
                              @click="menuItemClick(item.value)">
                  {{ item.name }}
                </el-menu-item>

              </el-sub-menu>
              <el-sub-menu index="2">
                <template #title>
                  <span>字幕</span>
                </template>

                <el-menu-item v-for="(item, index) in subtitleMenuArr"
                              :index="`2-${index+1}`"
                              @click="menuItemClick(item.value)">
                  {{ item.name }}
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
