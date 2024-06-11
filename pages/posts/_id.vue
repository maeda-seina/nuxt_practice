<script>
export default {
  async asyncData({ params, $http, error }) {
    const id = params.id

    try {
      const post = await $http.$get(`https://api.nuxtjs.dev/posts/${id}`)
      return { post }
    } catch (e) {
      error(e)
    }
  }
}
</script>
