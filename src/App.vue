<script setup lang="ts">
import {onMounted, ref} from 'vue'

onMounted(() => {
})

const isProduction = process.env.NODE_ENV === 'production'

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
      <el-menu-item index="/home">搜索影视</el-menu-item>
      <el-menu-item index="/test" v-if="!isProduction">测试</el-menu-item>
    </el-menu>

    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
</style>
