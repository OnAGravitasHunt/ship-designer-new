<template>
  <div class="header-cell">{{value}}{{title}}</div>
</template>

<script>
export default {
  name: 'CostHeaderCell',
  props: {
    title: String,
    value: Number
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
