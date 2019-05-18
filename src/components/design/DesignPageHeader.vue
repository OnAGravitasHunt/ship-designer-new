<template>
  <div class="page-header">
    <div class="header-item back-button" @click="saveAndExit">
      &lang;
    </div>
    <div class="header-item header-title">
      {{className}}
    </div>
    <div class="export-button-wrapper">
      <div class="export-button" @click="exportBBCode">Export BBCode</div>
    </div>
    <div class="export-button-wrapper">
      <div class="export-button" @click="downloadJSON">Download File</div>
      <a ref="downloadShipJSON" style="display:none"></a>
    </div>
  </div>
</template>

<script>
import BBCodeExport from '@/lib/bbcodeExport'

export default {
  name: 'DesignPageHeader',
  computed: {
    className () {
      return this.$store.state.design.className
    },
    editingDesign () {
      return this.$store.state.editingDesign
    },
    bbcodeText () {
      return BBCodeExport.export({
        name: this.$store.state.design.className,
        stats: this.$store.getters.roundedStats,
        weight: this.$store.getters.weights.design,
        buildTime: this.$store.getters.buildTime,
        design: JSON.parse(JSON.stringify(this.$store.state.design))
      })
    }
  },
  methods: {
    saveDesign () {
      if (this.$store.state.design.className) {
        let design = JSON.parse(JSON.stringify(this.$store.state.design))
        let savedDesign = {
          name: design.className,
          stats: this.$store.getters.roundedStats,
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
    },
    exportBBCode () {
      navigator.clipboard.writeText(this.bbcodeText).then(() => {
        console.log('Copied!')
      }, () => {
        console.error('Failed to copy to clipboard. Logging below instead.')
        console.log(this.bbcodeText)
      })
    },
    downloadJSON () {
      let timestamp = new Date()
      timestamp.setMilliseconds(0)
      let data = JSON.stringify(this.$store.state.design)
      let element = this.$refs.downloadShipJSON
      let filename = `${this.$store.state.design.className || `design-${timestamp.toISOString()}`}.json`
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + data)
      element.setAttribute('download', filename)
      element.click()
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
  display: flex;
  flex-flow: row nowrap;
}
.header-item {
  /* display: inline-block; */
  padding: 0 12px;
}
.header-title {
  flex: 1 1 auto;
}
.back-button {
  text-align: center;
  flex: 0 0 30px;
  border-right: 1px solid black;
  cursor: pointer;
}
.export-button-wrapper {
  flex: 0 0 150px;
  font-size: 12pt;
  font-weight: normal;
}
.export-button {
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin: 10px 0;
  background-color: lightgreen;
  margin-right: 10px;
  border-radius: 20px;
}
</style>
