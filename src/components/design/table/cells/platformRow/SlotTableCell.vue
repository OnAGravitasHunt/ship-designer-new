<template>
  <div class="design-row-cell">Platform</div>
</template>

<script>
// PLATFORM
export default {
  name: 'SlotTableCell'
}
</script>

 <style scoped>
.design-row-cell {
  box-sizing: border-box;
  line-height: 30px;
  font-size: 9pt;
  border-right: 1px solid grey;
  background-color: inherit;
  text-align: center;
  z-index: 0;
}
.design-row-cell:first-child {
  border-left: 1px solid grey;
}
 </style>
