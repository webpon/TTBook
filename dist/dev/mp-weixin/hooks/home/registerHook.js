"use strict";
var common_vendor = require("../../common/vendor.js");
function registerHook(getRecordList) {
  let inputDialog = common_vendor.ref(null);
  let closeFlag = common_vendor.ref(true);
  let registerError = common_vendor.ref(null);
  function isRegister() {
    if (!common_vendor.index.getStorageSync("username")) {
      inputDialog.value.open();
    }
  }
  function dialogInputConfirm(val) {
    const valLength = val.trim().length;
    if (valLength === 0 || valLength > 16) {
      registerError.value.open();
    } else {
      closeFlag.value = false;
      console.log(closeFlag.value);
      common_vendor.index.setStorageSync("username", val);
      getRecordList();
    }
  }
  return {
    isRegister,
    registerError,
    closeFlag,
    inputDialog,
    dialogInputConfirm
  };
}
exports.registerHook = registerHook;
