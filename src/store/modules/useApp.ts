interface LayoutModel {
  layout: {
    mode: 'side' | 'mix' | 'top'
  }
}

export default defineStore('app', {
  state(): LayoutModel {
    return {
      layout: {
        mode: 'mix',
      },
    }
  },
})
