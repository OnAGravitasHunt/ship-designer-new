<template>
  <div class="design-header" :style="gridColumns">
    <component
      v-for="col of columns"
      :key="col.key"
      :is="col.headingComp"
      v-bind="{ title: col.title, value: stats[col.key] }"
      :class="{ 'double-right': col.border }"
    />
    <div></div>
  </div>
</template>

<script>
import HeaderCell from './cells/header/HeaderCell'
import StatHeaderCell from './cells/header/StatHeaderCell'
import PercentHeaderCell from './cells/header/PercentHeaderCell'
import CostHeaderCell from './cells/header/CostHeaderCell'

export default {
  name: 'DesignTableHeader',
  components: {
    HeaderCell,
    StatHeaderCell,
    PercentHeaderCell,
    CostHeaderCell
  },
  computed: {
    columns () {
      return this.$store.state.ui.designTable.columns
    },
    stats () {
      return { ...this.$store.getters.totalStats, br: this.br }
    },
    br () {
      return Math.ceil(this.$store.getters.weights.design / 10 + this.$store.getters.totalStats.br)
    },
    gridColumns () {
      let g = { ...this.$store.getters.getGridTemplateColumns }
      g.gridTemplateColumns += ' 4px'
      return g
    },
    col2Width: {
      get () {
        return this.$store.state.ui.designTable.col2Width
      },
      set (w) {
        this.$store.commit('setCol2Width', w)
      }
    }
  },
  methods: {
    handleResize () {
      this.col2Width = this.$el.childNodes[2].clientWidth
    }
  },
  mounted () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
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
  min-width: 1365px;
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
