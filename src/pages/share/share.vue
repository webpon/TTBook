<template>
    <view class="text-center text-20px pt-10px">
        <!-- <h3>非常感谢帅哥美女们的资源分享，你们所分享的视频图片都将实时更新给所有用户观看</h3>
        <view title="只选择视频" type="line">
            <view class="example-body">
                <uni-file-picker @success="uploadVideo" :controls="false" :limit="100" file-mediatype="video"
                    title="最多选择100个视频">
                </uni-file-picker>
            </view>
        </view> -->

        <view class="flex flex-wrap">
            <template v-for="item in picList" :key="item.fileId">
                <image @longpress="deletePicture(item.fileID)" class="w-25vw h-25vw flex-shrink-0" :src="item.fileID"
                    @click="previewPicture(item.fileID)"></image>
            </template>
        </view>
        <button @click="uploadFile">上传图片</button>
        <!-- 输入框示例 -->
        <uni-popup ref="inputDialog" type="dialog">
            <uni-popup-dialog ref="inputClose" mode="input" title="请输入删除密码！" value="" placeholder="请输入密码"
                @confirm="dialogInputConfirm"></uni-popup-dialog>
        </uni-popup>

        <!-- 年月日时分 -->
		<t-date-time-picker title="选择日期和时间" :visible="visible" mode="minute" format="YYYY-MM-DD HH:mm"
			@change="onConfirm" @cancel="hidePicker">
		</t-date-time-picker>
		{{visible}}
		<t-button  @tap="test">按钮</t-button>
    </view>
</template>
<script setup lang="ts" name="more">
import { operateFile } from '@/hooks/more/operateFile'
import { onPullDownRefresh } from "@dcloudio/uni-app";
let videoRef = ref(null)
let videoContext = ref(null)
let lastCurrent = ref('0');

let visible = ref(false)

const { picList, videoList, uploadFile, uploadVideo, percentCompleted, getFileList, previewPicture, deletePicture, inputDialog, inputClose, dialogInputConfirm } = operateFile()
onMounted(() => {
    getFileList()
})
onPullDownRefresh(
    () => {
        getFileList()
    }
)
function test() {
	visible.value = true
}
function hidePicker() {
    visible.value = false
}
function onConfirm(date: any) {
	console.log(date);
    visible.value = false
}
function changeVideo(e) {
    console.log(e);
    videoContext.value = uni.createVideoContext(lastCurrent.value);//创建视频实例指向video
    videoContext.value.pause()
    lastCurrent.value = String(e.detail.current)
    console.log('________lastCurrent____________');

    console.log(lastCurrent.value);

    videoContext.value = uni.createVideoContext(String(e.detail.current));//创建视频实例指向video
    videoContext.value.play()
}
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
</style>
