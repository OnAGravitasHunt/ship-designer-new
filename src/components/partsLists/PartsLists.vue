<template>
  <div class="parts-lists">
    <div class="title-bar">
      <div class="title-bar-left">Parts Lists</div>
    </div>
    <div class="design-list-table">
      <div class="list-row header-row">
        <div class="header-cell"></div>
        <div class="header-cell">List Name</div>
        <div class="header-cell"></div>
        <div class="header-cell"></div>
        <div class="header-cell"></div>
      </div>
      <div class="table-body">
        <PartListRow v-for="(partList, index) of partLists" :key="partList" :index="index"/>
      </div>
    </div>
    <NewList/>
  </div>
</template>

<script>
import PartListRow from './PartListRow'
import NewList from './NewList'

export default {
  name: 'PartsLists',
  components: {
    PartListRow,
    NewList
  },
  computed: {
    partLists () {
      return this.$store.state.library.partListNames
    }
  }
}
</script>

<style scoped>
.parts-lists {
  text-align: left;
  margin-left: 50px;
  width: 460px;
}
.title-bar {
  height: 60px;
  line-height: 60px;
  margin: 5px;
  display: flex;
  flex-flow: row nowrap;
  font-weight: bold;
  font-size: 18pt;
}
.title-bar-left {
  flex: 1 1 auto;
}
.design-list-table {
  text-align: center;
  overflow: auto;
  padding-bottom: 30px;
}
.list-row {
  margin: 0 auto;
  display: grid;
  grid-template-columns: 40px 200px 60px 80px 80px;
  grid-template-rows: 33px;
}
.header-cell {
  border: 1px solid black;
  border-bottom: 3px double black;
  border-left: none;
  line-height: 30px;
}
.header-cell:first-child {
  border-left: 1px solid black;
  border-top-left-radius: 5px;
}
.header-cell:last-child {
  border-top-right-radius: 5px;
}
.table-body {
  max-height: 250px;
  overflow-y: auto;
  border-bottom: 2px solid black;
  font-size: 11pt;
}
</style>
