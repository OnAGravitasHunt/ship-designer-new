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
    <div class="left-col" @click="upload">Log</div>
  </div>
</template>

<script>
import { PartParser, PlatformParser } from '@/lib/partParser'

export default {
  name: 'NewList',
  methods: {
    readFile (file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = () => {
          resolve(reader.result)
        }
        reader.onerror = (e) => {
          reject(e)
        }
        reader.readAsText(file)
      })
    },
    uploadParts () {
      return new Promise((resolve, reject) => {
        this.readFile(this.$refs.partsCSV.files[0]).then(res => {
          resolve(PartParser.parse(res))
        }).catch(e => {
          reject(e)
        })
      })
    },
    uploadPlatforms () {
      return new Promise((resolve, reject) => {
        this.readFile(this.$refs.platformsCSV.files[0]).then(res => {
          resolve(PlatformParser.parse(res))
        }).catch(e => {
          reject(e)
        })
      })
    },
    upload () {
      Promise.all([
        this.uploadParts(),
        this.uploadPlatforms()
      ]).then(vals => {
        console.log(vals)
      })
    }
  }
}
</script>

<style scoped>
.new-list {
  display: grid;
  grid-template-columns: 125px 225px;
  grid-auto-rows: 30px;
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
.list-name {
  height: 18px;
  margin: auto 0;
  font-family: 'Avenir';
  outline: none;
}
</style>
