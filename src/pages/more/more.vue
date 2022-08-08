<template>
    <view class="text-center text-23px w-full h-full">
        <!-- 大盒子 -->
        <!-- <view class="w-100vw h-1288px relative" @touchstart="onTouchStart" @touchend="onTouchEnd"> -->
            <!-- 上滑滑动 动画盒子 -->
            <!-- <view class="ani-box" animation="{{animationData}}" :class="['transition-all absolute w-100vw h-10088px' ]" :style="{'top': '-' + top + '00vh'}"> -->
                <!-- 视频列表 -->
                <!-- <template v-for="(item, index) in videoList" :key="item.url" >
                    <video :id="index" class="w-full h-100vh flex-shrink-0" :show-fullscreen-btn="false" :loop="true"
                        :src="item.url"></video>
                </template>
            </view>
        </view> -->



        <view class="flex flex-wrap w-full h-full">
            <swiper  class="w-full h-100vh" :circular="circular"  :vertical="true" @change="changeVideo">
                    <swiper-item  v-for="(item, index) in videoList" :key="index">
                        <video :id="index" class="w-full h-full flex-shrink-0" :show-fullscreen-btn="false" :loop="true"
                            :src="item.url"></video>
                    </swiper-item>
            </swiper>
        </view>
        <!-- <view class="fixed top-0 w-100vw">
            <progress :percent="percentCompleted" activeColor="#10AEFF" stroke-width="3" />
        </view> -->
    </view>
</template>
<script setup lang="ts" name="more">
import { operateFile } from '@/hooks/more/operateFile'
import { operateVideo } from '@/hooks/more/operateVideo'
import { onPullDownRefresh } from "@dcloudio/uni-app";
import { onShow } from "@dcloudio/uni-app";
let startY = ref(0)
let endY = ref(0)
let top = ref(0)
const { picList, uploadFile, percentCompleted, getFileList, previewPicture, deletePicture } = operateFile()
const { videoList, circular, getTermVideo, uploadVideo, changeVideo } = operateVideo()
onMounted(() => {
    getFileList()


})
// function onTouchStart(e) {
//     console.log('触摸开始');
//     startY.value = e.changedTouches[0].pageY
// }
// function onTouchEnd(e) {
//     console.log('触摸结束');
//     endY.value = e.changedTouches[0].pageY
//     if(endY.value > startY.value) {
//         console.log('下滑');
        
//     } else {
//         console.log('上移');
//         top.value += 1
        
//     }
    
// }
// function randomSort(a, b) { return Math.random() > 0.5 ? -1 : 1; }
onShow(() => {
    console.log(videoList.value);
    getTermVideo(0, 5)

})
onPullDownRefresh(
    () => {
        getFileList()
    }
)

//发送给朋友
function onShareAppMessage() {
    return {
        title: 'more',//分享标题
        path: '',//分享页面路径
        imageUrl: '',//分享图标
        desc: '',//自定义分享描述
    }
};

</script>

<style scoped lang="scss">
page {
    width: 100%;
    height: 100% !important;
}
</style>
