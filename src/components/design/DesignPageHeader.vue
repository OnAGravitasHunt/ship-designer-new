<template>
  <div class="page-header">
    <div class="header-item" style="border-right: 1px solid black;">
      &lang;
    </div>
    <div class="header-item">
      {{className}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'DesignPageHeader',
  computed: {
    className () {
      return this.$store.state.design.className
    }
  }
}
</script>

<style scoped>
.page-header {
  flex: 0 0 60px;
  background-color: lightblue;
  line-height: 60px;
  font-size: 18pt;
  font-weight: bold;
}
.header-item {
  display: inline-block;
  padding: 0 12px;
}
</style>
