<template>
  <div class="design-table">
    <DesignTableHeader/>
    <DesignTablePlatformRow/>
    <DesignTableRow :slotIndex="0" slotType="Hullform"/>
    <DesignTableRow :slotIndex="1" slotType="Warp Core"/>
    <DesignTableRow :slotIndex="2" slotType="Warp Nacelles"/>
    <DesignTableRow :slotIndex="3" slotType="Computer"/>
    <DesignTableRow :slotIndex="4" slotType="Deflector Dish"/>
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
  background-color: lightblue;
  overflow-x: auto;
  display: flex;
  flex-flow: column nowrap;
  overflow-y: hidden;
}
</style>
