<template>
  <div class="design-header" :style="gridColumns">
    <div class="design-header-cell">Slot Type</div>
    <div class="design-header-cell">Refit</div>
    <div class="design-header-cell" ref="col2">Name</div>
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
    <div class="design-header-cell">{{displayEvasion}} Ev</div>
    <div class="design-header-cell">{{displayPenetration}} Pen</div>
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
    stats () {
      return { ...this.$store.getters.totalStats, br: this.br }
    },
    br () {
      return this.$store.getters.weights.design / 10 + this.$store.getters.totalStats.br
    },
    gridColumns () {
      return this.$store.getters.getGridCols
    },
    col2Width: {
      get () {
        return this.$store.state.ui.designTable.col2Width
      },
      set (w) {
        this.$store.commit('setCol2Width', w)
      }
    },
    // display strings
    displayEvasion () {
      return `${Math.round(this.stats.ev * 1000) / 10}%`
    },
    displayPenetration () {
      return `${Math.round(this.stats.pen * 1000) / 10}%`
    }
  },
  methods: {
    handleResize () {
      this.col2Width = this.$refs.col2.clientWidth
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
