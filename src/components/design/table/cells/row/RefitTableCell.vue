<template>
  <div class="design-row-cell" :class="{ required }">
    <input type="checkbox" v-model="isRefit" :disabled="refitDisabled">
  </div>
</template>

<script>
export default {
  name: 'RefitTableCell',
  props: {
    rowIndex: Number,
    columnKey: String
  },
  computed: {
    slot () {
      return this.$store.state.design.slots[this.rowIndex]
    },
    required () {
      return this.$store.getters.requiredSlot(this.rowIndex) && this.rowIndex > 4
    },
    isRefit: {
      get () {
        return this.slot.isRefit
      },
      set (isRefit) {
        this.$store.dispatch('setSlotProperties', {
          index: this.rowIndex,
          properties: { isRefit }
        })
      }
    },
    refitDisabled () {
      return this.slot.module === null
    }
  }
}
</script>
