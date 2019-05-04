<template>
  <div class="design-header">
    <div class="design-header-cell">Slot Type</div>
    <div class="design-header-cell">Name</div>
    <div class="design-header-cell">Tech Tier</div>
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
    <div class="design-header-cell">{{costs.br}}BR</div>
    <div class="design-header-cell">{{costs.sr}}SR</div>
    <div class="design-header-cell">{{costs.o}}O</div>
    <div class="design-header-cell">{{costs.en}}EN</div>
    <div class="design-header-cell">{{costs.t}}T</div>
  </div>
</template>

<script>
export default {
  name: 'DesignTableHeader',
  computed: {
    // hardcoded stats for now
    stats () {
      return {
        c: 4.1,
        s: 4,
        h: 3,
        l: 5.2,
        p: 4.0,
        e: 8.6,
        r: 8,
        ev: 15,
        pen: 10
      }
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
  flex: 0 0 32px;
  z-index: 4;
  display: grid;
  grid-template-rows: 32px;
  overflow: hidden;
  width: 100vw;
  min-width: 1350px;
  border-bottom: 1px solid black;
}
.design-header-cell {
  line-height: 30px;
  font-size: 11pt;
  background-color: inherit;
  text-align: center;
  border-right: 1px solid black;
}
.design-header-cell:first-child {
  border-left: 1px solid black;
}
</style>
