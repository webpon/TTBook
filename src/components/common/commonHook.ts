import { ref } from "vue";
import useStore from '@/store/index'
const store = useStore()
const username = store.username

export function registerHook(getRecordList: Function) {
  let inputDialog = ref(null);
  let closeFlag = ref(true);
  let registerError = ref(null);
  function isRegister() {
    if (!username) {
      inputDialog.value.open();
    }
  }
  function dialogInputConfirm(val: string) {
    const valLength: Number = val.trim().length;
    if (valLength === 0 || valLength > 16) {
      registerError.value.open();
    } else {
      closeFlag.value = false;
      store.updateName(val)
      getRecordList();
    }
  }
  return {
    registerError,
    closeFlag,
    inputDialog,
    isRegister,
    dialogInputConfirm,
  };
}
