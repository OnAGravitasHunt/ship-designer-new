<template>
  <div class="new-list">
    <div class="left-col top-row">List name</div>
    <div class="right-col top-row input-cell">
      <input class="list-name" v-model="newListName" type="text">
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
    <div class="left-col span-cols">
      <div class="btn" @click="upload">Upload Part List</div>
    </div>
  </div>
</template>

<script>
import { PartParser, PlatformParser } from '@/lib/partParser'

export default {
  name: 'NewList',
  data () {
    return {
      newListName: '',
      newList: {
        parts: [],
        platforms: []
      }
    }
  },
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
      if (!this.newListName) {
        alert('No name given to part list')
      } else if (this.$store.state.library.partListNames.indexOf(this.newListName) > 0) {
        alert('Name taken')
      } else {
        Promise.all([
          this.uploadParts(),
          this.uploadPlatforms()
        ]).then(vals => {
          this.$store.dispatch('savePartList', {
            name: this.newListName,
            partList: {
              parts: vals[0],
              platforms: vals[1]
            }
          })
        }).catch(e => {
          // console.error(e)
          alert('Something went wrong. Are you sure you selected the correct files?')
        })
      }
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
.span-cols {
  grid-column: 1/3;
  text-align: center;
  padding: 0;
}
.btn {
  width: 190px;
  background-color: #aaa  ;
  margin: 1px auto;
  height: calc(100% - 2px);
  line-height: 28px;
  border-radius: 14px;
}
</style>
