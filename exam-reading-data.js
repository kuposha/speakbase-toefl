/* Original fixed-route practice. Cloze answers contain only missing letters. */
const readingPracticeForms = (() => {
  const output = Array.from({length: 24}, () => []);
  function cloze(form, text) {
    const words = [...text.matchAll(/[A-Za-z]+(?:'[A-Za-z]+)?/g)];
    const start = text.indexOf('.') + 1;
    const candidates = words.filter(word => word.index >= start && word[0].length >= 4);
    if (candidates.length < 10) throw Error('Short cloze passage: ' + text);
    const targets = Array.from({length: 10}, (_, i) => candidates[Math.floor(i * candidates.length / 10)]);
    const source = targets.reduceRight((passage, match, i) => {
      const word = match[0], split = Math.ceil(word.length / 2);
      return passage.slice(0, match.index) + '(' + (i + 1) + ') ' + word.slice(0, split) + '_'.repeat(word.length - split) + passage.slice(match.index + word.length);
    }, text);
    targets.forEach((match, i) => {
      const word = match[0], split = Math.ceil(word.length / 2);
      const left = text.lastIndexOf('.', match.index - 1) + 1;
      const right = text.indexOf('.', match.index);
      output[form].push({type:'Complete the Words', source, ask:'Gap ' + (i + 1) + ' · Type the missing letters of ' + word.slice(0,split) + '_'.repeat(word.length-split) + '.', answer:word.slice(split), why:'Complete word: ' + word + '. In context: ' + text.slice(left, right < 0 ? text.length : right + 1).trim()});
    });
  }
  const clozeTexts = [
`A map necessarily leaves things out. Designers choose details that serve the intended journey. A railway diagram can therefore distort distances while showing connections clearly enough for passengers to change trains with confidence.`,
`Many birds replace worn feathers gradually. During this period the remaining feathers continue to support flight. Growing an entire set at once might leave the bird unable to escape predators or travel between feeding places.`,
`A library catalogue separates titles from physical copies. Several readers may request the same title even when only one copy is available. Keeping these records separate makes it possible to order another copy without describing the book again.`,
`Old photographs can hide useful information at their edges. A shop sign might reveal the location of an otherwise anonymous street. Before cropping an image, archivists therefore keep a complete version that later researchers can inspect.`,
`A drummer can change a rhythm without changing its speed. Moving the emphasis from one beat to another alters what listeners expect next. This simple shift sometimes makes a familiar pattern sound surprisingly unfamiliar.`,
`Seeds do not all travel the same way. Some have thin wings that slow their fall from a tree. Others attach to passing animals and may reach distant ground before their tiny hooks finally come loose.`,
`A potter must allow clay to dry evenly. If the rim loses moisture faster than the base, the two parts shrink at different rates. Covering the rim loosely can reduce this difference and help prevent cracks.`,
`Exhibitions rarely contain everything a museum owns. Curators select objects that together answer a particular question. An ordinary household tool can thus deserve more space than a valuable ornament when the subject is daily work.`,
`Two clocks can agree and still be wrong. Comparing them with each other reveals whether their readings differ, but only an independent reference can show how closely either reading represents the actual time.`,
`A city pavement changes how rain reaches the soil. Water that would otherwise sink into open ground may instead flow rapidly toward a drain. Replacing selected paved areas with planted beds gives some of that water another route.`,
`Names of colours vary across languages. Speakers may use a single familiar term where another community normally chooses between two terms. Researchers therefore distinguish the labels people remember from the differences their eyes can detect.`,
`A theatre rehearsal tests more than the actors' memories. Lighting changes must happen while performers move between marked positions. Repeating a short scene allows the crew to adjust these separate actions until they work together.`,
`Researchers sometimes count bicycles rather than cyclists. A person who crosses a bridge twice will produce two observations. Whether that is a problem depends on whether the study concerns individual travellers or the total use of the bridge.`,
`Some leaves have a waxy surface. Water collects into drops on such leaves instead of spreading into a continuous film. The behaviour of the water depends both on its own properties and on the material it touches.`,
`A translator often faces several reasonable choices. A short expression can carry an attitude that a literal translation would miss. Reading the surrounding exchange helps the translator decide whether a remark is sincere, playful or deliberately rude.`,
`A dome carries weight differently from a flat roof. Its curved shape can direct forces toward the supporting walls. If those walls move outward, the structure may lose the balance that originally made it stable.`,
`Listeners use context when a recording is unclear. A missing word may be easy to reconstruct in a familiar sentence. The same damaged sound is much harder to identify when it appears alone, without clues on either side.`,
`An orchard contains more than fruit trees. Small flowering plants between rows can provide insects with food after the trees finish blooming. Removing every patch of other vegetation may therefore have consequences beyond the appearance of the orchard.`,
`A survey question can affect the answers it receives. Mentioning a recent complaint before asking about satisfaction may influence what people remember. To examine this possibility, researchers can compare groups that receive the questions in different orders.`,
`In a crowded room, soft materials can change what people hear. Curtains and cushions absorb some sound that would otherwise bounce off hard surfaces. They may make conversation clearer even when the speakers use exactly the same volume.`,
`Handwritten recipes often overlook steps familiar to the writer. Directions such as mix until ready assume that the cook recognizes a particular texture. Recording a demonstration can preserve details that never appear on the written page.`,
`A garden path can reveal visitor preferences. If many people repeatedly cross a corner of grass, their footsteps leave a visible line. Planners sometimes study these informal routes before deciding where a permanent path should go.`,
`A large collection of measurements may contain one unusual value. Simply deleting it could remove evidence of a real event. A careful investigator first checks the instrument, the original record and the circumstances of the measurement.`,
`A book cover is partly a practical device. It protects pages during handling and storage, yet it also communicates an expectation about the contents. A new edition may change the cover while preserving every word of the original text.`,
`Cooking changes the texture of many vegetables. Heat can soften the structures that help fresh plant tissue stay firm. Pieces cut to similar sizes tend to cook more evenly because heat travels a comparable distance through each piece.`,
`A river boundary may move over time. Maps drawn decades apart can show a channel in noticeably different positions. This difference does not necessarily indicate poor surveying, since flowing water can gradually reshape the banks themselves.`,
`Learning a melody involves remembering relationships between notes. A singer can begin higher than the original recording and still produce a recognizable tune. What remains similar is the sequence of movements between neighbouring pitches.`,
`Repair workers benefit from knowing how an object was assembled. Hidden clips may break if a cover is pulled in the wrong direction. A diagram showing the order of removal can prevent damage that would make a small repair more expensive.`,
`A walk through a neighbourhood provides a selective impression. Shops hidden behind other buildings may escape notice entirely. Interviewing residents can reveal gathering places that would never appear in an account based only on visible signs.`,
`A scientific drawing can show features that a photograph obscures. The illustrator can omit distracting shadows and emphasize important boundaries. Readers still need a scale, since a precise outline alone gives no reliable indication of actual size.`,
`Some tools are useful because they constrain movement. A simple guide keeps a saw moving along a chosen line. By reducing the number of movements a worker must control, the guide can improve precision without increasing physical effort.`,
`A ticket queue does more than arrange people in order. Its visible progress tells newcomers how long they may have to wait. A numbered system can free people to sit down, provided they can still hear or see their number being called.`,
`Two languages may borrow the same word independently. The shared spelling does not prove that one community borrowed directly from the other. Historical records can sometimes identify a third language through which both communities encountered the expression.`,
`The position of a shadow changes through the day. Measuring a tree from its shadow requires a comparison made at the same time. A reference stick measured hours earlier would form a different angle with the incoming sunlight.`,
`A printed pattern must survive being folded into a box. Words near an edge may disappear around a corner when the flat sheet is assembled. Designers test inexpensive paper models before committing to a large production run.`,
`Small ponds can differ even when they lie close together. A nearby tree may shade one pond while leaving another exposed to sunlight. Comparing their temperatures without recording the shade would make the results harder to explain.`,
`An editor checks how a reader moves through a paragraph. If a pronoun could refer to either of two people, adding a name may prevent confusion. The longer wording can therefore make the passage quicker to understand.`,
`At a busy crossing, a sound signal can provide information. The sound must be distinguishable from traffic without overwhelming nearby residents. Testing it at several times of day helps designers account for changes in background noise.`,
`A fossil footprint records a brief interaction with a surface. Its shape depends partly on the animal and partly on the softness of the ground. Comparing several prints can reveal features that a single mark would leave uncertain.`,
`A folding chair must be stable in two different situations. It needs to support a seated person, but it must also stay closed during transport. A design that solves only the first problem may be awkward for staff setting up a large event.`,
`Fruit sellers often group products by appearance. Researchers studying waste might instead group the same fruit by how long it remains edible. The two classifications can lead to different conclusions about which pieces should be used first.`,
`A newspaper archive preserves both reports and decisions about reporting. An event absent from its pages might still have taken place. Historians compare several sources before treating silence in one publication as evidence that nothing happened.`,
`A simple pulley changes the direction of a pull. A worker can pull down on a rope to raise an object above the ground. Changing the direction can be helpful even when the required pulling force does not become smaller.`,
`A public bench serves different purposes throughout the day. Morning travellers may pause briefly while waiting for transport, whereas afternoon visitors may remain much longer. Counting occupied seats once would hide these differences in use.`,
`Some stories are told through letters between characters. Each writer knows only part of what has happened. Readers must compare accounts and notice contradictions before they can reconstruct events that no single character describes completely.`,
`A list of popular songs depends on how popularity is measured. Counting purchases favours a different kind of activity from counting repeated plays. Changing the measure can alter the ranking even when listeners have not changed their tastes.`,
`A blanket slows the transfer of heat. Wrapping an object does not create warmth inside it, although the object may remain warmer than an uncovered one. The final temperature also depends on the surroundings and the length of observation.`,
`A public notice has to work for someone in a hurry. Placing the deadline near the beginning allows a reader to act before examining every detail. Important instructions buried in a long introduction may be overlooked entirely.`,
`River stones become smoother as they move. Repeated contact with other pieces can gradually wear away sharp edges. The final shape reflects many encounters, so it cannot reveal the exact distance that a particular stone has travelled.`,
`A village bell once carried information over a wide area. Distinct patterns could announce different events without the need for spoken words. The system depended on a shared understanding that a visitor might lack even while hearing every sound clearly.`,
`A film scene may be recorded out of order. A glass that was nearly empty in one shot must look similar in the next. Someone tracking these details helps separate recordings appear to belong to one continuous event.`,
`An index allows several routes to the same page. A passage about repairing a wooden boat might appear under both boats and woodwork. Multiple entries help readers whose first choice of search term differs from the author's own wording.`,
`A sample collected at a doorway represents people who use that entrance. It may miss workers who arrive through another door or work entirely from home. A larger count at the same doorway cannot by itself solve this problem.`,
`A spinning object may look still in a recorded video. The camera captures separate moments, and its timing can repeatedly show nearly the same position. Changing the recording rate can reveal motion that the first recording appeared to hide.`,
`A building model can serve several audiences. Engineers may need to inspect its supports, while visitors may care more about entrances and routes. A removable outer wall allows one model to show details that would otherwise remain hidden.`,
`People notice an unfamiliar smell when they enter a room. After a while they may become less aware of it even though its source remains present. Asking a newcomer provides a different observation from asking someone who has stayed all afternoon.`,
`A weaving pattern links individual threads into a surface. Changing which threads pass above their neighbours alters the pattern without changing the colours available. Small samples allow a weaver to test the result before beginning a larger piece.`,
`A useful museum label anticipates a visitor's question. Naming every material in an object may matter less than explaining why an unusual handle is bent. Observing visitors can show which features repeatedly attract attention but remain unexplained.`,
`A photograph of a landscape fixes a particular viewpoint. Two photographers can record the same field while showing very different proportions of sky and ground. Comparing the images requires attention to framing as well as to the landscape itself.`,
`A password reminder can create an unintended clue. A question whose answer is printed on a public profile gives little protection. Designers must consider what another person could learn, rather than only what the account owner can remember.`,
`A biographer chooses where a story begins. Starting with a person's childhood creates different expectations from opening with a late achievement. Both accounts might use the same evidence while directing attention toward different relationships between events.`,
`An envelope protects a letter during travel. Its marks can also become evidence about the journey itself. A historian examining only the message inside would miss dates, addresses and possible traces of earlier delivery systems.`,
`A glass of cold water may collect drops on its outside. The moisture comes from the surrounding air rather than through the glass. A nearby surface at room temperature offers a useful comparison when explaining where the drops appear.`,
`A play can suggest a crowded street with very few objects. A sign, a changing sound and the actors' movements may be enough for the audience to imagine a larger space. These cues work together because their details point toward the same setting.`,
`A scale drawing can be checked with one known length. Once the relation between drawing and object is established, other lengths can be estimated. This method fails if the image has been stretched differently in its two directions.`,
`A deck of picture cards can test recognition. Someone who selects a familiar image may still struggle to name the object without a hint. Recognition and independent recall place different demands on the learner, so teachers often test both.`,
`A town square may feel empty despite a high daily visitor count. If everyone crosses quickly, few people will be present at any one moment. Recording how long visitors remain can explain the difference between traffic and occupancy.`,
`A pot lid affects the water beneath it. Some water leaves the liquid as vapour and then collects on the cooler lid. Drops may fall back into the pot, returning part of the water that would otherwise escape into the room.`,
`A recipe translated between measuring systems may require rounding. A tiny difference in a single portion can grow when the recipe is multiplied for a large kitchen. Testing the larger batch checks whether the practical result is still acceptable.`,
`An interview transcript preserves words but can lose other information. A long pause before a reply may matter when interpreting the exchange. Researchers sometimes record pauses and laughter separately so that readers can distinguish these features from the spoken words.`,
`A staircase can guide movement without using signs. The width of its landing or the direction of its turn may make one exit easier to notice. Watching first-time visitors can reveal whether the intended route is actually clear.`,
`An artist working with transparent layers must plan their order. Earlier colours remain partly visible through later ones, so covering a mistake can change nearby tones. Trying combinations on a separate sheet helps predict the final effect.`
  ];
  clozeTexts.forEach((text, i) => cloze(Math.floor(i / 3), text));
  // Each card pairs five linked details with five independently authored paraphrases.
  // Distractors describe other plausible details of the same situation.
  function card(form, type, title, lines) {
    const rows = lines.trim().split('\n').map(line => line.split('|'));
    if (rows.length !== 5 || rows.some(row => row.length !== 3)) throw Error('Invalid card: ' + title);
    const source = title + '\n\n' + rows.map(row => row[0]).join(' ');
    rows.forEach(([evidence, ask, answer], i) => {
      const options = [answer, ...[1,2,3].map(offset => rows[(i + offset) % 5][2])];
      const rotation = (form + i + title.length) % 4;
      options.push(...options.splice(0, rotation));
      output[form].push({type,source,ask,options,answer,why:evidence + ' → ' + answer});
    });
  }
  const dailyCards = [
['Makerspace induction',`
New users should book the blue induction slot before reserving tools.|What must a first-time visitor do first?|Book an introductory session.
If you have already completed induction elsewhere, email your certificate for approval.|What can an experienced visitor do to avoid repeating training?|Submit proof of earlier training.
Collect safety glasses from the counter even if your project takes only a minute.|Which precaution applies to short jobs too?|Pick up protective eyewear.
Return unfinished wooden pieces to the numbered rack, not the workbench.|How should a visitor leave a partly finished project?|Move the piece to its storage rack.
Report a blunt blade on the yellow form so the next user will not try it.|What should a visitor do after noticing worn equipment?|Record the fault on a form.`],
['Messages about the river walk',`
Jo: The riverside gate is locked before nine, so meet by the bakery across the road.|Where should the group gather before the gate opens?|At the bakery.
Mina: The bus stop has moved around the corner because the bridge is being painted.|Where should people arriving by bus get off?|At the temporary stop around the corner.
Jo: At the first fork, take the narrow path with the heron sign.|Which route should the group follow after entering the park?|The path marked with a bird.
Mina: Anyone who wants to skip the steep section can wait at the picnic shelter.|Where can a participant avoid the climb?|At the picnic shelter.
Jo: We finish at the station café, where I have reserved the back table.|Where will the whole group meet again at the end?|At the café near the station.`],
['Community kitchen rota',`
Check the blue board for the dish assigned to your station because the printed menu is out of date.|How can a volunteer find the current assignment?|Consult the blue board.
If the portion count changes, tell Lea before measuring any rice.|What should happen before ingredients are measured for extra guests?|Notify the kitchen lead.
Place empty cardboard boxes beside the receiving door rather than in the food bin.|How should a volunteer handle delivery packaging?|Leave it by the receiving door.
Guests with food allergies should be referred to the cook with the ingredient folder.|How should a volunteer answer a question about allergens?|Direct the guest to the cook.
Before leaving, sign the closing sheet even if another team has already arrived.|What must a volunteer do at the end of a shift?|Record departure on the closing sheet.`],
['Return of the borrowed projector',`
Ali: I found the cable inside the black pouch, so leave the spare cable at home.|What should Jules do about the spare cable?|Leave it behind.
Jules: The side office is closed today; take the projector to the reception desk instead.|Where should the borrowed machine go?|To reception.
Ali: The receipt lists a case as well, so bring the grey one from the cupboard.|What else must be delivered with the projector?|The grey storage case.
Jules: Ask the receptionist to date the receipt before you leave.|What proof of return should Ali request?|A dated receipt.
Ali: I will send the receipt photo to the club treasurer tonight.|How will the treasurer learn that the return is complete?|From a photograph of the receipt.`],
['Pool timetable update',`
Lane swimmers should use the north entrance while the usual doors are being replaced.|How should regular swimmers enter the building?|Through the north entrance.
Parents collecting children after lessons should wait by the mural to keep the corridor clear.|Where should adults wait after a lesson?|Beside the mural.
Show your old membership card at the desk to exchange it free of charge.|How can a member obtain a replacement card?|Present the previous card.
The lift is available on request; press the bell below the timetable if assistance is needed.|How should a visitor request lift access?|Ring the bell near the timetable.
Lost property from last month will move to the town office on Friday.|Where should someone look for an older lost item after Friday?|At the town office.`],
['Garden meeting after the storm',`
Ruth: I photographed the fallen fence so the owner can see the damage before we move anything.|Why did Ruth take pictures?|To document the condition of the fence.
Pavel: I have marked the wettest path with cones so nobody slips during the meeting.|Why are there cones on one path?|To keep visitors away from slippery ground.
Ruth: Bring folding chairs because the benches are still wet.|Why should volunteers bring their own seats?|To avoid using damp benches.
Pavel: Please put names on the borrowed tools so we can return them correctly.|Why should tools be labelled?|To identify their owners later.
Ruth: I moved the meeting forward half an hour so we can finish in daylight.|Why will the discussion start earlier?|To have enough natural light.`],
['Archive reading room',`
Reserve maps under their catalogue numbers, since two maps may share a title.|How can a researcher request the correct map?|Use its catalogue identifier.
Leave coats in the lockers by the lift before entering the reading room.|Where should visitors put outdoor clothing?|In the lockers.
Place the supplied weights along curled edges; please do not flatten maps with your hands.|How should someone keep a rolled map open?|Use the provided weights.
If a page looks torn, alert the desk before turning it.|What should a reader do on finding damage?|Tell a staff member immediately.
For a reproduction suitable for printing, fill out the image request rather than photographing the page.|How can a reader obtain a high-quality copy?|Submit an image request.`],
['Choir rehearsal thread',`
Nina: The chapel is hosting a wedding, so Tuesday rehearsal is in the art room.|Why has the rehearsal venue changed?|Another event needs the usual room.
Omar: Bring the loose final page because the bound scores omit the ending.|Why does everyone need an extra sheet?|The printed score is incomplete.
Nina: We will practise quietly at first because the room next door is recording an interview.|Why keep the first part of rehearsal soft?|Noise could interrupt a recording.
Omar: I numbered the seats so singers can return to the same place after the break.|Why are the chairs numbered?|To preserve the arrangement after a pause.
Nina: Send me your travel plans so I can pair people for the late journey home.|Why does Nina want travel information?|To help singers find companions for the trip back.`],
['Bicycle workshop',`
Book a stand before bringing a bicycle, as the room holds only six bikes.|What should a rider do before arriving?|Reserve workspace.
Borrow a pressure gauge from the red drawer to check a tyre before adding air.|How should a rider decide whether a tyre needs air?|Measure the pressure.
For a loose brake cable, wait for the supervisor rather than riding home.|What should someone do if a brake is unsafe?|Ask the supervisor for help.
Put oily cloths in the metal bin beside the sink.|How should someone dispose of used cleaning cloths?|Use the designated metal container.
Take a photo of the job card if you want a record of the parts fitted.|How can a rider keep a list of replacements?|Photograph the work record.`],
['Setting up a book exchange',`
Eli: Use the windowsill for children's books; younger visitors can reach it.|Why was the low windowsill chosen?|Children can browse there independently.
Noor: Turn the tall shelf sideways to leave space for a wheelchair.|Why change the shelf's direction?|To keep the route accessible.
Eli: I put a pencil by the notebook so donors can list the books they bring.|Why is writing equipment provided?|To record incoming donations.
Noor: Keep one box empty because we may need to move books if it rains.|Why set a box aside?|To protect books quickly if the weather changes.
Eli: The final hour is open to everyone so the remaining books can find homes.|Why are restrictions lifted near closing time?|To distribute the books still on display.`],
['Theatre ticket exchange',`
For a different performance date, send your booking number before noon on the day before the show.|How should a customer begin a date change?|Send the booking reference in advance.
Customers needing step-free seats should telephone rather than use the seating map.|How should a customer arrange accessible seating?|Speak to the box office by phone.
Meet companions at the fountain, since the foyer must remain clear during entry.|Where should a group assemble before going in?|At the fountain outside.
Collect student-price tickets only after showing a current student card.|What should someone present for the reduced price?|Current proof of student status.
Late arrivals should follow the usher to the balcony until the first scene ends.|What should someone arriving after the curtain rises do?|Use temporary balcony seating.`],
['Planning a bird count',`
Tao: We will begin before the café opens, when there is less noise from customers.|Why start early?|To hear birds before the area gets busy.
Kim: Put the two counters on opposite banks so their views overlap less.|Why separate the observers?|To reduce repeated sightings of the same birds.
Tao: Record uncertain sightings with a question mark so we can review them later.|Why mark some entries differently?|To identify observations needing another check.
Kim: Note down the wind because it may affect how far calls carry.|Why record weather conditions?|To interpret differences in what observers hear.
Tao: Send the sheets as photographs so I can keep the original handwriting.|Why request pictures of the records?|To preserve how the notes were originally written.`],
['Ceramics pickup notice',`
Check the label colour on the shelf: orange labels identify pieces ready to take home.|How can a maker recognize a finished piece?|Look for an orange label.
If the base feels rough, ask staff for a pad before wrapping it.|What should a maker do about an uneven base?|Request a smoothing pad.
Mugs that belong to the group order go in the marked crate near the kiln.|Where should a maker leave a mug for the shared order?|In the marked crate.
A missing handle must be reported before the piece leaves the studio.|When should someone mention damage?|Before taking the piece away.
Bring an old towel for large bowls because thin tissue may tear.|What should someone use to transport a heavy bowl?|A towel from home.`],
['Host family arrangements',`
Ana: The afternoon train stops at Central, but please stay on until Meadow Road because our car is there.|Where should the guest leave the train?|At Meadow Road.
Leo: If the train is late, send a text after it leaves Central so we can time the pickup.|When should the guest report a delay?|After departing Central.
Ana: Supper is early tonight because Leo has a rehearsal at seven.|Why will the family eat earlier?|Someone has an evening commitment.
Leo: Bring indoor shoes; the hallway floor has just been painted.|Why pack another pair of shoes?|To protect a newly finished floor.
Ana: I left a spare key with our neighbour in case we miss each other.|How can the guest enter if the hosts are absent?|Collect the key next door.`],
['Photography club loan rules',`
Choose a camera by the colour on its strap because the two models look alike.|How can a member tell the models apart?|Check the strap colour.
A flashing orange light means the battery must stay on charge for longer.|What should a member do if the charger flashes orange?|Continue charging.
Use the club memory card only for the workshop, then copy your work before returning it.|How should a member preserve photographs from the workshop?|Make a personal copy.
Sign the lens out separately, even when it is already attached to the camera.|What extra action is needed for an attached lens?|Record it as a separate loan.
If rain enters the bag, bring it to the technician without switching the camera on.|What should a member do after water enters the equipment bag?|Take it to technical staff with the power off.`],
['Potluck arrangements',`
Meg: Please send the list of ingredients so guests can check what is safe for them to eat.|Why does Meg request ingredient lists?|To help guests make suitable food choices.
Ari: I will buy ice on the way because our freezer is too small for a whole bag.|Why wait until the journey to buy ice?|Storage at home is limited.
Meg: Put desserts on the side table to leave the long table free for hot dishes.|Why use a separate dessert table?|To reserve space for warm food.
Ari: Bring serving spoons; the hall supplies spoons for eating but no larger ones.|Why should guests bring utensils?|The hall lacks equipment for serving.
Meg: Claim your container before the music starts so we can clear the kitchen quietly.|Why collect containers early?|To avoid clearing up during the performance.`],
['Neighbourhood repair café',`
Describe the fault on the booking form so the coordinator can invite a suitable volunteer.|Why does the form ask for a description?|To match the fault with a volunteer.
Take a photograph before disassembling a large item so its original arrangement is recorded.|Why photograph the item first?|To remember how the parts were arranged.
Bring the instruction booklet if you have one; it may identify a hidden release catch.|Why bring the manual?|To help locate controls that are hard to see.
Leave a clear space around hot tools so other visitors can pass safely.|Why keep the bench area open?|To protect people moving nearby.
At the end, note any replacement still needed so the next session can begin without another diagnosis.|Why record unfinished work?|To avoid repeating the initial investigation.`],
['Ferry trip messages',`
Liv: Meet at Pier Three; Pier Two is reserved for deliveries until midday.|Where should the group wait for boarding?|At Pier Three.
Ivo: Keep the small paper stub because the return journey is printed on its back.|What should the group retain after boarding?|The ticket stub.
Liv: Bicycles go in the rear area, where there are straps for the crossing.|Where should a rider leave a bicycle?|In the rear storage area.
Ivo: If you feel cold, ask at the snack counter for one of the loan blankets.|How can a passenger get extra warmth?|Ask the counter staff for a blanket.
Liv: We have booked lunch for twelve, so take the direct path from the landing.|How should the group reach lunch on time?|Use the shortest route from the landing.`],
['Language exchange evening',`
Write the language you want to practise on the green side of your badge.|How should a visitor show a learning preference?|Mark the green side of the badge.
Move clockwise when the short bell rings, even if your conversation has not ended.|What should participants do at the short signal?|Change partners in the indicated direction.
Ask a host for a picture card if both speakers run out of ideas.|How can a pair restart a stalled conversation?|Request a visual prompt.
Use the small lounge for longer conversations once the timed rounds finish.|Where can participants continue talking freely?|In the smaller lounge.
Drop the badge in the tray at the exit because the holder will be reused next week.|What should participants return at the end?|The badge holder.`],
['Planning a charity run',`
Ada: Shift the water table past the bend so runners see it after the path widens.|Why move the water station?|To serve runners where there is more room.
Ben: I numbered each volunteer vest so we can tell who covered each station.|Why are the vests numbered?|To identify the volunteer assigned to a location.
Ada: Put the arrows low on the posts because the hanging branches cover the tops.|Why are signs being placed below eye level?|To keep them visible beneath the branches.
Ben: Save the spare cups for the final loop; the last group sometimes arrives after the first supplies run out.|Why reserve some cups?|To provide water for late finishers.
Ada: Bring the cash box indoors as soon as registration closes so it never stands unattended.|Why remove the cash box promptly?|To keep collected money supervised.`],
['Shared laundry notice',`
A blank screen means the washer is asleep; press the round button before choosing a programme.|How should a resident wake an idle machine?|Press the round button.
Add powder to the marked drawer, since the drum compartment is for liquid capsules.|Where should loose detergent go?|In the labelled drawer.
If the remaining time increases, leave the door shut while the load is balanced.|What should a resident do when the time display goes up?|Wait with the door closed.
Report a continuing leak using the number above the sink.|How should someone report water escaping from a machine?|Call the posted number.
Collect clean clothes within ten minutes so the next person can use the washer.|What should a resident do when the cycle finishes?|Remove the load promptly.`],
['Community mural thread',`
Mae: Bring colour samples to the actual wall because morning light changes their appearance.|Why compare colours outdoors?|To judge them under the conditions of the site.
Dan: Mark the drainpipe on the drawing so the lettering does not disappear behind it.|Why add the pipe to the plan?|To prevent a word from being partly hidden.
Mae: Use chalk for the first outline because neighbours may suggest changes.|Why draw in chalk initially?|To allow easy revision.
Dan: Keep the first row plain because bicycles usually cover that part of the wall.|Why avoid elaborate detail near the bottom?|It would often be blocked from view.
Mae: Photograph each stage so the school can show how the finished picture developed.|Why make a series of photographs?|To document the creative process.`],
['Farm produce collection',`
Use the collection code from your confirmation message to open the outer gate.|How should a customer enter the pickup area?|Enter the code from the confirmation.
Match the number on the crate to your order before taking any produce.|How can customers avoid taking another order?|Compare the two numbers.
Leave unwanted herbs on the swap shelf rather than opening a different crate.|How should a customer handle an unwanted bunch?|Place it on the exchange shelf.
Report bruised fruit that evening with a picture so staff can identify the affected batch.|How should a customer document damaged produce?|Send a photograph that day.
Flatten empty boxes and slide them under the bench during your next visit.|How should customers return packaging?|Fold it and put it beneath the bench.`],
['Preparing a film night',`
Sam: Test the film with the curtains open to find out whether late daylight hides the subtitles.|Why test the room before dark?|To check whether viewers can read the captions.
Iris: Leave the middle aisle free so the usher can reach both sides.|Why avoid seating people in the centre aisle?|To allow staff to move through the room.
Sam: Put the discussion cards on seats before the screening so handing them out will not interrupt the ending.|Why distribute the cards early?|To avoid disturbing the final moments.
Iris: Keep the receipt for the speaker cable because the society can refund it.|Why should Sam keep the receipt?|To claim the cost of an item.
Sam: Ask for programme ideas in the exit survey so even people leaving early can contribute.|Why collect suggestions at the door?|To include the views of people who leave before discussion.`],
  ];
  dailyCards.forEach(([title, rows], i) => card(i, 'Read in Daily Life', title, rows));
  academicReadingCards.forEach(([title, rows], i) => card(i, 'Read an Academic Passage', title, rows));
  academicReadingCards2.forEach(([title, rows], i) => card(i, 'Read an Academic Passage', title, rows));
  academicReadingCards3.forEach(([title, rows], i) => card(i, 'Read an Academic Passage', title, rows));
  return output;
})();
