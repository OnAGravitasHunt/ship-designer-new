<template>
  <div class="page-header">
    <div class="header-item" style="border-right: 1px solid black;">
      &lang;
    </div>
    <div class="header-item">
      Comet Study 1
    </div>
  </div>
</template>

<script>
export default {
  name: 'DesignPageHeader'
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
  padding: 0 10px;
}
</style>
