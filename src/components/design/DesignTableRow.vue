<template>
  <div class="design-row" :class="{ divider }" :style="[gridColumns, zIndex]">
    <div class="design-row-cell">{{slotType}}</div>
    <div
      class="design-row-cell"
      :style="[zIndex]"
    >
      <v-select
        class="module-selector"
        v-model="moduleName"
        :options="[...permittedModules.map(m => m.name)]"
      />
    </div>
    <div class="design-row-cell double-right">
      <input class="tech-tier-input" :disabled="moduleName === null" type="number" v-model="techTier"/>
    </div>
    <div class="design-row-cell">{{component.type}}</div>
    <div class="design-row-cell">{{component.slot}}</div>
    <div class="design-row-cell">{{stats.c}}</div>
    <div class="design-row-cell">{{stats.s}}</div>
    <div class="design-row-cell">{{stats.h}}</div>
    <div class="design-row-cell">{{stats.l}}</div>
    <div class="design-row-cell">{{stats.p}}</div>
    <div class="design-row-cell">{{stats.e}}</div>
    <div class="design-row-cell">{{stats.r}}</div>
    <div class="design-row-cell">{{stats.ev}}%</div>
    <div class="design-row-cell">{{stats.pen}}%</div>
    <div class="design-row-cell">{{costs.br}}</div>
    <div class="design-row-cell">{{costs.sr}}</div>
    <div class="design-row-cell">{{costs.o}}</div>
    <div class="design-row-cell">{{costs.en}}</div>
    <div class="design-row-cell">{{costs.t}}</div>
  </div>
</template>

<script>
export default {
  name: 'DesignTableRow',
  props: {
    slotType: String,
    slotIndex: Number,
    divider: Boolean
  },
  data () {
    return {
      highZ: false
    }
  },
  computed: {
    moduleName: {
      get () {
        return this.slot.module
      },
      set (val) {
        this.$store.commit('setSlotProperties', {
          index: this.slotIndex,
          properties: { module: val }
        })
      }
    },
    techTier: {
      get () {
        return this.slot.techTier
      },
      set (val) {
        this.$store.commit('setSlotProperties', {
          index: this.slotIndex,
          properties: { techTier: val }
        })
      }
    },
    slot () {
      return this.$store.state.design.slots[this.slotIndex]
    },
    stats () {
      return this.component.stats
    },
    costs () {
      return this.component.costs
    },
    component () {
      return this.$store.state.library.parts.filter(part => part.name === this.moduleName)[0]
        || this.nullModule
    },
    // data items
    permittedModules () {
      let modules = this.$store.state.library.parts
      if (this.slotType && this.slotType !== 'Any') {
        modules = modules.filter(module => module.type === this.slotType)
      } else {
        modules = modules.filter(m => m.slot !== 'Infrastructure')
      }
      return modules
    },
    nullModule () {
      return this.$store.state.library.nullModule
    },
    // styles
    gridColumns () {
      return this.$store.getters.getGridCols
    },
    zIndex () {
      return {
        zIndex: 1000 - this.slotIndex
      }
    }
  }
}
</script>

<style scoped>
.design-row {
  flex: 0 0 32px;
  z-index: 4;
  display: grid;
  grid-template-rows: 30px;
  border-bottom: 1px solid grey;
  z-index: 0;
}
.design-row-cell {
  box-sizing: border-box;
  line-height: 30px;
  font-size: 10pt;
  border-right: 1px solid grey;
  background-color: inherit;
  text-align: center;
  z-index: 0;
}
.design-row-cell:first-child {
  border-left: 1px solid grey;
}
.double-right {
  border-right: 3px double grey;
}
.divider {
  border-bottom: 3px double black;
}
.tech-tier-input {
  box-sizing: border-box;
  outline: none;
  background-color: transparent;
  font-family: 'Avenir';
  width: 67px;
  font-size: 10pt;
  height: 30px;
  /* margin: 2px 0; */
  border: 1px solid rgba(60, 60, 60, 0.26);
  border-radius: 4px;
  text-align: center;
}
</style>
