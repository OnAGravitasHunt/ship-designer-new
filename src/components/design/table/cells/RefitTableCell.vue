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

 <style scoped>
.design-row-cell {
  box-sizing: border-box;
  line-height: 30px;
  font-size: 10pt;
  border-right: 1px solid grey;
  background-color: inherit;
  text-align: center;
  z-index: 0;
}
.design-row-cell:first-child {
  border-left: 1px solid grey;
}
 </style>
