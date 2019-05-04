<template>
  <div class="design-summary">
    <div class="right-align">Class Name</div>
    <div class="left-align">
      <input type="text" class="class-name-input" v-model="className">
    </div>
    <div class="right-align">Platform Type</div>
    <div class="left-align">Frigate</div>
  </div>
</template>

<script>
export default {
  name: 'DesignSummary',
  computed: {
    className: {
      get () {
        return this.$store.state.design.className
      },
      set (val) {
        this.$store.commit('setClassName', val)
      }
    }
  }
}
</script>

<style scoped>
.design-summary {
  background-color: lightgreen;
  flex: 0 0 100px;
  display: grid;
  grid-template-columns: 150px 200px;
  grid-template-rows: 30px 30px;
  line-height: 30px;
}
.left-align {
  text-align: left;
  padding-left: 5px;
}
.right-align {
  text-align: right;
  padding-right: 5px;
}
.center-align {
  text-align: center;
}
.class-name-input {
  margin: 2px 0;
  border: none;
  height: 24px;
  font-size: 12pt;
  text-align: center;
}
</style>
