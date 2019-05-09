<template>
  <div class="page-header">
    <div class="header-item back-button" @click="saveDesign">
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
    }
  },
  methods: {
    saveDesign () {
      let design = this.$store.state.design
      let savedDesign = {
        name: design.className,
        stats: this.$store.getters.totalStats,
        design
      }
      // TODO: account for editing a design
      this.$store.commit('addDesign', savedDesign)
      this.$router.push('/')
      this.$store.dispatch('clearDesign')
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
