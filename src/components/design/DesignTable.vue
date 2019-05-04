<template>
  <div class="design-table">
    <DesignTableHeader/>
    <DesignTableRow :slotIndex="0" slotType="Hullform"/>
  </div>
</template>

<script>
import DesignTableHeader from './DesignTableHeader'
import DesignTableRow from './DesignTableRow'

export default {
  name: 'DesignTable',
  components: {
    DesignTableHeader,
    DesignTableRow
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
