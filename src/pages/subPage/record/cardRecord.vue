<template>

    <div class="flex items-center justify-center flex-col">
        <uni-calendar :selected="info.selected" :start-date="'2022-1-1'" :end-date="'2022-12-30'" />
    </div>

</template>

<script setup lang="ts" name="subPage">
import useStore from '@/store/test'
import counter from '@/store/counter'
import record from '@/store/record'
const recordStore = useStore()
console.log(record);
const info = reactive({
    selected: []
})

uni.request({
    url: "https://8f2ad662-66cb-4a7c-8fa5-e7e9e2c18047.bspapp.com/http/mytest",
    data: {
        username: uni.getStorageSync("username")
    },
    success: (res) => {
        console.log('_____________________');

        console.log(res.data.data);
        info.selected = res.data.data;
    },
    fail: (err) => {
        console.log(err);
    }
});

function getDate(date: any, AddDayCount = 0) {
    if (!date) {
        date = new Date()
    }
    if (typeof date !== 'object') {
        date = date.replace(/-/g, '/')
    }
    const dd = new Date(date)

    dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期

    const y = dd.getFullYear()
    const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
    const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
    return {
        fullDate: y + '-' + m + '-' + d,
        year: y,
        month: m,
        date: d,
        day: dd.getDay()
    }
}


console.log(info.selected);

</script>
<!-- 
<style scoped lang="scss">

</style> -->
