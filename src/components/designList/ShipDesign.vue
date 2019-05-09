<template>
  <div class="ship-design">
    <div class="table-cell">{{name}}</div>
    <div class="table-cell">{{platformType}}</div>
    <div class="table-cell">{{partList}}</div>
    <div class="table-cell">{{shipStats}}</div>
    <div class="table-cell">{{crewing}}</div>
    <div class="table-cell">{{resources}}</div>
    <div class="table-cell">
      <div class="button edit-button" @click="editDesign">Edit</div>
    </div>
    <div class="table-cell">
      <div class="button delete-button" @click="deleteDesign">Delete</div>
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
    name () {
      return this.design.name
    },
    platformType () {
      return ['Frigate', 'Cruiser', 'Explorer'][this.design.design.platformGrade - 1]
    },
    stats () {
      return this.design.stats
    },
    shipStats () {
      return ['C', 'S', 'H', 'L', 'P', 'E', 'R']
        .map(s => `${s}${this.stats[s.toLowerCase()]}`)
        .join(' ')
    },
    crewing () {
      return ['O', 'EN', 'T']
        .map(c => `${c}${this.stats[c.toLowerCase()]}`)
        .join(' ')
    },
    resources () {
      return ['BR', 'SR']
        .map(r => `${this.stats[r.toLowerCase()]}${r}`)
        .join(' ')
    }
  },
  methods: {
    editDesign () {
      this.$store.commit('setEditing', this.index)
      this.$store.dispatch('restoreDesign', { design: this.design.design })
      this.$router.push('create')
    },
    deleteDesign () {
      if (confirm(`Are you sure you want to delete '${this.name}'`)) {
        this.$store.dispatch('deleteDesign')
      }
    }
  }
}
</script>

<style scoped>
.ship-design {
  margin: 0 auto;
  display: grid;
  grid-template-columns: 6fr 4fr 4fr minmax(220px, 6fr) 4fr 4fr 60px 70px;
  grid-template-rows: 33px;
  min-width: 900px;
}
.table-cell {
  line-height: 30px;
  border-bottom: 1px solid black;
}
.table-cell:first-child {
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
}
.edit-button {
  background-color: lightgrey;
}
.delete-button {
  background-color: lightcoral;
}
</style>
