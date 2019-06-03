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
