<template>
  <div>
    <header>Header Content</header>
    <div v-if="$nuxt.isOffline">You are offline</div>
    <nuxt />
    <footer>Footer Content</footer>
  </div>
</template>
