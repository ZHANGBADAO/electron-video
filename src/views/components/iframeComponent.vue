<template>
    <div class="iframe-component">
        <iframe :src="iframeUrl"
                height="680"
                width="100%"
                frameborder="0"
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

<style scoped>

</style>
