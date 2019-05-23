<template>
  <div
    class="design-row"
    :class="{ divider, 'user-divider': userDivider }"
    :style="[gridColumns, zIndex]"
  >
    <div class="design-row-cell" :class="{ required }">
      <template v-if="isInfra">
        {{slotType}}
      </template>
      <template v-else>
        <div v-if="slotType" class="cell-main">{{slotType}}</div>
        <div v-else class="cell-main handle"><span class="rearrange">&equiv;</span></div>
        <div class="cell-footer" @click="userDivider = !userDivider"></div>
      </template>
    </div>
    <div class="design-row-cell" :class="{ required }">
      <input type="checkbox" v-model="isRefit" :disabled="refitDisabled">
    </div>
    <div
      class="design-row-cell"
      :class="{ 'is-refit': isRefit }"
      ref="selectContainer"
      :style="[zIndex]"
    >
      <v-select
        class="module-selector"
        v-model="moduleName"
        :options="[...permittedModules.map(m => m.name)]"
      >
        <template v-slot:selected-option="selected">
          <div class="selected-option-wrapper" :style="[selectedDiv]">{{selected.label}}</div>
        </template>
      </v-select>
    </div>
    <div class="design-row-cell double-right" :class="{ 'is-refit': isRefit }">
      <input
        class="tech-tier-input"
        :disabled="moduleName === null"
        type="number"
        v-model="techTier"
      />
    </div>
    <div class="design-row-cell">{{component.type}}</div>
    <div class="design-row-cell">{{component.slot}}</div>
    <component v-for="col of columns" :key="col.key" :is="col.tableComp" :value="stats[col.key]"/>
  </div>
</template>

<script>
import Statblock from '@/lib/statblock'

import TableCell from './cells/TableCell'
import PercentTableCell from './cells/PercentTableCell'

export default {
  name: 'DesignTableRow',
  components: {
    TableCell,
    PercentTableCell
  },
  props: {
    slotType: String,
    slotIndex: Number,
    divider: Boolean,
    isInfra: Boolean
  },
  data () {
    return {
      // isRefit: false
    }
  },
  computed: {
    moduleName: {
      get () {
        return this.slot.module
      },
      set (module) {
        this.$store.dispatch('setSlotProperties', {
          index: this.slotIndex,
          properties: { module }
        })
      }
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
    isRefit: {
      get () {
        return this.slot.isRefit
      },
      set (isRefit) {
        this.$store.dispatch('setSlotProperties', {
          index: this.slotIndex,
          properties: { isRefit }
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
    refitDisabled () {
      return this.slot.module === null
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
    // display strings
    displayEvasion () {
      if (this.component.name) {
        return `${Math.round(this.stats.ev * 1000) / 10}%`
      } else {
        return null
      }
    },
    displayPenetration () {
      if (this.component.name) {
        return `${Math.round(this.stats.pen * 1000) / 10}%`
      } else {
        return null
      }
    },
    // data items
    permittedModules () {
      let modules = this.$store.getters.currentParts
      if (this.slotType && this.slotType !== 'Any') {
        modules = modules.filter(module => module.type === this.slotType)
      } else {
        modules = modules.filter(m => m.slot !== 'Infrastructure')
      }
      return modules
    },
    nullModule () {
      return this.$store.state.library.nullModule
    },
    platformGrade () {
      return this.$store.state.design.platformGrade
    },
    // styles
    required () {
      return this.$store.getters.requiredSlot(this.slotIndex) && this.slotIndex > 4
      // return this.slot.required && this.slotIndex > 4
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
      return this.$store.state.ui.designTable.col2Width - 75
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
}
.is-refit {
  font-weight: bold;
  background-color: mediumturquoise;
}
</style>
<style>
.module-selector .vs__dropdown-toggle {
  height: 30px;
}
</style>
