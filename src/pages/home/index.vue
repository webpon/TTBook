<template>
  <view class="flex items-center justify-center flex-col">
    <!-- 倒计时 -->
    <view class="count-down-card">
      <h3>考研倒计时</h3>
      <h3 class="count-down-timer">
        {{ countDownDay }}天-{{ countDownHours }}小时-{{ countDownMinute }}分-{{ countDownSecond }}秒</h3>
      <view class="now-time">
        <view class="time">{{ `${nowMonth}-${nowDay}` }}</view>
        <view class="time">{{ currentTime }}</view>
      </view>
    </view>
    <!-- 剩余进度 -->
    <view class="w-90vw my-20px">
      剩余时间：
      <progress :percent="countDownProcess" :show-info="true" />
    </view>
    <!-- 打卡 -->
    <view class="w-90vw h-50vw relative">
      <view class="w-full h-full absolute backface-hidden transition-transform duration-500 ease-in-out"
        :style="coverStyle">
        <view class="bg-card bg-cover h-50vw rounded-10px flex items-center justify-center flex-col">
          <view class="w-130rpx h-180rpx border-1 rounded-5px border-white border-solid mb-10rpx">
            <view class="text-white text-20px mt-4px">
              <h3 class="text-center">{{ nowMonth }}</h3>
              <h3 class="text-center transform rotate-z-165 font-500">—</h3>
              <h3 class="text-center">{{ nowDay }}</h3>
            </view>
            <view class="text-center text-white text-11px mt-10px">{{ weekDay }}</view>
          </view>
          <view class="text-white text-25rpx mt-15px mb-5px">已连续打卡{{ continuityClock }}天</view>
          <button class="button w-84vw h-35px bg-white text-15px leading-35px font-600" @click="clockIn">立即打卡</button>
        </view>
      </view>
      <view
        class="w-full h-full absolute backface-hidden transition-transform duration-500 ease-in-out transform -rotate-y-180"
        :style="backStyle">
        <view
          class="bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-400 w-90vw h-50vw rounded-10px flex items-center justify-center flex-col">
          <view class="flex items-center flex-col">
            <view class="bg-clockLogo w-50px h-50px bg-cover rounded-10px"></view>
            <h3 class="text-white text-14px mt-10px mb-25px">今日已完成打卡啦！</h3>
          </view>
          <view
            class="text-14px text-center leading-7vw px-3vw h-7vw text-white rounded-7vw border-1 border-solid border-white"
            @click="toRecord">已打卡{{ continuityClock }}天 ></view>
        </view>
      </view>
    </view>
    <uni-popup ref="inputDialog" type="dialog">
      <uni-popup-dialog :showClose="false" :before-close="closeFlag" ref="inputClose" mode="input" title="请输入你的昵称" placeholder="请输入内容" @confirm="dialogInputConfirm">
      </uni-popup-dialog>
    </uni-popup>
    <uni-popup ref="registerError" type="message">
				<uni-popup-message type="error" message="请正确输入你的昵称！" :duration="2000"></uni-popup-message>
		</uni-popup>
  </view>
</template>

<script setup lang="ts">

import { countDown } from "@/hooks/home/countDown"
import { clockHook } from "@/hooks/home/clockHook"
import { registerHook } from "@/hooks/home/registerHook"
import { onShow } from "@dcloudio/uni-app";

let { 
  weekDay,
  countDownProcess,
  countDownDay,
  countDownHours,
  countDownMinute,
  countDownSecond,
  nowMonth,
  nowDay,
  currentTime } = countDown()
let { 
  getRecordList,
  continuityClock,
  coverStyle,
  backStyle,
  clockIn,
  toRecord } = clockHook()
let { isRegister, registerError, inputDialog, dialogInputConfirm, closeFlag } = registerHook(getRecordList)

onShow(() => {
  getRecordList()
})
onMounted(() => {
  isRegister()
}),
//发送给朋友
function onShareAppMessage() {
  return {
    title: '首页',//分享标题
    path: '',//分享页面路径
    imageUrl: '',//分享图标
    desc: '',//自定义分享描述
  }
};
uni.onKeyboardHeightChange(res => {
  console.log(res.height)
})

</script>
<style scoped lang="scss">
.count-down-card {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  width: 90vw;
  height: 20vh;
  background-color: rgba($color: blue, $alpha: 0.3);
  border-radius: 10px;
}

.count-down-timer {
  background: rgba($color: blue, $alpha: 0.5);
  border-radius: 5px;
  margin: 10px 0;
  padding: 4px 6px;
  color: rgba($color: yellow, $alpha: 0.7);
  font-weight: bold;
}

.now-time {
  display: flex;
  width: 35vw;
  justify-content: space-between;

  .time {
    color: #fff;
    font-size: 20px;
  }
}
</style>
