<template>
    <div class="iframe-component">
        <iframe :src="iframeUrl"
        ></iframe>
    </div>
</template>

<script setup lang="ts">
defineProps({
    iframeUrl: {
        type: String,
        default: '',
    },
})
</script>

<style scoped lang="scss">
iframe{
  display: block;
  border: 0;
  width: 100%;
  height: calc(100vh - 148px);
}
</style>
