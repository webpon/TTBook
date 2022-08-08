export function operateVideo() {
  let videoList = ref([]);
  let maxVideoFlag = ref(5);
  let videoContext = ref(null);
  let lastCurrent = ref("0");
  // 已观看的视频栈
  let backStackVideo = ref([]);
  // 新加载的视频队列
  let frontQueueVideo = ref([]);
  let circular = ref(false);
  // 上传视频
  function uploadVideo(fileObj) {
    videoList.value.push(fileObj.tempFilePaths);
    if (!fileObj.tempFiles[0].url) {
      return;
    }
    uni.request({
      method: "post",
      url: "https://8f2ad662-66cb-4a7c-8fa5-e7e9e2c18047.bspapp.com/http/mytest/addVideo",
      data: {
        ...fileObj.tempFiles[0],
      },
      success: (res) => {
        //   video.value = 0;
        //   getFileList();
        // continuityClock.value = res.data.recordLength;
      },
    });
  }
  async function changeVideo(e) {
    const current = e.detail.current
    console.log('current:', current);
    
    if (e.detail.current >= 2 || backStackVideo.value.length || frontQueueVideo.value.length) {
        circular.value = true 
      if (e.detail.current > lastCurrent.value  ||
        (e.detail.current === 0 && Number(lastCurrent.value) === 4)) {
        console.log("上划视频");
        const videoData = (await syncGetVideo(maxVideoFlag.value, 1)).data.data[0];
        frontQueueVideo.value.push(videoData)
        console.log(videoData);
        
        maxVideoFlag.value = maxVideoFlag.value + 1;
        videoList.value[current >= 2 ? current - 2 : current + 3] = videoData
        console.log(current >= 2 ? current - 2 : current + 3);
        
        // 上划视频
      } else {
        console.log("下划视频");
        // 下划视频
      }
    }
    videoContext.value = uni.createVideoContext(lastCurrent.value); //创建视频实例指向video
    videoContext.value.pause();
    lastCurrent.value = String(e.detail.current);
    videoContext.value = uni.createVideoContext(String(e.detail.current)); //创建视频实例指向video
    videoContext.value.play();
  }
  function syncGetVideo(skip: number, limit: number) {
    return new Promise((resolve, reject) => {
      uni.request({
        url: "https://8f2ad662-66cb-4a7c-8fa5-e7e9e2c18047.bspapp.com/http/mytest/getTermVideos",
        data: {
          limit,
          skip,
        },
        success: (res: any) => {
          resolve(res);
        },

        fail: (err) => {
          reject(err);
        },
      });
    });
  }
  function getTermVideo(skip: number, limit: number) {
    uni.request({
      url: "https://8f2ad662-66cb-4a7c-8fa5-e7e9e2c18047.bspapp.com/http/mytest/getTermVideos",
      data: {
        limit,
        skip,
      },
      success: (res: any) => {
        videoList.value = res.data.data;
      },
      fail: (err) => {
        console.log(err);
      },
    });
  }

  return {
    videoList,
    lastCurrent,
    circular,
    changeVideo,
    uploadVideo,
    getTermVideo,
  };
}
