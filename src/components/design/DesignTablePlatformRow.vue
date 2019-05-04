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
  flex: 0 0 32px;
  display: grid;
  grid-template-rows: 32px;
}
.design-row-cell {
  line-height: 30px;
  font-size: 10pt;
  border-right: 1px solid grey;
  border-bottom: 1px solid grey;
  background-color: inherit;
  text-align: center;
}
.design-row-cell:first-child {
  border-left: 1px solid grey;
}
.double-right {
  border-right: 3px double grey;
}
</style>
