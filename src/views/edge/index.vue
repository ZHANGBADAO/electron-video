<template>
  <div class="big-box">
    <el-card>
      <el-button @click="getVideoFromEdge" style="margin-bottom: 20px;">获取edge标签页背景视频</el-button>

      <el-table :data="videoList" border stripe style="width: 100%;" height="calc(100vh - 190px)">
        <el-table-column label="名字" width="300">
          <template #default="scope">
            {{ scope.row.attribution }}
          </template>
        </el-table-column>
        <el-table-column label="第一帧图像">
          <template #default="scope">
            <img :src="scope.row.firstFrame.i1080" alt="" style="width: 300px">
          </template>
        </el-table-column>
        <el-table-column label="视频地址">
          <template #default="scope">
            <div v-for="(item, key) in scope.row.video" style="cursor: pointer" @click="openBrowser(item)">{{ key }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";

// 获取edge标签页背景视频
const videoList = ref([]);

function getVideoFromEdge() {
  //@ts-ignore
  window.myAPI.utils.getVideoFromEdge().then(res => {
    console.log(res);
    videoList.value = res;
  });
}

//点击链接打开浏览器
function openBrowser(url: string) {
  //@ts-ignore
  window.myAPI.openBrowser(url)
}
</script>

<style scoped lang="scss">
.big-box {
  padding: 20px;
}
</style>
