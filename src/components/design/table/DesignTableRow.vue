<template>
  <div
    class="design-row"
    :class="{ divider, 'user-divider': userDivider }"
    :style="[gridColumns, zIndex]"
  >
    <!-- Column 1: Slot type/rearrage -->
    <SlotTableCell :rowIndex="slotIndex" columnKey="slotType"/>
    <!-- Column 2: Refit checkbox -->
    <RefitTableCell :rowIndex="slotIndex" columnKey="refit"/>
    <!-- Column 3: Module Name -->
    <NameTableCell :rowIndex="slotIndex" columnKey="name"/>
    <!-- Column 4: Tech Tier -->
    <TierTableCell :rowIndex="slotIndex" columnKey="name"/>
    <!-- Column 5,6: Module Type, Slot -->
    <div class="design-row-cell">{{component.type}}</div>
    <div class="design-row-cell">{{component.slot}}</div>
    <component v-for="col of columns" :key="col.key" :is="col.tableComp" :rowIndex="slotIndex" :columnKey="col.key"/>
  </div>
</template>

<script>
import Statblock from '@/lib/statblock'

import SlotTableCell from './cells/SlotTableCell'
import RefitTableCell from './cells/RefitTableCell'
import NameTableCell from './cells/NameTableCell'
import TierTableCell from './cells/TierTableCell'
import TableCell from './cells/TableCell'
import StatTableCell from './cells/StatTableCell'
import PercentTableCell from './cells/PercentTableCell'

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
    slotType: String,
    slotIndex: Number,
    divider: Boolean,
    isInfra: Boolean
  },
  computed: {
    moduleName () {
      return this.slot.module
    },
    techTier: {
      get () {
        return this.slot.techTier
      },
      set (techTier) {
        this.$store.dispatch('setSlotProperties', {
          index: this.slotIndex,
          properties: { techTier }
        })
      }
    },
    userDivider: {
      get () {
        return this.slot.userDivider && !this.divider
      },
      set (userDivider) {
        if (!this.divider && !this.isInfra) {
          this.$store.dispatch('setSlotProperties', {
            index: this.slotIndex,
            properties: { userDivider }
          })
        }
      }
    },
    slot () {
      return this.$store.state.design.slots[this.slotIndex]
    },
    stats () {
      if (this.component.name) {
        let s = new Statblock(this.component.stats, this.techTier, this.platformGrade)
        return s.processedStats
      }
      return this.component.stats
    },
    component () {
      return this.$store.getters.partByName(this.moduleName) || this.nullModule
    },
    // data items
    nullModule () {
      return this.$store.state.library.nullModule
    },
    platformGrade () {
      return this.$store.state.design.platformGrade
    },
    // styles
    required () {
      return this.$store.getters.requiredSlot(this.slotIndex) && this.slotIndex > 4
    },
    gridColumns () {
      return this.$store.getters.getGridTemplateColumns
    },
    zIndex () {
      return {
        zIndex: 1000 - this.slotIndex
      }
    },
    selectedDivWidth () {
      return this.$store.state.ui.designTable.col2Width - 70
    },
    selectedDiv () {
      return { maxWidth: `${this.selectedDivWidth}px` }
    },
    // ------------
    // NEW STUFF
    // ------------
    columns () {
      return this.$store.state.ui.designTable.columns.slice(6)
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
.cell-main {
  height: 28px;
}
.handle {
  text-align: left;
  padding-left: 20px;
}
.rearrange {
  display: inline-block;
  transform: scale(2, 1)
}
.cell-footer {
  height: 3px;
  background-color: rgba(0.5, 0.5, 0.5, 0.5);
}
.cell-footer:hover {
  background-color: rgba(0, 0, 0, 0.8)
}
.required {
  background-color: lightgreen;
}
.double-right {
  border-right: 3px double grey;
}
.divider {
  border-bottom: 3px double black;
}
.user-divider {
  border-bottom: 2px solid black;
}
.tech-tier-input {
  box-sizing: border-box;
  outline: none;
  background-color: transparent;
  font-family: 'Avenir';
  width: 67px;
  font-size: 9pt;
  height: 30px;
  border: 1px solid rgba(60, 60, 60, 0.26);
  border-radius: 4px;
  text-align: center;
  font-weight: inherit;
}
.selected-option-wrapper {
  white-space: nowrap;
  overflow-x: hidden;
  vertical-align: top;
}
.is-refit {
  font-weight: bold;
  background-color: mediumturquoise;
}
</style>
