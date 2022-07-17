import { ref } from "vue";
export function registerHook(getRecordList: Function) {
  let inputDialog = ref(null);
  let closeFlag = ref(true);
  let registerError = ref(null);
  let show = ref(false)
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
      closeFlag.value = false;
      uni.setStorageSync("username", val);
      getRecordList();
    }
  }
  function change(e: any) {
    show.value = e.show
  }
  return {
    show,
    change,
    isRegister,
    registerError,
    closeFlag,
    inputDialog,
    dialogInputConfirm,
  };
}
