<template>
  <div class="design-row-cell double-right input-wrapper">
      <div class="input-label">Def-ault:</div>
      <input
        class="tech-tier-input"
        type="number"
        v-model="defaultTier"
      />
    </div>
</template>

<script>
// PLATFORM
export default {
  name: 'RefitTableCell',
  computed: {
    defaultTier: {
      get () {
        return this.$store.state.design.defaultTier
      },
      set (t) {
        this.$store.commit('setDefaultTier', t)
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
