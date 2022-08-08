export function operateFile() {
  let picList = ref([]);
  let videoList = ref([]);
  let maxVideoFlag = ref(5);
  let minVideoFlag = ref(0);
  let percentCompleted = ref([0]);
  let videoContext = ref(null);
  let lastCurrent = ref("0");
  let videoFlag = ref(false);
  let backStackVideo = ref([]);
  let frontStackVideo = ref([]);
  let circular = ref(false);

  let picListUrl = computed(() => {
    return [
      ...picList.value.map((item) => {
        return item.fileID;
      }),
    ];
  });
  let currentId = computed(() => {
    return videoList[0] || "";
  });
  function uploadFile() {
    uni.chooseImage({
      count: 1,
      async success(res) {
        if (res.tempFilePaths.length > 0) {
          let filePath = res.tempFilePaths[0];
          // callback方式，与promise方式二选一即可
          uniCloud.uploadFile({
            filePath: filePath,
            cloudPath: "a.jpg",
            onUploadProgress: function (progressEvent) {
              percentCompleted.value = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
            },
            success(res) {
              uni.request({
                method: "post",
                url: "https://8f2ad662-66cb-4a7c-8fa5-e7e9e2c18047.bspapp.com/http/mytest/addFile",
                data: {
                  fileID: res.fileID,
                  name: `${res.fileID}.jpg`,
                },
                success: (res) => {
                  percentCompleted.value = 0;
                  getFileList();
                  // continuityClock.value = res.data.recordLength;
                },
              });
            },
            fail() {},
            complete() {},
          });
        }
      },
    });
  }
  function previewPicture(fileID: string) {
    uni.previewImage({
      current: fileID, // 当前显示图片的http链接
      urls: picListUrl.value, // 需要预览的图片http链接列表
    });
  }
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
  function changeVideo(e) {
    if (
      e.detail.current >= 2 ||
      (videoFlag.value === true && maxVideoFlag.value >= 5)
    ) {
      videoFlag.value = true;
      if (
        e.detail.current > lastCurrent.value ||
        (e.detail.current === 0 && Number(lastCurrent.value) === 4)
      ) {
        console.log("上划视频");
        // 上划视频
        getTermVideo(maxVideoFlag.value, 1, "up", e.detail.current);
      } else {
        console.log("下滑视频");
        // 下划视频
        getTermVideo(minVideoFlag.value, 1, "down", e.detail.current);
      }
    }
    videoContext.value = uni.createVideoContext(lastCurrent.value); //创建视频实例指向video
    videoContext.value.pause();
    lastCurrent.value = String(e.detail.current);

    videoContext.value = uni.createVideoContext(String(e.detail.current)); //创建视频实例指向video
    videoContext.value.play();
  }
  // 获取图片
  function getFileList() {
    uni.showLoading({
      title: "加载中",
    });
    uni.request({
      url: "https://8f2ad662-66cb-4a7c-8fa5-e7e9e2c18047.bspapp.com/http/mytest/getAllPicture",
      success: (res: any) => {
        picList.value = res.data.data;
        uni.stopPullDownRefresh();
        uni.hideLoading();
      },
      fail: (err) => {
        console.log(err);
      },
    });
  }
  //删除图片
  function deletePicture(fileID) {
    uni.showActionSheet({
      itemColor: "#FF0000",
      itemList: ["删除图片"],
      success: function () {
        uni.request({
          method: "post",
          url: "https://8f2ad662-66cb-4a7c-8fa5-e7e9e2c18047.bspapp.com/http/mytest/delFile",
          data: {
            fileID,
          },
          success: (res: any) => {
            getFileList();
          },
          fail: (err) => {
            console.log(err);
          },
        });
      },
      fail: function (res) {
        console.log(res.errMsg);
      },
    });
  }
  function syncGetVideo() {
    return new Promise((resolve, reject) => {
        uni.request({
            url: "https://8f2ad662-66cb-4a7c-8fa5-e7e9e2c18047.bspapp.com/http/mytest/getAllVideos",
            success: (res: any) => {
                resolve(res)
            },
            fail: (err) => {
              reject(err)
            },
        });
    })
  }
  function getTermVideo(
    skip: number,
    limit: number,
    flag: string,
    current: number
  ) {
    uni.request({
      url: "https://8f2ad662-66cb-4a7c-8fa5-e7e9e2c18047.bspapp.com/http/mytest/getTermVideos",
      data: {
        limit,
        skip,
      },
      success: (res: any) => {
        if (videoList.value.length > 2 && flag === "up") {
        //   maxVideoFlag.value = maxVideoFlag.value + 1;
        //   if (res.data.data[0]) {
            
            if (frontStackVideo.value.length) {
                videoList.value[current >= 2 ? current - 2 : current + 3] = frontStackVideo.value.shift()
            } else {
                backStackVideo.value.push(
                    videoList.value[current >= 2 ? current - 2 : current + 3]
                  ); 
                videoList.value[current >= 2 ? current - 2 : current + 3] =
               res.data.data[0];
               maxVideoFlag.value = maxVideoFlag.value + 1;
            }
            
        //   }
        } else if (flag === "down") {
          const lastVideo = backStackVideo.value.pop();
          console.log('******************');
          console.log(current >= 1 ? current - 1 : 0);
          
          
          
          if (lastVideo) {
            frontStackVideo.value.push(videoList.value[current >= 1 ? current - 1 : 0]);
            videoList.value[current >= 1 ? current - 1 : 0] = lastVideo;
            // maxVideoFlag.value = maxVideoFlag.value - 1;
          }
        } else {
          videoList.value = res.data.data;
        }
        if (backStackVideo.value.length === 0) {
          circular.value = false;
        } else {
          circular.value = true;
        }

        console.log('_____________________');
        console.log(frontStackVideo.value);
        console.log(backStackVideo.value);
        console.log('++++++++++++++++');
        console.log(maxVideoFlag.value);
        
        
        
      },
      fail: (err) => {
        console.log(err);
      },
    });
  }
  
  
  async function hhh() {
    console.log('________________333_________________');
    console.log(await syncGetVideo());
    console.log('{{{{{{{{{{{{{{{{{{{{{');
    
  }
  hhh()
  return {
    picList,
    picListUrl,
    percentCompleted,
    videoList,
    lastCurrent,
    currentId,
    circular,
    changeVideo,
    uploadFile,
    getFileList,
    previewPicture,
    deletePicture,
    uploadVideo,
    getTermVideo,
  };
}
