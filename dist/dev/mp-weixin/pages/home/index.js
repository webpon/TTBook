"use strict";
var common_vendor = require("../../common/vendor.js");
var hooks_home_countDown = require("../../hooks/home/countDown.js");
var hooks_home_clockHook = require("../../hooks/home/clockHook.js");
var hooks_home_registerHook = require("../../hooks/home/registerHook.js");
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_popup_message2)();
}
const _easycom_uni_popup_dialog = () => "../../components/customUniUI/lib/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../components/customUniUI/lib/uni-popup/uni-popup.js";
const _easycom_uni_popup_message = () => "../../components/customUniUI/lib/uni-popup-message/uni-popup-message.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_popup_message)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    let {
      weekDay,
      countDownProcess,
      countDownDay,
      countDownHours,
      countDownMinute,
      countDownSecond,
      nowMonth,
      nowDay,
      currentTime
    } = hooks_home_countDown.countDown();
    let {
      getRecordList,
      continuityClock,
      coverStyle,
      backStyle,
      clockIn,
      toRecord
    } = hooks_home_clockHook.clockHook();
    let { isRegister, registerError, inputDialog, dialogInputConfirm, closeFlag } = hooks_home_registerHook.registerHook(getRecordList);
    common_vendor.onShow(() => {
      getRecordList();
    });
    common_vendor.onMounted(() => {
      isRegister();
    });
    common_vendor.index.onKeyboardHeightChange((res) => {
      console.log(res.height);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(countDownDay)),
        b: common_vendor.t(common_vendor.unref(countDownHours)),
        c: common_vendor.t(common_vendor.unref(countDownMinute)),
        d: common_vendor.t(common_vendor.unref(countDownSecond)),
        e: common_vendor.t(`${common_vendor.unref(nowMonth)}-${common_vendor.unref(nowDay)}`),
        f: common_vendor.t(common_vendor.unref(currentTime)),
        g: common_vendor.unref(countDownProcess),
        h: common_vendor.t(common_vendor.unref(nowMonth)),
        i: common_vendor.t(common_vendor.unref(nowDay)),
        j: common_vendor.t(common_vendor.unref(weekDay)),
        k: common_vendor.t(common_vendor.unref(continuityClock)),
        l: common_vendor.o((...args) => common_vendor.unref(clockIn) && common_vendor.unref(clockIn)(...args)),
        m: common_vendor.s(common_vendor.unref(coverStyle)),
        n: common_vendor.t(common_vendor.unref(continuityClock)),
        o: common_vendor.o((...args) => common_vendor.unref(toRecord) && common_vendor.unref(toRecord)(...args)),
        p: common_vendor.s(common_vendor.unref(backStyle)),
        q: common_vendor.sr("inputClose", "5b685826-1,5b685826-0"),
        r: common_vendor.o(common_vendor.unref(dialogInputConfirm)),
        s: common_vendor.p({
          showClose: false,
          ["before-close"]: common_vendor.unref(closeFlag),
          mode: "input",
          title: "\u8BF7\u8F93\u5165\u4F60\u7684\u6635\u79F0",
          placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9"
        }),
        t: common_vendor.sr(inputDialog, "5b685826-0", {
          "k": "inputDialog"
        }),
        v: common_vendor.p({
          type: "dialog"
        }),
        w: common_vendor.p({
          type: "error",
          message: "\u8BF7\u6B63\u786E\u8F93\u5165\u4F60\u7684\u6635\u79F0\uFF01",
          duration: 2e3
        }),
        x: common_vendor.sr(registerError, "5b685826-2", {
          "k": "registerError"
        }),
        y: common_vendor.p({
          type: "message"
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5b685826"], ["__file", "D:/code/test/vue3-vite-uniapp/src/pages/home/index.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
