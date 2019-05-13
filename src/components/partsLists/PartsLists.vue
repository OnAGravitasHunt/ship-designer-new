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
      </div>
      <div class="table-body">
        <div class="list-row">
          <div class="table-cell">D</div>
          <div class="table-cell">Starfleet</div>
          <div class="table-cell">Rename</div>
          <div class="table-cell">Delete</div>
        </div>
      </div>
    </div>
    <NewList/>
  </div>
</template>

<script>
import NewList from './NewList'

export default {
  name: 'PartsLists',
  components: {
    NewList
  }
}
</script>

<style scoped>
.parts-lists {
  text-align: left;
  margin-left: 50px;
  width: 400px;
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
  grid-template-columns: 40px 200px 80px 80px;
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
.new-partlist-row {
  margin: 0 auto;
  display: grid;
  grid-template-columns: 150px 150px 50px;
  grid-template-rows: 33px;
}
</style>
