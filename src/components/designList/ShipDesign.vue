<template>
  <div class="ship-design" :style="gridColumns">
    <div
      v-for="col of columns"
      :key="col.key"
      class="table-cell"
    >
      <template v-if="!col.isButton">{{columnValues[col.key] || ''}}</template>
      <template v-else>
        <div
          class="button"
          :class="col.classes || []"
          @click="handleClick(col.method)"
        >{{col.title}}</div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShipDesign',
  props: {
    design: Object,
    index: Number
  },
  data () {
    return {
      partList: 'Starfleet'
    }
  },
  computed: {
    columns () {
      return this.$store.state.ui.designList.columns
    },
    columnValues () {
      return {
        name: this.name,
        platformType: this.platformType,
        stats: this.stats,
        crewing: this.crewing,
        resources: this.resources
      }
    },
    name () {
      return this.design.name
    },
    platformType () {
      return ['Frigate', 'Cruiser', 'Explorer'][this.design.design.platformGrade - 1]
    },
    shipStats () {
      return this.design.stats
    },
    stats () {
      return ['C', 'S', 'H', 'L', 'P', 'E', 'R']
        .map(s => `${s}${this.shipStats[s.toLowerCase()]}`)
        .join(' ')
    },
    crewing () {
      return ['O', 'EN', 'T']
        .map(c => `${c}${this.shipStats[c.toLowerCase()]}`)
        .join(' ')
    },
    resources () {
      return ['BR', 'SR']
        .map(r => `${this.shipStats[r.toLowerCase()]}${r}`)
        .join(' ')
    },
    // styles
    gridColumns () {
      return this.$store.getters.getDesignListColumns
    }
  },
  methods: {
    handleClick (method) {
      this[method]()
    },
    editDesign () {
      this.$store.commit('setEditing', this.index)
      this.$store.dispatch('restoreDesign', { design: this.design.design })
      this.$router.push('create')
    },
    duplicateDesign () {
      let newName = prompt('Enter a new name for the class', `${this.name} (Copy)`)
      if (newName) {
        this.$store.dispatch('restoreDesign', { design: this.design.design }).then(() => {
          let newDesign = {
            ...JSON.parse(JSON.stringify(this.$store.state.design)),
            className: newName
          }
          let savedDesign = {
            name: newName,
            stats: this.$store.getters.roundedStats,
            design: newDesign
          }
          this.$store.dispatch('saveNewDesign', savedDesign).then(() => {
            this.$store.dispatch('clearDesign')
          })
        })
      } else if (newName === '') {
        alert('Name not valid')
      }
    },
    deleteDesign () {
      if (confirm(`Are you sure you want to delete '${this.name}'`)) {
        this.$store.dispatch('deleteDesign', this.index)
      }
    }
  }
}
</script>

<style scoped>
.ship-design {
  margin: 0 auto;
  display: grid;
  grid-template-rows: 33px;
  min-width: 900px;
}
.table-cell {
  line-height: 30px;
  border-bottom: 1px solid black;
  white-space: nowrap;
  overflow: scroll;
  padding: 0 1px;
  font-size: 10pt;
}
.table-cell::-webkit-scrollbar {
  display: none;
}
.table-cell:first-child {
  grid-column-start: 1;
  border-left: 1px solid black;
}
.table-cell:last-child {
  border-right: 1px solid black;
}
.button {
  border-radius: 10px;
  height: 28px;
  line-height: 28px;
  margin: 2px;
  cursor: pointer;
  background-color: lightgrey;
}
.delete-button {
  background-color: lightcoral;
}
</style>
