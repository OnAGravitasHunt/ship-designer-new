<template>
  <div class="design-list">
    <div class="title-bar">
      <div class="title-bar-left">Designs</div>
      <div class="add-new-design" @click="$refs.uploadShipJSON.click()">
        Upload
        <input ref="uploadShipJSON" v-show="false" type="file" @change="uploadDesign">
      </div>
      <div class="add-new-design" @click="addNewDesign">Add new</div>
    </div>
    <div class="design-list-table">
      <div class="list-row" :style="gridColumns">
        <div
          v-for="col of columns"
          :key="col.key"
          class="header-cell"
        >
          <template v-if="!col.isButton">{{col.title}}</template>
        </div>
      </div>
      <div class="table-body">
        <div class="no-designs" v-if="!designs.length">
          You have no designs!
        </div>
        <ShipDesign v-for="(design, index) of designs" :key="index" :design="design" :index="index"/>
      </div>
    </div>
  </div>
</template>

<script>
import ShipDesign from './ShipDesign'

export default {
  name: 'DesignList',
  components: {
    ShipDesign
  },
  data () {
    return {
      headings: ['Design Name', 'Platform', 'Part List', 'Stats', 'Crew', 'Cost', '', '', '']
    }
  },
  computed: {
    designs () {
      return this.$store.state.savedDesigns
    },
    columns () {
      return this.$store.state.ui.designList.columns
    },
    // styles
    gridColumns () {
      return this.$store.getters.getDesignListColumns
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
    addNewDesign () {
      this.$store.dispatch('clearDesign').then(() => {
        this.$store.commit('setDesignPartList', this.$store.getters.currentPartListName)
        this.$router.push('create')
      })
    },
    uploadDesign () {
      this.readFile(this.$refs.uploadShipJSON.files[0]).then(res => {
        let design = JSON.parse(res)
        this.$store.dispatch('restoreDesign', { design })
        this.$router.push('create')
      })
    }
  }
}
</script>

<style scoped>
.design-list {
  text-align: left;
  margin: 0 50px;
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
.add-new-design {
  width: 120px;
  background-color: palegreen;
  margin: 10px 0;
  margin-left: 10px;
  line-height: 40px;
  text-align: center;
  padding: 0 10px;
  border-radius: 30px;
  font-size: 15pt;
  user-select: none;
  cursor: pointer;
}
.design-list-table {
  text-align: center;
  overflow: auto;
  padding-bottom: 30px;
}
.list-row {
  margin: 0 auto;
  display: grid;
  grid-template-rows: 33px;
  min-width: 900px;
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
  min-width: 900px;
  border-bottom: 2px solid black;
  font-size: 11pt;
}
.no-designs {
  height: 80px;
  line-height: 80px;
  font-size: 15pt;
  border-right: 1px solid black;
  border-left: 1px solid black;
}
</style>
