<template>
  <div class="home">
    <!-- <div class="logo">logo</div> -->
    <div class="head">Starfleet Ship Design Bureau</div>
    <!-- <div class="nav">NAV</div> -->
    <div class="main">
      <DesignList/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import DesignList from '@/components/designList/DesignList'

export default {
  name: 'home',
  components: {
    DesignList
  },
  methods: {
    createNew () {
      this.$router.push('create')
    }
  }
}
</script>

<style>
.home {
  height: 100vh;
  display: grid;
  grid-template-columns: 160px 1fr;
  grid-template-rows: 100px 1fr;
}
.logo {
  line-height: 100px;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}
.head {
  grid-column: 1/3;
  border-bottom: 1px solid black;
  line-height: 100px;
  font-size: 36pt;
  font-weight: bold;
}
.main {
  grid-column: 1/3;
}
.nav {
  border-right: 1px solid black;
}
</style>
