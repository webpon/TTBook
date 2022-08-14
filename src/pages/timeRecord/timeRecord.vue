<template>
  <view class="charts-box flex items-center flex-col" v-if="hasUserName">
    <qiun-data-charts type="column" :opts="opts" :chartData="chartData" :ontouch="true" />
    <view class="bg-blue-200 w-90vw rounded-20rpx p-20rpx">
      <view class="leading-70rpx">
        <span class="text-purple-600">学习总时长：</span>{{timeTotal}}小时
      </view>
      <view class="leading-70rpx">
        <span class="text-purple-600">学习平均时长：</span>{{averageTime}}小时
      </view>
    </view>
  </view>
  <view v-else>
    请输入您的昵称！
  </view>
</template>

<script>
export default {
  data() {
    return {
      chartData: {},
      opts: {
        color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
        padding: [30, 30, 10, 10],
        touchMoveLimit: 24,
        enableScroll: true,
        legend: {},
        // rotate: true,
        xAxis: {
          disableGrid: true,
          scrollShow: true,
          itemCount: 5
        },
        yAxis: {
          data: [
            {
              min: 0
            }
          ]
        },
        extra: {
          column: {
            type: "group",
            width: 30,
            activeBgColor: "#000000",
            activeBgOpacity: 0.08
          }
        }
      },
      hasUserName: ''
    };
  },
  computed: {
    timeTotal() {
      const timeList = this.chartData.series?.[0].data || []
      return timeList.reduce((prev, item) => prev + Number(item), 0).toFixed(1)
    },
    averageTime() {
      const timeList = this.chartData.series?.[0].data || []
      return (timeList.reduce((prev, item) => prev + Number(item), 0) / timeList.length).toFixed(1)
    }
  },
  onShow() {
    this.hasUserName = uni.getStorageSync('username')
    if (this.hasUserName) {
      this.getServerData();
    }
  },
  methods: {
    getServerData() {
      uni.request({
        url: "https://8f2ad662-66cb-4a7c-8fa5-e7e9e2c18047.bspapp.com/http/mytest/getDayRecord",
        data: {
          username: uni.getStorageSync("username"),
        },
        success: (res) => {
          let dataList = {
            categories: res.data.dayRecordLine.map(item => {
              const arr = item.split('-')
              return arr[1] + '-' + arr[2]
            }),
            series: [
              {
                name: "每天学习时长",
                data: res.data.dayRecordValue,
              }
            ]
          };
          
          this.chartData = JSON.parse(JSON.stringify(dataList));
        },
        fail: (err) => {
          console.log(err);
        }
      });
    },
  }
};
</script>

<style scoped lang="scss">
.charts-box {
  width: 100%;
  height: 40vh;
}
</style>