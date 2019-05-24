<template>
  <div class="design-summary" :style="[gridStyle]">
    <div class="right-align col1">Class Name</div>
    <div class="left-align b-right">
      <input type="text" class="class-name-input" v-model="className">
    </div>
    <div class="right-align">Max Weight</div>
    <div class="right-align b-right">{{weights.max}}kt</div>
    <div class="center-align b-right b-under build-time">Build Time: {{buildTime}} Years</div>
    <div class="center-align ev-pen b-right">
      <div>{{finalStats.ev}}% Ev</div>
      <div>{{finalStats.pen}}% Pen</div>
    </div>
    <!-- <div class="b-right"></div> -->
    <div class="center-align b-right crew-stat">O{{finalStats.o}}</div>
    <div class="center-align b-right crew-stat">EN{{finalStats.en}}</div>
    <div class="center-align b-right crew-stat">T{{finalStats.t}}</div>
    <!--  -->
    <div class="right-align col1">Platform Type</div>
    <div class="left-align b-right">{{platformType}}</div>
    <div class="right-align">Design Weight</div>
    <div class="right-align b-right">{{weights.design}}kt</div>
    <div class="right-align b-top">{{finalStats.br}}BR</div>
    <div class="right-align b-right b-top">{{finalStats.sr}}SR</div>
    <div class="b-right b-top right-align">Rounded:</div>
    <div v-for="s of shipStats" :key="s" class="b-right b-top center-align">
      {{s.toUpperCase()}}{{finalStats[s]}}
      </div>
  </div>
</template>

<script>
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
    // styles
    col2Width () {
      return this.$store.state.ui.designTable.col2Width
    },
    gridStyle () {
      return {
        gridTemplateColumns: `120px ${this.col2Width - 179}px 110px 70px 100px 70px 90px repeat(7,40px)`
      }
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
    }
  }
}
</script>

<style scoped>
.design-summary {
  background-color: lightblue;
  flex: 0 0 60px;
  display: grid;
  grid-template-rows: 30px 30px;
  line-height: 30px;
  overflow-x: auto;
  font-size: 11pt;
}
.col1 {
  grid-column-start: 1;
}
.build-time {
  grid-column: 5 / 7;
}
.ev-pen {
  grid-column: 7 / 9;
}
.ev-pen>div {
  display: inline-block;
  width: 50%;
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
</style>
