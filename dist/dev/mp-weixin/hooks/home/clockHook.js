"use strict";
var common_vendor = require("../../common/vendor.js");
function getDate(date, AddDayCount = 0) {
  if (!date) {
    date = new Date();
  }
  if (typeof date !== "object") {
    date = date.replace(/-/g, "/");
  }
  const dd = new Date(date);
  dd.setDate(dd.getDate() + AddDayCount);
  const y = dd.getFullYear();
  const m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
  const d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
  return {
    fullDate: y + "-" + m + "-" + d,
    year: y,
    month: m,
    date: d,
    day: dd.getDay()
  };
}
function clockHook() {
  let continuityClock = common_vendor.ref("-");
  let coverStyle = common_vendor.ref("ransform: rotatey(0deg);");
  let backStyle = common_vendor.ref("");
  const info = common_vendor.reactive({
    selected: []
  });
  function getRecordList() {
    if (common_vendor.index.getStorageSync("username")) {
      common_vendor.index.request({
        url: "https://8f2ad662-66cb-4a7c-8fa5-e7e9e2c18047.bspapp.com/http/mytest",
        data: {
          username: common_vendor.index.getStorageSync("username")
        },
        success: (res) => {
          const arr = res.data.data;
          if (arr.findIndex((item) => item.date === getDate(new Date()).fullDate) === -1) {
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
        }
      });
    }
  }
  async function clockIn() {
    const value = JSON.parse(common_vendor.index.getStorageSync("record") || "[]") || [];
    value.push({
      date: getDate(new Date()).fullDate,
      info: "\u5DF2\u6253\u5361"
    });
    info.selected = value;
    common_vendor.index.request({
      method: "post",
      url: "https://8f2ad662-66cb-4a7c-8fa5-e7e9e2c18047.bspapp.com/http/mytest/add",
      data: {
        username: common_vendor.index.getStorageSync("username"),
        date: getDate(new Date()).fullDate,
        info: "\u5DF2\u6253\u5361"
      },
      success: (res) => {
        continuityClock.value = res.data.recordLength;
      }
    });
    coverStyle.value = "transform: rotatey(180deg);";
    backStyle.value = "transform: rotatey(0deg);";
  }
  function toRecord() {
    common_vendor.index.navigateTo({
      url: "/pages/subPage/record/cardRecord"
    });
  }
  return {
    getRecordList,
    continuityClock,
    coverStyle,
    backStyle,
    clockIn,
    toRecord
  };
}
exports.clockHook = clockHook;
