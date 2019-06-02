<template>
  <div class="design-row-cell">{{stats[columnKey]}}</div>
</template>

<script>
import Statblock from '@/lib/statblock'

export default {
  name: 'StatTableCell',
  props: {
    rowIndex: Number,
    columnKey: String
  },
  computed: {
    slot () {
      return this.$store.state.design.slots[this.rowIndex]
    },
    moduleName () {
      return this.slot.module
    },
    component () {
      return this.$store.getters.partByName(this.moduleName) || this.nullModule
    },
    techTier () {
      return this.slot.techTier
    },
    platformGrade () {
      return this.$store.state.design.platformGrade
    },
    stats () {
      if (this.component.name) {
        let s = new Statblock(this.component.stats, this.techTier, this.platformGrade)
        return s.processedStats
      }
      return this.component.stats
    },
    // library data items
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
