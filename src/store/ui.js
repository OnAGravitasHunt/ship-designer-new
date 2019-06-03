export default {
  state: {
    designTable: {
      columns: [
        { key: 'slotType', title: 'Slot Type', width: '70px', headingComp: 'HeaderCell', tableComp: 'SlotTableCell' },
        { key: 'refit', title: 'Refit', width: '30px', headingComp: 'HeaderCell', tableComp: 'RefitTableCell' },
        { key: 'name', title: 'Name', width: 'minmax(330px, 1fr)', headingComp: 'HeaderCell', tableComp: 'NameTableCell' },
        { key: 'techTier', title: 'Tech Tier', width: '60px', headingComp: 'HeaderCell', tableComp: 'TierTableCell', border: true },
        { key: 'c', title: 'C', width: '40px', headingComp: 'StatHeaderCell', tableComp: 'StatTableCell' },
        { key: 's', title: 'S', width: '40px', headingComp: 'StatHeaderCell', tableComp: 'StatTableCell' },
        { key: 'h', title: 'H', width: '40px', headingComp: 'StatHeaderCell', tableComp: 'StatTableCell' },
        { key: 'l', title: 'L', width: '40px', headingComp: 'StatHeaderCell', tableComp: 'StatTableCell' },
        { key: 'p', title: 'P', width: '40px', headingComp: 'StatHeaderCell', tableComp: 'StatTableCell' },
        { key: 'e', title: 'E', width: '40px', headingComp: 'StatHeaderCell', tableComp: 'StatTableCell' },
        { key: 'r', title: 'R', width: '40px', headingComp: 'StatHeaderCell', tableComp: 'StatTableCell', border: true },
        { key: 'br', title: 'BR', width: '50px', headingComp: 'CostHeaderCell', tableComp: 'StatTableCell' },
        { key: 'sr', title: 'SR', width: '50px', headingComp: 'CostHeaderCell', tableComp: 'StatTableCell' },
        { key: 'o', title: 'O', width: '40px', headingComp: 'CostHeaderCell', tableComp: 'StatTableCell' },
        { key: 'en', title: 'EN', width: '50px', headingComp: 'CostHeaderCell', tableComp: 'StatTableCell' },
        { key: 't', title: 'T', width: '40px', headingComp: 'CostHeaderCell', tableComp: 'StatTableCell', border: true },
        { key: 'ev', title: 'Ev', width: '60px', headingComp: 'PercentHeaderCell', tableComp: 'PercentTableCell' },
        { key: 'pen', title: 'Pen', width: '60px', headingComp: 'PercentHeaderCell', tableComp: 'PercentTableCell', border: true },
        { key: 'type', title: 'Module Type', width: '100px', headingComp: 'HeaderCell', tableComp: 'TableCell' },
        { key: 'slot', title: 'Module Slot', width: '90px', headingComp: 'HeaderCell', tableComp: 'TableCell' }
      ],
      col2Width: 340
    }
  },
  getters: {
    getGridTemplateColumns (state) {
      return {
        gridTemplateColumns: state.designTable.columns.map(w => w.width).join(' ')
      }
    }
  },
  mutations: {
    setCol2Width (state, newWidth) {
      state.designTable.col2Width = newWidth
    }
  }
}
