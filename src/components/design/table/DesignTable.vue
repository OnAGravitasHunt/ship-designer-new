<template>
  <div class="design-table">
    <DesignTableHeader/>
    <div class="design-table-body">
      <DesignTablePlatformRow/>
      <DesignTableRow
        v-for="(slot, index) of slots.slice(0, 5)"
        :key="slot.key"
        :slotIndex="index"
        :slotType="slotTypes[index] ? slotTypes[index].name : ''"
        :divider="slotTypes[index] ? slotTypes[index].divider : false"
      />
      <draggable v-model="coreSlots" handle=".handle">
        <!-- <DesignTablePlatformRow/> -->
        <DesignTableRow
          v-for="(slot, index) of coreSlots"
          :key="slot.key"
          :slotIndex="index+5"
          slotType=""
          :divider="false"
        />
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

import DesignTableHeader from './DesignTableHeader'
import DesignTablePlatformRow from './DesignTablePlatformRow'
import DesignTableRow from './DesignTableRow'

export default {
  name: 'DesignTable',
  components: {
    draggable,
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
    slots: {
      get () {
        return this.$store.state.design.slots
      },
      set (slots) {
        this.$store.commit('setSlots', slots)
      }
    },
    coreSlots: {
      get () {
        return this.slots.slice(5)
      },
      set (slots) {
        this.slots = [
          ...this.slots.slice(0, 5),
          ...slots
        ]
      }
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
  overflow-y: scroll;
  padding-bottom: 380px;
  overflow-x: hidden;
  width: 100vw;
  min-width: 1365px;
}
.design-table-body::-webkit-scrollbar {
  background-color: transparent;
  border: none;
  width: 4px;
}
.design-table-body::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
