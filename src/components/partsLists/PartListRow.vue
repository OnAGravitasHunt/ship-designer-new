<template>
  <div class="part-list-row">
    <div class="table-cell">
      <input type="radio" :value="index" v-model="currentListIndex"/>
    </div>
    <div class="table-cell">{{listName}}</div>
    <div class="table-cell">Rename</div>
    <div class="table-cell">Delete</div>
  </div>
</template>

<script>
export default {
  name: 'PartListTableRow',
  props: {
    index: Number
  },
  computed: {
    listName () {
      return this.$store.state.library.partListNames[this.index]
    },
    currentListIndex: {
      get () {
        return this.$store.state.library.currentPartListIndex
      },
      set (i) {
        this.$store.commit('setCurrentPartList', i)
      }
    }
  }
}
</script>

<style scoped>
.part-list-row {
  margin: 0 auto;
  display: grid;
  grid-template-columns: 40px 200px 80px 80px;
  grid-template-rows: 33px;
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
</style>
