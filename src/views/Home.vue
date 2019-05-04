<template>
  <div class="home">
    <ul>
      <li>Design 1</li>
      <li>Design 2</li>
    </ul>
    <button type="button" @click="createNew">Create new design</button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  methods: {
    createNew () {
      this.$router.push('create')
    }
  }
}
</script>

<style>
.home {
  text-align: left;
}

ul {
  list-style-type: none;
}
</style>
