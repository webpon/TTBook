"use strict";
var common_vendor = require("../common/vendor.js");
var record = common_vendor.defineStore({
  id: "record",
  state: () => {
    return {
      selected: []
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
})();
exports.record = record;
