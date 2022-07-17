<template>

    <div class="flex items-center justify-center flex-col">
        <uni-calendar :selected="info.selected" :insert="true" :start-date="'2022-1-1'" :end-date="'2022-12-30'" />
    </div>

</template>

<script setup lang="ts" name="subPage">
import useStore from '../../store/test'
import counter from '../../store/counter'
const store = useStore()
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
const info = reactive({
    selected: [{
        date: getDate(new Date(), -3).fullDate,
        info: '已打卡'
    },
    {
        date: getDate(new Date(), -2).fullDate,
        info: '已打卡'
    },
    {
        date: getDate(new Date(), -1).fullDate,
        info: '已打卡'
    }
    ]
})

console.log(store.$state);

</script>
<!-- 
<style scoped lang="scss">

</style> -->
