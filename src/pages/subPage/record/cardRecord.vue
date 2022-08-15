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
uni.request({
    url: "https://8f2ad662-66cb-4a7c-8fa5-e7e9e2c18047.bspapp.com/http/mytest",
    data: {
        username: uni.getStorageSync("username")
    },
    success: (res) => {
        info.selected = res.data.data;
    },
    fail: (err) => {
        console.log(err);
    }
});
</script>
