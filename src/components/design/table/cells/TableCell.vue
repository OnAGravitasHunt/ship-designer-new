<template>
  <div class="design-row-cell">{{value}}</div>
</template>

<script>
export default {
  name: 'TableCell',
  props: {
    value: [String, Number]
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
