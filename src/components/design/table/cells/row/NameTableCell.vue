<template>
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
</template>

<script>
export default {
  name: 'TableCell',
  props: {
    rowIndex: Number,
    columnKey: String
  },
  data () {
    return {
      slotTypes: [
        { name: 'Hullform', divider: false },
        { name: 'Warp Core', divider: false },
        { name: 'Warp Nacelles', divider: false },
        { name: 'Computer', divider: false },
        { name: 'Deflector Dish', divider: true }
      ]
    }
  },
  computed: {
    slot () {
      return this.$store.state.design.slots[this.rowIndex]
    },
    isRefit () {
      return this.slot.isRefit
    },
    zIndex () {
      return {
        zIndex: 1000 - this.rowIndex
      }
    },
    moduleName: {
      get () {
        return this.slot.module
      },
      set (module) {
        this.$store.dispatch('setSlotProperties', {
          index: this.rowIndex,
          properties: { module }
        })
      }
    },
    permittedModules () {
      let modules = this.$store.getters.currentParts
      if (this.rowIndex < this.slotTypes.length) {
        return modules.filter(m => m.type === this.slotTypes[this.rowIndex].name)
      } else {
        return modules.filter(m => m.slot !== 'Infrastructure')
      }
    },
    selectedDivWidth () {
      return this.$store.state.ui.designTable.col2Width - 70
    },
    selectedDiv () {
      return { maxWidth: `${this.selectedDivWidth}px` }
    }
  }
}
</script>

<style scoped>
.selected-option-wrapper {
  white-space: nowrap;
  overflow-x: hidden;
  vertical-align: top;
}
</style>
<style>
.module-selector .vs__dropdown-toggle {
  height: 30px;
}
</style>
