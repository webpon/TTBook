"use strict";
var common_vendor = require("../../common/vendor.js");
const week_constant = [
  "\u661F\u671F\u65E5",
  "\u661F\u671F\u4E00",
  "\u661F\u671F\u4E8C",
  "\u661F\u671F\u4E09",
  "\u661F\u671F\u56DB",
  "\u661F\u671F\u4E94",
  "\u661F\u671F\u516D"
];
function countDown() {
  let nowTime = common_vendor.ref(Date.now());
  let nowMonth = common_vendor.ref(new Date().getMonth() + 1);
  let nowDay = common_vendor.ref(new Date().getDate());
  let weekDay = common_vendor.ref(week_constant[new Date().getDay()]);
  let currentTime = common_vendor.ref(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds());
  let endTime = common_vendor.ref(Date.parse("2022/12/25 00:00"));
  let countDownDay = common_vendor.computed$1(() => {
    return Math.trunc((endTime.value - nowTime.value) / 864e5);
  });
  let countDownHours = common_vendor.computed$1(() => {
    return Math.trunc((endTime.value - nowTime.value - countDownDay.value * 864e5) / 36e5);
  });
  let countDownMinute = common_vendor.computed$1(() => {
    return Math.trunc((endTime.value - nowTime.value - countDownDay.value * 864e5 - countDownHours.value * 36e5) / 6e4);
  });
  let countDownSecond = common_vendor.computed$1(() => {
    return Math.trunc((endTime.value - nowTime.value - countDownDay.value * 864e5 - countDownHours.value * 36e5 - countDownMinute.value * 6e4) / 1e3);
  });
  let fullTime = endTime.value - 16554816e5;
  let overTime = endTime.value - nowTime.value;
  let countDownProcess = common_vendor.ref((overTime / fullTime * 100).toFixed(1));
  function downCalculate() {
    setInterval(() => {
      let seconds = new Date().getSeconds();
      let minutes = new Date().getMinutes();
      currentTime.value = new Date().getHours() + ":" + minutes + ":" + (seconds > 9 ? seconds : "0" + seconds);
      nowTime.value = Date.now();
    }, 1e3);
  }
  downCalculate();
  return {
    countDownDay,
    countDownHours,
    countDownMinute,
    countDownSecond,
    nowMonth,
    nowDay,
    weekDay,
    currentTime,
    countDownProcess
  };
}
exports.countDown = countDown;
