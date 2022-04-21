<template>
    <div class="iframe-component">
        <iframe :src="iframeUrl"
                height="680"
                width="100%"
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
  border: 0;
}
</style>
