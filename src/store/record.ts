export default defineStore({
    id: 'record',
    state: () => {
      return {
        selected: []
      }
    },
    getters: {
      fullName: (state) => {
        return state.name + '丰'
      },
    },
    actions: {
      updateName(name: string) {
        this.name = name
     },
    },
  })()
   