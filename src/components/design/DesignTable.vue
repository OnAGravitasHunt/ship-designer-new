<template>
  <div class="design-table">
    <DesignTableHeader/>
  </div>
</template>

<script>
import DesignTableHeader from './DesignTableHeader'

export default {
  name: 'DesignTable',
  components: {
    DesignTableHeader
  }
}
</script>

<style scoped>
.design-table {
  flex: 1 1 auto;
  background-color: lightblue;
  overflow-x: auto;
  display: flex;
  flex-flow: column nowrap;
  overflow-y: hidden;
}
</style>
