<template>
  <div class="design-row-cell">{{displayStat}}</div>
</template>

<script>
// PLATFORM
import Statblock from '@/lib/statblock'

export default {
  name: 'PercentTableCell',
  props: {
    columnKey: String
  },
  computed: {
    platformGrade () {
      return this.$store.state.design.platformGrade
    },
    stats () {
      let s = new Statblock(this.$store.getters.platformStats, 0, this.platformGrade, true)
      return s.processedStats
    },
    displayStat () {
      return `${Math.round(this.stats[this.columnKey] * 1000) / 10}%`
    },
    // library data items
    nullModule () {
      return this.$store.state.library.nullModule
    }
  }
}
</script>
