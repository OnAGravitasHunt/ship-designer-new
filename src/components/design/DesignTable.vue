<template>
  <div class="design-table">
    <DesignTableHeader/>
    <div class="design-table-body">
      <DesignTablePlatformRow/>
      <DesignTableRow :slotIndex="0" slotType="Hullform"/>
      <DesignTableRow :slotIndex="1" slotType="Warp Core"/>
      <DesignTableRow :slotIndex="2" slotType="Warp Nacelles"/>
      <DesignTableRow :slotIndex="3" slotType="Computer"/>
      <DesignTableRow :divider="true" :slotIndex="4" slotType="Deflector Dish"/>
    </div>
  </div>
</template>

<script>
import DesignTableHeader from './DesignTableHeader'
import DesignTablePlatformRow from './DesignTablePlatformRow'
import DesignTableRow from './DesignTableRow'

export default {
  name: 'DesignTable',
  components: {
    DesignTableHeader,
    DesignTablePlatformRow,
    DesignTableRow
  }
}
</script>

<style scoped>
.design-table {
  flex: 1 1 auto;
  background-color: #eee;
  overflow-x: auto;
  display: flex;
  flex-flow: column nowrap;
  overflow-y: hidden;
}
.design-table-body {
  flex: 1 1 auto;
  overflow-y: auto;
  padding-bottom: 100px;
  overflow-x: hidden;
  width: 100vw;
  min-width: 1390px;
}
</style>
