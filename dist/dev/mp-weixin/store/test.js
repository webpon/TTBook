"use strict";
var common_vendor = require("../common/vendor.js");
var useStore = common_vendor.defineStore({
  id: "test",
  state: () => {
    return {
      name: "\u5F20\u4E09",
      token: "token..."
    };
  },
  getters: {
    fullName: (state) => {
      return state.name + "\u4E30";
    }
  },
  actions: {
    updateName(name) {
      this.name = name;
    }
  }
});
exports.useStore = useStore;
