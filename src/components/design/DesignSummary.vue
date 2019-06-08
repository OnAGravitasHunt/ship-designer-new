<template>
  <div class="design-summary" :style="[gridStyle]">
    <div class="center-align b-top back-button" @click="saveAndExit">&lang;</div>
    <div class="left-align b-top b-right">
      <input type="text" class="class-name-input" v-model="className">
    </div>
    <div class="right-align b-top">Platform Type</div>
    <div class="right-align b-top double-right">{{platformType}}</div>
    <div class="center-align b-top span2">{{finalStats.ev}}% Ev</div>
    <div class="center-align b-top span2 b-right">{{finalStats.pen}}% Pen</div>
    <div class="center-align b-top double-right build-time">{{buildTime}} Years</div>
    <div></div>
    <div class="center-align">
      <div class="export-button" @click="exportBBCode">Export BBCode</div>
    </div>
    <!--  -->
    <div class="left-align b-top b-right capabilities col2">{{capabilities}}</div>
    <div class="right-align b-top">Design Weight</div>
    <div class="right-align b-top double-right">{{weights.design}}kt</div>
    <div class="center-align b-top span2">{{finalStats.br}}BR</div>
    <div class="center-align b-right b-top span2">{{finalStats.sr}}SR</div>
    <div class="center-align b-right b-top crew-stat">O{{finalStats.o}}</div>
    <div class="center-align b-right b-top crew-stat">EN{{finalStats.en}}</div>
    <div class="center-align double-right b-top crew-stat">T{{finalStats.t}}</div>
    <div></div>
    <div class="center-align">
      <div class="export-button" @click="downloadJSON">Download As File</div>
      <a ref="downloadShipJSON" style="display:none"></a>
    </div>
    <!--  -->
    <div class="right-align max-weight col3">Max Weight</div>
    <div class="right-align double-right">{{weights.max}}kt</div>
    <div v-for="s of shipStats" :key="s" class="b-right b-top center-align rounded-stat">
      {{s.toUpperCase()}}{{finalStats[s]}}
    </div>
  </div>
</template>

<script>
import BBCodeExport from '@/lib/bbcodeExport'

export default {
  name: 'DesignSummary',
  data () {
    return {
      shipStats: ['c', 's', 'h', 'l', 'p', 'e', 'r'],
      roundingFunctions: {
        c: s => Math.floor(s),
        s: s => Math.floor(s),
        h: s => Math.floor(s),
        l: s => Math.floor(s),
        p: s => Math.floor(s),
        e: s => Math.floor(s),
        r: s => Math.floor(s),
        pen: this.roundPercents,
        ev: this.roundPercents,
        br: this.roundRes,
        sr: this.roundRes,
        o: this.roundCrew,
        en: this.roundCrew,
        t: this.roundCrew
      }
    }
  },
  computed: {
    className: {
      get () {
        return this.$store.state.design.className
      },
      set (val) {
        this.$store.commit('setClassName', val)
      }
    },
    platformType () {
      return ['', 'Frigate', 'Cruiser', 'Explorer'][this.$store.state.design.platformGrade]
    },
    weights () {
      return this.$store.getters.weights
    },
    finalStats () {
      let tStats = { ...this.$store.getters.totalStats, br: this.br }
      Object.keys(tStats).forEach(s => {
        tStats[s] = this.roundingFunctions[s](tStats[s])
      })
      return tStats
    },
    br () {
      return this.$store.getters.weights.design / 10 + this.$store.getters.totalStats.br
    },
    buildTime () {
      return this.$store.getters.buildTime
    },
    capabilities () {
      let cap = this.$store.state.design.slots
        .filter(s => s.module)
        .map(s => this.$store.getters.partByName(s.module).special)
        .filter(s => s)
        .map(s => s.replace(/ /g, '\xa0'))
      return [...new Set(cap)].join(', ')
    },
    // styles
    col2Width () {
      return this.$store.state.ui.designTable.col2Width
    },
    gridStyle () {
      return {
        gridTemplateColumns: `70px ${this.col2Width - 109}px 110px 90px repeat(7,40px) minmax(20px, 1fr) 150px 20px`
      }
    },
    // save and export
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
    roundCrew (c) {
      return Math.ceil(c / 10)
    },
    roundRes (r) {
      let step = this.$store.state.design.platformGrade === 1 ? 5 : 10
      return step * Math.ceil(r / step)
    },
    roundPercents (s) {
      return Math.round(s * 1000) / 10
    },
    saveDesign () {
      return new Promise((resolve, reject) => {
        if (this.$store.state.design.className) {
          let design = JSON.parse(JSON.stringify(this.$store.state.design))
          let savedDesign = {
            name: design.className,
            stats: this.$store.getters.roundedStats,
            partList: design.partList,
            design
          }
          if (this.editingDesign === null) {
            this.$store.dispatch('saveNewDesign', savedDesign).then(() => {
              resolve()
            })
          } else {
            this.$store.dispatch('saveExistingDesign', savedDesign).then(() => {
              resolve()
            })
          }
        } else {
          reject(new Error('No class name'))
        }
      })
    },
    saveAndExit () {
      this.saveDesign().then(() => {
        this.$router.push('/')
        this.$store.dispatch('clearDesign')
        this.$store.commit('clearEditing')
      }).catch((e) => {
        alert('Please enter a name for the class!')
      })
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
.design-summary {
  background-color: lightblue;
  flex: 0 0 auto;
  display: grid;
  grid-auto-rows: 30px;
  line-height: 30px;
  overflow-x: auto;
  font-size: 11pt;
}
.design-summary::-webkit-scrollbar {
  display: none;
}
.col1 {
  grid-column-start: 1;
}
.col2 {
  grid-column-start: 2;
}
.col3 {
  grid-column-start: 3;
}
.build-time {
  grid-column: span 3;
}
.capabilities {
  grid-row: span 2;
  font-size: 10pt;
  line-height: 18px;
  padding-top: 2px;
  overflow-y: auto;
}
.span2 {
  grid-column: span 2;
}
.back-button {
  grid-row: 1 / 4;
  line-height: 90px;
  font-size: 50pt;
  border-right: 2px solid black;
  cursor: pointer;
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
.crew-stat {
  font-size: 10pt;
}
.class-name-input {
  margin: 2px 0;
  border: none;
  height: 24px;
  font-size: 12pt;
  text-align: center;
  width: calc(100% - 10px);
}
.b-right {
  border-right: 1px solid grey;
}
.double-right {
  border-right: 3px double grey;
}
.b-top {
  border-top: 1px solid grey;
}
.rounded-stat:last-child {
  border-right: 3px double grey;
}
.export-button {
  background-color: mediumseagreen;
  border-radius: 14px;
  height: 26px;
  line-height: 26px;
  margin: 2px auto;
  width: 150px;
  cursor: pointer;
}
</style>
