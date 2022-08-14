<template>

    <div class="flex items-center justify-center flex-col">
        <uni-calendar :selected="info.selected" :start-date="'2022-1-1'" :end-date="'2022-12-30'" />
    </div>

</template>

<script setup lang="ts" name="subPage">
import counter from '@/store'
const info = reactive({
    selected: []
})
</script>
