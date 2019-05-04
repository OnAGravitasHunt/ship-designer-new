export default {
  state: {
    designTable: {
      columnWidths: [
        { heading: 'slotType', width: 150 },
        { heading: 'name', width: 200 },
        { heading: 'techTier', width: 80 },
        { heading: 'moduleType', width: 100 },
        { heading: 'moduleSlot', width: 100 },
        { heading: 'c', width: 40 },
        { heading: 's', width: 40 },
        { heading: 'h', width: 40 },
        { heading: 'l', width: 40 },
        { heading: 'p', width: 40 },
        { heading: 'e', width: 40 },
        { heading: 'r', width: 40 },
        { heading: 'ev', width: 80 },
        { heading: 'pen', width: 90 },
        { heading: 'br', width: 60 },
        { heading: 'sr', width: 60 },
        { heading: 'o', width: 40 },
        { heading: 'en', width: 40 },
        { heading: 't', width: 40 }
      ]
    }
  },
  getters: {
    getGridCols (state) {
      return {
        gridTemplateColumns: state.designTable.columnWidths.map(w => `${w.width}px`).join(' ')
      }
    }
  }
}
