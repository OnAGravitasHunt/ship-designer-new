<template>
  <div class="design-row-cell">{{displayStat}}</div>
</template>

<script>
export default {
  name: 'TableCell',
  props: {
    value: Number
  },
  computed: {
    displayStat () {
      if (this.value !== null) {
        return `${Math.round(this.value * 1000) / 10}%`
      } else {
        return null
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
 </style>
