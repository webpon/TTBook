"use strict";
var common_vendor = require("../../../common/vendor.js");
var store_test = require("../../../store/test.js");
var store_record = require("../../../store/record.js");
if (!Array) {
  const _easycom_uni_calendar2 = common_vendor.resolveComponent("uni-calendar");
  _easycom_uni_calendar2();
}
const _easycom_uni_calendar = () => "../../../components/customUniUI/lib/uni-calendar/uni-calendar.js";
if (!Math) {
  _easycom_uni_calendar();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "cardRecord",
  setup(__props) {
    store_test.useStore();
    console.log(store_record.record);
    const info = common_vendor.reactive({
      selected: []
    });
    common_vendor.index.request({
      url: "https://8f2ad662-66cb-4a7c-8fa5-e7e9e2c18047.bspapp.com/http/mytest",
      data: {
        username: common_vendor.index.getStorageSync("username")
      },
      success: (res) => {
        console.log("_____________________");
        console.log(res.data.data);
        info.selected = res.data.data;
      },
      fail: (err) => {
        console.log(err);
      }
    });
    console.log(info.selected);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          selected: info.selected,
          ["start-date"]: "2022-1-1",
          ["end-date"]: "2022-12-30"
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/test/vue3-vite-uniapp/src/pages/subPage/record/cardRecord.vue"]]);
wx.createPage(MiniProgramPage);
