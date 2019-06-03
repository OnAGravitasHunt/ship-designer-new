<template>
  <div class="design-row-cell" :class="{ 'is-refit': isRefit }">
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
.tech-tier-input {
  box-sizing: border-box;
  outline: none;
  background-color: transparent;
  font-family: 'Avenir';
  width: 100%;
  font-size: 9pt;
  height: 30px;
  border: 1px solid rgba(60, 60, 60, 0.26);
  border-radius: 4px;
  text-align: center;
  font-weight: inherit;
}
 </style>
