<template>
  <div class="design-row" :style="gridColumns">
    <div class="design-row-cell">{{slotType}}</div>
    <div class="design-row-cell">{{moduleName}}</div>
    <div class="design-row-cell">{{slot.techTier}}</div>
    <div class="design-row-cell">{{component.type}}</div>
    <div class="design-row-cell">{{component.slot}}</div>
    <div class="design-row-cell">{{stats.c}}</div>
    <div class="design-row-cell">{{stats.s}}</div>
    <div class="design-row-cell">{{stats.h}}</div>
    <div class="design-row-cell">{{stats.l}}</div>
    <div class="design-row-cell">{{stats.p}}</div>
    <div class="design-row-cell">{{stats.e}}</div>
    <div class="design-row-cell">{{stats.r}}</div>
    <div class="design-row-cell">{{stats.ev}}%</div>
    <div class="design-row-cell">{{stats.pen}}%</div>
    <div class="design-row-cell">{{costs.br}}</div>
    <div class="design-row-cell">{{costs.sr}}</div>
  </div>
</template>

<script>
export default {
  name: 'DesignTableHeader',
  props: {
    slotType: String,
    slotIndex: Number
  },
  computed: {
    moduleName: {
      get () {
        return this.slot.module
      },
      set (val) {
        // commit
      }
    },
    slot () {
      return this.$store.state.design.slots[this.slotIndex]
    },
    stats () {
      return this.component.stats
    },
    costs () {
      return this.component.costs
    },
    component () {
      return this.$store.state.library.parts.filter(part => part.name === this.moduleName)[0]
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
  overflow: hidden;
  width: 100vw;
  min-width: 1350px;
}
.design-row-cell {
  line-height: 30px;
  font-size: 11pt;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  background-color: inherit;
  text-align: center;
}
.design-row-cell:first-child {
  border-left: 1px solid black;
}
</style>
