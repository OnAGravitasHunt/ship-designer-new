<template>
  <div class="design-row" :style="[gridColumns, zIndex]">
    <component
      v-for="col of columns"
      :key="col.key"
      :is="col.tableComp"
      :columnKey="col.key"
      :class="{ 'double-right': col.border }"
    />
  </div>
</template>

<script>
import Statblock from '@/lib/statblock'

import SlotTableCell from './cells/platformRow/SlotTableCell'
import RefitTableCell from './cells/platformRow/RefitTableCell'
import NameTableCell from './cells/platformRow/NameTableCell'
import TierTableCell from './cells/platformRow/TierTableCell'
import TableCell from './cells/platformRow/TableCell'
import StatTableCell from './cells/platformRow/StatTableCell'
import PercentTableCell from './cells/platformRow/PercentTableCell'

export default {
  name: 'DesignTablePlatformRow',
  components: {
    SlotTableCell,
    RefitTableCell,
    NameTableCell,
    TierTableCell,
    TableCell,
    StatTableCell,
    PercentTableCell
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
    defaultTier: {
      get () {
        return this.$store.state.design.defaultTier
      },
      set (t) {
        this.$store.commit('setDefaultTier', t)
      }
    },
    permittedPlatforms () {
      return this.$store.getters.currentPlatforms
    },
    columns () {
      return this.$store.state.ui.designTable.columns
    },
    stats () {
      let s = new Statblock(this.$store.getters.platformStats, 0, this.platformGrade, true)
      return s.processedStats
    },
    // styles
    gridColumns () {
      return this.$store.getters.getDesignTableColumns
    },
    zIndex () {
      return {
        zIndex: 2000
      }
    },
    selectedDivWidth () {
      return this.$store.state.ui.designTable.col2Width - 75
    },
    selectedDiv () {
      return { maxWidth: `${this.selectedDivWidth}px` }
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
  font-size: 9pt;
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
