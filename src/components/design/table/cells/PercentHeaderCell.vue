<template>
  <div class="header-cell">{{displayStat}} {{title}}</div>
</template>

<script>
export default {
  name: 'PercentHeaderCell',
  props: {
    title: String,
    value: Number
  },
  computed: {
    displayStat () {
      return `${Math.round(this.value * 1000) / 10}%`
    }
  }
}
</script>

 <style scoped>
 .header-cell {
  line-height: 30px;
  font-size: 10pt;
  background-color: inherit;
  text-align: center;
  border-right: 1px solid grey;
}
.header-cell:first-child {
  border-left: 1px solid grey;
}
 </style>
