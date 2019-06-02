<template>
  <div class="design-row-cell">{{component[columnKey]}}</div>
</template>

<script>
export default {
  name: 'TableCell',
  props: {
    rowIndex: Number,
    columnKey: String
  },
  computed: {
    moduleName () {
      return this.$store.state.design.slots[this.rowIndex].module
    },
    component () {
      return this.$store.getters.partByName(this.moduleName) || this.nullModule
    },
    // data items
    nullModule () {
      return this.$store.state.library.nullModule
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
