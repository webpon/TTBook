"use strict";
var common_vendor = require("../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "customView",
  props: {
    style: {
      type: String
    }
  },
  setup(__props) {
    const props = __props;
    console.log();
    console.log(props.style);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.s(__props.style)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/test/vue3-vite-uniapp/src/components/customView.vue"]]);
wx.createComponent(Component);
