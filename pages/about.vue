<template>
  <h1>About</h1>
</template>

<script>
export default {
  data() {
    console.log('data / server: ' + process.server)
    return {
      value: ''
    }
  },
  asyncData() {
    console.log('asyncData / server: ' + process.server)
  },
  fetch() {
    console.log('fetch / server: ' + process.server)
  },
  beforeCreate() {
    console.log('beforeCreate / server: ' + process.server)
  },
  created() {
    console.log('created / server: ' + process.server)
  },
  beforeMount() {
    console.log('beforeMount / server: ' + process.server)
  },
  mounted() {
    console.log('mounted / server: ' + process.server)
  }
}
</script>
