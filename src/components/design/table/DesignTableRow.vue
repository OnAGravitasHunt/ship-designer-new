<template>
  <div
    class="design-row"
    :class="{ divider, 'user-divider': userDivider }"
    :style="[gridColumns, zIndex]"
  >
    <component v-for="col of columns" :key="col.key" :is="col.tableComp" :rowIndex="slotIndex" :columnKey="col.key"/>
  </div>
</template>

<script>
import SlotTableCell from './cells/row/SlotTableCell'
import RefitTableCell from './cells/row/RefitTableCell'
import NameTableCell from './cells/row/NameTableCell'
import TierTableCell from './cells/row/TierTableCell'
import TableCell from './cells/row/TableCell'
import StatTableCell from './cells/row/StatTableCell'
import PercentTableCell from './cells/row/PercentTableCell'

export default {
  name: 'DesignTableRow',
  components: {
    SlotTableCell,
    RefitTableCell,
    NameTableCell,
    TierTableCell,
    TableCell,
    StatTableCell,
    PercentTableCell
  },
  props: {
    slotIndex: Number,
    divider: Boolean
  },
  computed: {
    userDivider () {
      return this.slot.userDivider && !this.divider
    },
    slot () {
      return this.$store.state.design.slots[this.slotIndex]
    },
    columns () {
      return this.$store.state.ui.designTable.columns
    },
    // styles
    gridColumns () {
      return this.$store.getters.getGridTemplateColumns
    },
    zIndex () {
      return {
        zIndex: 1000 - this.slotIndex
      }
    }
  }
}
</script>

<style scoped>
.design-row {
  flex: 0 0 32px;
  z-index: 4;
  display: grid;
  grid-template-rows: 30px;
  border-bottom: 1px solid grey;
  z-index: 0;
}
.divider {
  border-bottom: 3px double black;
}
.user-divider {
  border-bottom: 2px solid black;
}
.design-row-cell {
  box-sizing: border-box;
  line-height: 30px;
  font-size: 9pt;
  border-right: 1px solid grey;
  background-color: inherit;
  text-align: center;
  z-index: 0;
}
.design-row-cell:first-child {
  border-left: 1px solid grey;
}
.is-refit {
  font-weight: bold;
  background-color: mediumturquoise;
}
</style>
