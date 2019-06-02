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
