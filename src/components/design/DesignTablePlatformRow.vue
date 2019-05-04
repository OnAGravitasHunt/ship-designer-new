<template>
  <div class="design-row" :style="gridColumns">
    <div class="design-row-cell">Platform</div>
    <div class="design-row-cell">{{moduleName}}</div>
    <div class="design-row-cell double-right">–</div>
    <div v-for="n in 16" :key="n" class="design-row-cell"></div>
  </div>
</template>

<script>
export default {
  name: 'DesignTablePlatformRow',
  computed: {
    moduleName: {
      get () {
        return this.$store.state.design.platform
      },
      set (val) {
        // commit
      }
    },
    // styles
    gridColumns () {
      return this.$store.getters.getGridCols
    }
  }
}
</script>

<style scoped>
.design-row {
  background-color: lightblue;
  flex: 0 0 32px;
  z-index: 4;
  display: grid;
  grid-template-rows: 32px;
  width: 100vw;
  min-width: 1390px;
}
.design-row-cell {
  line-height: 30px;
  font-size: 10pt;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  background-color: inherit;
  text-align: center;
}
.design-row-cell:first-child {
  border-left: 1px solid black;
}
.double-right {
  border-right: 3px double black;
}
</style>
