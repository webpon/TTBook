import { ref } from "vue";
export function registerHook(getRecordList: Function) {
  let inputDialog = ref(null);
  let closeFlag = ref(true);
  let registerError = ref(null);
  function isRegister() {
    if (!uni.getStorageSync("username")) {
      inputDialog.value.open();
    }
  }
  function dialogInputConfirm(val: string) {
    const valLength: Number = val.trim().length;
    if (valLength === 0 || valLength > 16) {
      registerError.value.open();
    } else {
      closeFlag.value = false
      console.log(closeFlag.value);
      
      uni.setStorageSync("username", val);
      getRecordList();
    }
  }
  return {
    isRegister,
    registerError,
    closeFlag,
    inputDialog,
    dialogInputConfirm,
  };
}
