<script setup lang="ts">
import {onMounted, ref} from 'vue'

onMounted(() => {
})

const isProduction = process.env.NODE_ENV === 'production'
let menuItemArr = [
  {name: '搜索影视', path: '/home'},
  {name: '获取edge视频', path: '/edge'},
  {name: '测试', path: '/test'},
]
if (isProduction) {
  menuItemArr.pop()
}

const activeIndex = ref('/home')

function handleSelect(index: string) {
  console.log(index)
}
</script>

<template>
  <div>
    <el-menu
      :router="true"
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item v-for="item in menuItemArr" :index="item.path"
                    :key="item.path">{{ item.name }}
      </el-menu-item>
    </el-menu>

    <div class="content">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component"/>
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
.el-menu {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 40px;
  box-sizing: content-box;
  padding-top: 8px;
}

.content {
  padding-top: 40px;
}
</style>