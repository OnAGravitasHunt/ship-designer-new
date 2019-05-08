<template>
  <div class="ship-design">
    <div class="table-cell">Sovereign</div>
    <div class="table-cell">Explorer</div>
    <div class="table-cell">Starfleet</div>
    <div class="table-cell">{{shipStats}}</div>
    <div class="table-cell">{{crewing}}</div>
    <div class="table-cell">{{resources}}</div>
    <div class="table-cell"></div>
  </div>
</template>

<script>
export default {
  name: 'ShipDesign',
  data () {
    return {
      name: 'Sovereign',
      platform: 'Explorer',
      partList: 'Starfleet',
      stats: {
        c: 24,
        s: 15,
        h: 13,
        l: 15,
        p: 14,
        e: 16,
        r: 18,
        o: 10,
        en: 15,
        t: 12,
        br: 500,
        sr: 475
      }
    }
  },
  computed: {
    shipStats () {
      return ['C', 'S', 'H', 'L', 'P', 'E', 'R']
        .map(s => `${s}${this.stats[s.toLowerCase()]}`)
        .join(' ')
    },
    crewing () {
      return ['O', 'EN', 'T']
        .map(c => `${c}${this.stats[c.toLowerCase()]}`)
        .join(' ')
    },
    resources () {
      return ['BR', 'SR']
        .map(r => `${this.stats[r.toLowerCase()]}${r}`)
        .join(' ')
    }
  }
}
</script>

<style scoped>
.ship-design {
  margin: 0 auto;
  display: grid;
  grid-template-columns: 6fr 4fr 4fr minmax(220px, 6fr) 4fr 4fr 60px;
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
</style>
