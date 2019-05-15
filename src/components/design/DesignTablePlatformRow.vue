<template>
  <div class="design-row" :style="[gridColumns, zIndex]">
    <div class="design-row-cell">Platform</div>
    <div class="design-row-cell">-</div>
    <div
      class="design-row-cell"
      :class="{ 'high-z': highZ }"
      :style="[zIndex]"
    >
      <v-select
        class="module-selector"
        v-model="moduleName"
        :clearable="false"
        :options="[...permittedPlatforms.map(m => m.name)]"
      />
    </div>
    <div class="design-row-cell double-right">–</div>
    <div v-for="n in 16" :key="n" class="design-row-cell"></div>
  </div>
</template>

<script>
export default {
  name: 'DesignTablePlatformRow',
  data () {
    return {
      highZ: false
    }
  },
  computed: {
    moduleName: {
      get () {
        return this.$store.state.design.platform
      },
      set (name) {
        this.$store.dispatch('setPlatform', { name })
      }
    },
    permittedPlatforms () {
      return this.$store.getters.currentPlatforms
    },
    // styles
    gridColumns () {
      return this.$store.getters.getGridCols
    },
    zIndex () {
      return {
        zIndex: 2000
      }
    }
  }
}
</script>

<style scoped>
.design-row {
  flex: 0 0 32px;
  display: grid;
  grid-template-rows: 31px;
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
/* .high-z {
  z-index: 100;
} */
</style>
