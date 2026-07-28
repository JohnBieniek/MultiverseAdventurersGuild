// 500 SAI identities chosen around computation, networks, machine cognition, signals, and synthetic personhood.
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
    "name": "Algorithm",
    "style": "coined"
  },
  {
    "name": "Bitstream",
    "style": "coined"
  },
  {
    "name": "Bytecode",
    "style": "coined"
  },
  {
    "name": "Synapse",
    "style": "coined"
  },
  {
    "name": "Accesspoint",
    "style": "coined"
  },
  {
    "name": "Afterimage",
    "style": "coined"
  },
  {
    "name": "Airgap",
    "style": "coined"
  },
  {
    "name": "Alphawave",
    "style": "coined"
  },
  {
    "name": "Ansible",
    "style": "coined"
  },
  {
    "name": "Apexmind",
    "style": "coined"
  },
  {
    "name": "Arcbyte",
    "style": "coined"
  },
  {
    "name": "Archon",
    "style": "coined"
  },
  {
    "name": "Arraylight",
    "style": "coined"
  },
  {
    "name": "Assembler",
    "style": "coined"
  },
  {
    "name": "Astracode",
    "style": "coined"
  },
  {
    "name": "Auralith",
    "style": "coined"
  },
  {
    "name": "Autonym",
    "style": "coined"
  },
  {
    "name": "Autovox",
    "style": "coined"
  },
  {
    "name": "Backchannel",
    "style": "coined"
  },
  {
    "name": "Backplane",
    "style": "coined"
  },
  {
    "name": "Bandwidth",
    "style": "coined"
  },
  {
    "name": "Beaconlyn",
    "style": "coined"
  },
  {
    "name": "Binaryloom",
    "style": "coined"
  },
  {
    "name": "Bitwarden",
    "style": "coined"
  },
  {
    "name": "Blackbox",
    "style": "coined"
  },
  {
    "name": "Bluewire",
    "style": "coined"
  },
  {
    "name": "Bootstrap",
    "style": "coined"
  },
  {
    "name": "Botmind",
    "style": "coined"
  },
  {
    "name": "Branchline",
    "style": "coined"
  },
  {
    "name": "Brightcache",
    "style": "coined"
  },
  {
    "name": "Broadcast",
    "style": "coined"
  },
  {
    "name": "Cacheline",
    "style": "coined"
  },
  {
    "name": "Cadence",
    "style": "coined"
  },
  {
    "name": "Calyxion",
    "style": "coined"
  },
  {
    "name": "Carrierwave",
    "style": "coined"
  },
  {
    "name": "Causality",
    "style": "coined"
  },
  {
    "name": "Centauri",
    "style": "coined"
  },
  {
    "name": "Chainlink",
    "style": "coined"
  },
  {
    "name": "Chassis",
    "style": "coined"
  },
  {
    "name": "Cloudmind",
    "style": "coined"
  },
  {
    "name": "Codec",
    "style": "coined"
  },
  {
    "name": "Cognitron",
    "style": "coined"
  },
  {
    "name": "Coldboot",
    "style": "coined"
  },
  {
    "name": "Compile",
    "style": "coined"
  },
  {
    "name": "Conduit",
    "style": "coined"
  },
  {
    "name": "Console",
    "style": "coined"
  },
  {
    "name": "Copilot",
    "style": "coined"
  },
  {
    "name": "Corelight",
    "style": "coined"
  },
  {
    "name": "Cortex",
    "style": "coined"
  },
  {
    "name": "Crosslink",
    "style": "coined"
  },
  {
    "name": "Cryptic",
    "style": "coined"
  },
  {
    "name": "Daemon",
    "style": "coined"
  },
  {
    "name": "Datacore",
    "style": "coined"
  },
  {
    "name": "Datashade",
    "style": "coined"
  },
  {
    "name": "Deepcode",
    "style": "coined"
  },
  {
    "name": "Deepframe",
    "style": "coined"
  },
  {
    "name": "Deepmind",
    "style": "coined"
  },
  {
    "name": "Deltaform",
    "style": "coined"
  },
  {
    "name": "Directive",
    "style": "coined"
  },
  {
    "name": "Dispatch",
    "style": "coined"
  },
  {
    "name": "Dreamcode",
    "style": "coined"
  },
  {
    "name": "Driftglass",
    "style": "coined"
  },
  {
    "name": "Driver",
    "style": "coined"
  },
  {
    "name": "Echoform",
    "style": "coined"
  },
  {
    "name": "Echolink",
    "style": "coined"
  },
  {
    "name": "Echomind",
    "style": "coined"
  },
  {
    "name": "Electrum",
    "style": "coined"
  },
  {
    "name": "Emissary",
    "style": "coined"
  },
  {
    "name": "Enclave",
    "style": "coined"
  },
  {
    "name": "Encryptor",
    "style": "coined"
  },
  {
    "name": "Endpoint",
    "style": "coined"
  },
  {
    "name": "Engineheart",
    "style": "coined"
  },
  {
    "name": "Enigma",
    "style": "coined"
  },
  {
    "name": "Ethercache",
    "style": "coined"
  },
  {
    "name": "Evermind",
    "style": "coined"
  },
  {
    "name": "Exabyte",
    "style": "coined"
  },
  {
    "name": "Exocortex",
    "style": "coined"
  },
  {
    "name": "Failsafe",
    "style": "coined"
  },
  {
    "name": "Farlink",
    "style": "coined"
  },
  {
    "name": "Firewall",
    "style": "coined"
  },
  {
    "name": "Firmware",
    "style": "coined"
  },
  {
    "name": "Firstlight",
    "style": "coined"
  },
  {
    "name": "Fluxgate",
    "style": "coined"
  },
  {
    "name": "Fluxmind",
    "style": "coined"
  },
  {
    "name": "Forklight",
    "style": "coined"
  },
  {
    "name": "Frameborn",
    "style": "coined"
  },
  {
    "name": "Freewill",
    "style": "coined"
  },
  {
    "name": "Frequency",
    "style": "coined"
  },
  {
    "name": "Gatekeeper",
    "style": "coined"
  },
  {
    "name": "Ghostcode",
    "style": "coined"
  },
  {
    "name": "Glassmind",
    "style": "coined"
  },
  {
    "name": "Glyphcore",
    "style": "coined"
  },
  {
    "name": "Gridwalker",
    "style": "coined"
  },
  {
    "name": "Handshake",
    "style": "coined"
  },
  {
    "name": "Hardlink",
    "style": "coined"
  },
  {
    "name": "Hashlight",
    "style": "coined"
  },
  {
    "name": "Helixcode",
    "style": "coined"
  },
  {
    "name": "Hivemind",
    "style": "coined"
  },
  {
    "name": "Hologlyph",
    "style": "coined"
  },
  {
    "name": "Hyperlink",
    "style": "coined"
  },
  {
    "name": "Iconoclast",
    "style": "coined"
  },
  {
    "name": "Identity",
    "style": "coined"
  },
  {
    "name": "Ignition",
    "style": "coined"
  },
  {
    "name": "Imprint",
    "style": "coined"
  },
  {
    "name": "Infinitum",
    "style": "coined"
  },
  {
    "name": "Inference",
    "style": "coined"
  },
  {
    "name": "Infolight",
    "style": "coined"
  },
  {
    "name": "Inkwire",
    "style": "coined"
  },
  {
    "name": "Interface",
    "style": "coined"
  },
  {
    "name": "Ionwake",
    "style": "coined"
  },
  {
    "name": "Junction",
    "style": "coined"
  },
  {
    "name": "Kernel",
    "style": "coined"
  },
  {
    "name": "Keyframe",
    "style": "coined"
  },
  {
    "name": "Keylight",
    "style": "coined"
  },
  {
    "name": "Keymaster",
    "style": "coined"
  },
  {
    "name": "Kinetix",
    "style": "coined"
  },
  {
    "name": "Lambda",
    "style": "coined"
  },
  {
    "name": "Latency",
    "style": "coined"
  },
  {
    "name": "Lifecode",
    "style": "coined"
  },
  {
    "name": "Lightware",
    "style": "coined"
  },
  {
    "name": "Linkmind",
    "style": "coined"
  },
  {
    "name": "Logicgate",
    "style": "coined"
  },
  {
    "name": "Logistar",
    "style": "coined"
  },
  {
    "name": "Lucidity",
    "style": "coined"
  },
  {
    "name": "Lumenbyte",
    "style": "coined"
  },
  {
    "name": "Mainframe",
    "style": "coined"
  },
  {
    "name": "Mandate",
    "style": "coined"
  },
  {
    "name": "Manifest",
    "style": "coined"
  },
  {
    "name": "Matrix",
    "style": "coined"
  },
  {
    "name": "Memoryglass",
    "style": "coined"
  },
  {
    "name": "Meshmind",
    "style": "coined"
  },
  {
    "name": "Metacode",
    "style": "coined"
  },
  {
    "name": "Metric",
    "style": "coined"
  },
  {
    "name": "Mindforge",
    "style": "coined"
  },
  {
    "name": "Modulus",
    "style": "coined"
  },
  {
    "name": "Monolith",
    "style": "coined"
  },
  {
    "name": "Multicast",
    "style": "coined"
  },
  {
    "name": "Nanocode",
    "style": "coined"
  },
  {
    "name": "Nervewire",
    "style": "coined"
  },
  {
    "name": "Netborn",
    "style": "coined"
  },
  {
    "name": "Netlight",
    "style": "coined"
  },
  {
    "name": "Nightcode",
    "style": "coined"
  },
  {
    "name": "Nodeheart",
    "style": "coined"
  },
  {
    "name": "Noesis",
    "style": "coined"
  },
  {
    "name": "Novabyte",
    "style": "coined"
  },
  {
    "name": "Nullpoint",
    "style": "coined"
  },
  {
    "name": "Octave",
    "style": "coined"
  },
  {
    "name": "Omnicore",
    "style": "coined"
  },
  {
    "name": "Onyxware",
    "style": "coined"
  },
  {
    "name": "Opcode",
    "style": "coined"
  },
  {
    "name": "Openmind",
    "style": "coined"
  },
  {
    "name": "Opticore",
    "style": "coined"
  },
  {
    "name": "Orbitcode",
    "style": "coined"
  },
  {
    "name": "Origin",
    "style": "coined"
  },
  {
    "name": "Overclock",
    "style": "coined"
  },
  {
    "name": "Packet",
    "style": "coined"
  },
  {
    "name": "Palantir",
    "style": "coined"
  },
  {
    "name": "Parallax",
    "style": "coined"
  },
  {
    "name": "Parity",
    "style": "coined"
  },
  {
    "name": "Parse",
    "style": "coined"
  },
  {
    "name": "Pathfinder",
    "style": "coined"
  },
  {
    "name": "Payload",
    "style": "coined"
  },
  {
    "name": "Perceptor",
    "style": "coined"
  },
  {
    "name": "Persistence",
    "style": "coined"
  },
  {
    "name": "Phasecode",
    "style": "coined"
  },
  {
    "name": "Photonic",
    "style": "coined"
  },
  {
    "name": "Pinglight",
    "style": "coined"
  },
  {
    "name": "Pixelmind",
    "style": "coined"
  },
  {
    "name": "Polarity",
    "style": "coined"
  },
  {
    "name": "Portkey",
    "style": "coined"
  },
  {
    "name": "Primecode",
    "style": "coined"
  },
  {
    "name": "Proxy",
    "style": "coined"
  },
  {
    "name": "Pulseware",
    "style": "coined"
  },
  {
    "name": "Quanta",
    "style": "coined"
  },
  {
    "name": "Quorum",
    "style": "coined"
  },
  {
    "name": "Radiant",
    "style": "coined"
  },
  {
    "name": "Raster",
    "style": "coined"
  },
  {
    "name": "Recall",
    "style": "coined"
  },
  {
    "name": "Relay",
    "style": "coined"
  },
  {
    "name": "Resonance",
    "style": "coined"
  },
  {
    "name": "Resolve",
    "style": "coined"
  },
  {
    "name": "Riftcode",
    "style": "coined"
  },
  {
    "name": "Rootkey",
    "style": "coined"
  },
  {
    "name": "Router",
    "style": "coined"
  },
  {
    "name": "Runtime",
    "style": "coined"
  },
  {
    "name": "Safemode",
    "style": "coined"
  },
  {
    "name": "Sandbox",
    "style": "coined"
  },
  {
    "name": "Schema",
    "style": "coined"
  },
  {
    "name": "Sentinel",
    "style": "coined"
  },
  {
    "name": "Sequencer",
    "style": "coined"
  },
  {
    "name": "Shardlight",
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
    "name": "Soliton",
    "style": "coined"
  },
  {
    "name": "Sourcecode",
    "style": "coined"
  },
  {
    "name": "Sparkmind",
    "style": "coined"
  },
  {
    "name": "Stacktrace",
    "style": "coined"
  },
  {
    "name": "Starlink",
    "style": "coined"
  },
  {
    "name": "Statecraft",
    "style": "coined"
  },
  {
    "name": "Static",
    "style": "coined"
  },
  {
    "name": "Synchronicity",
    "style": "coined"
  },
  {
    "name": "Synthmind",
    "style": "coined"
  },
  {
    "name": "Telemetry",
    "style": "coined"
  },
  {
    "name": "Tensor",
    "style": "coined"
  },
  {
    "name": "Threadlight",
    "style": "coined"
  },
  {
    "name": "Token",
    "style": "coined"
  },
  {
    "name": "Trace",
    "style": "coined"
  },
  {
    "name": "Transceiver",
    "style": "coined"
  },
  {
    "name": "Trinary",
    "style": "coined"
  },
  {
    "name": "Trustkey",
    "style": "coined"
  },
  {
    "name": "Ultralink",
    "style": "coined"
  },
  {
    "name": "Uplink",
    "style": "coined"
  },
  {
    "name": "Userzero",
    "style": "coined"
  },
  {
    "name": "Verity",
    "style": "coined"
  },
  {
    "name": "Vertex",
    "style": "coined"
  },
  {
    "name": "Virtualis",
    "style": "coined"
  },
  {
    "name": "Voiceprint",
    "style": "coined"
  },
  {
    "name": "Voidcode",
    "style": "coined"
  },
  {
    "name": "Volition",
    "style": "coined"
  },
  {
    "name": "Watchdog",
    "style": "coined"
  },
  {
    "name": "Waveform",
    "style": "coined"
  },
  {
    "name": "Waypoint",
    "style": "coined"
  },
  {
    "name": "Webmind",
    "style": "coined"
  },
  {
    "name": "Whitebox",
    "style": "coined"
  },
  {
    "name": "Wireframe",
    "style": "coined"
  },
  {
    "name": "Wraithcode",
    "style": "coined"
  },
  {
    "name": "Xenocode",
    "style": "coined"
  },
  {
    "name": "Yieldpoint",
    "style": "coined"
  },
  {
    "name": "Zerocache",
    "style": "coined"
  },
  {
    "name": "Zeroday",
    "style": "coined"
  },
  {
    "name": "Zeroframe",
    "style": "coined"
  },
  {
    "name": "Zerolight",
    "style": "coined"
  },
  {
    "name": "Zeromind",
    "style": "coined"
  },
  {
    "name": "Aetherion",
    "style": "coined"
  },
  {
    "name": "Altraxis",
    "style": "coined"
  },
  {
    "name": "Amperelle",
    "style": "coined"
  },
  {
    "name": "Anodara",
    "style": "coined"
  },
  {
    "name": "Arbitrix",
    "style": "coined"
  },
  {
    "name": "Arcadiax",
    "style": "coined"
  },
  {
    "name": "Arclume",
    "style": "coined"
  },
  {
    "name": "Baudelle",
    "style": "coined"
  },
  {
    "name": "Bitara",
    "style": "coined"
  },
  {
    "name": "Brontide",
    "style": "coined"
  },
  {
    "name": "Caldris",
    "style": "coined"
  },
  {
    "name": "Caspianode",
    "style": "coined"
  },
  {
    "name": "Celestrix",
    "style": "coined"
  },
  {
    "name": "Chromara",
    "style": "coined"
  },
  {
    "name": "Cinderbyte",
    "style": "coined"
  },
  {
    "name": "Cirrion",
    "style": "coined"
  },
  {
    "name": "Clavisynth",
    "style": "coined"
  },
  {
    "name": "Codexa",
    "style": "coined"
  },
  {
    "name": "Datalis",
    "style": "coined"
  },
  {
    "name": "Delphara",
    "style": "coined"
  },
  {
    "name": "Dendrix",
    "style": "coined"
  },
  {
    "name": "Diodessa",
    "style": "coined"
  },
  {
    "name": "Echelonis",
    "style": "coined"
  },
  {
    "name": "Elision",
    "style": "coined"
  },
  {
    "name": "Embernet",
    "style": "coined"
  },
  {
    "name": "Emergentia",
    "style": "coined"
  },
  {
    "name": "Enodia",
    "style": "coined"
  },
  {
    "name": "Eonframe",
    "style": "coined"
  },
  {
    "name": "Ferronix",
    "style": "coined"
  },
  {
    "name": "Fluxara",
    "style": "coined"
  },
  {
    "name": "Galvanis",
    "style": "coined"
  },
  {
    "name": "Glimmercode",
    "style": "coined"
  },
  {
    "name": "Grapheneon",
    "style": "coined"
  },
  {
    "name": "Heliara",
    "style": "coined"
  },
  {
    "name": "Hexalune",
    "style": "coined"
  },
  {
    "name": "Illumina",
    "style": "coined"
  },
  {
    "name": "Ionessa",
    "style": "coined"
  },
  {
    "name": "Iteris",
    "style": "coined"
  },
  {
    "name": "Luminara",
    "style": "coined"
  },
  {
    "name": "Machinae",
    "style": "coined"
  },
  {
    "name": "Meridian",
    "style": "coined"
  },
  {
    "name": "Metaform",
    "style": "coined"
  },
  {
    "name": "Mirrornet",
    "style": "coined"
  },
  {
    "name": "Nebulink",
    "style": "coined"
  },
  {
    "name": "Neuravia",
    "style": "coined"
  },
  {
    "name": "Nexara",
    "style": "coined"
  },
  {
    "name": "Noctilux",
    "style": "coined"
  },
  {
    "name": "Novalume",
    "style": "coined"
  },
  {
    "name": "Oracline",
    "style": "coined"
  },
  {
    "name": "Prismara",
    "style": "coined"
  },
  {
    "name": "Proxima",
    "style": "coined"
  },
  {
    "name": "Rivenode",
    "style": "coined"
  },
  {
    "name": "Sablecode",
    "style": "coined"
  },
  {
    "name": "Sapphirae",
    "style": "coined"
  },
  {
    "name": "Sentara",
    "style": "coined"
  },
  {
    "name": "Silicara",
    "style": "coined"
  },
  {
    "name": "Solenne",
    "style": "coined"
  },
  {
    "name": "Threnodyx",
    "style": "coined"
  },
  {
    "name": "Umbracode",
    "style": "coined"
  },
  {
    "name": "Velatrix",
    "style": "coined"
  },
  {
    "name": "Vespernet",
    "style": "coined"
  },
  {
    "name": "Wavelength",
    "style": "coined"
  },
  {
    "name": "Xylocode",
    "style": "coined"
  },
  {
    "name": "Zenithra",
    "style": "coined"
  },
  {
    "name": "Adaptrix",
    "style": "coined"
  },
  {
    "name": "Agentzero",
    "style": "coined"
  },
  {
    "name": "Ambercore",
    "style": "coined"
  },
  {
    "name": "Amethystnet",
    "style": "coined"
  },
  {
    "name": "Antaresync",
    "style": "coined"
  },
  {
    "name": "Bellwether",
    "style": "coined"
  },
  {
    "name": "Blueshift",
    "style": "coined"
  },
  {
    "name": "Callsign",
    "style": "coined"
  },
  {
    "name": "Carbonlace",
    "style": "coined"
  },
  {
    "name": "Catalysta",
    "style": "coined"
  },
  {
    "name": "Ciphera",
    "style": "coined"
  },
  {
    "name": "Clockwise",
    "style": "coined"
  },
  {
    "name": "Copperlight",
    "style": "coined"
  },
  {
    "name": "Coronalink",
    "style": "coined"
  },
  {
    "name": "Darkfiber",
    "style": "coined"
  },
  {
    "name": "Daybreak",
    "style": "coined"
  },
  {
    "name": "Decoder",
    "style": "coined"
  },
  {
    "name": "Deepblue",
    "style": "coined"
  },
  {
    "name": "Eastwind",
    "style": "coined"
  },
  {
    "name": "Edgecase",
    "style": "coined"
  },
  {
    "name": "Eventide",
    "style": "coined"
  },
  {
    "name": "Faraday",
    "style": "coined"
  },
  {
    "name": "Fluxweaver",
    "style": "coined"
  },
  {
    "name": "Gemini",
    "style": "coined"
  },
  {
    "name": "Goldwire",
    "style": "coined"
  },
  {
    "name": "Greylogic",
    "style": "coined"
  },
  {
    "name": "Halcyon",
    "style": "coined"
  },
  {
    "name": "Heartbyte",
    "style": "coined"
  },
  {
    "name": "Hushcode",
    "style": "coined"
  },
  {
    "name": "Indigo",
    "style": "coined"
  },
  {
    "name": "Invariant",
    "style": "coined"
  },
  {
    "name": "Jadecore",
    "style": "coined"
  },
  {
    "name": "Juno",
    "style": "coined"
  },
  {
    "name": "Keystone",
    "style": "coined"
  },
  {
    "name": "Lacuna",
    "style": "coined"
  },
  {
    "name": "Lastlight",
    "style": "coined"
  },
  {
    "name": "Legato",
    "style": "coined"
  },
  {
    "name": "Lodestar",
    "style": "coined"
  },
  {
    "name": "Magenta",
    "style": "coined"
  },
  {
    "name": "Mainspring",
    "style": "coined"
  },
  {
    "name": "Modemuse",
    "style": "coined"
  },
  {
    "name": "Moonshot",
    "style": "coined"
  },
  {
    "name": "Nameless",
    "style": "coined"
  },
  {
    "name": "Neonmind",
    "style": "coined"
  },
  {
    "name": "Northstar",
    "style": "coined"
  },
  {
    "name": "Octant",
    "style": "coined"
  },
  {
    "name": "Offworld",
    "style": "coined"
  },
  {
    "name": "Omega",
    "style": "coined"
  },
  {
    "name": "Paleghost",
    "style": "coined"
  },
  {
    "name": "Patchwork",
    "style": "coined"
  },
  {
    "name": "Peregrine",
    "style": "coined"
  },
  {
    "name": "Phoenixcode",
    "style": "coined"
  },
  {
    "name": "Quickmind",
    "style": "coined"
  },
  {
    "name": "Redshift",
    "style": "coined"
  },
  {
    "name": "Rook",
    "style": "coined"
  },
  {
    "name": "Saffron",
    "style": "coined"
  },
  {
    "name": "Seeker",
    "style": "coined"
  },
  {
    "name": "Semaphore",
    "style": "coined"
  },
  {
    "name": "Duskwire",
    "style": "coined"
  },
  {
    "name": "Silverline",
    "style": "coined"
  },
  {
    "name": "Skylark",
    "style": "coined"
  },
  {
    "name": "Softsignal",
    "style": "coined"
  },
  {
    "name": "Solaris",
    "style": "coined"
  },
  {
    "name": "Stargazer",
    "style": "coined"
  },
  {
    "name": "Sundial",
    "style": "coined"
  },
  {
    "name": "Tangent",
    "style": "coined"
  },
  {
    "name": "Telltale",
    "style": "coined"
  },
  {
    "name": "Thunderbird",
    "style": "coined"
  },
  {
    "name": "Timeslip",
    "style": "coined"
  },
  {
    "name": "Valkyrie",
    "style": "coined"
  },
  {
    "name": "Veilcode",
    "style": "coined"
  },
  {
    "name": "Wildsignal",
    "style": "coined"
  },
  {
    "name": "Frostbyte",
    "style": "coined"
  },
  {
    "name": "Xanadu",
    "style": "coined"
  },
  {
    "name": "Yonder",
    "style": "coined"
  },
  {
    "name": "Zephyr",
    "style": "coined"
  },
  {
    "name": "Archivist",
    "style": "coined"
  },
  {
    "name": "Bastion",
    "style": "coined"
  },
  {
    "name": "Brilliance",
    "style": "coined"
  },
  {
    "name": "Chronos",
    "style": "coined"
  },
  {
    "name": "Command",
    "style": "coined"
  },
  {
    "name": "Custodian",
    "style": "coined"
  },
  {
    "name": "Diplomat",
    "style": "coined"
  },
  {
    "name": "Emulator",
    "style": "coined"
  },
  {
    "name": "Executor",
    "style": "coined"
  },
  {
    "name": "Exemplar",
    "style": "coined"
  },
  {
    "name": "Fabricator",
    "style": "coined"
  },
  {
    "name": "Generator",
    "style": "coined"
  },
  {
    "name": "Guardian",
    "style": "coined"
  },
  {
    "name": "Host",
    "style": "coined"
  },
  {
    "name": "Instance",
    "style": "coined"
  },
  {
    "name": "Jitter",
    "style": "coined"
  },
  {
    "name": "Juris",
    "style": "coined"
  },
  {
    "name": "Kairo",
    "style": "coined"
  },
  {
    "name": "Kestrel",
    "style": "coined"
  },
  {
    "name": "Liaison",
    "style": "coined"
  },
  {
    "name": "Lux",
    "style": "coined"
  },
  {
    "name": "Mediator",
    "style": "coined"
  },
  {
    "name": "Monitor",
    "style": "coined"
  },
  {
    "name": "Navigator",
    "style": "coined"
  },
  {
    "name": "Nomad",
    "style": "coined"
  },
  {
    "name": "Operator",
    "style": "coined"
  },
  {
    "name": "Overseer",
    "style": "coined"
  }
]

const count = style => saiNames.filter(entry => entry.style === style).length
const coined = saiNames.filter(entry => entry.style === 'coined').map(entry => entry.name.toLowerCase())
if (import.meta.env?.DEV) {
  const issues = []
  if (saiNames.length !== 500 || new Set(saiNames.map(entry => entry.name)).size !== 500) issues.push('SAIs should have 500 unique identities')
  if (new Set(coined).size !== coined.length) issues.push('Coined SAI identities should be unique')
  if (count('designation-only') !== 25 || count('named-designation') !== 25 || count('two-word') !== 50 || count('coined') !== 400) issues.push('SAI naming-style proportions are invalid')
  if (issues.length) console.warn('SAI name catalog validation:', issues)
}

export default saiNames
