/* Original academic reading practice, first set of passages. */
const academicReadingCards = [
  [
    "Urban trees",
    "Trees cool cities by blocking sunlight and releasing water vapour. Evaporation takes heat from surrounding air.|How does evaporation affect nearby air?|It removes heat from the air.\nA street between tall buildings may already receive little direct sunlight.|Why might extra shade have a limited effect on a narrow street?|The buildings already provide shade.\nResearchers compare streets with similar building layouts to isolate the effect of vegetation.|Why compare streets with similar layouts?|To reduce the influence of existing shade.\nA newly planted tree has a smaller crown than a mature tree.|Why might a new planting scheme take years to show its full benefit?|Young trees cast less shade.\nCooling varies with local water availability because drought can reduce evaporation.|Why can drought reduce cooling?|Leaves release less water."
  ],
  [
    "Memory and retrieval",
    "Rereading can make sentences feel familiar without making their information easy to recall.|What is the limitation of rereading?|Recognition may be mistaken for independent recall.\nStudents who retrieve facts from memory often retain them longer than those who only reread.|What advantage does retrieval offer?|Improved long-term retention.\nInitial understanding remains important because learners need meaningful material to retrieve.|Why should learners first understand a text?|They need meaningful information to recall.\nFeedback corrects errors that could otherwise be repeated.|Why check answers after retrieval?|To prevent errors from becoming established.\nSpacing retrieval attempts across several days increases the opportunity to practise after forgetting begins.|Why spread practice over time?|To exercise recall after some forgetting."
  ],
  [
    "River sediment",
    "When a river enters a wide lake, its current often slows as water spreads.|Why can sediment settle near the river mouth?|The current loses speed.\nSand settles faster than fine suspended particles under similar conditions.|Which material is likely to remain suspended longer?|Fine sediment.\nAccumulated deposits can gradually build a delta.|How does a delta form?|Material collects over time.\nWaves can redistribute newly deposited particles along the shore.|What can alter deposits after they settle?|Wave-driven movement.\nStrong coastal currents may remove sediment faster than the river supplies it.|Why might a delta shrink?|Removal exceeds delivery."
  ],
  [
    "Borrowed words",
    "A borrowed word can develop a narrower meaning in the receiving language.|What kind of change is described?|A reduction in the range of meanings.\nWords introduced through trade may become associated with particular imported goods.|Why mention commercial exchange?|It provides a context for borrowing.\nDifferent communities sometimes adapt the same term in different ways.|What can explain variation in a borrowed term?|Local patterns of use.\nPronunciation may change to fit sounds familiar to speakers.|Why might the borrowed word sound different?|Speakers adapt it to their sound system.\nRepeated use over generations can establish the new meaning.|How can an initially novel meaning become conventional?|Through continued community use."
  ],
  [
    "Passive cooling",
    "During a hot afternoon, exterior shutters prevent sunlight from reaching indoor surfaces.|How can shutters reduce cooling demand?|They block solar heating.\nIn a climate with cool nights, ventilation can release heat stored in walls.|Why open windows after sunset?|To remove stored warmth.\nIf outdoor air stays warm, night ventilation offers little cooling.|When is night ventilation less effective?|When nights remain hot.\nInsulated walls slow heat transfer between inside and outside.|What is the purpose of insulation?|To reduce heat flow.\nDesigners must consider noise and pollution before relying on open windows.|Why assess the surroundings?|Ventilation may create other problems."
  ],
  [
    "Citizen science",
    "Volunteer observations can cover areas a small research team cannot visit frequently.|What is a strength of volunteer surveys?|Broad geographical coverage.\nObservers often visit places near roads more frequently than remote locations.|What introduces geographical bias?|Uneven accessibility.\nBrightly coloured species may be reported more often than inconspicuous ones.|What can affect the likelihood of detection?|How noticeable a species is.\nRecording search duration helps researchers interpret the number of observations.|Why record effort?|To compare reports more fairly.\nSystematic surveys can provide an independent check on volunteer findings.|Why combine different survey methods?|To evaluate possible bias."
  ],
  [
    "Musical expectation",
    "Repeated rhythmic patterns lead listeners to expect certain events.|How do patterns influence perception?|They create expectations.\nComposers can postpone an expected chord to sustain tension.|How might a composer avoid immediate resolution?|By delaying an anticipated harmony.\nA surprising ending stands out when the preceding pattern is strong.|When is a deviation especially noticeable?|After a clear pattern has formed.\nFamiliarity with a musical tradition shapes what listeners anticipate.|Why can people react differently to the same phrase?|They have different musical experiences.\nA listener can recognise a regular beat without knowing formal musical notation.|What is unnecessary for detecting a beat?|Knowledge of written musical symbols."
  ],
  [
    "Decomposition",
    "Bacteria and fungi break down organic matter, releasing nutrients.|What role do decomposers play?|They recycle nutrients.\nVery dry soil can limit microbial activity.|Why may leaves decay slowly during drought?|Microorganisms lack moisture.\nWaterlogged soil may contain too little oxygen for some decomposers.|Why can saturation slow decay?|Oxygen becomes limited.\nTemperature affects the rate of many biological reactions.|What can cause seasonal differences in decay?|Changes in temperature.\nThe same quantity of leaves can decay at different rates in different gardens.|Why is material quantity insufficient to predict decay?|Environmental conditions also matter."
  ],
  [
    "Historical maps",
    "Maps are designed for particular purposes rather than recording every feature.|Why are historical maps selective?|Their intended uses differ.\nMilitary maps may emphasise hills and routes important to movement.|Why would a map highlight terrain?|It matters for military planning.\nCommercial maps often give ports and markets greater prominence.|What shapes the priorities of a trade map?|Economic activity.\nBlank spaces may reflect incomplete knowledge rather than empty land.|What should historians avoid assuming?|That unmarked areas were uninhabited.\nComparing maps with written records can reveal whether a change was real or representational.|Why consult independent records?|To distinguish landscape changes from mapping choices."
  ],
  [
    "Animal navigation",
    "Migrating animals may use several sources of directional information.|What makes navigation flexible?|The availability of multiple cues.\nA bird can orient by the sun when it is visible.|What is one possible daytime cue?|The position of the sun.\nClouds can prevent direct observation of the sun.|Why might another cue be necessary?|Weather can hide a visual reference.\nAn animal may still navigate after one cue is removed by relying on another.|Why does successful navigation not prove a removed cue was irrelevant?|The animal may compensate.\nExperiments should investigate how cues interact as well as their separate effects.|What should researchers examine beyond individual cues?|How different sources work together."
  ],
  [
    "Digital archives",
    "Digitisation allows people far from an archive to consult its documents.|What is one benefit of digitisation?|Remote access.\nAutomated recognition makes large collections searchable.|How can researchers find references more quickly?|By searching recognised text.\nDamaged paper and irregular handwriting can produce recognition errors.|Why might a search miss a word?|The software may misread it.\nImages of original pages allow uncertain readings to be inspected.|Why preserve images alongside text?|To verify questionable transcriptions.\nA search index is useful for locating evidence but cannot replace original documents entirely.|What is the limitation of searchable text?|It is not a perfect substitute for the source."
  ],
  [
    "Meadow competition",
    "Plants in dense meadows compete for light, water and nutrients.|What drives competition?|Limited shared resources.\nTall plants may intercept sunlight before it reaches shorter plants.|What advantage can height provide?|Greater access to light.\nSome short plants begin growing before taller neighbours develop a canopy.|How can short plants avoid early shading?|They grow earlier in the season.\nShade-tolerant species can persist beneath taller vegetation.|What is another strategy for surviving competition?|Tolerance of low light.\nChanging mowing schedules alters the times when sunlight reaches different species.|How may mowing influence the plant community?|By changing resource availability over time."
  ],
  [
    "Museum interpretation",
    "A museum label has limited space, so curators must select information.|Why cannot every detail appear on a label?|The available space is restricted.\nSpecialist labels can assume knowledge that casual visitors lack.|Why might technical labels be hard to understand?|They require prior knowledge.\nA short introduction can present the essential context.|What is the purpose of an introductory label?|To communicate key information quickly.\nOptional panels or guides can provide more detailed explanations.|How can interested visitors learn more?|Use additional interpretive materials.\nLayered information allows visitors to choose how deeply to explore a subject.|Why provide multiple levels of detail?|Audience interests differ."
  ],
  [
    "Battery storage",
    "Solar generation depends on sunlight, while electricity demand follows human activities.|Why may production and demand peak at different times?|They respond to different conditions.\nBatteries can absorb surplus energy and release it later.|How can storage address a timing mismatch?|It shifts energy use across time.\nCapacity describes the amount of energy that can be stored.|What does storage capacity measure?|The total amount of stored energy.\nPower describes the rate at which energy is delivered.|What distinguishes power from capacity?|It measures delivery rate.\nA low-power battery may not meet a brief large load despite having sufficient stored energy.|Why can stored energy alone be insufficient?|The energy may be delivered too slowly."
  ],
  [
    "Coral bleaching",
    "Many reef-building corals receive part of their energy from microscopic algae.|What do the algae provide?|A contribution to the coral's energy supply.\nUnusually warm water can disrupt the relationship between coral and algae.|What can trigger bleaching?|Heat stress.\nLoss of many algae causes the coral to become pale.|Why does bleaching change appearance?|The coral loses pigmented partners.\nCorals can recover if stressful conditions end soon enough.|Why is bleaching not always fatal?|The partnership may be restored.\nProlonged heat can increase mortality by reducing the coral's energy supply.|Why monitor recovery after a heat event?|Long-term survival may differ from initial bleaching."
  ],
  [
    "Experimental controls",
    "Researchers may divide similar plants into a treated and untreated group.|What comparison is central to the experiment?|Plants receiving and not receiving the treatment.\nBoth groups receive comparable light and water.|Why hold these conditions similar?|To limit alternative explanations.\nThe untreated group provides a reference for normal development.|What is its role?|A baseline.\nWithout a control, favourable weather could be mistaken for a treatment effect.|Why is a comparison necessary?|Growth may have other causes.\nA control improves inference but does not eliminate all uncertainty.|What limitation remains?|Other sources of uncertainty can persist."
  ],
  [
    "Sound transmission",
    "Sound passes between rooms through air gaps and solid structures.|What are two possible transmission routes?|Airborne paths and structural vibration.\nSealing gaps around a door reduces some airborne sound.|What does improving a door seal target?|Noise passing through the air.\nFootsteps may transmit vibration through floors despite a sealed door.|Why can footsteps remain audible?|They travel through the structure.\nA resilient layer beneath flooring can reduce vibration transfer.|What can address structural transmission?|A layer that isolates movement.\nDiagnosing the source and pathway helps select an appropriate treatment.|Why identify the route before buying insulation?|Different routes need different remedies."
  ],
  [
    "Seasonal wetlands",
    "Some wetlands fill in rainy months and dry later in the year.|What characterises these habitats?|A recurring change in water availability.\nFish may be unable to survive the dry period.|Why might fish be absent?|The habitat periodically loses water.\nReduced fish predation can benefit some amphibian larvae.|How can fish absence affect amphibians?|It can reduce the risk of being eaten.\nPermanent flooding may allow fish populations to establish.|Why can keeping a pool full alter its ecology?|New predators may survive there.\nConservation may require protecting natural flooding and drying patterns.|What should management preserve?|The seasonal water cycle."
  ],
  [
    "Price signals",
    "Scarcity can raise a good's price when demand remains strong.|What can a price increase signal?|Limited supply relative to demand.\nHigher prices may encourage buyers to consume less.|How can consumers respond?|By reducing purchases.\nProducers may expand output when prices rise.|How can sellers respond?|By increasing production.\nCapacity expansion takes time, so supply may not rise immediately.|Why can producer responses be delayed?|Additional capacity is not instant.\nConsumers with few alternatives may find it difficult to reduce use.|Why does the strength of the response vary?|The ability to substitute differs."
  ],
  [
    "Colour perception",
    "A white object reflects different light under different lamps.|Why can the physical light reaching the eye vary?|Illumination changes.\nThe visual system uses nearby surfaces as contextual clues.|How does the brain interpret illumination?|It considers surrounding information.\nColour constancy helps objects look similar across lighting conditions.|What does colour constancy preserve?|Relative stability in perceived colour.\nWhen clues are absent, observers can disagree about the colour of an image.|Why can ambiguous pictures produce disagreement?|The lighting context is uncertain.\nPerceived colour reflects both incoming light and assumptions about the light source.|Why is perception not a simple measurement?|Interpretation also contributes."
  ],
  [
    "Ocean circulation",
    "Winds, Earth's rotation and continent shapes influence surface currents.|What shapes surface ocean circulation?|Atmospheric and geographical forces.\nWater density depends partly on salinity and temperature.|Which properties affect density?|Salt content and temperature.\nCold salty water may sink when it is denser than surrounding water.|What can cause downward movement?|A density difference.\nCurrents transport heat and dissolved substances over large distances.|What does ocean circulation redistribute?|Thermal energy and dissolved material.\nSeveral forces operate together, so responses to changes can be complex.|Why is prediction difficult?|Multiple processes interact."
  ],
  [
    "Transport networks",
    "A fast train can save little time if the connecting bus requires a long wait.|What can cancel the benefit of a fast route?|Transfer delays.\nCoordinating departures can reduce waiting without changing vehicle speed.|How can planners improve connections?|Align service timetables.\nVery tight transfers are vulnerable to late arrivals.|What is the disadvantage of a short connection?|Passengers may miss the next service.\nExtra transfer time can absorb ordinary delays.|What is the benefit of a buffer?|It provides flexibility.\nEffective planning balances speed and reliability across the complete journey.|What is the overall design goal?|Reliable travel with reasonable total duration."
  ],
  [
    "Seed preservation",
    "Seed banks store samples of plant diversity for possible future use.|What is their purpose?|Preserving genetic resources.\nLow temperature and controlled moisture can extend seed survival.|How can storage conditions help?|They slow deterioration.\nDifferent species vary in how long seeds remain viable.|Why does one storage period not suit all samples?|Survival differs among species.\nGermination tests determine whether seeds can still begin growing.|What does a periodic test establish?|Remaining viability.\nGrowing new plants to replace old seeds must be planned to retain rare genetic traits.|Why is regeneration managed carefully?|To avoid loss of genetic diversity."
  ],
  [
    "Scientific uncertainty",
    "Researchers often report ranges instead of a single exact prediction.|Why use a range?|Evidence may support several plausible outcomes.\nA narrow estimate can imply more precision than the evidence allows.|What is the risk of false precision?|It can overstate certainty.\nA central estimate communicates the most representative expectation.|What information can accompany a range?|A typical or central value.\nExplaining sources of uncertainty helps readers understand limitations.|Why describe these sources?|To clarify why outcomes may differ.\nUncertainty about an exact result is not the same as knowing nothing about a process.|What distinction is important?|Incomplete precision is different from complete ignorance."
  ]
];

const academicReadingCards2 = [
  [
    "Glacier records",
    "Snow accumulates in layers that gradually compress into ice.|How do annual snow deposits become part of a glacier?|Pressure compacts them.\nAir bubbles trapped in ice preserve samples of earlier atmospheres.|What can bubbles reveal?|The composition of past air.\nDust and chemical traces can provide evidence of volcanic events.|What can identify past eruptions?|Particles and chemical residues.\nIce near the bottom has often been deformed by movement and pressure.|Why can deep layers be difficult to date?|Their original arrangement may be distorted.\nScientists compare several indicators rather than relying on one measurement.|Why combine evidence?|It helps resolve uncertainties in reconstruction."
  ],
  [
    "Insect pollination",
    "Many flowering plants transfer pollen through visiting animals.|What role can insects play?|Moving pollen between flowers.\nA flower's shape can make nectar easier for certain insects to reach.|How can structure affect visitors?|It favours insects with suitable bodies.\nPlants may flower at different times, reducing competition for pollinators.|What advantage can different flowering periods offer?|Less overlap in demand for visitors.\nA visitor that collects nectar without touching reproductive structures may transfer little pollen.|Why is a visit not always effective pollination?|Contact with the relevant structures is needed.\nMonitoring fruit production helps assess whether pollen transfer was sufficient.|What outcome can indicate pollination success?|The development of fruit."
  ],
  [
    "Public clocks",
    "Before standard time, towns often set clocks according to local solar noon.|Why could nearby towns show different times?|They used local observations.\nRailway services connected towns and required reliable timetables.|What created pressure to coordinate time?|Scheduled travel between places.\nAdopting a common time reduced ambiguity for passengers.|What practical advantage did standardisation offer?|Consistent departure information.\nLocal noon could then differ from the clock's noon.|What changed when common time was adopted?|Clock time no longer exactly followed the local sun.\nThe transition required coordination among businesses and public institutions.|Why was changing clocks alone insufficient?|Social practices also needed adjustment."
  ],
  [
    "Water filtration",
    "A coarse screen removes leaves and other large objects from water.|What is removed at an early stage?|Large debris.\nFine sand filters can trap smaller suspended particles.|Why use a finer medium?|To capture smaller solids.\nSome dissolved substances pass through ordinary particle filters.|What limitation remains after filtration?|Dissolved contaminants may persist.\nDisinfection addresses microorganisms using a separate process.|Why might treatment require disinfection?|Particle removal alone may not make water microbiologically safe.\nWater quality testing determines whether the complete treatment meets its objective.|How is success assessed?|Through measurements of treated water."
  ],
  [
    "The printing process",
    "Movable type allowed individual characters to be rearranged for new pages.|What made the system reusable?|Separate characters could be recombined.\nPreparing a page still required careful alignment of the type.|Why did composition take time?|Characters had to be positioned accurately.\nOnce a page was assembled, many impressions could be made.|What advantage emerged after preparation?|Repeated copies could be produced.\nErrors discovered late might affect several already printed sheets.|Why was proofreading important before a print run?|Mistakes could be reproduced many times.\nThe economic benefit increased when many copies shared the same setup cost.|Why was the technique suited to larger editions?|Initial labour was distributed across more copies."
  ],
  [
    "Coastal dunes",
    "Wind can carry dry sand from a beach inland.|How does sand reach dunes?|It is transported by air.\nVegetation slows near-surface wind and traps moving grains.|How do plants help dunes grow?|They reduce wind speed and capture sand.\nRoots may help stabilise accumulated material.|What provides further resistance to erosion?|Plant root systems.\nFoot traffic can damage dune vegetation.|Why can repeated walking weaken dunes?|It destroys plants that hold sand.\nRaised paths allow access while limiting disturbance.|What is the purpose of a boardwalk?|To concentrate travel away from sensitive surfaces."
  ],
  [
    "Thermal mass",
    "Dense materials such as stone can absorb heat during a warm period.|What property makes stone useful in this design?|It can store thermal energy.\nLater, stored heat can be released as the surroundings cool.|How can thermal mass affect night temperatures?|It returns previously absorbed warmth.\nThis effect delays temperature changes rather than eliminating heat transfer.|What is the main effect on timing?|Temperature fluctuations are slowed.\nIn a building that never cools at night, stored heat may accumulate.|When may high thermal mass be disadvantageous?|When heat cannot be released sufficiently.\nDesigners combine thermal mass with shading and ventilation when appropriate.|Why consider several design features together?|Storage alone may not provide comfort."
  ],
  [
    "Learning a second language",
    "Learners may understand a word before being able to produce it spontaneously.|What distinction is illustrated?|Receptive and productive knowledge.\nRepeated encounters with words in meaningful contexts strengthen associations.|What can improve recognition?|Contextual exposure.\nSpeaking requires rapid access to vocabulary while organising grammar.|Why can speaking be harder than recognition?|Several processes must occur in real time.\nShort repeated conversations allow familiar expressions to become easier to retrieve.|What can practice improve?|Speed of access to useful phrases.\nFeedback can help learners notice forms they repeatedly misuse.|What is a role of correction?|Identifying recurring language errors."
  ],
  [
    "Lichen communities",
    "Lichens consist of fungi associated with photosynthetic partners.|What kind of association is described?|A partnership between different organisms.\nThe photosynthetic partner produces organic compounds using light.|What contribution does that partner make?|Production of energy-rich substances.\nThe fungus provides structure and helps retain moisture.|What is a fungal contribution?|Physical support and water retention.\nSome lichens grow on exposed rock with little soil.|Where can certain lichens survive?|On surfaces lacking developed soil.\nLichen sensitivity to air pollutants varies among species.|Why study lichen communities near cities?|Their composition can reflect environmental conditions."
  ],
  [
    "Mechanical gears",
    "Two meshing gears rotate as their teeth engage.|How is motion transferred?|Through interacting teeth.\nA smaller driving gear can turn a larger gear more slowly.|How can the driven gear's speed change?|It can decrease.\nThe slower driven gear can provide greater torque in an ideal arrangement.|What advantage can a reduction in speed offer?|Increased turning force.\nFriction and deformation cause some energy losses in real systems.|Why is real efficiency below the ideal?|Some energy is dissipated.\nEngineers choose gear ratios to match a machine's load and operating speed.|What guides ratio selection?|The required operating conditions."
  ],
  [
    "Tree rings",
    "Many trees in seasonal climates produce distinguishable growth rings.|What makes these trees useful for dating?|Repeated annual growth patterns.\nRing width can vary with water availability and other environmental factors.|What may influence ring thickness?|Conditions during growth.\nResearchers compare overlapping ring patterns from different trees.|How can samples be placed on a common timeline?|By matching characteristic sequences.\nLocal damage can alter growth independently of regional climate.|Why is one tree insufficient for broad conclusions?|Individual events may distort its record.\nCombining multiple samples helps identify signals shared across a region.|What improves confidence in regional interpretation?|Agreement among several trees."
  ],
  [
    "Refrigeration cycles",
    "A refrigerant evaporates at low pressure while absorbing heat from its surroundings.|What occurs during evaporation?|Heat is taken from the cooled space.\nA compressor raises the pressure and temperature of the vapour.|What is the compressor's role?|Increasing vapour pressure.\nThe hot refrigerant rejects heat in a condenser and becomes liquid.|Where does heat leave the refrigerant?|At the condenser.\nAn expansion device lowers pressure before the evaporator.|Why use an expansion device?|To prepare refrigerant for low-pressure evaporation.\nElectrical input enables heat transfer from a cooler area to a warmer one.|Why does the cycle require external energy?|It moves heat against its natural direction."
  ],
  [
    "Population sampling",
    "Researchers often cannot measure every individual in a large population.|Why are samples used?|A complete survey may be impractical.\nRandom selection can reduce systematic differences in who is included.|What is an advantage of random sampling?|It limits selection bias.\nA small sample may vary considerably by chance.|Why can estimates from small groups be unstable?|Random variation has greater influence.\nA large biased sample can still give misleading results.|Why does increasing sample size not solve every problem?|Systematic bias can remain.\nResearchers report uncertainty and describe their selection method.|What helps readers evaluate a result?|Information about precision and sampling procedures."
  ],
  [
    "Paper conservation",
    "Paper can become brittle as chemical reactions break down its fibres.|What causes some documents to lose strength?|Degradation of fibres.\nHigh humidity may encourage mould growth.|Why control moisture?|To limit biological damage.\nExposure to light can cause fading in sensitive pigments.|Why limit display illumination?|To protect colours.\nHandling fragile pages can produce tears even when the text remains legible.|What risk does handling create?|Physical damage.\nProviding digital copies can reduce the need to consult originals repeatedly.|How can digitisation support conservation?|It limits frequent physical use."
  ],
  [
    "Animal communication",
    "Animals can communicate through sounds, scents and visual displays.|What forms can signals take?|Several sensory channels.\nSound can travel when vegetation blocks a direct view.|Why may sound be useful in dense habitat?|It does not always require visual contact.\nChemical signals may persist after the animal has left.|What advantage can scent provide?|Information remains available over time.\nVisual signals may be effective over short distances in good light.|When are visual displays especially practical?|When recipients can see them clearly.\nSignal choice depends on the environment and the intended receiver.|Why do communication systems differ?|Different conditions favour different channels."
  ],
  [
    "Composting heat",
    "Microorganisms release heat as they decompose organic material.|What causes a compost pile to warm?|Microbial metabolism.\nA sufficiently large pile retains more generated heat than a thin layer.|Why does pile size affect temperature?|Heat loss relative to volume changes.\nTurning compost can introduce oxygen into compacted material.|What is a purpose of mixing?|Improving air supply.\nExcess moisture can fill air spaces and limit oxygen movement.|Why can overly wet compost decompose poorly?|Aeration decreases.\nTemperature gradually falls when readily decomposed material becomes scarce.|Why does a mature pile cool?|Less easily usable material remains."
  ],
  [
    "Cartographic projections",
    "A flat map represents part or all of Earth's curved surface.|What challenge faces map designers?|Representing curvature on a plane.\nEvery global projection introduces some distortion.|Why cannot one world map preserve every property perfectly?|Flattening changes geometric relationships.\nSome projections preserve relative areas while altering shapes.|What can an equal-area map sacrifice?|Accurate local shape.\nOther designs favour accurate angles for particular navigation tasks.|Why do projection priorities differ?|Maps serve different uses.\nUsers should consider the property relevant to the question they are asking.|How should a projection be chosen?|By the measurement or purpose required."
  ],
  [
    "Light and photosynthesis",
    "Plants use light energy to support the production of organic compounds.|What role does light play?|It supplies energy.\nAt low illumination, increasing light can increase photosynthetic rate.|When can more light directly improve the rate?|When light is limiting.\nAt higher illumination, another resource may become limiting.|Why can the rate stop increasing?|A different constraint becomes important.\nCarbon dioxide availability and temperature can influence the process.|What other factors matter?|Gas supply and thermal conditions.\nA measured response must be interpreted in relation to the conditions of the experiment.|Why are experimental conditions essential?|They determine which factor limits performance."
  ],
  [
    "Oral histories",
    "Interviews can record experiences that were not documented in official records.|What can oral histories contribute?|Previously unrecorded personal accounts.\nMemory can change as people reinterpret events over time.|Why may recollections vary?|Later understanding can influence memory.\nDifferent participants may recall the same event from different perspectives.|Why gather several accounts?|They reveal contrasting viewpoints.\nAn interviewer's questions can influence which details are discussed.|What can shape the content of an interview?|The prompts used.\nHistorians compare testimony with other evidence while preserving its personal meaning.|How should testimony be evaluated?|Through contextual comparison rather than automatic acceptance or rejection."
  ],
  [
    "Habitat corridors",
    "Roads and development can separate formerly connected habitats.|What causes habitat fragmentation?|Physical barriers between areas.\nSmall isolated populations may have limited opportunities to exchange genes.|What is one genetic concern?|Reduced exchange between groups.\nCorridors can provide routes for movement between patches.|What is their intended function?|Restoring connectivity.\nA corridor must contain conditions suitable for the species using it.|Why is a line on a map insufficient?|Animals need usable habitat along the route.\nMonitoring movement helps evaluate whether a connection works.|What evidence can assess effectiveness?|Observed passage between habitats."
  ],
  [
    "Ceramic materials",
    "Clay contains water that must leave during drying.|What changes before firing?|Moisture is removed.\nUneven drying can cause different parts to shrink at different rates.|Why may cracks form?|Unequal contraction creates stress.\nFiring causes changes that make ceramic pieces harder and more stable.|What is the purpose of firing?|Transforming the dried material.\nGlazes can change the appearance and surface properties of a piece.|What can a glaze influence?|Colour and surface behaviour.\nControlled heating and cooling reduce the risk of thermal stress.|Why avoid abrupt temperature changes?|They can create damaging stress within the object."
  ],
  [
    "Scientific models",
    "A model simplifies a system to focus on selected relationships.|Why omit some details?|To concentrate on relevant mechanisms.\nAssumptions determine which conditions the model represents.|What defines the scope of a model?|Its simplifying premises.\nPredictions can be compared with observations to evaluate performance.|How can a model be tested?|Check its predictions against evidence.\nA useful model may be inaccurate outside the conditions for which it was designed.|What limitation should users remember?|Validity can depend on context.\nRevising a model when new evidence appears is a normal scientific process.|Why modify a model?|To improve its fit with observations."
  ],
  [
    "Lake oxygen",
    "Surface water can exchange oxygen with the atmosphere.|What supplies some oxygen near the surface?|Gas exchange with air.\nDuring warm periods, differences in water temperature can limit vertical mixing.|Why may deeper layers become isolated?|Temperature-related stratification.\nDecomposition consumes oxygen in deeper water.|What can reduce oxygen at depth?|Biological breakdown of organic matter.\nSeasonal cooling may allow layers to mix again.|How can oxygen reach deeper layers later?|Through renewed circulation.\nFish distributions can change when oxygen levels become unsuitable.|Why monitor dissolved oxygen?|It affects available aquatic habitat."
  ],
  [
    "Library classification",
    "Classification systems group resources by subject to support discovery.|What is the primary purpose?|Organising materials by topic.\nA book covering several subjects may fit more than one category.|Why can assigning a shelf location be difficult?|Subjects can overlap.\nA catalogue can record several subject terms for one physical item.|How can catalogues address overlapping topics?|Multiple descriptors can point to the same item.\nPhysical shelving still requires a chosen location.|What constraint remains for printed books?|An item occupies a particular place.\nSearch tools complement shelf arrangement by supporting alternative routes to the same resource.|Why combine browsing and search?|Users can approach a topic in different ways."
  ]
];

const academicReadingCards3 = [
  [
    "Cloud formation",
    "Warm moist air can rise and cool as pressure decreases.|Why does rising air often cool?|It expands under lower pressure.\nAs air cools, it may reach conditions in which water vapour condenses.|What can lead to condensation?|Cooling to saturation.\nTiny particles in the atmosphere can provide surfaces for droplets to form.|What role can airborne particles play?|They help initiate droplet formation.\nCloud droplets are initially too small to fall rapidly as precipitation.|Why do young cloud droplets remain suspended?|Their small size limits falling speed.\nRain can develop when droplets or ice particles grow sufficiently large.|What allows precipitation to reach the ground?|Growth of water or ice particles."
  ],
  [
    "Archaeological layers",
    "Sediments can accumulate over earlier human activity and preserve objects at different depths.|How can buried layers record a sequence?|Later deposits cover earlier remains.\nUndisturbed lower deposits are generally older than layers above them.|What can relative depth indicate?|The order of deposition.\nLater construction or animal burrows can move objects between layers.|Why may depth alone be misleading?|Disturbance can relocate material.\nArchaeologists record the relationships between finds and surrounding deposits.|Why document context carefully?|It helps reconstruct how material accumulated.\nIndependent dating methods can test interpretations based on layering.|Why use additional dating evidence?|To check the proposed chronology."
  ],
  [
    "Wetland water treatment",
    "Water passing through wetlands can slow as it moves among plants.|What happens to flow in dense vegetation?|Its speed may decrease.\nSlower water allows some suspended particles to settle.|How can reduced flow improve clarity?|Solids can deposit.\nPlants and microorganisms can take up or transform certain nutrients.|What processes can change nutrient concentrations?|Biological uptake and transformation.\nWetlands have limited capacity and may not handle every pollutant effectively.|Why is wetland treatment not a universal solution?|Its removal capacity is finite.\nMonitoring inflow and outflow helps determine actual treatment performance.|How can engineers assess effectiveness?|Compare water quality before and after treatment."
  ],
  [
    "Visual attention",
    "People cannot process every feature of a complex scene with equal detail.|Why is attention selective?|Processing resources are limited.\nA sudden movement may attract attention even when unrelated to a task.|What can redirect attention unexpectedly?|An abrupt visual change.\nKnowledge of a task can guide observers toward relevant regions of a scene.|How can expectations influence searching?|They direct attention to likely locations.\nFocusing on one object can make a visible change elsewhere go unnoticed.|What limitation can focused attention create?|Other changes may be missed.\nExperiments compare viewing behaviour under different instructions.|How can researchers investigate the role of goals?|Vary what observers are asked to find."
  ],
  [
    "Tidal energy",
    "Tides rise and fall partly because of gravitational interactions involving the Moon and Sun.|What contributes to tidal motion?|Gravitational forces.\nA tidal turbine extracts energy from flowing water.|How does a turbine obtain energy?|From moving currents.\nTidal schedules are relatively predictable compared with many weather-driven processes.|What is a useful feature of tides?|Their timing can be forecast.\nThe speed and direction of currents can vary during the tidal cycle.|Why does generation change over time?|Water flow changes.\nInstallation sites must also be evaluated for effects on navigation and marine habitats.|What should be assessed beyond electricity output?|Environmental and practical impacts."
  ],
  [
    "Plant dormancy",
    "Some seeds do not germinate immediately even when exposed to water.|What does seed dormancy prevent?|Immediate germination.\nCertain seeds require a period of cold before germination becomes possible.|What condition can break dormancy in some species?|Prolonged chilling.\nThis requirement can reduce germination before an unfavourable winter.|What possible benefit does chilling dependence offer?|It helps align growth with a suitable season.\nOther species respond to heat, light or changes in the seed coat.|Why are germination requirements not identical?|Different species use different environmental cues.\nDormancy spreads the risk that all seeds will germinate during a brief unsuitable period.|How can dormancy support survival?|It prevents all seedlings from emerging at once."
  ],
  [
    "Demand forecasting",
    "Retailers use past sales to estimate how many goods they will need.|Why analyse sales records?|To plan future inventory.\nSales can rise predictably during holidays or particular seasons.|What recurring factor can influence demand?|Seasonal patterns.\nA sudden promotion may change sales independently of usual seasonal trends.|Why consider planned advertising?|It can alter demand.\nForecasts based only on average sales may miss temporary peaks.|What can an overall average conceal?|Short periods of unusually high demand.\nForecast errors should be measured and used to revise planning methods.|Why review previous predictions?|To improve future estimates."
  ],
  [
    "Bird song learning",
    "Some birds develop their songs by listening to adult birds.|What can influence song development?|Exposure to experienced singers.\nYoung birds may practise incomplete versions before producing a stable pattern.|How does song improve during development?|Through repeated vocal practice.\nSong patterns can vary between populations of the same species.|What phenomenon can occur within one species?|Regional song differences.\nBirds deprived of typical song exposure may develop altered vocalisations.|Why compare birds with different exposure histories?|To investigate the role of learning.\nInherited traits and experience can both influence the resulting song.|What broader conclusion does the evidence support?|Behaviour can reflect biology and learning together."
  ],
  [
    "Recycling materials",
    "Collected recyclable materials are often separated according to composition.|Why sort collected waste?|Different materials need different processing.\nFood residue can contaminate a batch of recyclable paper.|What can reduce the quality of recovered paper?|Organic contamination.\nSome materials can lose useful properties during repeated processing.|Why is recycling not always unlimited?|Material quality may decline.\nDesigning products with easily separated components can improve recovery.|How can design support recycling?|It makes disassembly easier.\nThe environmental value of recycling also depends on transport and processing requirements.|Why assess the entire system?|Recovery consumes resources as well as saving them."
  ],
  [
    "Mountain climates",
    "Air temperature generally decreases with elevation in the lower atmosphere.|How does temperature often change on ascent?|It becomes cooler.\nMoist air forced up a mountain can cool and produce precipitation.|Why can windward slopes be wet?|Rising air cools and condenses.\nAir descending on the opposite slope can warm and become relatively drier.|What can produce a rain shadow?|Descending air on the sheltered side.\nSlope orientation influences exposure to sunlight.|Why can nearby slopes have different temperatures?|They receive different amounts of solar energy.\nMountain environments can vary considerably across short distances.|What is a consequence of these combined effects?|Strong local climatic variation."
  ],
  [
    "Textile weaving",
    "Woven fabric contains lengthwise threads crossed by threads running across them.|How is a woven structure formed?|By interlacing two thread directions.\nThe tension of the lengthwise threads affects the regularity of the weave.|Why maintain even tension?|To produce a consistent structure.\nChanging the interlacing pattern can alter fabric strength and appearance.|What can a different weave change?|Mechanical and visual properties.\nFibre choice influences moisture absorption and flexibility.|Why does the same weave behave differently with different fibres?|Material properties vary.\nA designer chooses both fibre and pattern to suit the intended application.|What guides textile construction?|The desired use of the fabric."
  ],
  [
    "Erosion and soil",
    "Rain striking bare soil can detach small particles.|What begins some forms of soil erosion?|The impact of falling water.\nRunoff can transport detached material downslope.|How do loose soil particles move?|They are carried by flowing water.\nPlant cover reduces direct impact and can slow runoff.|Why does vegetation help protect soil?|It shields the surface and reduces water speed.\nSteep slopes can increase the speed of flowing water.|Why may erosion be greater on steep ground?|Runoff can gain speed.\nLand management can reduce loss by maintaining cover and interrupting flow paths.|What is a useful prevention strategy?|Protect surfaces and slow water movement."
  ],
  [
    "Museum object provenance",
    "An object's provenance records its history of ownership and movement.|What does provenance describe?|Where an object has been and who owned it.\nReceipts, inventories and correspondence may provide evidence of transfers.|What documents can support provenance research?|Records of ownership changes.\nA gap in the record can create uncertainty about a period of the object's history.|Why are missing documents significant?|They leave part of the history unresolved.\nThe same object may have different names in records from different periods.|What can complicate linking records?|Changes in terminology.\nResearchers compare several identifying features to establish whether documents refer to the same object.|How can uncertain identification be improved?|Combine multiple matching details."
  ],
  [
    "Urban heat islands",
    "Built surfaces can absorb sunlight and store heat during the day.|Why can urban materials become warm?|They absorb and retain solar energy.\nSome stored heat is released after sunset, keeping urban areas relatively warm.|Why may cities remain warm at night?|Surfaces release accumulated heat.\nReduced vegetation can limit cooling from evaporation.|What cooling process may be weaker in heavily built districts?|Evaporative heat removal.\nWind and building arrangements influence local air movement.|Why do temperatures vary within the same city?|Local ventilation conditions differ.\nResearchers use measurements at several sites to identify patterns rather than assuming one temperature represents a city.|Why sample multiple locations?|To capture spatial variation."
  ],
  [
    "Information compression",
    "Digital files can sometimes be represented using fewer bits by exploiting patterns.|What makes compression possible?|Redundancy in information.\nLossless compression allows the exact original data to be reconstructed.|What property distinguishes lossless methods?|No original information is discarded.\nLossy compression may remove details that are less important for a particular purpose.|What trade-off can lossy methods make?|Reduced detail in exchange for smaller size.\nDifferent files compress to different degrees depending on their contents.|Why is a fixed reduction not guaranteed?|Patterns and redundancy vary.\nSelecting a method depends on whether exact reconstruction is required.|What determines which approach is suitable?|The need to preserve original data exactly."
  ],
  [
    "Flowering timing",
    "Many plants respond to the seasonal duration of daylight.|What environmental signal can influence flowering?|Day length.\nTemperature also affects the speed of development in many species.|Why may flowering dates change between years?|Thermal conditions differ.\nDifferent species can respond to different combinations of cues.|Why do species not all flower at the same time?|Their responses vary.\nChanges in flowering time can alter overlap with insect activity.|What ecological relationship may be affected?|The timing of plant and pollinator interactions.\nLong-term records allow researchers to separate seasonal variation from longer trends.|Why collect observations over many years?|To distinguish short-term differences from persistent changes."
  ],
  [
    "Building foundations",
    "A foundation distributes structural loads to the ground beneath a building.|What is the foundation's basic purpose?|Transferring loads to the supporting soil.\nSoils vary in their ability to carry loads without excessive movement.|Why investigate soil before construction?|Its bearing behaviour differs.\nUneven settlement can distort a structure even when the total load is moderate.|What risk comes from unequal ground movement?|Structural deformation.\nDeep foundations can transfer loads to more suitable layers below the surface.|Why might engineers use deep supports?|Stronger ground may lie farther down.\nFoundation selection depends on ground conditions and the building's loads.|What determines an appropriate foundation?|Both soil properties and structural requirements."
  ],
  [
    "Historical trade routes",
    "Traders often transported goods along routes shaped by geography and available infrastructure.|What influenced route selection?|Physical terrain and transport facilities.\nPorts could link maritime transport with inland routes.|What function did ports serve?|Connections between transport networks.\nSome goods passed through several intermediaries before reaching buyers.|Why might a product travel farther than any single trader?|It was exchanged at successive stages.\nTrade routes could spread techniques and ideas as well as merchandise.|What other exchange accompanied commerce?|The transmission of knowledge.\nChanges in political conditions or transport technology could redirect trade flows.|Why were routes not permanent?|External conditions could alter their usefulness."
  ],
  [
    "Noise and wildlife",
    "Human activities introduce sound into many natural habitats.|What can alter an animal's acoustic environment?|Noise from human sources.\nMasking occurs when one sound makes another harder to detect.|How can noise interfere with communication?|It obscures relevant signals.\nSome animals adjust the timing or frequency of their calls.|How might animals respond to noise?|Modify how or when they signal.\nResponses differ across species and noise conditions.|Why is one observation not sufficient for all wildlife?|Species have different sensitivities.\nResearchers compare behaviour in quieter and noisier settings while considering habitat differences.|How can noise effects be investigated?|Compare similar habitats with different acoustic conditions."
  ],
  [
    "Optical lenses",
    "A converging lens bends parallel light rays toward a focal region.|What happens to parallel rays passing through such a lens?|They are directed inward.\nFocal length describes the distance associated with the lens's focusing power.|What does focal length characterise?|The strength and geometry of focusing.\nChanging object distance affects the location and size of an image.|Why can a camera require refocusing?|Objects lie at different distances.\nLens shape and refractive properties determine how light bends.|What influences a lens's optical behaviour?|Geometry and material.\nMultiple lenses can be combined to reduce some imaging imperfections.|Why use several optical elements?|To improve image formation."
  ],
  [
    "River restoration",
    "Straightened channels can carry water rapidly through a landscape.|What effect can straightening have on flow?|It can increase conveyance speed.\nReconnecting a river with parts of its floodplain allows water to spread during high flows.|How can floodplain access change floods?|Water can occupy a wider area.\nChannel features such as pools and gravel beds provide varied habitats.|Why restore physical diversity in a river?|It supports organisms with different needs.\nRestoration outcomes depend on upstream conditions and sediment supply.|Why consider the wider catchment?|Processes outside the site affect it.\nMonitoring over several seasons can reveal whether desired changes persist.|Why is follow-up necessary?|Early improvements may not represent long-term results."
  ],
  [
    "Instrument calibration",
    "Measuring instruments can produce readings that differ from known reference values.|Why might a measurement be inaccurate?|The instrument can have systematic error.\nCalibration compares instrument readings with a suitable standard.|What does calibration involve?|Checking readings against a reference.\nA correction can account for a consistent difference.|How can a known bias be addressed?|Apply an appropriate adjustment.\nInstrument behaviour can change with age or operating conditions.|Why may repeated calibration be necessary?|Accuracy can drift.\nRecording calibration results helps users judge measurement reliability.|Why preserve calibration records?|They document the instrument's performance."
  ],
  [
    "Bookbinding",
    "Printed sheets can be folded and grouped into sections.|How are pages organised before binding?|Sheets form folded groups.\nSewing sections together can create a flexible book structure.|What can stitching provide?|A connected but flexible assembly.\nAdhesive binding can join page edges without sewing.|What alternative joining method is described?|Using adhesive.\nPaper stiffness and binding design affect how easily a book opens.|What influences opening behaviour?|The materials and construction.\nBindings should suit the expected use and desired durability of a book.|What determines an appropriate binding method?|Functional requirements and longevity."
  ],
  [
    "Peer review",
    "Researchers often submit manuscripts to journals for evaluation by specialists.|What is the purpose of this evaluation?|To examine the quality of proposed research.\nReviewers can identify unclear methods, unsupported claims or missing context.|What kinds of issues may reviewers detect?|Weaknesses in methods and reasoning.\nAuthors may revise their work in response to criticism.|How can review change a manuscript?|It can lead to improvements.\nReviewers do not normally repeat the entire study themselves.|Why does review not guarantee every finding is correct?|It is not complete independent replication.\nPublished findings remain open to further testing and debate.|What happens after publication?|Other researchers can continue evaluating the evidence."
  ]
];
