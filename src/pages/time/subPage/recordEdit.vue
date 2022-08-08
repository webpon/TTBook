<template>
  <view>
    
    <button @click="overRecord">打卡结束</button>
  </view>
</template>

<script setup lang="ts" name="recordEdit">
import { onLoad } from '@dcloudio/uni-app';
let _params = {}
onLoad((params) => {
  console.log('++++++++++++');
  console.log(params);

  
})
function overRecord() {
  var timestamp = new Date().getTime(); // 1566267029738
  const overTimeDesc = new Date(timestamp).toLocaleString()
  uni.request({
    method: "post",
    url: "https://8f2ad662-66cb-4a7c-8fa5-e7e9e2c18047.bspapp.com/http/mytest/editTimeRecord",
    data: {
        username: uni.getStorageSync("username"),
        startTime: _params.startTime,
        overTime: timestamp,
        overTimeDesc: overTimeDesc
    },
    success: (res) => {
        // info.selected = res.data.data;
    },
    fail: (err) => {
        console.log(err);
    }
});
}

</script>

<style scoped lang="scss">
</style>
