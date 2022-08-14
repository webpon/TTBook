const username = uni.getStorageSync("username")
export default defineStore({
	id: 'test',
	state: () => {
	  return {
		username,
	  }
	},
	getters: {
	  fullName: (state) => {
		return ''
	  },
	},
	actions: {
	  updateName(name: string) {
		uni.setStorageSync("username", name);
		this.username = name
	 },
	},
  })
   