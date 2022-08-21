<template>
  <view>
    <button class="text-15px mt-20vw flex justify-center items-center bg-purple-400 w-25vw h-25vw rounded-30vw"
      @click="overRecord">{{ _params.editFlag ? '完成修改' : '完成打卡'}}</button>
  </view>
  <view class="flex flex-col items-center justify-center mt-100rpx">
	  <view>修改备注</view>
	  <view class="mt-20px w-250px">
		  <uni-easyinput v-model="_params.title" placeholder="重命名备注"></uni-easyinput>
	  </view>
  </view>
  <view class="flex flex-col items-center">
    <h3 class="leading-100rpx mt-100rpx">自定义开始时间</h3>
    <view>
      <uni-datetime-picker type="datetime"
        :end="_params.endTime" @change="customStartTime" />
    </view>
    <h3 class="leading-100rpx mt-50rpx">自定义结束时间</h3>
    <view>
      <uni-datetime-picker type="datetime"
        :end="_params.endTime" @change="customEndTime" />
    </view>
  </view>

</template>

<script setup lang="ts" name="recordEdit">
import { onLoad } from '@dcloudio/uni-app';
let _params = ref({
  startTime: 0,
  endTime: 0,
  title: '',
  editFlag: ''
})

let recordId = ref('')

let custimeTime = ref({
  startTime: 0,
  endTime: 0
})
function getDate(date: any, AddDayCount = 0) {
  if (!date) {
    date = new Date();
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
	simpleTime: hour + ':' + minute,
    day: dd.getDay(),
  };
}
onLoad((params: any) => {
  recordId.value = params._id
  _params.value.startTime = Number(params.startTime)
  const endTime = new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1
  _params.value.endTime = endTime
  _params.value.title = params.title
  _params.value.editFlag = params.editFlag
  if(_params.value.editFlag) {
	  custimeTime.value.startTime = Number(params.startTime)
	  custimeTime.value.endTime = Number(params.overTime)
  }
})
function customStartTime(time: any) {
  custimeTime.value.startTime = new Date(time).getTime()
}
function customEndTime(time: any) {
  custimeTime.value.endTime = new Date(time).getTime()
}
function overRecord() {
  if(!_params.value.title) {
	  uni.showToast({
	    title: '备注不允许为空',
		icon: 'error',
	    duration: 500
	  });
	  return
  }
  console.log(custimeTime.value)
  const timestamp = custimeTime.value.endTime || new Date().getTime(); // 1566267029738
  const startTime = custimeTime.value.startTime || Number(_params.value.startTime)
  if (timestamp < startTime) {
    uni.showToast({
      title: '结束时间输入不正确',
      icon: 'error',
      duration: 1000
    });
    return
  }
  const overTimeDesc = getDate(timestamp).simpleTime
  const startTimeDesc = getDate(startTime).simpleTime
  uni.request({
    method: "post",
    url: "https://8f2ad662-66cb-4a7c-8fa5-e7e9e2c18047.bspapp.com/http/mytest/editTimeRecord",
    data: {
      _id: recordId.value,
      username: uni.getStorageSync("username"),
	  title: _params.value.title,
      startTime,
      startTimeDesc,
      overTime: timestamp,
      overTimeDesc
    },
    success: (res) => {
      uni.navigateBack({
        success: () => {
          uni.showToast({
            title: _params.editFlag ? '修改完毕!' : '打卡完成！',
            duration: 1000
          });
        }
      })
    },
    fail: (err) => {
      console.log(err);
    }
  });
}

</script>

<style scoped lang="scss">
</style>
