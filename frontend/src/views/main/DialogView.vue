<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const id = ref("")

onMounted(() => {
    const dialogId = route.query.id ?? ''
    id.value = dialogId.toString()
})
</script>

<template>
    {{ id }}
</template>