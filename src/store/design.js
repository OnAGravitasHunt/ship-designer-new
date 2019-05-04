export default {
  state: {
    className: 'Comet Study 1',
    classGrade: 1, // should be looked up based on platform
    platform: "2310s 500-1000kt Frigate 'Kepler' 'Comet'",
    slots: {
      infrastructure: {
        hullform: {
          module: 'Economy Hull',
          techTier: 1
        },
        warpCore: {
          module: 'Small Annihilation Core',
          techTier: 1
        },
        warpNacelles: {
          module: 'Compact High Performance Pattern Nacelles',
          techTier: 1
        },
        computer: {
          module: 'SMP Core',
          techTier: 1
        },
        deflectorDish: {
          module: 'Response Pattern Deflector',
          techTier: 1
        }
      }
    }
  },
  mutations: {
    setClassName (state, name) {
      state.className = name
    }
  }
}