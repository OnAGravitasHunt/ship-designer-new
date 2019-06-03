<template>
  <div class="design-row-cell" :class="{ required, 'infra': isInfra }">
    <template v-if="isInfra">
      {{slotType}}
    </template>
    <template v-else>
      <div v-if="slotType" class="cell-main">{{slotType}}</div>
      <div v-else class="cell-main handle"><span class="rearrange">&equiv;</span>{{slotType}}</div>
      <div class="cell-footer" @click="userDivider = !userDivider"></div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SlotTableCell',
  props: {
    rowIndex: Number,
    columnKey: String
  },
  data () {
    return {
      slotTypes: [
        { name: 'Hullform', divider: false },
        { name: 'Warp Core', divider: false },
        { name: 'Nacelles', divider: false },
        { name: 'Computer', divider: false },
        { name: 'Deflector', divider: true }
      ]
    }
  },
  computed: {
    slot () {
      return this.$store.state.design.slots[this.rowIndex]
    },
    required () {
      return this.$store.getters.requiredSlot(this.rowIndex) && this.rowIndex > 4
    },
    isInfra () {
      return this.rowIndex < this.slotTypes.length
    },
    slotType () {
      return this.rowIndex < this.slotTypes.length ? this.slotTypes[this.rowIndex].name : ''
    },
    divider () {
      return this.slotTypes[this.rowIndex] ? this.slotTypes[this.rowIndex].divider : false
    },
    userDivider: {
      get () {
        return this.slot.userDivider && !this.isInfra
      },
      set (userDivider) {
        if (!this.divider && !this.isInfra) {
          this.$store.dispatch('setSlotProperties', {
            index: this.rowIndex,
            properties: { userDivider }
          })
        }
      }
    }
  }
}
</script>

 <style scoped>
.cell-main {
  height: 28px;
}
.handle {
  text-align: left;
  padding-left: 20px;
}
.rearrange {
  display: inline-block;
  transform: scale(2, 1)
}
.cell-footer {
  height: 3px;
  background-color: rgba(0.5, 0.5, 0.5, 0.5);
}
.cell-footer:hover {
  background-color: rgba(0, 0, 0, 0.8)
}
.design-row-cell.required {
  background-color: lightgreen;
}
/* .design-row-cell.infra {
  font-size: 8pt;
} */
 </style>
