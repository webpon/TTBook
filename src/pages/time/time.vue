<template>
  <view class="flex justify-center flex-col">
    <button type="primary" size="mini" style="margin: 30px 10px; width: 100px;" @click="change">添加记录</button>
    <view>
      <uni-steps @clickItem="clickItem" :options="list" active-color="#007AFF" direction="column" />
    </view>

  </view>
</template>
<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app';

let list = ref([])
onShow(() => {
  getTimeRecord()
})
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
  return {
    fullDate: y + "-" + m + "-" + d,
    year: y,
    month: m,
    date: d,
    day: dd.getDay(),
  };
}
function change() {
  var timestamp = new Date().getTime(); // 1566267029738
  const startTimeDesc = new Date(timestamp).toLocaleString()
  const overTimeDesc = ''
  // list.value.push({
  //   title: '打卡' + list.value.length + 1,
  //   desc: startTimeDesc + ' -> ' + overTimeDesc,
  //   startTime: timestamp,
  //   startTimeDesc,
  //   overTime: 0,
  //   overTimeDesc,
  // })
  uni.request({
    method: "post",
    url: "https://8f2ad662-66cb-4a7c-8fa5-e7e9e2c18047.bspapp.com/http/mytest/addTimeRecord",
    data: {
      username: uni.getStorageSync("username"),
      title: '打卡' + list.value.length + 1,
      date: getDate(new Date()).fullDate,
      startTime: timestamp,
      startTimeDesc,
      overTime: 0,
      overTimeDesc
    },
    success: (res) => {
      console.log(res);
      getTimeRecord()
    },
  });
}
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
function clickItem(item: object) {
  console.log(addUrlParams(
    "/pages/time/subPage/recordEdit",
    item
  ));

  uni.navigateTo(addUrlParams(
    "/pages/time/subPage/recordEdit",
    item
  ));
}
function getTimeRecord() {
  uni.request({
    url: "https://8f2ad662-66cb-4a7c-8fa5-e7e9e2c18047.bspapp.com/http/mytest/getCurrentTimeRecord",
    data: {
      username: uni.getStorageSync("username")
    },
    success: (res) => {
      list.value = res.data.dataList;
    },
    fail: (err) => {
      console.log(err);
    }
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

