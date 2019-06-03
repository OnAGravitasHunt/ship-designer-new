<template>
  <div
    class="design-row-cell"
    :style="[zIndex]"
  >
    <v-select
      class="module-selector"
      v-model="platformName"
      :clearable="false"
      :options="[...permittedPlatforms.map(m => m.name)]"
    >
      <template v-slot:selected-option="selected">
        <div class="selected-option-wrapper" :style="[selectedDiv]">{{selected.label}}</div>
      </template>
    </v-select>
  </div>
</template>

<script>
// PLATFORM
export default {
  name: 'TableCell',
  computed: {
    platformName: {
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
    zIndex () {
      return {
        zIndex: 2000
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
