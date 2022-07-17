import { ref, computed } from "vue";

const week_constant = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];
export function countDown() {
  // 当前时间时间戳
  let nowTime = ref(Date.now());
  // 当前月
  let nowMonth = ref(new Date().getMonth() + 1);
  // 当前月的几号
  let nowDay = ref(new Date().getDate());
  let weekDay = ref(week_constant[new Date().getDay()]);
  let currentTime = ref(
    new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds()
  );
  let endTime = ref(Date.parse("2022/12/25 00:00"));
  // 剩余天数
  let countDownDay = computed(() => {
    return Math.trunc((endTime.value - nowTime.value) / 86400000);
  });
  let countDownHours = computed(() => {
    return Math.trunc(
      (endTime.value - nowTime.value - countDownDay.value * 86400000) / 3600000
    );
  });
  let countDownMinute = computed(() => {
    return Math.trunc(
      (endTime.value -
        nowTime.value -
        countDownDay.value * 86400000 -
        countDownHours.value * 3600000) /
        60000
    );
  });
  let countDownSecond = computed(() => {
    return Math.trunc(
      (endTime.value -
        nowTime.value -
        countDownDay.value * 86400000 -
        countDownHours.value * 3600000 -
        countDownMinute.value * 60000) /
        1000
    );
  });

  let fullTime = endTime.value - 1655481600000;
  let overTime = endTime.value - nowTime.value;

  let countDownProcess = ref(((overTime / fullTime) * 100).toFixed(1));

  function downCalculate() {
    setInterval(() => {
      let seconds = new Date().getSeconds();
      let minutes = new Date().getMinutes();
      currentTime.value =
        new Date().getHours() +
        ":" +
        minutes +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds);
      nowTime.value = Date.now();
    }, 1000);
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
    countDownProcess,
  };
}
