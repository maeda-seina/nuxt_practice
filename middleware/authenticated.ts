export default {
  middleware({ store, redirect }) {
    const isAuthenticated = store.state.authenticated
    if (!isAuthenticated) {
      return redirect('/login')
    }
  }
}
