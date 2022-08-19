<template>
	<view class="flex items-center flex-col" v-if="hasUserName">
		<view class="w-90vw py-50rpx flex flex-col items-center rounded-20rpx bg-blue-300 mt-5vw">
			<h3 class="mb-40rpx">今天已累计学习{{ countDownHours }}小时{{ countDownMinute }}分</h3>
			<button type="primary" size="mini" @click="addTimeRecord">添加记录</button>
		</view>
		<view class="example-body">
			<uni-datetime-picker type="date" :clear-icon="false" v-model="currentDay" @change="changeDay"/>
		</view>
		<view class="w-90vw bg-blue-300 rounded-20rpx">
			<uni-steps @clickItem="editRecord" @longpressItem="delRecord" active-color="skyblue" deactiveColor="purple"
				direction="column" :active="-1" :options="orderList" :circleStyle="{ marginTop: '21rpx' }"
				:descStyle="{ color: 'blue', fontSize: '34rpx', lineHeight: '55rpx' }"
				:titleStyle="{ color: 'black', fontSize: '34rpx', lineHeight: '55rpx' }" />
		</view>
	</view>
	<view v-else>
		请输入您的昵称！
	</view>
	<!-- 输入框示例 -->
	<uni-popup ref="inputDialog" type="dialog">
		<uni-popup-dialog ref="inputClose" mode="input" title="请输入记录备注" @confirm="dialogInputConfirm">
		</uni-popup-dialog>
	</uni-popup>
</template>
<script setup lang="ts">
	import {
		onShow
	} from '@dcloudio/uni-app';
	import {
		onPullDownRefresh
	} from "@dcloudio/uni-app";

	/* data */
	let orderList = ref([])
	let timeTotal = ref(0)
	let hasUserName = ref('')

	let inputDialog = ref(null)
	let inputClose = ref(null)
	
	let currentDay = ref(getDate(new Date()).fullDate)

	/* computed */
	let countDownHours = computed(() => {
		return Math.trunc(
			timeTotal.value / 3600000
		);
	});
	let countDownMinute = computed(() => {
		return Math.trunc(
			(timeTotal.value - countDownHours.value * 3600000) /
			60000
		);
	});
	/* 生命周期钩子 */
	onShow(() => {
		hasUserName.value = uni.getStorageSync('username')
		if (hasUserName.value) {
			getTimeRecord()
		}
	})
	onPullDownRefresh(
		() => {
			getTimeRecord()
		}
	)

	/* 方法 */
	// 获取日期并格式化
	function getDate(date: any, AddDayCount = 0) {
		if (!date) {
			date = new Date();
		}
		if (typeof date !== "object") {
			date = date.replace(/-/g, "/");
		}
		const dd = new Date(date);

		dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期

		const y = dd.getFullYear();
		const m =
			dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1; // 获取当前月份的日期，不足10补0
		const d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
		const hour = dd.getHours() < 10 ? "0" + dd.getHours() : dd.getHours()
		const minute = dd.getMinutes() < 10 ? "0" + dd.getMinutes() : dd.getMinutes()
		const second = dd.getSeconds() < 10 ? "0" + dd.getSeconds() : dd.getSeconds()
		return {
			fullDate: y + "-" + m + "-" + d,
			year: y,
			month: m,
			date: d,
			time: hour + ':' + minute + ':' + second,
			day: dd.getDay(),
		};
	}
	// 处理页面传递参数
	function addUrlParams(url: string, params: object) {
		if (!url) return '';
		var hasQuestion = url.indexOf('?') > 0;
		const query = Object.keys(params).map(item => {
			return item + '=' + params[item] + '&'
		})
		const queryUrl = "".concat(url).concat(hasQuestion ? '&' : '?').concat(...query)
		return {
			url: queryUrl.substring(0, queryUrl.length - 1)
		};
	}
	function changeDay(day) {
		currentDay.value = day
		getTimeRecord()
	}
	// 获取当天的所有记录
	function getTimeRecord() {
		uni.request({
			url: "https://8f2ad662-66cb-4a7c-8fa5-e7e9e2c18047.bspapp.com/http/mytest/getCurrentTimeRecord",
			data: {
				username: uni.getStorageSync("username"),
				currentDate: currentDay.value,
			},
			success: (res) => {
				orderList.value = res.data.dataList.reverse();
				timeTotal.value = res.data.total
			},
			fail: (err) => {
				console.log(err);
			},
			complete: () => {
				uni.stopPullDownRefresh();
			}
		});
	}
	// 添加记录
	function addTimeRecord() {
		const flag = orderList.value.some((item: any) => item.overTime === 0)
		if (flag) {
			uni.showToast({
				title: '还有记录未完成',
				icon: 'none',
				duration: 1000
			});
		} else {
			inputDialog.value?.open()
		}

	}

	function dialogInputConfirm(title: string) {
		if (title.length !== 0) {
			var timestamp = new Date().getTime(); // 1566267029738
			const startTimeDesc = getDate(new Date()).time
			const overTimeDesc = ''
			uni.request({
				method: "post",
				url: "https://8f2ad662-66cb-4a7c-8fa5-e7e9e2c18047.bspapp.com/http/mytest/addTimeRecord",
				data: {
					username: uni.getStorageSync("username"),
					title,
					date: currentDay.value,
					startTime: timestamp,
					startTimeDesc,
					overTime: 0,
					overTimeDesc
				},
				success: (res) => {
					getTimeRecord()
				},
			});
		} else {
			uni.showToast({
				title: '备注不允许为空',
				icon: 'none',
				duration: 1000
			});
		}
	}
	// 编辑该次打卡
	function editRecord(item: any) {
		if (item.overTime) {
			uni.showToast({
				title: '该次打卡已结束',
				duration: 1000
			});

		} else {
			uni.navigateTo(addUrlParams(
				"/pages/time/subPage/recordEdit",
				item
			));
		}
	}
	// 删除该次打卡
	function delRecord(item: any) {
		uni.showActionSheet({
			itemColor: "#FF0000",
			itemList: ["删除该记录"],
			success: function() {
				uni.request({
					method: "post",
					url: "https://8f2ad662-66cb-4a7c-8fa5-e7e9e2c18047.bspapp.com/http/mytest/delTimeRecord",
					data: {
						_id: item._id
					},
					success: (res) => {
						getTimeRecord()
					},
				});
			},
			fail: function(res: any) {
				console.log(res);
			},
		});
	}
</script>
<style lang="scss">
	.status-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 92rpx;
		margin: 30rpx;
		background-color: #007AFF;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		flex-direction: row;
	}
</style>
