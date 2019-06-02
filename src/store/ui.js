export default {
  state: {
    designTable: {
      columns: [
        { key: 'slotType', title: 'Slot Type', width: '90px', headingComp: 'HeaderCell', tableComp: 'SlotTableCell' },
        { key: 'refit', title: 'Refit', width: '30px', headingComp: 'HeaderCell', tableComp: 'RefitTableCell' },
        { key: 'name', title: 'Name', width: 'minmax(350px, 1fr)', headingComp: 'HeaderCell', tableComp: 'NameTableCell' },
        { key: 'techTier', title: 'Tech Tier', width: '70px', headingComp: 'HeaderCell', tableComp: 'TableCell' },
        { key: 'moduleType', title: 'Module Type', width: '100px', headingComp: 'HeaderCell', tableComp: 'TableCell' },
        { key: 'moduleSlot', title: 'Module Slot', width: '90px', headingComp: 'HeaderCell', tableComp: 'TableCell' },
        { key: 'c', title: 'C', width: '40px', headingComp: 'StatHeaderCell', tableComp: 'TableCell' },
        { key: 's', title: 'S', width: '40px', headingComp: 'StatHeaderCell', tableComp: 'TableCell' },
        { key: 'h', title: 'H', width: '40px', headingComp: 'StatHeaderCell', tableComp: 'TableCell' },
        { key: 'l', title: 'L', width: '40px', headingComp: 'StatHeaderCell', tableComp: 'TableCell' },
        { key: 'p', title: 'P', width: '40px', headingComp: 'StatHeaderCell', tableComp: 'TableCell' },
        { key: 'e', title: 'E', width: '40px', headingComp: 'StatHeaderCell', tableComp: 'TableCell' },
        { key: 'r', title: 'R', width: '40px', headingComp: 'StatHeaderCell', tableComp: 'TableCell' },
        { key: 'ev', title: 'Ev', width: '60px', headingComp: 'PercentHeaderCell', tableComp: 'PercentTableCell' },
        { key: 'pen', title: 'Pen', width: '60px', headingComp: 'PercentHeaderCell', tableComp: 'PercentTableCell' },
        { key: 'br', title: 'BR', width: '50px', headingComp: 'CostHeaderCell', tableComp: 'TableCell' },
        { key: 'sr', title: 'SR', width: '50px', headingComp: 'CostHeaderCell', tableComp: 'TableCell' },
        { key: 'o', title: 'O', width: '40px', headingComp: 'CostHeaderCell', tableComp: 'TableCell' },
        { key: 'en', title: 'EN', width: '40px', headingComp: 'CostHeaderCell', tableComp: 'TableCell' },
        { key: 't', title: 'T', width: '40px', headingComp: 'CostHeaderCell', tableComp: 'TableCell' }
      ],
      col2Width: 350
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
