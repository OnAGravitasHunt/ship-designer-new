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
