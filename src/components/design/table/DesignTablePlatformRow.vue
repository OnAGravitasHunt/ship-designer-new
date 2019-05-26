<template>
  <div class="design-row" :style="[gridColumns, zIndex]">
    <div class="design-row-cell">Platform</div>
    <div class="design-row-cell">-</div>
    <div
      class="design-row-cell"
      :style="[zIndex]"
    >
      <v-select
        class="module-selector"
        v-model="moduleName"
        :clearable="false"
        :options="[...permittedPlatforms.map(m => m.name)]"
      >
        <template v-slot:selected-option="selected">
          <div class="selected-option-wrapper" :style="[selectedDiv]">{{selected.label}}</div>
        </template>
      </v-select>
    </div>
    <div class="design-row-cell double-right input-wrapper">
      <div class="input-label">Def-ault:</div>
      <input
        class="tech-tier-input"
        type="number"
        v-model="defaultTier"
      />
    </div>
    <div v-for="n in 2" :key="n" class="design-row-cell"></div>
    <component v-for="col of columns" :key="col.key" :is="col.tableComp" :value="stats[col.key]"/>
  </div>
</template>

<script>
import Statblock from '@/lib/statblock'

import TableCell from './cells/TableCell'
import PercentTableCell from './cells/PercentTableCell'

export default {
  name: 'DesignTablePlatformRow',
  components: {
    TableCell,
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
      return this.$store.state.ui.designTable.columns.slice(6)
    },
    stats () {
      let s = new Statblock(this.$store.getters.platformStats, 0, this.platformGrade, true)
      return s.processedStats
      // return this.$store.getters.platformStats
    },
    // styles
    gridColumns () {
      return this.$store.getters.getGridTemplateColumns
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
.selected-option-wrapper {
  white-space: nowrap;
  overflow-x: hidden;
}
.double-right {
  border-right: 3px double grey;
}
.tech-tier-input {
  box-sizing: border-box;
  outline: none;
  background-color: transparent;
  font-family: 'Avenir';
  width: 38px;
  font-size: 9pt;
  height: 30px;
  border: 1px solid rgba(60, 60, 60, 0.26);
  border-radius: 4px;
  text-align: center;
  font-weight: inherit;
  vertical-align: top;
}
.input-label {
  width: 25px;
  height: 30px;
  display: inline-block;
  margin: 0 2px;
  line-height: 10pt;
  padding-top: 2px;
}
</style>
