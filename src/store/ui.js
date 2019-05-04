export default {
  state: {
    designTable: {
      columnWidths: [
        { heading: 'slotType', width: '100px' },
        { heading: 'name', width: 'minmax(320px, 1fr)' },
        { heading: 'techTier', width: '70px' },
        { heading: 'moduleType', width: '100px' },
        { heading: 'moduleSlot', width: '100px' },
        { heading: 'c', width: '40px' },
        { heading: 's', width: '40px' },
        { heading: 'h', width: '40px' },
        { heading: 'l', width: '40px' },
        { heading: 'p', width: '40px' },
        { heading: 'e', width: '40px' },
        { heading: 'r', width: '40px' },
        { heading: 'ev', width: '70px' },
        { heading: 'pen', width: '80px' },
        { heading: 'br', width: '60px' },
        { heading: 'sr', width: '60px' },
        { heading: 'o', width: '40px' },
        { heading: 'en', width: '40px' },
        { heading: 't', width: '40px' }
      ]
    }
  },
  getters: {
    getGridCols (state) {
      return {
        gridTemplateColumns: state.designTable.columnWidths.map(w => w.width).join(' ')
      }
    }
  }
}
