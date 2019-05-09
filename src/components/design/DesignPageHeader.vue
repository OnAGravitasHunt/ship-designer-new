<template>
  <div class="page-header">
    <div class="header-item back-button" @click="saveAndExit">
      &lang;
    </div>
    <div class="header-item">
      {{className}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'DesignPageHeader',
  computed: {
    className () {
      return this.$store.state.design.className
    },
    editingDesign () {
      return this.$store.state.editingDesign
    }
  },
  methods: {
    saveDesign () {
      if (this.$store.state.design.className) {
        let design = JSON.parse(JSON.stringify(this.$store.state.design))
        let savedDesign = {
          name: design.className,
          stats: this.$store.getters.totalStats,
          design
        }
        if (this.editingDesign === null) {
          this.$store.dispatch('saveNewDesign', savedDesign)
        } else {
          this.$store.dispatch('saveExistingDesign', savedDesign)
        }
        return true
      }
      alert('Please enter a name for the class!')
      return false
    },
    saveAndExit () {
      if (this.saveDesign()) {
        this.$router.push('/')
        this.$store.dispatch('clearDesign')
        this.$store.commit('clearEditing')
      }
    }
  }
}
</script>

<style scoped>
.page-header {
  flex: 0 0 60px;
  background-color: lightsteelblue;
  border-bottom: 1px solid black;
  line-height: 60px;
  font-size: 18pt;
  font-weight: bold;
}
.header-item {
  display: inline-block;
  padding: 0 12px;
}
.back-button {
  border-right: 1px solid black;
  cursor: pointer;
}
</style>
