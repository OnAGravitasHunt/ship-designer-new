<template>
  <div class="home">
    <!-- <div class="logo">logo</div> -->
    <div class="head">Starfleet Ship Design Bureau</div>
    <div class="version">v{{appVersion}}</div>
    <!-- <div class="nav">NAV</div> -->
    <div class="main">
      <DesignList/>
      <PartsLists/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import DesignList from '@/components/designList/DesignList'
import PartsLists from '@/components/partsLists/PartsLists'

export default {
  name: 'home',
  components: {
    DesignList,
    PartsLists
  },
  methods: {
    createNew () {
      this.$router.push('create')
    }
  },
  computed: {
    appVersion () {
      return process.env.VUE_APP_VERSION
    }
  }
}
</script>

<style>
.home {
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 160px;
  grid-template-rows: 100px 1fr;
}
.logo {
  line-height: 100px;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}
.head {
  /* grid-column: 1/3; */
  padding-left: 160px;
  border-bottom: 1px solid black;
  line-height: 100px;
  font-size: 30pt;
  font-weight: bold;
}
@media only screen and (max-width:860px) {
  .head {
    font-size: 20pt;
    /* line-height: 50px; */
  }
}
@media only screen and (max-width:680px) {
  .head {
    /* font-size: 20pt; */
    line-height: 50px;
  }
}
.version {
  border-bottom: 1px solid black;
  text-align: right;
  padding: 2px 5px 0 0;
}
.main {
  grid-column: 1/3;
  overflow-y: auto;
  padding: 20px 0;
}
.nav {
  border-right: 1px solid black;
}
</style>
