<template>
  <h1>I am rendered on the {{ renderedOn }} side</h1>
</template>

<script>
export default {
  asyncData() {
    return { renderedOn: process.client ? 'client' : 'server' }
  }
}
</script>
