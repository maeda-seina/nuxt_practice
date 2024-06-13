export const state = () => ({
  counter: 0
})

export const mutations = {
  increment(state) {
    state.counter++
  }
}

export const actions = {
  async nuxtServerInit() {
    console.log('nuxtServerInit / server: ' + process.server)
    const data = await fetch(
      'https://api.nuxtjs.dev/mountains'
    )
  }
}
