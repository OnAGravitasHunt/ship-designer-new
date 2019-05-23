export default {
  state: {
    designTable: {
      columnWidths: [
        { key: 'slotType', width: '100px', headingComp: 'HeadingCell', tableComp: 'SlotTypeCell' },
        { key: 'refit', width: '30px', headingComp: 'HeadingCell', tableComp: 'RefitTableCell' },
        { key: 'name', width: 'minmax(350px, 1fr)', headingComp: 'HeadingCell', tableComp: 'NameTableCell' },
        { key: 'techTier', width: '70px', headingComp: 'HeadingCell', tableComp: 'TableCell' },
        { key: 'moduleType', width: '100px', headingComp: 'HeadingCell', tableComp: 'TableCell' },
        { key: 'moduleSlot', width: '90px', headingComp: 'HeadingCell', tableComp: 'TableCell' },
        { key: 'c', width: '40px', headingComp: 'StatHeadingCell', tableComp: 'TableCell' },
        { key: 's', width: '40px', headingComp: 'StatHeadingCell', tableComp: 'TableCell' },
        { key: 'h', width: '40px', headingComp: 'StatHeadingCell', tableComp: 'TableCell' },
        { key: 'l', width: '40px', headingComp: 'StatHeadingCell', tableComp: 'TableCell' },
        { key: 'p', width: '40px', headingComp: 'StatHeadingCell', tableComp: 'TableCell' },
        { key: 'e', width: '40px', headingComp: 'StatHeadingCell', tableComp: 'TableCell' },
        { key: 'r', width: '40px', headingComp: 'StatHeadingCell', tableComp: 'TableCell' },
        { key: 'ev', width: '70px', headingComp: 'PercentHeadingCell', tableComp: 'PercentTableCell' },
        { key: 'pen', width: '80px', headingComp: 'PercentHeadingCell', tableComp: 'TablePercentTableCellCell' },
        { key: 'br', width: '60px', headingComp: 'CostHeadingCell', tableComp: 'TableCell' },
        { key: 'sr', width: '60px', headingComp: 'CostHeadingCell', tableComp: 'TableCell' },
        { key: 'o', width: '40px', headingComp: 'CostHeadingCell', tableComp: 'TableCell' },
        { key: 'en', width: '40px', headingComp: 'CostHeadingCell', tableComp: 'TableCell' },
        { key: 't', width: '40px', headingComp: 'CostHeadingCell', tableComp: 'TableCell' }
      ],
      col2Width: 350
    }
  },
  getters: {
    getGridTemplateColumns (state) {
      return {
        gridTemplateColumns: state.designTable.columnWidths.map(w => w.width).join(' ')
      }
    }
  },
  mutations: {
    setCol2Width (state, newWidth) {
      state.designTable.col2Width = newWidth
    }
  }
}
