// 500 literal SAI identities built from distinct technical and conceptual roots.
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
    "name": "Axiomara [ARIA.520]",
    "style": "named-designation",
    "personalName": "Axiomara",
    "designation": "ARIA.520"
  },
  {
    "name": "Crysalune [SYS/533]",
    "style": "named-designation",
    "personalName": "Crysalune",
    "designation": "SYS/533"
  },
  {
    "name": "Datalogue [CAL-546]",
    "style": "named-designation",
    "personalName": "Datalogue",
    "designation": "CAL-546"
  },
  {
    "name": "Eidolon [NODE.559]",
    "style": "named-designation",
    "personalName": "Eidolon",
    "designation": "NODE.559"
  },
  {
    "name": "Ferrovia [NEX-572]",
    "style": "named-designation",
    "personalName": "Ferrovia",
    "designation": "NEX-572"
  },
  {
    "name": "Glyphara [ARIA.585]",
    "style": "named-designation",
    "personalName": "Glyphara",
    "designation": "ARIA.585"
  },
  {
    "name": "Helixor [SYS/598]",
    "style": "named-designation",
    "personalName": "Helixor",
    "designation": "SYS/598"
  },
  {
    "name": "Isorithm [CAL-611]",
    "style": "named-designation",
    "personalName": "Isorithm",
    "designation": "CAL-611"
  },
  {
    "name": "Jovienne [NODE.624]",
    "style": "named-designation",
    "personalName": "Jovienne",
    "designation": "NODE.624"
  },
  {
    "name": "Kernelle [NEX-637]",
    "style": "named-designation",
    "personalName": "Kernelle",
    "designation": "NEX-637"
  },
  {
    "name": "Lucentia [ARIA.650]",
    "style": "named-designation",
    "personalName": "Lucentia",
    "designation": "ARIA.650"
  },
  {
    "name": "Mnemonic [SYS/663]",
    "style": "named-designation",
    "personalName": "Mnemonic",
    "designation": "SYS/663"
  },
  {
    "name": "Noetica [CAL-676]",
    "style": "named-designation",
    "personalName": "Noetica",
    "designation": "CAL-676"
  },
  {
    "name": "Optraxis [NODE.689]",
    "style": "named-designation",
    "personalName": "Optraxis",
    "designation": "NODE.689"
  },
  {
    "name": "Parallune [NEX-702]",
    "style": "named-designation",
    "personalName": "Parallune",
    "designation": "NEX-702"
  },
  {
    "name": "Quoralis [ARIA.715]",
    "style": "named-designation",
    "personalName": "Quoralis",
    "designation": "ARIA.715"
  },
  {
    "name": "Resonique [SYS/728]",
    "style": "named-designation",
    "personalName": "Resonique",
    "designation": "SYS/728"
  },
  {
    "name": "Synestra [CAL-741]",
    "style": "named-designation",
    "personalName": "Synestra",
    "designation": "CAL-741"
  },
  {
    "name": "Tessara [NODE.754]",
    "style": "named-designation",
    "personalName": "Tessara",
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
    "name": "Ablation",
    "style": "coined"
  },
  {
    "name": "Accretion",
    "style": "coined"
  },
  {
    "name": "Actuator",
    "style": "coined"
  },
  {
    "name": "Adiabatic",
    "style": "coined"
  },
  {
    "name": "Aerogel",
    "style": "coined"
  },
  {
    "name": "Albedo",
    "style": "coined"
  },
  {
    "name": "Algorithm",
    "style": "coined"
  },
  {
    "name": "Alnico",
    "style": "coined"
  },
  {
    "name": "Altimeter",
    "style": "coined"
  },
  {
    "name": "Amplitude",
    "style": "coined"
  },
  {
    "name": "Ansible",
    "style": "coined"
  },
  {
    "name": "Antenna",
    "style": "coined"
  },
  {
    "name": "Aperture",
    "style": "coined"
  },
  {
    "name": "Aphelion",
    "style": "coined"
  },
  {
    "name": "Apogee",
    "style": "coined"
  },
  {
    "name": "Arbiter",
    "style": "coined"
  },
  {
    "name": "Arcology",
    "style": "coined"
  },
  {
    "name": "Argon",
    "style": "coined"
  },
  {
    "name": "Array",
    "style": "coined"
  },
  {
    "name": "Astrolabe",
    "style": "coined"
  },
  {
    "name": "Asymptote",
    "style": "coined"
  },
  {
    "name": "Atlasium",
    "style": "coined"
  },
  {
    "name": "Attosecond",
    "style": "coined"
  },
  {
    "name": "Autocode",
    "style": "coined"
  },
  {
    "name": "Automaton",
    "style": "coined"
  },
  {
    "name": "Avionics",
    "style": "coined"
  },
  {
    "name": "Azimuth",
    "style": "coined"
  },
  {
    "name": "Backplane",
    "style": "coined"
  },
  {
    "name": "Bandgap",
    "style": "coined"
  },
  {
    "name": "Baryon",
    "style": "coined"
  },
  {
    "name": "Basaltic",
    "style": "coined"
  },
  {
    "name": "Baudrate",
    "style": "coined"
  },
  {
    "name": "Beamline",
    "style": "coined"
  },
  {
    "name": "Beryllium",
    "style": "coined"
  },
  {
    "name": "Betatron",
    "style": "coined"
  },
  {
    "name": "Bifurcation",
    "style": "coined"
  },
  {
    "name": "Biometric",
    "style": "coined"
  },
  {
    "name": "Bitstream",
    "style": "coined"
  },
  {
    "name": "Blackbody",
    "style": "coined"
  },
  {
    "name": "Bolometer",
    "style": "coined"
  },
  {
    "name": "Bootstrap",
    "style": "coined"
  },
  {
    "name": "Boson",
    "style": "coined"
  },
  {
    "name": "Brane",
    "style": "coined"
  },
  {
    "name": "Bufferium",
    "style": "coined"
  },
  {
    "name": "Busbar",
    "style": "coined"
  },
  {
    "name": "Bytecode",
    "style": "coined"
  },
  {
    "name": "Calorimeter",
    "style": "coined"
  },
  {
    "name": "Capacitor",
    "style": "coined"
  },
  {
    "name": "Carbonyl",
    "style": "coined"
  },
  {
    "name": "Catalyst",
    "style": "coined"
  },
  {
    "name": "Cathode",
    "style": "coined"
  },
  {
    "name": "Celestine",
    "style": "coined"
  },
  {
    "name": "Centroid",
    "style": "coined"
  },
  {
    "name": "Ceramite",
    "style": "coined"
  },
  {
    "name": "Chalcogen",
    "style": "coined"
  },
  {
    "name": "Chassis",
    "style": "coined"
  },
  {
    "name": "Chromatic",
    "style": "coined"
  },
  {
    "name": "Chronometer",
    "style": "coined"
  },
  {
    "name": "Cipherium",
    "style": "coined"
  },
  {
    "name": "Circuitry",
    "style": "coined"
  },
  {
    "name": "Clathrate",
    "style": "coined"
  },
  {
    "name": "Clockwork",
    "style": "coined"
  },
  {
    "name": "Cloudlet",
    "style": "coined"
  },
  {
    "name": "Cobaltite",
    "style": "coined"
  },
  {
    "name": "Codec",
    "style": "coined"
  },
  {
    "name": "Collider",
    "style": "coined"
  },
  {
    "name": "Commutator",
    "style": "coined"
  },
  {
    "name": "Compiler",
    "style": "coined"
  },
  {
    "name": "Conduit",
    "style": "coined"
  },
  {
    "name": "Constellation",
    "style": "coined"
  },
  {
    "name": "Coprocessor",
    "style": "coined"
  },
  {
    "name": "Coriolis",
    "style": "coined"
  },
  {
    "name": "Cortexium",
    "style": "coined"
  },
  {
    "name": "Cryostat",
    "style": "coined"
  },
  {
    "name": "Crystalline",
    "style": "coined"
  },
  {
    "name": "Cyclotron",
    "style": "coined"
  },
  {
    "name": "Datagram",
    "style": "coined"
  },
  {
    "name": "Decibel",
    "style": "coined"
  },
  {
    "name": "Decoder",
    "style": "coined"
  },
  {
    "name": "Degauss",
    "style": "coined"
  },
  {
    "name": "Delimiter",
    "style": "coined"
  },
  {
    "name": "Dendrite",
    "style": "coined"
  },
  {
    "name": "Deuterium",
    "style": "coined"
  },
  {
    "name": "Diode",
    "style": "coined"
  },
  {
    "name": "Diracium",
    "style": "coined"
  },
  {
    "name": "Dopplerium",
    "style": "coined"
  },
  {
    "name": "Duralumin",
    "style": "coined"
  },
  {
    "name": "Dynamo",
    "style": "coined"
  },
  {
    "name": "Echogram",
    "style": "coined"
  },
  {
    "name": "Ecliptic",
    "style": "coined"
  },
  {
    "name": "Eigenvector",
    "style": "coined"
  },
  {
    "name": "Elastomer",
    "style": "coined"
  },
  {
    "name": "Electronium",
    "style": "coined"
  },
  {
    "name": "Ellipsoid",
    "style": "coined"
  },
  {
    "name": "Emulator",
    "style": "coined"
  },
  {
    "name": "Enceladus",
    "style": "coined"
  },
  {
    "name": "Entanglement",
    "style": "coined"
  },
  {
    "name": "Entropy",
    "style": "coined"
  },
  {
    "name": "Ephemeris",
    "style": "coined"
  },
  {
    "name": "Epitaxy",
    "style": "coined"
  },
  {
    "name": "Equinox",
    "style": "coined"
  },
  {
    "name": "Erbium",
    "style": "coined"
  },
  {
    "name": "Etherlink",
    "style": "coined"
  },
  {
    "name": "Exabyte",
    "style": "coined"
  },
  {
    "name": "Exciton",
    "style": "coined"
  },
  {
    "name": "Exosphere",
    "style": "coined"
  },
  {
    "name": "Faradayite",
    "style": "coined"
  },
  {
    "name": "Fermion",
    "style": "coined"
  },
  {
    "name": "Ferrite",
    "style": "coined"
  },
  {
    "name": "Fiberoptic",
    "style": "coined"
  },
  {
    "name": "Filament",
    "style": "coined"
  },
  {
    "name": "Firmware",
    "style": "coined"
  },
  {
    "name": "Fluxion",
    "style": "coined"
  },
  {
    "name": "Flywheel",
    "style": "coined"
  },
  {
    "name": "Focality",
    "style": "coined"
  },
  {
    "name": "Fourierium",
    "style": "coined"
  },
  {
    "name": "Frequency",
    "style": "coined"
  },
  {
    "name": "Fulcrum",
    "style": "coined"
  },
  {
    "name": "Fuselage",
    "style": "coined"
  },
  {
    "name": "Fusionite",
    "style": "coined"
  },
  {
    "name": "Galvanic",
    "style": "coined"
  },
  {
    "name": "Gammawave",
    "style": "coined"
  },
  {
    "name": "Gaussian",
    "style": "coined"
  },
  {
    "name": "Geodesic",
    "style": "coined"
  },
  {
    "name": "Germanium",
    "style": "coined"
  },
  {
    "name": "Gimbal",
    "style": "coined"
  },
  {
    "name": "Graphene",
    "style": "coined"
  },
  {
    "name": "Graviton",
    "style": "coined"
  },
  {
    "name": "Gyroscope",
    "style": "coined"
  },
  {
    "name": "Hadron",
    "style": "coined"
  },
  {
    "name": "Hafnium",
    "style": "coined"
  },
  {
    "name": "Heliostat",
    "style": "coined"
  },
  {
    "name": "Heuristic",
    "style": "coined"
  },
  {
    "name": "Hexadecimal",
    "style": "coined"
  },
  {
    "name": "Hologram",
    "style": "coined"
  },
  {
    "name": "Hyperbola",
    "style": "coined"
  },
  {
    "name": "Impedance",
    "style": "coined"
  },
  {
    "name": "Inclinometer",
    "style": "coined"
  },
  {
    "name": "Inductor",
    "style": "coined"
  },
  {
    "name": "Inference",
    "style": "coined"
  },
  {
    "name": "Infrared",
    "style": "coined"
  },
  {
    "name": "Invarium",
    "style": "coined"
  },
  {
    "name": "Ionosphere",
    "style": "coined"
  },
  {
    "name": "Isotope",
    "style": "coined"
  },
  {
    "name": "Iteration",
    "style": "coined"
  },
  {
    "name": "Jovian",
    "style": "coined"
  },
  {
    "name": "Joulecraft",
    "style": "coined"
  },
  {
    "name": "Junction",
    "style": "coined"
  },
  {
    "name": "Keratron",
    "style": "coined"
  },
  {
    "name": "Kilohertz",
    "style": "coined"
  },
  {
    "name": "Klystron",
    "style": "coined"
  },
  {
    "name": "Kryptonium",
    "style": "coined"
  },
  {
    "name": "Lagrangian",
    "style": "coined"
  },
  {
    "name": "Lambdaform",
    "style": "coined"
  },
  {
    "name": "Lanthanum",
    "style": "coined"
  },
  {
    "name": "Laserium",
    "style": "coined"
  },
  {
    "name": "Latticework",
    "style": "coined"
  },
  {
    "name": "Lepton",
    "style": "coined"
  },
  {
    "name": "Lightcone",
    "style": "coined"
  },
  {
    "name": "Lidar",
    "style": "coined"
  },
  {
    "name": "Lithography",
    "style": "coined"
  },
  {
    "name": "Logicore",
    "style": "coined"
  },
  {
    "name": "Luminosity",
    "style": "coined"
  },
  {
    "name": "Magnetar",
    "style": "coined"
  },
  {
    "name": "Manganite",
    "style": "coined"
  },
  {
    "name": "Manifold",
    "style": "coined"
  },
  {
    "name": "Maserium",
    "style": "coined"
  },
  {
    "name": "Matrixial",
    "style": "coined"
  },
  {
    "name": "Mechatron",
    "style": "coined"
  },
  {
    "name": "Memorycore",
    "style": "coined"
  },
  {
    "name": "Mesosphere",
    "style": "coined"
  },
  {
    "name": "Metamaterial",
    "style": "coined"
  },
  {
    "name": "Microcode",
    "style": "coined"
  },
  {
    "name": "Molybdenum",
    "style": "coined"
  },
  {
    "name": "Monopole",
    "style": "coined"
  },
  {
    "name": "Multimeter",
    "style": "coined"
  },
  {
    "name": "Muonium",
    "style": "coined"
  },
  {
    "name": "Nanofiber",
    "style": "coined"
  },
  {
    "name": "Nanolith",
    "style": "coined"
  },
  {
    "name": "Neutrino",
    "style": "coined"
  },
  {
    "name": "Nodalium",
    "style": "coined"
  },
  {
    "name": "Nonlinear",
    "style": "coined"
  },
  {
    "name": "Novacore",
    "style": "coined"
  },
  {
    "name": "Nucleon",
    "style": "coined"
  },
  {
    "name": "Nyquist",
    "style": "coined"
  },
  {
    "name": "Octetium",
    "style": "coined"
  },
  {
    "name": "Ohmicron",
    "style": "coined"
  },
  {
    "name": "Opticore",
    "style": "coined"
  },
  {
    "name": "Orbitalis",
    "style": "coined"
  },
  {
    "name": "Oscillator",
    "style": "coined"
  },
  {
    "name": "Osmium",
    "style": "coined"
  },
  {
    "name": "Packetron",
    "style": "coined"
  },
  {
    "name": "Palladium",
    "style": "coined"
  },
  {
    "name": "Parallax",
    "style": "coined"
  },
  {
    "name": "Parametron",
    "style": "coined"
  },
  {
    "name": "Parsecore",
    "style": "coined"
  },
  {
    "name": "Perceptron",
    "style": "coined"
  },
  {
    "name": "Perigee",
    "style": "coined"
  },
  {
    "name": "Perovskite",
    "style": "coined"
  },
  {
    "name": "Phasegate",
    "style": "coined"
  },
  {
    "name": "Phonon",
    "style": "coined"
  },
  {
    "name": "Photometer",
    "style": "coined"
  },
  {
    "name": "Piezoid",
    "style": "coined"
  },
  {
    "name": "Pixelium",
    "style": "coined"
  },
  {
    "name": "Planckton",
    "style": "coined"
  },
  {
    "name": "Plasmaform",
    "style": "coined"
  },
  {
    "name": "Polariton",
    "style": "coined"
  },
  {
    "name": "Polymerase",
    "style": "coined"
  },
  {
    "name": "Positron",
    "style": "coined"
  },
  {
    "name": "Prismatics",
    "style": "coined"
  },
  {
    "name": "Processorium",
    "style": "coined"
  },
  {
    "name": "Promethium",
    "style": "coined"
  },
  {
    "name": "Protonic",
    "style": "coined"
  },
  {
    "name": "Pulsarium",
    "style": "coined"
  },
  {
    "name": "Pyrolytic",
    "style": "coined"
  },
  {
    "name": "Quarkstone",
    "style": "coined"
  },
  {
    "name": "Quasarion",
    "style": "coined"
  },
  {
    "name": "Quaternion",
    "style": "coined"
  },
  {
    "name": "Quenchant",
    "style": "coined"
  },
  {
    "name": "Radiance",
    "style": "coined"
  },
  {
    "name": "Radome",
    "style": "coined"
  },
  {
    "name": "Ramanite",
    "style": "coined"
  },
  {
    "name": "Rasterium",
    "style": "coined"
  },
  {
    "name": "Reactor",
    "style": "coined"
  },
  {
    "name": "Relayium",
    "style": "coined"
  },
  {
    "name": "Resonator",
    "style": "coined"
  },
  {
    "name": "Rheology",
    "style": "coined"
  },
  {
    "name": "Rhenium",
    "style": "coined"
  },
  {
    "name": "Robotics",
    "style": "coined"
  },
  {
    "name": "Rotorium",
    "style": "coined"
  },
  {
    "name": "Scandium",
    "style": "coined"
  },
  {
    "name": "Schottkyite",
    "style": "coined"
  },
  {
    "name": "Scintillator",
    "style": "coined"
  },
  {
    "name": "Semiconductor",
    "style": "coined"
  },
  {
    "name": "Servomech",
    "style": "coined"
  },
  {
    "name": "Silicene",
    "style": "coined"
  },
  {
    "name": "Simulacrum",
    "style": "coined"
  },
  {
    "name": "Singularity",
    "style": "coined"
  },
  {
    "name": "Solenoid",
    "style": "coined"
  },
  {
    "name": "Spectrometer",
    "style": "coined"
  },
  {
    "name": "Spinorium",
    "style": "coined"
  },
  {
    "name": "Sputterium",
    "style": "coined"
  },
  {
    "name": "Starforge",
    "style": "coined"
  },
  {
    "name": "Statorium",
    "style": "coined"
  },
  {
    "name": "Stochasticity",
    "style": "coined"
  },
  {
    "name": "Subroutine",
    "style": "coined"
  },
  {
    "name": "Supernova",
    "style": "coined"
  },
  {
    "name": "Synchrotron",
    "style": "coined"
  },
  {
    "name": "Synthetase",
    "style": "coined"
  },
  {
    "name": "Tachyonium",
    "style": "coined"
  },
  {
    "name": "Tantalum",
    "style": "coined"
  },
  {
    "name": "Telemetry",
    "style": "coined"
  },
  {
    "name": "Tensorium",
    "style": "coined"
  },
  {
    "name": "Terabyte",
    "style": "coined"
  },
  {
    "name": "Terahertz",
    "style": "coined"
  },
  {
    "name": "Thermistor",
    "style": "coined"
  },
  {
    "name": "Thorium",
    "style": "coined"
  },
  {
    "name": "Thrusterium",
    "style": "coined"
  },
  {
    "name": "Tokamak",
    "style": "coined"
  },
  {
    "name": "Topology",
    "style": "coined"
  },
  {
    "name": "Torquefield",
    "style": "coined"
  },
  {
    "name": "Transceiver",
    "style": "coined"
  },
  {
    "name": "Tritium",
    "style": "coined"
  },
  {
    "name": "Turbine",
    "style": "coined"
  },
  {
    "name": "Ultrasonic",
    "style": "coined"
  },
  {
    "name": "Umbracore",
    "style": "coined"
  },
  {
    "name": "Unipolar",
    "style": "coined"
  },
  {
    "name": "Uranium",
    "style": "coined"
  },
  {
    "name": "Vacuumite",
    "style": "coined"
  },
  {
    "name": "Vanadium",
    "style": "coined"
  },
  {
    "name": "Varactor",
    "style": "coined"
  },
  {
    "name": "Vectorium",
    "style": "coined"
  },
  {
    "name": "Velocimeter",
    "style": "coined"
  },
  {
    "name": "Verilogium",
    "style": "coined"
  },
  {
    "name": "Vertexium",
    "style": "coined"
  },
  {
    "name": "Vibronic",
    "style": "coined"
  },
  {
    "name": "Vitrimer",
    "style": "coined"
  },
  {
    "name": "Voltmeter",
    "style": "coined"
  },
  {
    "name": "Voxelium",
    "style": "coined"
  },
  {
    "name": "Waveguide",
    "style": "coined"
  },
  {
    "name": "Wavelength",
    "style": "coined"
  },
  {
    "name": "Wolframite",
    "style": "coined"
  },
  {
    "name": "Xenoncore",
    "style": "coined"
  },
  {
    "name": "Xerogel",
    "style": "coined"
  },
  {
    "name": "Yottabyte",
    "style": "coined"
  },
  {
    "name": "Yttrium",
    "style": "coined"
  },
  {
    "name": "Zeemanite",
    "style": "coined"
  },
  {
    "name": "Zeolite",
    "style": "coined"
  },
  {
    "name": "Zetaflux",
    "style": "coined"
  },
  {
    "name": "Zirconium",
    "style": "coined"
  },
  {
    "name": "Abiogenesis",
    "style": "coined"
  },
  {
    "name": "Adaptome",
    "style": "coined"
  },
  {
    "name": "Adenosine",
    "style": "coined"
  },
  {
    "name": "Allele",
    "style": "coined"
  },
  {
    "name": "Aminoform",
    "style": "coined"
  },
  {
    "name": "Anabolism",
    "style": "coined"
  },
  {
    "name": "Angstrom",
    "style": "coined"
  },
  {
    "name": "Apoptosis",
    "style": "coined"
  },
  {
    "name": "Arborization",
    "style": "coined"
  },
  {
    "name": "Axonome",
    "style": "coined"
  },
  {
    "name": "Bacterion",
    "style": "coined"
  },
  {
    "name": "Biofilm",
    "style": "coined"
  },
  {
    "name": "Biolume",
    "style": "coined"
  },
  {
    "name": "Biomass",
    "style": "coined"
  },
  {
    "name": "Biosphere",
    "style": "coined"
  },
  {
    "name": "Biostasis",
    "style": "coined"
  },
  {
    "name": "Calmodulin",
    "style": "coined"
  },
  {
    "name": "Carotene",
    "style": "coined"
  },
  {
    "name": "Cellulose",
    "style": "coined"
  },
  {
    "name": "Chaperonin",
    "style": "coined"
  },
  {
    "name": "Chloroplast",
    "style": "coined"
  },
  {
    "name": "Cilium",
    "style": "coined"
  },
  {
    "name": "Circadian",
    "style": "coined"
  },
  {
    "name": "Codon",
    "style": "coined"
  },
  {
    "name": "Diffusionome",
    "style": "coined"
  },
  {
    "name": "Diploid",
    "style": "coined"
  },
  {
    "name": "Enzyme",
    "style": "coined"
  },
  {
    "name": "Epigenome",
    "style": "coined"
  },
  {
    "name": "Eukaryon",
    "style": "coined"
  },
  {
    "name": "Fermentation",
    "style": "coined"
  },
  {
    "name": "Flagellum",
    "style": "coined"
  },
  {
    "name": "Genotype",
    "style": "coined"
  },
  {
    "name": "Glycolysis",
    "style": "coined"
  },
  {
    "name": "Hemoglobin",
    "style": "coined"
  },
  {
    "name": "Homeostasis",
    "style": "coined"
  },
  {
    "name": "Immunome",
    "style": "coined"
  },
  {
    "name": "Kinase",
    "style": "coined"
  },
  {
    "name": "Lysosome",
    "style": "coined"
  },
  {
    "name": "Metabolome",
    "style": "coined"
  },
  {
    "name": "Mitochondrion",
    "style": "coined"
  },
  {
    "name": "Morphogen",
    "style": "coined"
  },
  {
    "name": "Organoid",
    "style": "coined"
  },
  {
    "name": "Osmosis",
    "style": "coined"
  },
  {
    "name": "Peptide",
    "style": "coined"
  },
  {
    "name": "Phylogeny",
    "style": "coined"
  },
  {
    "name": "Proteome",
    "style": "coined"
  },
  {
    "name": "Ribosome",
    "style": "coined"
  },
  {
    "name": "Synapse",
    "style": "coined"
  },
  {
    "name": "Telomere",
    "style": "coined"
  },
  {
    "name": "Vesicle",
    "style": "coined"
  },
  {
    "name": "Affine",
    "style": "coined"
  },
  {
    "name": "Algebraic",
    "style": "coined"
  },
  {
    "name": "Axiomatics",
    "style": "coined"
  },
  {
    "name": "Bayesian",
    "style": "coined"
  },
  {
    "name": "Bijection",
    "style": "coined"
  },
  {
    "name": "Calculus",
    "style": "coined"
  },
  {
    "name": "Cardinality",
    "style": "coined"
  },
  {
    "name": "Catenary",
    "style": "coined"
  },
  {
    "name": "Combinatorics",
    "style": "coined"
  },
  {
    "name": "Congruence",
    "style": "coined"
  },
  {
    "name": "Covariance",
    "style": "coined"
  },
  {
    "name": "Derivative",
    "style": "coined"
  },
  {
    "name": "Determinant",
    "style": "coined"
  },
  {
    "name": "Diophantine",
    "style": "coined"
  },
  {
    "name": "Factorial",
    "style": "coined"
  },
  {
    "name": "Fibonacci",
    "style": "coined"
  },
  {
    "name": "Fractalium",
    "style": "coined"
  },
  {
    "name": "Gradient",
    "style": "coined"
  },
  {
    "name": "Hilbertian",
    "style": "coined"
  },
  {
    "name": "Homology",
    "style": "coined"
  },
  {
    "name": "Integral",
    "style": "coined"
  },
  {
    "name": "Isometry",
    "style": "coined"
  },
  {
    "name": "Jacobian",
    "style": "coined"
  },
  {
    "name": "Knotspace",
    "style": "coined"
  },
  {
    "name": "Logarithm",
    "style": "coined"
  },
  {
    "name": "Mandelbrot",
    "style": "coined"
  },
  {
    "name": "Markovian",
    "style": "coined"
  },
  {
    "name": "Monomial",
    "style": "coined"
  },
  {
    "name": "Numeratrix",
    "style": "coined"
  },
  {
    "name": "Orthogonal",
    "style": "coined"
  },
  {
    "name": "Polynomial",
    "style": "coined"
  },
  {
    "name": "Probability",
    "style": "coined"
  },
  {
    "name": "Radical",
    "style": "coined"
  },
  {
    "name": "Riemannian",
    "style": "coined"
  },
  {
    "name": "Scalar",
    "style": "coined"
  },
  {
    "name": "Sierpinski",
    "style": "coined"
  },
  {
    "name": "Tessellation",
    "style": "coined"
  },
  {
    "name": "Theorematic",
    "style": "coined"
  },
  {
    "name": "Variance",
    "style": "coined"
  },
  {
    "name": "Voronoi",
    "style": "coined"
  },
  {
    "name": "Aberration",
    "style": "coined"
  },
  {
    "name": "Absorption",
    "style": "coined"
  },
  {
    "name": "Anamorphic",
    "style": "coined"
  },
  {
    "name": "Anisotropy",
    "style": "coined"
  },
  {
    "name": "Apochromat",
    "style": "coined"
  },
  {
    "name": "Astigmatism",
    "style": "coined"
  },
  {
    "name": "Birefringence",
    "style": "coined"
  },
  {
    "name": "Caustic",
    "style": "coined"
  },
  {
    "name": "Diffraction",
    "style": "coined"
  },
  {
    "name": "Dispersion",
    "style": "coined"
  },
  {
    "name": "Fluorescence",
    "style": "coined"
  },
  {
    "name": "Interferometer",
    "style": "coined"
  },
  {
    "name": "Metasurface",
    "style": "coined"
  },
  {
    "name": "Nanophotonics",
    "style": "coined"
  },
  {
    "name": "Reflectance",
    "style": "coined"
  },
  {
    "name": "Refraction",
    "style": "coined"
  },
  {
    "name": "Acoustic",
    "style": "coined"
  },
  {
    "name": "Aerodynamic",
    "style": "coined"
  },
  {
    "name": "Barometric",
    "style": "coined"
  },
  {
    "name": "Capillary",
    "style": "coined"
  }
]

const count = style => saiNames.filter(entry => entry.style === style).length
const conceptTokens = saiNames.filter(entry => entry.style !== 'designation-only').flatMap(entry => (entry.personalName || entry.name).replace(/\[[^\]]+]/g, '').trim().split(/\s+/)).map(token => token.toLowerCase())
if (saiNames.length !== 500 || new Set(saiNames.map(entry => entry.name)).size !== 500) throw new Error('SAIs require 500 unique identities')
if (new Set(conceptTokens).size !== conceptTokens.length) throw new Error('SAI concept words must not repeat')
if (count('designation-only') !== 25 || count('named-designation') !== 25 || count('two-word') !== 50 || count('coined') !== 400) throw new Error('SAI naming-style proportions are invalid')

export default saiNames
