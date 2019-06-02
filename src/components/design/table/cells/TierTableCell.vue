<template>
  <div class="design-row-cell double-right" :class="{ 'is-refit': isRefit }">
    <input
      class="tech-tier-input"
      :disabled="moduleName === null"
      type="number"
      v-model="techTier"
    />
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
    isRefit () {
      return this.slot.isRefit
    },
    moduleName () {
      return this.slot.module
    },
    techTier: {
      get () {
        return this.slot.techTier
      },
      set (techTier) {
        this.$store.dispatch('setSlotProperties', {
          index: this.rowIndex,
          properties: { techTier }
        })
      }
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
.is-refit {
  font-weight: bold;
  background-color: mediumturquoise;
}
.double-right {
  border-right: 3px double grey;
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
 </style>
