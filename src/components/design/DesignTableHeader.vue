<template>
  <div class="design-header" :style="gridColumns">
    <div class="design-header-cell">Slot Type</div>
    <div class="design-header-cell">Name</div>
    <div class="design-header-cell double-right">Tech Tier</div>
    <div class="design-header-cell">Module Type</div>
    <div class="design-header-cell">Module Slot</div>
    <div class="design-header-cell">C{{stats.c}}</div>
    <div class="design-header-cell">S{{stats.s}}</div>
    <div class="design-header-cell">H{{stats.h}}</div>
    <div class="design-header-cell">L{{stats.l}}</div>
    <div class="design-header-cell">P{{stats.p}}</div>
    <div class="design-header-cell">E{{stats.e}}</div>
    <div class="design-header-cell">R{{stats.r}}</div>
    <div class="design-header-cell">+{{stats.ev}}% Ev</div>
    <div class="design-header-cell">+{{stats.pen}}% Pen</div>
    <div class="design-header-cell">{{stats.br}}BR</div>
    <div class="design-header-cell">{{stats.sr}}SR</div>
    <div class="design-header-cell">{{stats.o}}O</div>
    <div class="design-header-cell">{{stats.en}}EN</div>
    <div class="design-header-cell">{{stats.t}}T</div>
  </div>
</template>

<script>
export default {
  name: 'DesignTableHeader',
  computed: {
    // hardcoded stats for now
    stats () {
      return this.$store.getters.totalStats
    },
    costs () {
      return {
        br: 105,
        sr: 75,
        o: 2,
        en: 3,
        t: 3
      }
    },
    gridColumns () {
      return this.$store.getters.getGridCols
    }
  }
}
</script>

<style scoped>
.design-header {
  background-color: lightpink;
  flex: 0 0 30px;
  z-index: 4;
  display: grid;
  grid-template-rows: 30px;
  width: 100vw;
  min-width: 1390px;
  border-bottom: 2px solid black;
  border-top: 2px solid black;
}
.design-header-cell {
  line-height: 30px;
  font-size: 10pt;
  background-color: inherit;
  text-align: center;
  border-right: 1px solid grey;
}
.design-header-cell:first-child {
  border-left: 1px solid grey;
}
.double-right {
  border-right: 3px double grey;
}
</style>
