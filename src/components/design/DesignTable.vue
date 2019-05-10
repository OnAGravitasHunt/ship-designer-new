<template>
  <div class="design-table">
    <DesignTableHeader/>
    <div class="design-table-body">
      <DesignTablePlatformRow/>
      <DesignTableRow
        v-for="(slot, index) of slots"
        :key="index"
        :slotIndex="index"
        :slotType="slotTypes[index] ? slotTypes[index].name : ''"
        :divider="slotTypes[index] ? slotTypes[index].divider : false"
      />
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
  },
  data () {
    return {
      slotTypes: [
        { name: 'Hullform', divider: false },
        { name: 'Warp Core', divider: false },
        { name: 'Warp Nacelles', divider: false },
        { name: 'Computer', divider: false },
        { name: 'Deflector Dish', divider: true } // ,
        // { name: 'Any', divider: false }
      ]
    }
  },
  computed: {
    slots () {
      return this.$store.state.design.slots
    }
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
  padding-bottom: 380px;
  overflow-x: hidden;
  width: 100vw;
  min-width: 1390px;
}
</style>
