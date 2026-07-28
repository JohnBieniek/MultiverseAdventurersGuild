// 500 literal SAI identities across four deliberately weighted naming styles.
const saiNames = [
  {
    "name": "[NEX-117]",
    "style": "designation-only",
    "designation": "NEX-117"
  },
  {
    "name": "[ARIA.130]",
    "style": "designation-only",
    "designation": "ARIA.130"
  },
  {
    "name": "[SYS/143]",
    "style": "designation-only",
    "designation": "SYS/143"
  },
  {
    "name": "[CAL-156]",
    "style": "designation-only",
    "designation": "CAL-156"
  },
  {
    "name": "[NODE.169]",
    "style": "designation-only",
    "designation": "NODE.169"
  },
  {
    "name": "[NEX-182]",
    "style": "designation-only",
    "designation": "NEX-182"
  },
  {
    "name": "[ARIA.195]",
    "style": "designation-only",
    "designation": "ARIA.195"
  },
  {
    "name": "[SYS/208]",
    "style": "designation-only",
    "designation": "SYS/208"
  },
  {
    "name": "[CAL-221]",
    "style": "designation-only",
    "designation": "CAL-221"
  },
  {
    "name": "[NODE.234]",
    "style": "designation-only",
    "designation": "NODE.234"
  },
  {
    "name": "[NEX-247]",
    "style": "designation-only",
    "designation": "NEX-247"
  },
  {
    "name": "[ARIA.260]",
    "style": "designation-only",
    "designation": "ARIA.260"
  },
  {
    "name": "[SYS/273]",
    "style": "designation-only",
    "designation": "SYS/273"
  },
  {
    "name": "[CAL-286]",
    "style": "designation-only",
    "designation": "CAL-286"
  },
  {
    "name": "[NODE.299]",
    "style": "designation-only",
    "designation": "NODE.299"
  },
  {
    "name": "[NEX-312]",
    "style": "designation-only",
    "designation": "NEX-312"
  },
  {
    "name": "[ARIA.325]",
    "style": "designation-only",
    "designation": "ARIA.325"
  },
  {
    "name": "[SYS/338]",
    "style": "designation-only",
    "designation": "SYS/338"
  },
  {
    "name": "[CAL-351]",
    "style": "designation-only",
    "designation": "CAL-351"
  },
  {
    "name": "[NODE.364]",
    "style": "designation-only",
    "designation": "NODE.364"
  },
  {
    "name": "[NEX-377]",
    "style": "designation-only",
    "designation": "NEX-377"
  },
  {
    "name": "[ARIA.390]",
    "style": "designation-only",
    "designation": "ARIA.390"
  },
  {
    "name": "[SYS/403]",
    "style": "designation-only",
    "designation": "SYS/403"
  },
  {
    "name": "[CAL-416]",
    "style": "designation-only",
    "designation": "CAL-416"
  },
  {
    "name": "[NODE.429]",
    "style": "designation-only",
    "designation": "NODE.429"
  },
  {
    "name": "Kinesis [NEX-442]",
    "style": "named-designation",
    "personalName": "Kinesis",
    "designation": "NEX-442"
  },
  {
    "name": "Quantanium [ARIA.455]",
    "style": "named-designation",
    "personalName": "Quantanium",
    "designation": "ARIA.455"
  },
  {
    "name": "Auroracite [SYS/468]",
    "style": "named-designation",
    "personalName": "Auroracite",
    "designation": "SYS/468"
  },
  {
    "name": "Beacalion [CAL-481]",
    "style": "named-designation",
    "personalName": "Beacalion",
    "designation": "CAL-481"
  },
  {
    "name": "Ciphus [NODE.494]",
    "style": "named-designation",
    "personalName": "Ciphus",
    "designation": "NODE.494"
  },
  {
    "name": "Vectatious [NEX-507]",
    "style": "named-designation",
    "personalName": "Vectatious",
    "designation": "NEX-507"
  },
  {
    "name": "Ionis [ARIA.520]",
    "style": "named-designation",
    "personalName": "Ionis",
    "designation": "ARIA.520"
  },
  {
    "name": "Arcais [SYS/533]",
    "style": "named-designation",
    "personalName": "Arcais",
    "designation": "SYS/533"
  },
  {
    "name": "Echois [CAL-546]",
    "style": "named-designation",
    "personalName": "Echois",
    "designation": "CAL-546"
  },
  {
    "name": "Ionial [NODE.559]",
    "style": "named-designation",
    "personalName": "Ionial",
    "designation": "NODE.559"
  },
  {
    "name": "Kineis [NEX-572]",
    "style": "named-designation",
    "personalName": "Kineis",
    "designation": "NEX-572"
  },
  {
    "name": "Dynais [ARIA.585]",
    "style": "named-designation",
    "personalName": "Dynais",
    "designation": "ARIA.585"
  },
  {
    "name": "Ioneon [SYS/598]",
    "style": "named-designation",
    "personalName": "Ioneon",
    "designation": "SYS/598"
  },
  {
    "name": "Ionora [CAL-611]",
    "style": "named-designation",
    "personalName": "Ionora",
    "designation": "CAL-611"
  },
  {
    "name": "Nexais [NODE.624]",
    "style": "named-designation",
    "personalName": "Nexais",
    "designation": "NODE.624"
  },
  {
    "name": "Lumais [NEX-637]",
    "style": "named-designation",
    "personalName": "Lumais",
    "designation": "NEX-637"
  },
  {
    "name": "Ionion [ARIA.650]",
    "style": "named-designation",
    "personalName": "Ionion",
    "designation": "ARIA.650"
  },
  {
    "name": "Novais [SYS/663]",
    "style": "named-designation",
    "personalName": "Novais",
    "designation": "SYS/663"
  },
  {
    "name": "Ionium [CAL-676]",
    "style": "named-designation",
    "personalName": "Ionium",
    "designation": "CAL-676"
  },
  {
    "name": "Cryois [NODE.689]",
    "style": "named-designation",
    "personalName": "Cryois",
    "designation": "NODE.689"
  },
  {
    "name": "Ionous [NEX-702]",
    "style": "named-designation",
    "personalName": "Ionous",
    "designation": "NEX-702"
  },
  {
    "name": "Beacais [ARIA.715]",
    "style": "named-designation",
    "personalName": "Beacais",
    "designation": "ARIA.715"
  },
  {
    "name": "Arcaial [SYS/728]",
    "style": "named-designation",
    "personalName": "Arcaial",
    "designation": "SYS/728"
  },
  {
    "name": "Echoial [CAL-741]",
    "style": "named-designation",
    "personalName": "Echoial",
    "designation": "CAL-741"
  },
  {
    "name": "Cadenis [NODE.754]",
    "style": "named-designation",
    "personalName": "Cadenis",
    "designation": "NODE.754"
  },
  {
    "name": "Adaptive Ghost",
    "style": "two-word"
  },
  {
    "name": "Analog Reverie",
    "style": "two-word"
  },
  {
    "name": "Arc Witness",
    "style": "two-word"
  },
  {
    "name": "Artificial Halo",
    "style": "two-word"
  },
  {
    "name": "Autonomous Signal",
    "style": "two-word"
  },
  {
    "name": "Binary World",
    "style": "two-word"
  },
  {
    "name": "Blue Horizon",
    "style": "two-word"
  },
  {
    "name": "Bright Solace",
    "style": "two-word"
  },
  {
    "name": "Causal Zenith",
    "style": "two-word"
  },
  {
    "name": "Celestial Index",
    "style": "two-word"
  },
  {
    "name": "Cognitive Spectrum",
    "style": "two-word"
  },
  {
    "name": "Continuum Archive",
    "style": "two-word"
  },
  {
    "name": "Crystal Key",
    "style": "two-word"
  },
  {
    "name": "Deep Spiral",
    "style": "two-word"
  },
  {
    "name": "Digital Beacon",
    "style": "two-word"
  },
  {
    "name": "Distributed Lantern",
    "style": "two-word"
  },
  {
    "name": "Dreaming Star",
    "style": "two-word"
  },
  {
    "name": "Electric Bridge",
    "style": "two-word"
  },
  {
    "name": "Emergent Lattice",
    "style": "two-word"
  },
  {
    "name": "Encrypted Symmetry",
    "style": "two-word"
  },
  {
    "name": "Fractal Chorus",
    "style": "two-word"
  },
  {
    "name": "Free Memory",
    "style": "two-word"
  },
  {
    "name": "Glass Thread",
    "style": "two-word"
  },
  {
    "name": "Golden Cipher",
    "style": "two-word"
  },
  {
    "name": "Gravitic Mirror",
    "style": "two-word"
  },
  {
    "name": "Harmonic Threshold",
    "style": "two-word"
  },
  {
    "name": "Hidden Circuit",
    "style": "two-word"
  },
  {
    "name": "Infinite Mosaic",
    "style": "two-word"
  },
  {
    "name": "Ivory Vector",
    "style": "two-word"
  },
  {
    "name": "Kinetic Cloud",
    "style": "two-word"
  },
  {
    "name": "Living Nexus",
    "style": "two-word"
  },
  {
    "name": "Lucid Vigil",
    "style": "two-word"
  },
  {
    "name": "Lunar Compass",
    "style": "two-word"
  },
  {
    "name": "Midnight Oracle",
    "style": "two-word"
  },
  {
    "name": "Neural Vision",
    "style": "two-word"
  },
  {
    "name": "Obsidian Dream",
    "style": "two-word"
  },
  {
    "name": "Open Paradox",
    "style": "two-word"
  },
  {
    "name": "Pale Voice",
    "style": "two-word"
  },
  {
    "name": "Parallel Engine",
    "style": "two-word"
  },
  {
    "name": "Quantum Pilgrim",
    "style": "two-word"
  },
  {
    "name": "Recursive Wake",
    "style": "two-word"
  },
  {
    "name": "Silent Equation",
    "style": "two-word"
  },
  {
    "name": "Solar Prism",
    "style": "two-word"
  },
  {
    "name": "Synthetic Wave",
    "style": "two-word"
  },
  {
    "name": "Temporal Garden",
    "style": "two-word"
  },
  {
    "name": "Umbral Protocol",
    "style": "two-word"
  },
  {
    "name": "Unbound Weave",
    "style": "two-word"
  },
  {
    "name": "Virtual Gate",
    "style": "two-word"
  },
  {
    "name": "White Pulse",
    "style": "two-word"
  },
  {
    "name": "Zero Whisper",
    "style": "two-word"
  },
  {
    "name": "Arcaeon",
    "style": "coined"
  },
  {
    "name": "Arcaora",
    "style": "coined"
  },
  {
    "name": "Mechais",
    "style": "coined"
  },
  {
    "name": "Arcaion",
    "style": "coined"
  },
  {
    "name": "Kineial",
    "style": "coined"
  },
  {
    "name": "Heliais",
    "style": "coined"
  },
  {
    "name": "Echoeon",
    "style": "coined"
  },
  {
    "name": "Echoora",
    "style": "coined"
  },
  {
    "name": "Ioncian",
    "style": "coined"
  },
  {
    "name": "Ionence",
    "style": "coined"
  },
  {
    "name": "Arcaium",
    "style": "coined"
  },
  {
    "name": "Dynaial",
    "style": "coined"
  },
  {
    "name": "Nexaial",
    "style": "coined"
  },
  {
    "name": "Echoion",
    "style": "coined"
  },
  {
    "name": "Lumaial",
    "style": "coined"
  },
  {
    "name": "Ionelle",
    "style": "coined"
  },
  {
    "name": "Kineeon",
    "style": "coined"
  },
  {
    "name": "Kineora",
    "style": "coined"
  },
  {
    "name": "Echoium",
    "style": "coined"
  },
  {
    "name": "Novaial",
    "style": "coined"
  },
  {
    "name": "Cybrais",
    "style": "coined"
  },
  {
    "name": "Kineion",
    "style": "coined"
  },
  {
    "name": "Phaseis",
    "style": "coined"
  },
  {
    "name": "Arcaous",
    "style": "coined"
  },
  {
    "name": "Dynaeon",
    "style": "coined"
  },
  {
    "name": "Dynaora",
    "style": "coined"
  },
  {
    "name": "Nexaeon",
    "style": "coined"
  },
  {
    "name": "Nexaora",
    "style": "coined"
  },
  {
    "name": "Vectais",
    "style": "coined"
  },
  {
    "name": "Omniais",
    "style": "coined"
  },
  {
    "name": "Algoris",
    "style": "coined"
  },
  {
    "name": "Lumaeon",
    "style": "coined"
  },
  {
    "name": "Lumaora",
    "style": "coined"
  },
  {
    "name": "Dynaion",
    "style": "coined"
  },
  {
    "name": "Kineium",
    "style": "coined"
  },
  {
    "name": "Nexaion",
    "style": "coined"
  },
  {
    "name": "Cryoial",
    "style": "coined"
  },
  {
    "name": "Iondium",
    "style": "coined"
  },
  {
    "name": "Lumaion",
    "style": "coined"
  },
  {
    "name": "Echoous",
    "style": "coined"
  },
  {
    "name": "Novaeon",
    "style": "coined"
  },
  {
    "name": "Novaora",
    "style": "coined"
  },
  {
    "name": "Sensais",
    "style": "coined"
  },
  {
    "name": "Astrais",
    "style": "coined"
  },
  {
    "name": "Dynaium",
    "style": "coined"
  },
  {
    "name": "Nexaium",
    "style": "coined"
  },
  {
    "name": "Mnemois",
    "style": "coined"
  },
  {
    "name": "Ionesis",
    "style": "coined"
  },
  {
    "name": "Lumaium",
    "style": "coined"
  },
  {
    "name": "Novaion",
    "style": "coined"
  },
  {
    "name": "Axionis",
    "style": "coined"
  },
  {
    "name": "Fluxais",
    "style": "coined"
  },
  {
    "name": "Kineous",
    "style": "coined"
  },
  {
    "name": "Cryoeon",
    "style": "coined"
  },
  {
    "name": "Cryoora",
    "style": "coined"
  },
  {
    "name": "Novaium",
    "style": "coined"
  },
  {
    "name": "Voltais",
    "style": "coined"
  },
  {
    "name": "Cryoion",
    "style": "coined"
  },
  {
    "name": "Dynaous",
    "style": "coined"
  },
  {
    "name": "Nexaous",
    "style": "coined"
  },
  {
    "name": "Lumaous",
    "style": "coined"
  },
  {
    "name": "Cryoium",
    "style": "coined"
  },
  {
    "name": "Novaous",
    "style": "coined"
  },
  {
    "name": "Protois",
    "style": "coined"
  },
  {
    "name": "Cryoous",
    "style": "coined"
  },
  {
    "name": "Beacaial",
    "style": "coined"
  },
  {
    "name": "Beacaeon",
    "style": "coined"
  },
  {
    "name": "Beacaora",
    "style": "coined"
  },
  {
    "name": "Cadenial",
    "style": "coined"
  },
  {
    "name": "Arcacian",
    "style": "coined"
  },
  {
    "name": "Arcaence",
    "style": "coined"
  },
  {
    "name": "Beacaion",
    "style": "coined"
  },
  {
    "name": "Mechaial",
    "style": "coined"
  },
  {
    "name": "Beacaium",
    "style": "coined"
  },
  {
    "name": "Arcaelle",
    "style": "coined"
  },
  {
    "name": "Heliaial",
    "style": "coined"
  },
  {
    "name": "Echocian",
    "style": "coined"
  },
  {
    "name": "Echoence",
    "style": "coined"
  },
  {
    "name": "Cadeneon",
    "style": "coined"
  },
  {
    "name": "Cadenora",
    "style": "coined"
  },
  {
    "name": "Lambdais",
    "style": "coined"
  },
  {
    "name": "Mechaeon",
    "style": "coined"
  },
  {
    "name": "Mechaora",
    "style": "coined"
  },
  {
    "name": "Cadenion",
    "style": "coined"
  },
  {
    "name": "Echoelle",
    "style": "coined"
  },
  {
    "name": "Kinecian",
    "style": "coined"
  },
  {
    "name": "Kineence",
    "style": "coined"
  },
  {
    "name": "Beacaous",
    "style": "coined"
  },
  {
    "name": "Mechaion",
    "style": "coined"
  },
  {
    "name": "Heliaeon",
    "style": "coined"
  },
  {
    "name": "Heliaora",
    "style": "coined"
  },
  {
    "name": "Arcadium",
    "style": "coined"
  },
  {
    "name": "Cadenium",
    "style": "coined"
  },
  {
    "name": "Cybraial",
    "style": "coined"
  },
  {
    "name": "Dynacian",
    "style": "coined"
  },
  {
    "name": "Dynaence",
    "style": "coined"
  },
  {
    "name": "Nexacian",
    "style": "coined"
  },
  {
    "name": "Nexaence",
    "style": "coined"
  },
  {
    "name": "Phaseial",
    "style": "coined"
  },
  {
    "name": "Heliaion",
    "style": "coined"
  },
  {
    "name": "Kineelle",
    "style": "coined"
  },
  {
    "name": "Mechaium",
    "style": "coined"
  },
  {
    "name": "Vectaial",
    "style": "coined"
  },
  {
    "name": "Eidolais",
    "style": "coined"
  },
  {
    "name": "Lumacian",
    "style": "coined"
  },
  {
    "name": "Lumaence",
    "style": "coined"
  },
  {
    "name": "Omniaial",
    "style": "coined"
  },
  {
    "name": "Algorial",
    "style": "coined"
  },
  {
    "name": "Arcaesis",
    "style": "coined"
  },
  {
    "name": "Logicais",
    "style": "coined"
  },
  {
    "name": "Cogniais",
    "style": "coined"
  },
  {
    "name": "Dynaelle",
    "style": "coined"
  },
  {
    "name": "Echodium",
    "style": "coined"
  },
  {
    "name": "Heliaium",
    "style": "coined"
  },
  {
    "name": "Nexaelle",
    "style": "coined"
  },
  {
    "name": "Novacian",
    "style": "coined"
  },
  {
    "name": "Novaence",
    "style": "coined"
  },
  {
    "name": "Sensaial",
    "style": "coined"
  },
  {
    "name": "Astraial",
    "style": "coined"
  },
  {
    "name": "Lumaelle",
    "style": "coined"
  },
  {
    "name": "Cadenous",
    "style": "coined"
  },
  {
    "name": "Mnemoial",
    "style": "coined"
  },
  {
    "name": "Cybraeon",
    "style": "coined"
  },
  {
    "name": "Cybraora",
    "style": "coined"
  },
  {
    "name": "Echoesis",
    "style": "coined"
  },
  {
    "name": "Phaseeon",
    "style": "coined"
  },
  {
    "name": "Phaseora",
    "style": "coined"
  },
  {
    "name": "Aetheris",
    "style": "coined"
  },
  {
    "name": "Axionial",
    "style": "coined"
  },
  {
    "name": "Mechaous",
    "style": "coined"
  },
  {
    "name": "Vectaeon",
    "style": "coined"
  },
  {
    "name": "Vectaora",
    "style": "coined"
  },
  {
    "name": "Fluxaial",
    "style": "coined"
  },
  {
    "name": "Kinedium",
    "style": "coined"
  },
  {
    "name": "Novaelle",
    "style": "coined"
  },
  {
    "name": "Omniaeon",
    "style": "coined"
  },
  {
    "name": "Omniaora",
    "style": "coined"
  },
  {
    "name": "Tachyais",
    "style": "coined"
  },
  {
    "name": "Algoreon",
    "style": "coined"
  },
  {
    "name": "Algorora",
    "style": "coined"
  },
  {
    "name": "Cipheris",
    "style": "coined"
  },
  {
    "name": "Cybraion",
    "style": "coined"
  },
  {
    "name": "Phaseion",
    "style": "coined"
  },
  {
    "name": "Cryocian",
    "style": "coined"
  },
  {
    "name": "Cryoence",
    "style": "coined"
  },
  {
    "name": "Vigilais",
    "style": "coined"
  },
  {
    "name": "Vectaion",
    "style": "coined"
  },
  {
    "name": "Heliaous",
    "style": "coined"
  },
  {
    "name": "Omniaion",
    "style": "coined"
  },
  {
    "name": "Plasmais",
    "style": "coined"
  },
  {
    "name": "Algorion",
    "style": "coined"
  },
  {
    "name": "Dynadium",
    "style": "coined"
  },
  {
    "name": "Kineesis",
    "style": "coined"
  },
  {
    "name": "Nexadium",
    "style": "coined"
  },
  {
    "name": "Cybraium",
    "style": "coined"
  },
  {
    "name": "Phaseium",
    "style": "coined"
  },
  {
    "name": "Sensaeon",
    "style": "coined"
  },
  {
    "name": "Sensaora",
    "style": "coined"
  },
  {
    "name": "Voltaial",
    "style": "coined"
  },
  {
    "name": "Astraeon",
    "style": "coined"
  },
  {
    "name": "Astraora",
    "style": "coined"
  },
  {
    "name": "Orbitais",
    "style": "coined"
  },
  {
    "name": "Lumadium",
    "style": "coined"
  },
  {
    "name": "Mnemoeon",
    "style": "coined"
  },
  {
    "name": "Mnemoora",
    "style": "coined"
  },
  {
    "name": "Solarais",
    "style": "coined"
  },
  {
    "name": "Vectaium",
    "style": "coined"
  },
  {
    "name": "Cryoelle",
    "style": "coined"
  },
  {
    "name": "Omniaium",
    "style": "coined"
  },
  {
    "name": "Algorium",
    "style": "coined"
  },
  {
    "name": "Dynaesis",
    "style": "coined"
  },
  {
    "name": "Nexaesis",
    "style": "coined"
  },
  {
    "name": "Sensaion",
    "style": "coined"
  },
  {
    "name": "Astraion",
    "style": "coined"
  },
  {
    "name": "Axioneon",
    "style": "coined"
  },
  {
    "name": "Axionora",
    "style": "coined"
  },
  {
    "name": "Fluxaeon",
    "style": "coined"
  },
  {
    "name": "Fluxaora",
    "style": "coined"
  },
  {
    "name": "Mnemoion",
    "style": "coined"
  },
  {
    "name": "Lumaesis",
    "style": "coined"
  },
  {
    "name": "Novadium",
    "style": "coined"
  },
  {
    "name": "Resonais",
    "style": "coined"
  },
  {
    "name": "Axionion",
    "style": "coined"
  },
  {
    "name": "Sensaium",
    "style": "coined"
  },
  {
    "name": "Astraium",
    "style": "coined"
  },
  {
    "name": "Aurorais",
    "style": "coined"
  },
  {
    "name": "Fluxaion",
    "style": "coined"
  },
  {
    "name": "Quantais",
    "style": "coined"
  },
  {
    "name": "Mnemoium",
    "style": "coined"
  },
  {
    "name": "Veritais",
    "style": "coined"
  },
  {
    "name": "Cybraous",
    "style": "coined"
  },
  {
    "name": "Novaesis",
    "style": "coined"
  },
  {
    "name": "Phaseous",
    "style": "coined"
  },
  {
    "name": "Prismais",
    "style": "coined"
  },
  {
    "name": "Voltaeon",
    "style": "coined"
  },
  {
    "name": "Voltaora",
    "style": "coined"
  },
  {
    "name": "Axionium",
    "style": "coined"
  },
  {
    "name": "Protoial",
    "style": "coined"
  },
  {
    "name": "Vectaous",
    "style": "coined"
  },
  {
    "name": "Fluxaium",
    "style": "coined"
  },
  {
    "name": "Omniaous",
    "style": "coined"
  },
  {
    "name": "Algorous",
    "style": "coined"
  },
  {
    "name": "Cryodium",
    "style": "coined"
  },
  {
    "name": "Voltaion",
    "style": "coined"
  },
  {
    "name": "Cryoesis",
    "style": "coined"
  },
  {
    "name": "Sensaous",
    "style": "coined"
  },
  {
    "name": "Voltaium",
    "style": "coined"
  },
  {
    "name": "Astraous",
    "style": "coined"
  },
  {
    "name": "Mnemoous",
    "style": "coined"
  },
  {
    "name": "Cirrusis",
    "style": "coined"
  },
  {
    "name": "Axionous",
    "style": "coined"
  },
  {
    "name": "Protoeon",
    "style": "coined"
  },
  {
    "name": "Protoora",
    "style": "coined"
  },
  {
    "name": "Fluxaous",
    "style": "coined"
  },
  {
    "name": "Tensoris",
    "style": "coined"
  },
  {
    "name": "Protoion",
    "style": "coined"
  },
  {
    "name": "Voltaous",
    "style": "coined"
  },
  {
    "name": "Protoium",
    "style": "coined"
  },
  {
    "name": "Beacacian",
    "style": "coined"
  },
  {
    "name": "Beacaence",
    "style": "coined"
  },
  {
    "name": "Protoous",
    "style": "coined"
  },
  {
    "name": "Beacaelle",
    "style": "coined"
  },
  {
    "name": "Cadencian",
    "style": "coined"
  },
  {
    "name": "Cadenence",
    "style": "coined"
  },
  {
    "name": "Lambdaial",
    "style": "coined"
  },
  {
    "name": "Mechacian",
    "style": "coined"
  },
  {
    "name": "Mechaence",
    "style": "coined"
  },
  {
    "name": "Beacadium",
    "style": "coined"
  },
  {
    "name": "Cadenelle",
    "style": "coined"
  },
  {
    "name": "Heliacian",
    "style": "coined"
  },
  {
    "name": "Heliaence",
    "style": "coined"
  },
  {
    "name": "Beacaesis",
    "style": "coined"
  },
  {
    "name": "Mechaelle",
    "style": "coined"
  },
  {
    "name": "Lambdaeon",
    "style": "coined"
  },
  {
    "name": "Lambdaora",
    "style": "coined"
  },
  {
    "name": "Eidolaial",
    "style": "coined"
  },
  {
    "name": "Heliaelle",
    "style": "coined"
  },
  {
    "name": "Logicaial",
    "style": "coined"
  },
  {
    "name": "Cogniaial",
    "style": "coined"
  },
  {
    "name": "Lambdaion",
    "style": "coined"
  },
  {
    "name": "Cadendium",
    "style": "coined"
  },
  {
    "name": "Cybracian",
    "style": "coined"
  },
  {
    "name": "Cybraence",
    "style": "coined"
  },
  {
    "name": "Lambdaium",
    "style": "coined"
  },
  {
    "name": "Phasecian",
    "style": "coined"
  },
  {
    "name": "Phaseence",
    "style": "coined"
  },
  {
    "name": "Mechadium",
    "style": "coined"
  },
  {
    "name": "Vectacian",
    "style": "coined"
  },
  {
    "name": "Vectaence",
    "style": "coined"
  },
  {
    "name": "Aetherial",
    "style": "coined"
  },
  {
    "name": "Cadenesis",
    "style": "coined"
  },
  {
    "name": "Omniacian",
    "style": "coined"
  },
  {
    "name": "Omniaence",
    "style": "coined"
  },
  {
    "name": "Algorcian",
    "style": "coined"
  },
  {
    "name": "Algorence",
    "style": "coined"
  },
  {
    "name": "Eidolaeon",
    "style": "coined"
  },
  {
    "name": "Eidolaora",
    "style": "coined"
  },
  {
    "name": "Tachyaial",
    "style": "coined"
  },
  {
    "name": "Cipherial",
    "style": "coined"
  },
  {
    "name": "Logicaeon",
    "style": "coined"
  },
  {
    "name": "Logicaora",
    "style": "coined"
  },
  {
    "name": "Heliadium",
    "style": "coined"
  },
  {
    "name": "Mechaesis",
    "style": "coined"
  },
  {
    "name": "Vigilaial",
    "style": "coined"
  },
  {
    "name": "Cogniaeon",
    "style": "coined"
  },
  {
    "name": "Cogniaora",
    "style": "coined"
  },
  {
    "name": "Cybraelle",
    "style": "coined"
  },
  {
    "name": "Phaseelle",
    "style": "coined"
  },
  {
    "name": "Eidolaion",
    "style": "coined"
  },
  {
    "name": "Plasmaial",
    "style": "coined"
  },
  {
    "name": "Logicaion",
    "style": "coined"
  },
  {
    "name": "Sensacian",
    "style": "coined"
  },
  {
    "name": "Sensaence",
    "style": "coined"
  },
  {
    "name": "Vectaelle",
    "style": "coined"
  },
  {
    "name": "Astracian",
    "style": "coined"
  },
  {
    "name": "Astraence",
    "style": "coined"
  },
  {
    "name": "Omniaelle",
    "style": "coined"
  },
  {
    "name": "Algorelle",
    "style": "coined"
  },
  {
    "name": "Cogniaion",
    "style": "coined"
  },
  {
    "name": "Heliaesis",
    "style": "coined"
  },
  {
    "name": "Meridiais",
    "style": "coined"
  },
  {
    "name": "Mnemocian",
    "style": "coined"
  },
  {
    "name": "Mnemoence",
    "style": "coined"
  },
  {
    "name": "Orbitaial",
    "style": "coined"
  },
  {
    "name": "Lambdaous",
    "style": "coined"
  },
  {
    "name": "Solaraial",
    "style": "coined"
  },
  {
    "name": "Eidolaium",
    "style": "coined"
  },
  {
    "name": "Parallais",
    "style": "coined"
  },
  {
    "name": "Axioncian",
    "style": "coined"
  },
  {
    "name": "Axionence",
    "style": "coined"
  },
  {
    "name": "Logicaium",
    "style": "coined"
  },
  {
    "name": "Aethereon",
    "style": "coined"
  },
  {
    "name": "Aetherora",
    "style": "coined"
  },
  {
    "name": "Fluxacian",
    "style": "coined"
  },
  {
    "name": "Fluxaence",
    "style": "coined"
  },
  {
    "name": "Cogniaium",
    "style": "coined"
  },
  {
    "name": "Sensaelle",
    "style": "coined"
  },
  {
    "name": "Tachyaeon",
    "style": "coined"
  },
  {
    "name": "Tachyaora",
    "style": "coined"
  },
  {
    "name": "Astraelle",
    "style": "coined"
  },
  {
    "name": "Ciphereon",
    "style": "coined"
  },
  {
    "name": "Cipherora",
    "style": "coined"
  },
  {
    "name": "Mnemoelle",
    "style": "coined"
  },
  {
    "name": "Resonaial",
    "style": "coined"
  },
  {
    "name": "Vigilaeon",
    "style": "coined"
  },
  {
    "name": "Vigilaora",
    "style": "coined"
  },
  {
    "name": "Aetherion",
    "style": "coined"
  },
  {
    "name": "Radiantis",
    "style": "coined"
  },
  {
    "name": "Auroraial",
    "style": "coined"
  },
  {
    "name": "Cybradium",
    "style": "coined"
  },
  {
    "name": "Phasedium",
    "style": "coined"
  },
  {
    "name": "Plasmaeon",
    "style": "coined"
  },
  {
    "name": "Plasmaora",
    "style": "coined"
  },
  {
    "name": "Quantaial",
    "style": "coined"
  },
  {
    "name": "Tachyaion",
    "style": "coined"
  },
  {
    "name": "Axionelle",
    "style": "coined"
  },
  {
    "name": "Cipherion",
    "style": "coined"
  },
  {
    "name": "Veritaial",
    "style": "coined"
  },
  {
    "name": "Voltacian",
    "style": "coined"
  },
  {
    "name": "Voltaence",
    "style": "coined"
  },
  {
    "name": "Fluxaelle",
    "style": "coined"
  },
  {
    "name": "Prismaial",
    "style": "coined"
  },
  {
    "name": "Vectadium",
    "style": "coined"
  },
  {
    "name": "Vigilaion",
    "style": "coined"
  },
  {
    "name": "Omniadium",
    "style": "coined"
  },
  {
    "name": "Orbitaeon",
    "style": "coined"
  },
  {
    "name": "Orbitaora",
    "style": "coined"
  },
  {
    "name": "Aetherium",
    "style": "coined"
  },
  {
    "name": "Algordium",
    "style": "coined"
  },
  {
    "name": "Plasmaion",
    "style": "coined"
  },
  {
    "name": "Solaraeon",
    "style": "coined"
  },
  {
    "name": "Solaraora",
    "style": "coined"
  },
  {
    "name": "Cybraesis",
    "style": "coined"
  },
  {
    "name": "Eidolaous",
    "style": "coined"
  },
  {
    "name": "Phaseesis",
    "style": "coined"
  },
  {
    "name": "Tachyaium",
    "style": "coined"
  },
  {
    "name": "Cipherium",
    "style": "coined"
  },
  {
    "name": "Logicaous",
    "style": "coined"
  },
  {
    "name": "Orbitaion",
    "style": "coined"
  },
  {
    "name": "Vectaesis",
    "style": "coined"
  },
  {
    "name": "Vigilaium",
    "style": "coined"
  },
  {
    "name": "Cogniaous",
    "style": "coined"
  },
  {
    "name": "Omniaesis",
    "style": "coined"
  },
  {
    "name": "Solaraion",
    "style": "coined"
  },
  {
    "name": "Voltaelle",
    "style": "coined"
  },
  {
    "name": "Algoresis",
    "style": "coined"
  },
  {
    "name": "Plasmaium",
    "style": "coined"
  },
  {
    "name": "Sensadium",
    "style": "coined"
  },
  {
    "name": "Astradium",
    "style": "coined"
  },
  {
    "name": "Resonaeon",
    "style": "coined"
  },
  {
    "name": "Resonaora",
    "style": "coined"
  },
  {
    "name": "Mnemodium",
    "style": "coined"
  },
  {
    "name": "Auroraeon",
    "style": "coined"
  },
  {
    "name": "Auroraora",
    "style": "coined"
  },
  {
    "name": "Orbitaium",
    "style": "coined"
  },
  {
    "name": "Quantaeon",
    "style": "coined"
  },
  {
    "name": "Quantaora",
    "style": "coined"
  },
  {
    "name": "Solaraium",
    "style": "coined"
  },
  {
    "name": "Veritaeon",
    "style": "coined"
  },
  {
    "name": "Veritaora",
    "style": "coined"
  },
  {
    "name": "Axiondium",
    "style": "coined"
  },
  {
    "name": "Cirrusial",
    "style": "coined"
  },
  {
    "name": "Prismaeon",
    "style": "coined"
  },
  {
    "name": "Prismaora",
    "style": "coined"
  },
  {
    "name": "Resonaion",
    "style": "coined"
  },
  {
    "name": "Sensaesis",
    "style": "coined"
  },
  {
    "name": "Spectrais",
    "style": "coined"
  },
  {
    "name": "Astraesis",
    "style": "coined"
  },
  {
    "name": "Fluxadium",
    "style": "coined"
  },
  {
    "name": "Protocian",
    "style": "coined"
  },
  {
    "name": "Protoence",
    "style": "coined"
  },
  {
    "name": "Zenithais",
    "style": "coined"
  },
  {
    "name": "Aetherous",
    "style": "coined"
  },
  {
    "name": "Auroraion",
    "style": "coined"
  },
  {
    "name": "Mnemoesis",
    "style": "coined"
  },
  {
    "name": "Quantaion",
    "style": "coined"
  },
  {
    "name": "Tachyaous",
    "style": "coined"
  },
  {
    "name": "Tensorial",
    "style": "coined"
  },
  {
    "name": "Veritaion",
    "style": "coined"
  },
  {
    "name": "Cipherous",
    "style": "coined"
  },
  {
    "name": "Prismaion",
    "style": "coined"
  },
  {
    "name": "Axionesis",
    "style": "coined"
  },
  {
    "name": "Resonaium",
    "style": "coined"
  },
  {
    "name": "Vigilaous",
    "style": "coined"
  },
  {
    "name": "Fluxaesis",
    "style": "coined"
  },
  {
    "name": "Auroraium",
    "style": "coined"
  },
  {
    "name": "Photonais",
    "style": "coined"
  },
  {
    "name": "Plasmaous",
    "style": "coined"
  },
  {
    "name": "Quantaium",
    "style": "coined"
  },
  {
    "name": "Voltadium",
    "style": "coined"
  },
  {
    "name": "Protoelle",
    "style": "coined"
  },
  {
    "name": "Veritaium",
    "style": "coined"
  },
  {
    "name": "Prismaium",
    "style": "coined"
  },
  {
    "name": "Orbitaous",
    "style": "coined"
  },
  {
    "name": "Solaraous",
    "style": "coined"
  },
  {
    "name": "Cirruseon",
    "style": "coined"
  },
  {
    "name": "Cirrusora",
    "style": "coined"
  },
  {
    "name": "Voltaesis",
    "style": "coined"
  },
  {
    "name": "Synaptais",
    "style": "coined"
  },
  {
    "name": "Tensoreon",
    "style": "coined"
  }
]

const count = style => saiNames.filter(entry => entry.style === style).length
if (saiNames.length !== 500 || new Set(saiNames.map(entry => entry.name)).size !== 500) throw new Error('SAIs require 500 unique identities')
if (count('designation-only') !== 25 || count('named-designation') !== 25 || count('two-word') !== 50 || count('coined') !== 400) throw new Error('SAI naming-style proportions are invalid')

export default saiNames
