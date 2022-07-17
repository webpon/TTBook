import { ref, reactive } from "vue";
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
export function clockHook() {
  let continuityClock = ref("-");
  let coverStyle = ref("ransform: rotatey(0deg);");
  let backStyle = ref("");

  const info = reactive({
    selected: [],
  });

  function getRecordList() {
    if (uni.getStorageSync("username")) {
      uni.request({
        url: "https://8f2ad662-66cb-4a7c-8fa5-e7e9e2c18047.bspapp.com/http/mytest",
        data: {
          username: uni.getStorageSync("username"),
        },
        success: (res: any) => {
          const arr = res.data.data;
          if (
            arr.findIndex(
              (item: any) => item.date === getDate(new Date()).fullDate
            ) === -1
          ) {
            coverStyle.value = "transform: rotatey(0deg);";
            backStyle.value = "transform: rotatey(-180deg);";
          } else {
            coverStyle.value = "transform: rotatey(180deg);";
            backStyle.value = "transform: rotatey(0deg);";
          }
          continuityClock.value = arr.length;
        },
        fail: (err) => {
          console.log(err);
        },
      });
    }
  }
  async function clockIn() {
    const value = JSON.parse(uni.getStorageSync("record") || "[]") || [];
    value.push({
      date: getDate(new Date()).fullDate,
      info: "已打卡",
    });
    info.selected = value;
    uni.request({
      method: "post",
      url: "https://8f2ad662-66cb-4a7c-8fa5-e7e9e2c18047.bspapp.com/http/mytest/add",
      data: {
        username: uni.getStorageSync("username"),
        date: getDate(new Date()).fullDate,
        info: "已打卡",
      },
      success: (res) => {
        continuityClock.value = res.data.recordLength;
      },
    });
    coverStyle.value = "transform: rotatey(180deg);";
    backStyle.value = "transform: rotatey(0deg);";
  }
  function toRecord() {
    uni.navigateTo({
      url: "/pages/subPage/record/cardRecord",
    });
  }
  return {
    getRecordList,
    continuityClock,
    coverStyle,
    backStyle,
    clockIn,
    toRecord,
  };
}
