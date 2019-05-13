<template>
  <div class="new-list">
    <div class="left-col top-row">List name</div>
    <div class="right-col top-row input-cell">
      <input class="list-name" type="text">
    </div>
    <!--  -->
    <div class="left-col">Parts CSV</div>
    <div class="right-col">
      <input ref="partsCSV" class="list-name" type="file">
    </div>
    <!--  -->
    <div class="left-col bottom-row">Platforms CSV</div>
    <div class="right-col bottom-row">
      <input ref="platformsCSV" class="list-name" type="file">
    </div>
    <div class="left-col" @click="uploadParts">Log</div>
  </div>
</template>

<script>
import PartParser from '@/lib/partParser'

export default {
  name: 'NewList',
  methods: {
    uploadParts () {
      let loadFile = this.$refs.partsCSV.files[0]
      let reader = new FileReader()
      reader.onload = event => {
        if (reader.readyState === FileReader.DONE) {
          console.log(PartParser.parse(reader.result))
        }
      }
      reader.readAsText(loadFile)
    },
    uploadPlatforms () {
      let loadFile = this.$refs.platformsCSV.files[0]
      let reader = new FileReader()
      reader.onload = event => {
        if (reader.readyState === FileReader.DONE) {
          // PartParser.parse(reader.result)
        }
      }
      reader.readAsText(loadFile)
    }
  }
}
</script>

<style scoped>
.new-list {
  display: grid;
  grid-template-columns: 125px 225px;
  grid-auto-rows: 30px;
  /* line-height: 30px; */
}
.new-list > div {
  border-right: 1px solid grey;
  border-bottom: 1px solid grey;
}
.top-row {
  border-top: 1px solid grey;
}
.left-col {
  text-align: right;
  padding-right: 5px;
  border-left: 1px solid grey;
  line-height: 30px;
}
.right-col {
  padding-left: 5px;
}
.input-cell {
  /* line-height: 26px; */
}
.list-name {
  height: 18px;
  margin: auto 0;
  font-family: 'Avenir';
  outline: none;
}
</style>
