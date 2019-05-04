export default {
  state: {
    className: 'Comet Study 1',
    classGrade: 1, // should be looked up based on platform
    platform: "2310s 500-1000kt Frigate 'Kepler' 'Comet'",
    slots: [
      {
        module: 'Armored Hull',
        techTier: 1
      },
      {
        module: 'Small Annihilation Core (FC)',
        techTier: 1
      },
      {
        module: 'Compact High Performance Pattern Nacelles',
        techTier: 1
      },
      {
        module: 'SMP Core',
        techTier: 1
      },
      {
        module: 'Response Pattern Deflector',
        techTier: 1
      }
    ]
  },
  mutations: {
    setClassName (state, name) {
      state.className = name
    },
    // set slot properties; properties object must contain 'module' or 'techTier'
    setSlotProperties (state, { index, properties }) {
      state.slots.splice(index, 1, { ...state.slots[index], ...properties })
    }
  }
}
