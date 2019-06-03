<template>
  <div class="design-row-cell">{{stats[columnKey]}}</div>
</template>

<script>
// PLATFORM
import Statblock from '@/lib/statblock'

export default {
  name: 'StatTableCell',
  props: {
    columnKey: String
  },
  computed: {
    stats () {
      let s = new Statblock(this.$store.getters.platformStats, 0, this.platformGrade, true)
      return s.processedStats
    }
  }
}
</script>
