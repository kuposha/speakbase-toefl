/* 94 original, level-adjusted contextual mini-practice pairs. Not official ETS material. */
(function(root){const contexts={
  "A1-01": {
    "reading": [
      "The volunteers read the visitor list. The guide checks the badges.",
      "Who reads the list?",
      "The volunteers",
      "The guide",
      "The visitors",
      "The subject before read identifies the people who do it."
    ],
    "listening": [
      "Mia carries the boxes. Leo opens the door.",
      "Who opens the door?",
      "Leo",
      "Mia",
      "Both of them",
      "Leo is the subject of opens."
    ]
  },
  "A1-02": {
    "reading": [
      "Lena is the new tutor. Her room is upstairs.",
      "Who is Lena?",
      "The new tutor",
      "A visitor",
      "A receptionist",
      "Is links Lena to her role."
    ],
    "listening": [
      "I am Alex. These are my classmates, Jo and Sam.",
      "Who are Jo and Sam?",
      "Alex's classmates",
      "Alex's tutors",
      "Alex's parents",
      "Are introduces the two classmates."
    ]
  },
  "A1-03": {
    "reading": [
      "The upstairs room isn't open today. The ground-floor room is open.",
      "Which room can you use?",
      "The ground-floor room",
      "The upstairs room",
      "Neither room",
      "Isn't negates the first room."
    ],
    "listening": [
      "Is the printer ready? No, it isn't. The other printer is ready.",
      "Which printer is ready?",
      "The other printer",
      "The first printer",
      "Neither printer",
      "No, it isn't rejects the first printer."
    ]
  },
  "A1-04": {
    "reading": [
      "Please bring a notebook and two pens. There is an eraser on each desk.",
      "What must students bring?",
      "A notebook and two pens",
      "Two notebooks and an eraser",
      "Only an eraser",
      "A notebook is singular; two pens is plural."
    ],
    "listening": [
      "I found an umbrella and three keys near the door.",
      "How many keys were found?",
      "Three",
      "One",
      "Two",
      "Three keys is a plural group."
    ]
  },
  "A1-05": {
    "reading": [
      "The receptionist checks the mail every morning. The librarian opens the reading room at nine.",
      "What does the receptionist do daily?",
      "Checks the mail",
      "Opens the reading room",
      "Closes the library",
      "Checks describes a third-person routine."
    ],
    "listening": [
      "Ben works at the cafe on Saturdays. His sister studies at home.",
      "What does Ben do on Saturdays?",
      "Works at the cafe",
      "Studies at home",
      "Works at the library",
      "Works identifies Ben's regular action."
    ]
  },
  "A1-06": {
    "reading": [
      "Our class does not meet on Fridays. It meets on Thursdays.",
      "When does the class meet?",
      "Thursday",
      "Friday",
      "Both days",
      "Does not meet excludes Friday."
    ],
    "listening": [
      "Do you work on Saturdays? No, I don't. I work on Sundays.",
      "When does the speaker work?",
      "Sunday",
      "Saturday",
      "Both days",
      "Don't is the negative short answer."
    ]
  },
  "A1-07": {
    "reading": [
      "The new guide has both keys. The visitor hasn't got a key.",
      "Who can open the two doors?",
      "The guide",
      "The visitor",
      "Neither person",
      "Has both keys expresses possession."
    ],
    "listening": [
      "Have you got a charger? No, but Sam has one.",
      "Who has a charger?",
      "Sam",
      "The first speaker",
      "Nobody",
      "Has one means Sam possesses a charger."
    ]
  },
  "A1-08": {
    "reading": [
      "There is a map on the noticeboard. There are three schedules beside it.",
      "How many schedules are there?",
      "Three",
      "One",
      "None",
      "There are introduces a plural group."
    ],
    "listening": [
      "There isn't a lift in this building. There are two staircases.",
      "What is available?",
      "Two staircases",
      "One lift",
      "Two lifts",
      "There are describes availability."
    ]
  },
  "A1-09": {
    "reading": [
      "This red bag is mine. Those blue bags are ours.",
      "Which bag belongs only to the writer?",
      "The red bag",
      "The blue bags",
      "All the bags",
      "Mine refers to the speaker alone; ours includes others."
    ],
    "listening": [
      "Whose keys are these? They are hers. Mine are in my pocket.",
      "Who owns the keys being shown?",
      "The woman mentioned",
      "The speaker",
      "Both people",
      "Hers replaces her keys."
    ]
  },
  "A1-10": {
    "reading": [
      "We have some bread and a little milk. There aren't any eggs.",
      "What is missing?",
      "Eggs",
      "Bread",
      "Milk",
      "Any with aren't indicates absence."
    ],
    "listening": [
      "There are a few apples and some rice. We need more rice.",
      "Which food needs to be replenished?",
      "Rice",
      "Apples",
      "Both equally",
      "Some rice is an uncountable amount."
    ]
  },
  "A1-11": {
    "reading": [
      "The instructions are clear. The guide speaks slowly and checks answers carefully.",
      "How does the guide speak?",
      "Slowly",
      "Carefully",
      "Loudly",
      "Slowly modifies speaks; carefully modifies checks."
    ],
    "listening": [
      "The new chair is comfortable, but the wheels move noisily.",
      "What is noisy?",
      "The movement of the wheels",
      "The comfort of the chair",
      "The guide's voice",
      "Noisily describes how the wheels move."
    ]
  },
  "A1-12": {
    "reading": [
      "Jo usually visits on Tuesdays. She never comes on Fridays.",
      "Which day does Jo normally visit?",
      "Tuesday",
      "Friday",
      "Every day",
      "Usually describes the normal routine."
    ],
    "listening": [
      "The tutor is often busy at noon. She is always free after four.",
      "When is the tutor always free?",
      "After four",
      "At noon",
      "Before breakfast",
      "Always follows be and describes regular availability."
    ]
  },
  "A1-13": {
    "reading": [
      "The students are painting a sign outside. Their tutor is answering emails inside.",
      "What are the students doing now?",
      "Painting a sign",
      "Answering emails",
      "Reading a sign",
      "Are painting describes their current action."
    ],
    "listening": [
      "Please wait. The technician is fixing the projector right now.",
      "Why must the listener wait?",
      "The projector is being fixed",
      "The technician has left",
      "The projector is already fixed",
      "Is fixing signals an ongoing action."
    ]
  },
  "A1-14": {
    "reading": [
      "I usually work at home, but today I am working in the library.",
      "Where is the writer working today?",
      "In the library",
      "At home",
      "At both places",
      "Am working marks today's temporary situation."
    ],
    "listening": [
      "We normally walk to class. Today we're taking the bus because it is raining.",
      "How are they travelling today?",
      "By bus",
      "On foot",
      "By train",
      "We're taking describes the current exception."
    ]
  },
  "A1-15": {
    "reading": [
      "Visitors can use the printer, but they can't enter the staff room.",
      "What is permitted?",
      "Using the printer",
      "Entering the staff room",
      "Both activities",
      "Can and can't distinguish permission."
    ],
    "listening": [
      "Can I borrow your pen? Sorry, I can't lend it to you, but Mia can.",
      "Who can lend a pen?",
      "Mia",
      "The person asked first",
      "Nobody",
      "Can stands for can lend it."
    ]
  },
  "A1-16": {
    "reading": [
      "Put your form in the tray. Don't write on the cover. Let's check the forms together.",
      "What should students avoid?",
      "Writing on the cover",
      "Putting forms in the tray",
      "Checking the forms",
      "Don't + verb gives a negative instruction."
    ],
    "listening": [
      "Please close the window. Let's start the lesson now.",
      "What is the shared suggestion?",
      "Start the lesson",
      "Close every window together",
      "Leave the room",
      "Let's includes the speaker and listener."
    ]
  },
  "A1-17": {
    "reading": [
      "The library was closed, so I went home. I studied there because I had an exam.",
      "Why did the writer study?",
      "An exam was coming",
      "The library was open",
      "The writer had no work",
      "Because introduces the reason."
    ],
    "listening": [
      "We can meet on Monday or Tuesday, but I cannot come on Friday.",
      "Which days are possible?",
      "Monday or Tuesday",
      "Friday only",
      "All three days",
      "Or presents alternatives; but limits them."
    ]
  },
  "A1-18": {
    "reading": [
      "The meeting is at noon on Monday in the foyer. The forms are on the table.",
      "Where is the meeting?",
      "In the foyer",
      "On the table",
      "In the office",
      "In the foyer identifies the meeting location."
    ],
    "listening": [
      "The bus leaves at eight on Friday. Wait at the main entrance.",
      "When does the bus leave?",
      "At eight on Friday",
      "At eight on Thursday",
      "At noon on Friday",
      "At gives the time; on gives the day."
    ]
  },
  "A1-19": {
    "reading": [
      "Yesterday the guide found the keys and returned them to the office.",
      "What happened to the keys?",
      "They were returned to the office",
      "They were lost again",
      "They were left outside",
      "Found and returned describe completed past actions."
    ],
    "listening": [
      "I saw Mia yesterday, but I didn't see Leo.",
      "Who did the speaker see?",
      "Mia",
      "Leo",
      "Both",
      "Didn't see negates the past event."
    ]
  },
  "A2-01": {
    "reading": [
      "Last week we took the morning bus. We didn't drive because the car was broken.",
      "How did they travel?",
      "By bus",
      "By car",
      "By train",
      "Took is the irregular past of take; didn't drive excludes the car."
    ],
    "listening": [
      "Did you send the form yesterday? Yes, I sent it before lunch.",
      "When was the form sent?",
      "Before lunch yesterday",
      "After lunch today",
      "It was not sent",
      "Sent is the past of send."
    ]
  },
  "A2-02": {
    "reading": [
      "At ten yesterday, the tutor was checking the list while students were waiting outside.",
      "What was the tutor doing at ten?",
      "Checking the list",
      "Waiting outside",
      "Leaving the room",
      "Was checking describes activity in progress at a past time."
    ],
    "listening": [
      "At six last night I was cooking dinner. Sam was writing an email.",
      "What was Sam doing at six?",
      "Writing an email",
      "Cooking dinner",
      "Eating dinner",
      "Was writing identifies the simultaneous action."
    ]
  },
  "A2-03": {
    "reading": [
      "The lights went out while we were setting up the equipment. We stopped working.",
      "What interrupted the preparation?",
      "A power failure",
      "The end of the meeting",
      "A planned break",
      "Went out interrupts the longer were setting up action."
    ],
    "listening": [
      "I was walking to college when my phone rang. I stopped to answer it.",
      "What happened during the walk?",
      "The phone rang",
      "The speaker arrived",
      "The speaker finished a call",
      "Rang is the interrupting Past Simple event."
    ]
  },
  "A2-04": {
    "reading": [
      "We are going to visit the campus on Saturday. The tour starts at ten; we have booked tickets.",
      "What is their plan?",
      "Visit on Saturday",
      "Visit on Sunday",
      "Cancel the tour",
      "Going to expresses a decided plan."
    ],
    "listening": [
      "The boxes are heavy. I'll carry them for you. I'm meeting Jo later at three.",
      "What does the speaker offer to do?",
      "Carry the boxes",
      "Cancel the meeting",
      "Buy more boxes",
      "I'll expresses a spontaneous offer."
    ]
  },
  "A2-05": {
    "reading": [
      "I have just collected the key. We can enter the lab now.",
      "Why is access possible now?",
      "The key has been collected",
      "The key is still missing",
      "The lab has closed",
      "Have just collected links a completed event to the present."
    ],
    "listening": [
      "Have you ever visited the museum? Yes, twice, but not this year.",
      "How many times has the speaker visited?",
      "Twice",
      "Never",
      "Once",
      "Ever asks about experience; twice is the answer."
    ]
  },
  "A2-06": {
    "reading": [
      "I have sent the report, so you can read it now. I sent the form yesterday afternoon.",
      "Which event has a specific past time?",
      "Sending the form",
      "Reading the report",
      "Receiving the report",
      "Yesterday afternoon locates the Past Simple event."
    ],
    "listening": [
      "I have finished the assignment. I started it on Monday.",
      "What happened on Monday?",
      "The speaker started the assignment",
      "The speaker finished it",
      "The assignment was cancelled",
      "Started with on Monday names a finished past time."
    ]
  },
  "A2-07": {
    "reading": [
      "Visitors must show their passes. They don't have to print the confirmation.",
      "What is optional?",
      "Printing the confirmation",
      "Showing a pass",
      "Both",
      "Don't have to means no obligation."
    ],
    "listening": [
      "You should check the schedule, but you must register before Friday.",
      "What is required?",
      "Register before Friday",
      "Check the schedule",
      "Both actions equally",
      "Must marks a requirement; should is advice."
    ]
  },
  "A2-08": {
    "reading": [
      "The smaller desk is lighter than the oak desk, but it is also narrower.",
      "Which desk is easier to lift?",
      "The smaller desk",
      "The oak desk",
      "Both have the same weight",
      "Lighter than compares weight."
    ],
    "listening": [
      "The blue route is shorter than the red one, but the red one is safer.",
      "Which route covers less distance?",
      "The blue route",
      "The red route",
      "Both routes equally",
      "Shorter than compares distance."
    ]
  },
  "A2-09": {
    "reading": [
      "Of the three routes, the green route is the shortest. The red route is the longest.",
      "Which route has the least distance?",
      "Green",
      "Red",
      "All three",
      "The shortest identifies the minimum among the routes."
    ],
    "listening": [
      "This is the cheapest ticket available today. The other two cost more.",
      "Which ticket costs least?",
      "This ticket",
      "The other two",
      "All tickets equally",
      "Cheapest is the superlative of cheap."
    ]
  },
  "A2-10": {
    "reading": [
      "All students receive a badge. Each student gets one. Only a few students need an extra map.",
      "Who receives a badge?",
      "Every student",
      "Only a few students",
      "Nobody",
      "All and each cover the full group."
    ],
    "listening": [
      "We have little time left, but a few seats are still free.",
      "What remains available?",
      "A small number of seats",
      "Plenty of time",
      "No seats",
      "A few indicates a positive small count."
    ]
  },
  "A2-11": {
    "reading": [
      "First, the guide explained the route clearly. Then everyone walked slowly to the hall.",
      "What happened first?",
      "The guide explained the route",
      "Everyone walked to the hall",
      "The hall closed",
      "First and then establish sequence."
    ],
    "listening": [
      "The printer works quite slowly, so please send the files early.",
      "How does the printer work?",
      "Rather slowly",
      "Very quickly",
      "Not at all",
      "Quite modifies slowly."
    ]
  },
  "A2-12": {
    "reading": [
      "My colleague enjoys drawing maps. She decided to study design next year.",
      "What activity does she enjoy?",
      "Drawing maps",
      "Studying design next year",
      "Teaching maths",
      "Enjoy + -ing names the enjoyable activity."
    ],
    "listening": [
      "I hope to join the club. I avoid arriving late.",
      "What does the speaker hope to do?",
      "Join the club",
      "Arrive late",
      "Leave the club",
      "Hope takes to + verb."
    ]
  },
  "A2-13": {
    "reading": [
      "The notice says: Could you tell me where the office is? Ask at reception.",
      "What information is requested?",
      "The office location",
      "The office price",
      "The receptionist's name",
      "Where the office is is an embedded location question."
    ],
    "listening": [
      "Do you know what time the library closes? I need to return a book.",
      "What does the speaker want to know?",
      "The closing time",
      "The book price",
      "The library location",
      "What time the library closes uses embedded question order."
    ]
  },
  "A2-14": {
    "reading": [
      "The lab needs an app that works offline. Apps that require a connection are unsuitable.",
      "Which app is suitable?",
      "One that works offline",
      "One that always needs Wi-Fi",
      "Any online game",
      "That works offline defines the required app."
    ],
    "listening": [
      "We need the student who has the spare key. Everyone else can wait.",
      "Which student is needed?",
      "The one with the spare key",
      "Every student",
      "The student without a key",
      "Who has the spare key identifies the person."
    ]
  },
  "A2-15": {
    "reading": [
      "If the bus is late, I will walk to class. If it arrives on time, I will take it.",
      "What will the writer do if the bus is late?",
      "Walk to class",
      "Take the bus",
      "Miss class",
      "The if-clause gives the condition for will walk."
    ],
    "listening": [
      "If you heat ice, it melts. If you put this tray in the freezer, the water will freeze.",
      "What happens when ice is heated?",
      "It melts",
      "It freezes",
      "It remains unchanged",
      "The zero conditional describes a general result."
    ]
  },
  "A2-16": {
    "reading": [
      "I will call as soon as the meeting ends. I will not call during the meeting.",
      "When will the writer call?",
      "Immediately after the meeting",
      "During the meeting",
      "Before it begins",
      "As soon as introduces the future time clause."
    ],
    "listening": [
      "We left early so that we could catch the first train.",
      "Why did they leave early?",
      "To catch the first train",
      "To miss the train",
      "Because the train was cancelled",
      "So that expresses purpose."
    ]
  },
  "A2-17": {
    "reading": [
      "Mia is interested in biology and good at maths. She is applying for a science course.",
      "Which subject interests Mia?",
      "Biology",
      "Maths only",
      "History",
      "Interested in identifies the interest."
    ],
    "listening": [
      "I'm waiting for the bus. I'm looking at the timetable.",
      "What is the speaker waiting for?",
      "The bus",
      "The timetable",
      "A taxi",
      "Wait for takes the awaited object."
    ]
  },
  "A2-18": {
    "reading": [
      "Look up unfamiliar words before class. Hand in your assignment by Friday.",
      "What must students submit?",
      "Their assignment",
      "A dictionary",
      "Their notes only",
      "Hand in means submit."
    ],
    "listening": [
      "I looked it up in a dictionary and wrote down the meaning.",
      "What did the speaker do with the unfamiliar word?",
      "Searched for its meaning",
      "Gave it away",
      "Forgot it",
      "Look it up means search; pronoun goes between look and up."
    ]
  },
  "B1-01": {
    "reading": [
      "The volunteers have been waiting since the doors opened. They still have not received their badges.",
      "What is still happening?",
      "They are waiting for badges",
      "They have already left",
      "They have received every badge",
      "Have been waiting connects the earlier start to now."
    ],
    "listening": [
      "I've been studying for two hours, and I haven't finished yet.",
      "Is the study session finished?",
      "No, it is still in progress",
      "Yes, it ended two hours ago",
      "It has not started",
      "Present Perfect Continuous and yet indicate ongoing activity."
    ]
  },
  "B1-02": {
    "reading": [
      "When the technician arrived, someone had already erased the notes. She reconstructed them from a backup.",
      "Which happened first?",
      "The notes were erased",
      "The technician arrived",
      "The backup was reconstructed",
      "Had erased marks an event before another past event."
    ],
    "listening": [
      "By the time we reached the station, the train had left.",
      "What happened before their arrival?",
      "The train departed",
      "The train arrived",
      "They boarded the train",
      "Had left places departure before arrival."
    ]
  },
  "B1-03": {
    "reading": [
      "The engineer had been repairing the lift all morning when the replacement part arrived.",
      "What had occupied her before the part arrived?",
      "Repairing the lift",
      "Ordering a new lift",
      "Waiting outside",
      "Had been repairing describes the earlier ongoing activity."
    ],
    "listening": [
      "I was exhausted because I'd been carrying boxes for three hours.",
      "Why was the speaker exhausted?",
      "They had been carrying boxes",
      "They had slept for three hours",
      "They were about to start carrying boxes",
      "Past Perfect Continuous gives the earlier cause."
    ]
  },
  "B1-04": {
    "reading": [
      "The organiser said the workshop would start at ten. It was going to be held outside, but rain forced a change.",
      "What was the original plan?",
      "Hold the workshop outside",
      "Cancel the workshop",
      "Hold it online",
      "Was going to describes a past plan."
    ],
    "listening": [
      "I'll send the file this afternoon. By tomorrow morning, I'll be working at the other office.",
      "Where will the speaker be working tomorrow morning?",
      "At the other office",
      "At home",
      "At the current office",
      "Will be working marks a future process."
    ]
  },
  "B1-05": {
    "reading": [
      "If the department had a larger budget, it would hire another guide. At present, one guide serves the whole museum.",
      "What is the department's current situation?",
      "It has one guide",
      "It has already hired another guide",
      "It has a larger budget",
      "The hypothetical if-clause contrasts with the current fact."
    ],
    "listening": [
      "If I lived nearer the campus, I'd walk to class. For now I take the bus.",
      "How does the speaker actually travel?",
      "By bus",
      "On foot",
      "By bike",
      "Would walk describes a hypothetical alternative."
    ]
  },
  "B1-06": {
    "reading": [
      "If we had left earlier, we would have caught the first bus. Instead, we had to wait an hour.",
      "What actually happened?",
      "They missed the first bus",
      "They caught the first bus",
      "They left an hour early",
      "Third conditional describes an unreal past alternative."
    ],
    "listening": [
      "If I had checked the address, I would have found the building sooner. I arrived late.",
      "Why did the speaker arrive late?",
      "They had not checked the address",
      "They had checked it too early",
      "The building had closed",
      "The counterfactual condition implies the address was not checked."
    ]
  },
  "B1-07": {
    "reading": [
      "Each application is checked by two readers. Successful candidates are notified by email.",
      "Who checks each application?",
      "Two readers",
      "The candidates",
      "The email system alone",
      "By introduces the agent of the passive."
    ],
    "listening": [
      "The room was cleaned yesterday, but the desks haven't been moved.",
      "Which action has not been completed?",
      "Moving the desks",
      "Cleaning the room",
      "Opening the room",
      "Haven't been moved is negative perfect passive."
    ]
  },
  "B1-08": {
    "reading": [
      "I had the broken lens repaired at a specialist shop. I did not replace it myself.",
      "Who arranged the repair?",
      "The writer",
      "A customer at the shop",
      "Nobody",
      "Had the lens repaired indicates arranged service."
    ],
    "listening": [
      "We're having the windows cleaned on Friday. A contractor is coming.",
      "Who will clean the windows?",
      "A contractor",
      "The speakers themselves",
      "The neighbours",
      "Have object V3 describes an arranged service."
    ]
  },
  "B1-09": {
    "reading": [
      "Readers must leave their bags outside. They may bring a notebook and should keep it on the desk.",
      "Which action is compulsory?",
      "Leaving bags outside",
      "Bringing a notebook",
      "Keeping the notebook on the desk",
      "Must expresses obligation, may permission, should advice."
    ],
    "listening": [
      "You don't have to attend the extra session, but you must submit the worksheet.",
      "What is obligatory?",
      "Submitting the worksheet",
      "Attending the extra session",
      "Both",
      "Must expresses obligation; don't have to removes it."
    ]
  },
  "B1-10": {
    "reading": [
      "The lights are off and the door is locked. The staff must have gone home, although no one saw them leave.",
      "What does the writer conclude?",
      "The staff probably went home",
      "The staff were ordered to go home",
      "The staff are definitely inside",
      "Must have gone expresses a strong past inference, not an obligation."
    ],
    "listening": [
      "That can't be Jo's bag. Hers is blue and this one is green.",
      "What does the speaker think?",
      "The bag cannot belong to Jo",
      "Jo has lost every bag",
      "Jo likes green bags",
      "Can't be expresses negative deduction."
    ]
  },
  "B1-11": {
    "reading": [
      "Mia said that the projector had stopped working. She added that a technician was on the way.",
      "What problem did Mia report?",
      "The projector had stopped working",
      "The technician had left",
      "The meeting had been cancelled",
      "The reported clause preserves the reported event."
    ],
    "listening": [
      "Leo told me that he would return the keys the next day.",
      "What did Leo promise to do?",
      "Return the keys the following day",
      "Keep the keys permanently",
      "Return the keys immediately",
      "Would reports future from the earlier speech point."
    ]
  },
  "B1-12": {
    "reading": [
      "Jo asked me where I had left the badges and told me to bring them to reception.",
      "What did Jo want to know?",
      "The location of the badges",
      "The price of the badges",
      "The name of the receptionist",
      "Where I had left is an embedded reported question."
    ],
    "listening": [
      "The tutor asked whether we had finished and told us not to close the file.",
      "What instruction did the tutor give?",
      "Keep the file open",
      "Close the file immediately",
      "Delete the file",
      "Told us not to close reports a negative instruction."
    ]
  },
  "B1-13": {
    "reading": [
      "I remember visiting the archive as a child. I must remember to bring my card on the next visit.",
      "Which action is a memory?",
      "A childhood visit",
      "Bringing the card next time",
      "Booking the next visit",
      "Remember + -ing recalls a past event."
    ],
    "listening": [
      "I stopped to answer the phone. Then I continued walking.",
      "Why did the speaker stop?",
      "To answer the phone",
      "To stop answering calls",
      "To finish walking permanently",
      "Stop to do expresses purpose, not cessation of that action."
    ]
  },
  "B1-14": {
    "reading": [
      "Our tutor, who grew up nearby, knows the area well. She is leading the tour.",
      "What extra information is given about the tutor?",
      "She grew up nearby",
      "She is a visitor",
      "She does not know the area",
      "The comma-separated who-clause adds non-defining information."
    ],
    "listening": [
      "The main hall, which was renovated last year, seats two hundred.",
      "What happened last year?",
      "The hall was renovated",
      "The hall was built",
      "Two hundred people visited",
      "The non-defining clause adds a past fact."
    ]
  },
  "B1-15": {
    "reading": [
      "I used to take the early train, but now I cycle. I am getting used to the longer ride.",
      "How did the writer travel previously?",
      "By train",
      "By bike",
      "On foot",
      "Used to describes a discontinued past habit."
    ],
    "listening": [
      "I am used to working at night now. At first it was difficult.",
      "How does the speaker feel about night work now?",
      "Accustomed to it",
      "Unwilling to try it",
      "Still completely unfamiliar with it",
      "Be used to + -ing indicates familiarity."
    ]
  },
  "B1-16": {
    "reading": [
      "You have registered for the workshop, haven't you? Please bring your confirmation.",
      "What is the writer checking?",
      "Whether the reader registered",
      "Whether the reader paid a fine",
      "Whether the workshop was cancelled",
      "The negative tag seeks confirmation of the positive statement."
    ],
    "listening": [
      "You don't need a ticket, do you? I thought entry was free.",
      "What assumption is being checked?",
      "That a ticket is unnecessary",
      "That a ticket is compulsory",
      "That the venue is closed",
      "The positive tag follows a negative statement."
    ]
  },
  "B1-17": {
    "reading": [
      "Although the hall was noisy, the group completed the interview. They moved closer so that they could hear each other.",
      "Why did they move closer?",
      "To hear each other",
      "To end the interview",
      "Because the hall became silent",
      "So that introduces purpose."
    ],
    "listening": [
      "The bus broke down, so we arrived late. Despite the delay, we joined the last activity.",
      "What happened despite the delay?",
      "They joined the last activity",
      "They missed every activity",
      "The bus arrived early",
      "Despite introduces a concessive contrast."
    ]
  },
  "B1-18": {
    "reading": [
      "The larger room costs less. Moreover, it has better lighting. However, it is farther from the station.",
      "Which drawback does the writer mention?",
      "Greater distance from the station",
      "Poor lighting",
      "Higher cost",
      "However introduces a contrasting drawback."
    ],
    "listening": [
      "The first plan saves time. Nevertheless, we need to check its cost before accepting it.",
      "What remains to be checked?",
      "The cost",
      "Whether the plan saves time",
      "The meeting date",
      "Nevertheless introduces a remaining concern."
    ]
  },
  "B1-19": {
    "reading": [
      "The list of eligible speakers is on the desk. Several copies of the schedule are beside it.",
      "Where is the list?",
      "On the desk",
      "Beside the entrance",
      "In the speaker's bag",
      "The head list is singular despite speakers in the modifier."
    ],
    "listening": [
      "A box of new folders is in the store room. Two sets of keys are at reception.",
      "What is in the store room?",
      "One box of folders",
      "Two sets of keys",
      "The receptionist",
      "The singular head box controls is."
    ]
  },
  "B1-20": {
    "reading": [
      "Our classmates carried out a survey of commuters. They looked into complaints about the bus service.",
      "What did they investigate?",
      "Complaints about the bus service",
      "The price of textbooks",
      "The survey's printing costs",
      "Look into means investigate."
    ],
    "listening": [
      "We ran out of paper, so I asked for another pack.",
      "Why did the speaker request paper?",
      "There was none left",
      "There was too much",
      "The paper was the wrong colour",
      "Run out of means exhaust a supply."
    ]
  },
  "B1-21": {
    "reading": [
      "The visitors waiting downstairs need new maps. Maps printed yesterday are on the counter.",
      "Which visitors need maps?",
      "Those waiting downstairs",
      "Those who have already left",
      "All staff",
      "Waiting downstairs modifies visitors."
    ],
    "listening": [
      "The forms submitted before noon have been checked. The others are still waiting.",
      "Which forms have been checked?",
      "Those submitted before noon",
      "Those submitted after noon",
      "No forms",
      "Submitted is a reduced passive relative."
    ]
  },
  "B1-22": {
    "reading": [
      "The revised estimate is considerably lower than the first. The second estimate is almost as low as the third.",
      "How does the revised estimate compare with the first?",
      "Much lower",
      "Slightly higher",
      "Exactly equal",
      "Considerably modifies the comparative lower."
    ],
    "listening": [
      "The new hall is far more spacious than the old one, but the price is only slightly higher.",
      "How different is the price?",
      "A little higher",
      "Much lower",
      "Exactly the same",
      "Only slightly modifies higher."
    ]
  },
  "B2-01": {
    "reading": [
      "If I had booked in time, I would be at the workshop now. I wish I had checked the deadline.",
      "Why is the writer not at the workshop?",
      "They failed to book in time",
      "They are already attending",
      "The workshop is free",
      "Past condition has a present unreal result."
    ],
    "listening": [
      "If I were more organised, I wouldn't have missed yesterday's deadline.",
      "What does the speaker attribute the missed deadline to?",
      "Their lack of organisation",
      "A future change in the deadline",
      "Successful preparation",
      "Present trait is linked to a past counterfactual result."
    ]
  },
  "B2-02": {
    "reading": [
      "You may use the room provided that you sign in. Unless the equipment is returned, the deposit will not be refunded.",
      "What condition allows room use?",
      "Signing in",
      "Keeping the equipment",
      "Paying a second deposit",
      "Provided that introduces a necessary condition."
    ],
    "listening": [
      "We'll go ahead even if it rains, as long as the wind stays light.",
      "Which condition matters for going ahead?",
      "The wind must remain light",
      "It must not rain",
      "The weather must be sunny",
      "As long as sets a condition; even if concedes rain."
    ]
  },
  "B2-03": {
    "reading": [
      "We needn't have bought new folders: the old ones were still usable. The replacement order cannot be cancelled.",
      "What happened?",
      "They bought unnecessary folders",
      "They did not buy folders",
      "They were required to buy folders",
      "Needn't have bought indicates completed unnecessary action."
    ],
    "listening": [
      "You should have checked the file before sending it. It still contained errors.",
      "What criticism is made?",
      "The file was not adequately checked",
      "The file was checked too often",
      "The file was never sent",
      "Should have checked expresses criticism of a past omission."
    ]
  },
  "B2-04": {
    "reading": [
      "The file is believed to have been deleted before the backup ran. A replacement must be obtained.",
      "What is the reported belief?",
      "The file was deleted before the backup",
      "The backup deleted a future file",
      "The file was never stored",
      "Perfect passive infinitive marks anteriority."
    ],
    "listening": [
      "The package may have been delivered to the wrong office. It hasn't arrived here.",
      "What is one possible explanation?",
      "It was delivered elsewhere",
      "It is definitely here",
      "The office never existed",
      "May have been delivered expresses past passive possibility."
    ]
  },
  "B2-05": {
    "reading": [
      "The editor denied copying the introduction but acknowledged using two uncredited examples.",
      "What did the editor acknowledge?",
      "Using two uncredited examples",
      "Copying the introduction",
      "Writing every example independently",
      "Acknowledge + -ing reports an admission."
    ],
    "listening": [
      "The committee urged us to revise the proposal and suggested postponing the vote.",
      "What did the committee suggest?",
      "Postponing the vote",
      "Rejecting the proposal immediately",
      "Holding the vote earlier",
      "Suggest + -ing identifies the suggestion."
    ]
  },
  "B2-06": {
    "reading": [
      "The director had the notice replaced. The new version seems clearer, but visitors still find the instructions confusing.",
      "What was arranged?",
      "Replacement of the notice",
      "Removal of the visitors",
      "Closure of the building",
      "Had object V3 expresses causative; seems describes appearance."
    ],
    "listening": [
      "We got a technician to recalibrate the sensor. It now appears stable.",
      "Who performed the recalibration?",
      "The technician",
      "The speakers personally",
      "The sensor itself",
      "Get person to V1 identifies the agent."
    ]
  },
  "B2-07": {
    "reading": [
      "The researcher whose notes were missing contacted the librarian. The notes, which had been scanned, were recovered.",
      "What were recovered?",
      "The missing notes",
      "The librarian's books",
      "The researcher",
      "Whose identifies ownership; which adds information about notes."
    ],
    "listening": [
      "The students selected for the trial will receive an email. Those who were not selected will be contacted later.",
      "Who will receive the first email?",
      "Students selected for the trial",
      "Students not selected",
      "Every applicant",
      "Selected is a reduced passive relative."
    ]
  },
  "B2-08": {
    "reading": [
      "Having checked the figures, the reviewers approved the draft. The revised document was sent for publication.",
      "What happened first?",
      "The reviewers checked the figures",
      "The draft was approved",
      "The document was published",
      "Having checked marks prior completed active action."
    ],
    "listening": [
      "Having been inspected, the equipment was returned to the lab.",
      "What happened before the return?",
      "The equipment was inspected",
      "The equipment inspected itself",
      "The lab closed",
      "Having been + V3 marks earlier passive action."
    ]
  },
  "B2-09": {
    "reading": [
      "The college offers a six-week research placement with an end-of-course presentation. Applicants submit a short project outline.",
      "How long is the placement?",
      "Six weeks",
      "Six days",
      "One year",
      "Six-week is a singular compound modifier."
    ],
    "listening": [
      "The library has installed a new self-service book return system.",
      "What is the system for?",
      "Returning books without staff assistance",
      "Buying new books",
      "Returning library staff",
      "The head system is modified by self-service book return."
    ]
  },
  "B2-10": {
    "reading": [
      "The number of applications has doubled since May. A number of applicants have requested financial support.",
      "Which figure doubled?",
      "The number of applications",
      "The number of awards",
      "The number of staff",
      "The number is singular; a number of takes plural agreement here."
    ],
    "listening": [
      "Each of the reports contains a summary, but the results of the tests are inconsistent.",
      "What is inconsistent?",
      "The results",
      "Each summary",
      "Each report's length",
      "Plural head results controls are."
    ]
  },
  "B2-11": {
    "reading": [
      "I found a key yesterday. The key opens the cupboard in the staff room. Keys to the main entrance are different.",
      "Which key opens the cupboard?",
      "The one found yesterday",
      "All entrance keys",
      "A new unidentified key",
      "The key refers back to a previously introduced item."
    ],
    "listening": [
      "I bought a notebook and a folder. The folder is for the lab; the notebook is for maths.",
      "Which item is for the lab?",
      "The folder",
      "The notebook",
      "Both",
      "The identifies the previously introduced folder."
    ]
  },
  "B2-12": {
    "reading": [
      "There is too little evidence to draw a conclusion. Few of the samples meet the inclusion criteria.",
      "Why is a conclusion premature?",
      "There is insufficient evidence",
      "Every sample meets the criteria",
      "There is too much evidence",
      "Too little expresses an inadequate uncountable quantity."
    ],
    "listening": [
      "We have a few volunteers, but hardly any of them are available on Friday.",
      "How many volunteers are available Friday?",
      "Almost none",
      "All of them",
      "Most of them",
      "Hardly any marks near-zero availability."
    ]
  },
  "B2-13": {
    "reading": [
      "The measured width of the second room is only slightly greater than that of the first. It is apparently better insulated, but no measurement has confirmed that.",
      "Which comparison is measured directly?",
      "The small difference in width",
      "The better insulation",
      "The temperature in winter",
      "Only slightly greater describes the measured width; apparently marks an unconfirmed assessment."
    ],
    "listening": [
      "Only Mia reviewed the draft yesterday; Leo merely skimmed it today.",
      "Who actually reviewed it yesterday?",
      "Mia",
      "Leo",
      "Both",
      "Only scopes over Mia; merely limits Leo's action."
    ]
  },
  "B2-14": {
    "reading": [
      "Despite the short deadline, the team submitted the proposal. Nevertheless, its budget remains incomplete.",
      "What limitation remains?",
      "The incomplete budget",
      "The proposal was not submitted",
      "The deadline was extended",
      "Nevertheless introduces a remaining contrast."
    ],
    "listening": [
      "Although the course is demanding, it is popular. In contrast, the easier course has few applicants.",
      "Which course is more popular?",
      "The demanding course",
      "The easier course",
      "Both equally",
      "Although concedes difficulty; in contrast introduces the other course."
    ]
  },
  "B2-15": {
    "reading": [
      "It was the final signature that delayed the application, not the supporting documents.",
      "What caused the delay?",
      "The final signature",
      "The supporting documents",
      "The application fee",
      "The it-cleft focuses the signature."
    ],
    "listening": [
      "What we need is a quieter room, not another projector.",
      "What is the priority?",
      "A quieter room",
      "Another projector",
      "More documents",
      "The what-cleft focuses the requested room."
    ]
  },
  "B2-16": {
    "reading": [
      "Mia has booked a place, and Leo has too. Jo hasn't, but she intends to.",
      "Who has not booked?",
      "Jo",
      "Mia",
      "Leo",
      "Has too substitutes for has booked; hasn't negates it."
    ],
    "listening": [
      "I prefer the first proposal. Sam prefers the second one, and Mia does too.",
      "Which proposal does Mia prefer?",
      "The second",
      "The first",
      "Neither",
      "Does too substitutes for prefers the second."
    ]
  },
  "B2-17": {
    "reading": [
      "Only after the second test did we notice the error. Before that, the readings appeared normal.",
      "When was the error noticed?",
      "After the second test",
      "Before the first test",
      "During the initial setup",
      "Only after triggers inversion in the main clause."
    ],
    "listening": [
      "Rarely do we receive complaints about this service. Yesterday's complaint was unusual.",
      "How common are complaints?",
      "Uncommon",
      "Daily",
      "Constant",
      "Rarely expresses low frequency and triggers inversion."
    ]
  },
  "B2-18": {
    "reading": [
      "The association may reflect differences in prior experience. The study does not establish a causal relationship.",
      "What is established?",
      "An association, not causation",
      "A proven causal relationship",
      "No observed association",
      "May marks a possible explanation and the limitation rejects proof."
    ],
    "listening": [
      "The results appear promising, but the sample is too small for a firm conclusion.",
      "How certain is the assessment?",
      "Tentative",
      "Completely established",
      "Entirely negative",
      "Appear and the stated limitation hedge the conclusion."
    ]
  },
  "B2-19": {
    "reading": [
      "Jo spoke on behalf of the evening students. In accordance with the rules, she submitted their request in writing.",
      "Whom did Jo represent?",
      "The evening students",
      "The committee",
      "The daytime tutors",
      "On behalf of identifies the represented group."
    ],
    "listening": [
      "Regardless of the weather, the workshop will proceed. In the event of heavy rain, it will move indoors.",
      "What will happen if it rains heavily?",
      "The workshop moves indoors",
      "The workshop is cancelled",
      "The workshop starts earlier",
      "In the event of introduces a contingency."
    ]
  },
  "B2-20": {
    "reading": [
      "The reduction in fares increased student participation. The committee's decision to retain the discount was unanimous.",
      "What change increased participation?",
      "Lower fares",
      "Higher fares",
      "A reduction in students",
      "Reduction in fares nominalises the decrease."
    ],
    "listening": [
      "The expansion of the library has improved access. The new wing is now open.",
      "What improved access?",
      "The library's expansion",
      "The library's closure",
      "Higher entrance fees",
      "Expansion nominalises expand and acts as subject."
    ]
  },
  "B2-21": {
    "reading": [
      "The hall was open; the office, however, was closed. Visitors could use the hall but could not collect forms.",
      "Which facility was available?",
      "The hall",
      "The office",
      "Neither facility",
      "Semicolon separates independent clauses; however introduces contrast."
    ],
    "listening": [
      "Please bring three items: a pen, a notebook and your badge. Leave other belongings outside.",
      "Which item is explicitly required?",
      "A badge",
      "A laptop",
      "A coat",
      "The colon introduces the list of required items."
    ]
  },
  "C1-01": {
    "reading": [
      "Not until the final inspection did the team identify the fault. Earlier checks had failed to detect it.",
      "When was the fault detected?",
      "At the final inspection",
      "Before the first check",
      "During every check",
      "Inversion follows fronted not until; the main clause gives the event."
    ],
    "listening": [
      "Under no circumstances may visitors handle the original documents. Copies are provided instead.",
      "What is forbidden?",
      "Handling original documents",
      "Reading copies",
      "Entering the building",
      "Negative fronting and modal inversion mark prohibition."
    ]
  },
  "C1-02": {
    "reading": [
      "Had the grant been refused, the clinic would have closed. In fact, the grant was renewed.",
      "What actually happened?",
      "The clinic received renewed funding",
      "The clinic closed",
      "The grant was refused",
      "Had inversion introduces an unreal past condition."
    ],
    "listening": [
      "Should you encounter any difficulty, contact reception. Otherwise, proceed directly to the hall.",
      "When should the listener contact reception?",
      "If a difficulty arises",
      "In every case",
      "Only after the event",
      "Should inversion marks a contingency."
    ]
  },
  "C1-03": {
    "reading": [
      "What the panel disputed was the accuracy of the estimate. It accepted the method itself.",
      "What did the panel question?",
      "The estimate's accuracy",
      "The method itself",
      "The researchers' identity",
      "The what-cleft foregrounds the disputed point."
    ],
    "listening": [
      "It was the timing, not the cost, that concerned the organisers.",
      "What was the concern?",
      "Timing",
      "Cost",
      "The venue's size",
      "The contrastive cleft highlights timing."
    ]
  },
  "C1-04": {
    "reading": [
      "Having been denied access to the archive, the team postponed the launch. Access was granted the following week.",
      "What prompted the postponement?",
      "Denial of access",
      "A successful launch",
      "The archive's permanent closure",
      "Perfect passive participle gives an earlier circumstance."
    ],
    "listening": [
      "By comparing the two records, we identified a discrepancy. We then contacted the editor.",
      "How was the discrepancy found?",
      "By comparing records",
      "By interviewing the editor",
      "By deleting a record",
      "By + -ing specifies method."
    ]
  },
  "C1-05": {
    "reading": [
      "The board's rejection of the proposal delayed the trial. The team's failure to revise the budget compounded the problem.",
      "Who rejected the proposal?",
      "The board",
      "The team",
      "The trial participants",
      "The possessive retains the agent of rejection."
    ],
    "listening": [
      "The rapid expansion of the service strained its resources. Further expansion has been paused.",
      "What has been paused?",
      "Further expansion",
      "Every service",
      "The use of existing resources",
      "Expansion nominalises the process being paused."
    ]
  },
  "C1-06": {
    "reading": [
      "In the absence of a map, the volunteers asked for directions. Their familiarity with the area was limited.",
      "Why did they ask for directions?",
      "They lacked a map",
      "They knew the route well",
      "They had too many maps",
      "In the absence of expresses a missing resource."
    ],
    "listening": [
      "The implications of the new timetable for part-time students remain unclear.",
      "Who may be affected?",
      "Part-time students",
      "The timetable itself",
      "Full-time staff exclusively",
      "Of gives the source; for identifies the affected group."
    ]
  },
  "C1-07": {
    "reading": [
      "The work is thought to have been completed before the deadline, but the records are incomplete.",
      "What is the reported belief?",
      "Completion before the deadline",
      "Completion after the deadline",
      "No work was done",
      "Perfect passive reporting infinitive expresses anterior completion."
    ],
    "listening": [
      "The laboratory had its instruments calibrated by an external specialist before the experiment.",
      "Who carried out calibration?",
      "An external specialist",
      "The participants",
      "The instruments themselves",
      "Causative have retains the specialist as agent."
    ]
  },
  "C1-08": {
    "reading": [
      "The author acknowledges having overlooked an earlier estimate but argues that the main conclusion remains valid.",
      "What does the author admit?",
      "Overlooking an earlier estimate",
      "Rejecting the main conclusion",
      "Fabricating the estimate",
      "Acknowledges + perfect gerund reports a prior omission."
    ],
    "listening": [
      "The review cautions readers against treating association as causation.",
      "What does the review warn against?",
      "Assuming a causal link from association alone",
      "Collecting data",
      "Reporting uncertainty",
      "Caution against + -ing identifies the warned-against action."
    ]
  },
  "C1-09": {
    "reading": [
      "The change might well reflect variation in the sample; alternative explanations cannot be ruled out.",
      "How certain is the suggested explanation?",
      "Plausible but not exclusive",
      "Definitely the only cause",
      "Completely impossible",
      "Might well marks plausible uncertainty; alternatives remain."
    ],
    "listening": [
      "The device must have overheated, given the readings, though the cause has yet to be confirmed.",
      "What is the status of overheating?",
      "A strong inference, not confirmed fact",
      "A mandatory instruction",
      "A proven diagnosis",
      "Must have expresses a strong past deduction, limited by the caveat."
    ]
  },
  "C1-10": {
    "reading": [
      "Not only did the trial reduce costs, but it also improved access. Even so, the evidence is limited to one site.",
      "Which limitation remains?",
      "Evidence from only one site",
      "Costs rose",
      "Access declined",
      "Even so concedes a limitation after the benefits."
    ],
    "listening": [
      "Much as I appreciate the proposal, I cannot endorse it without a revised budget.",
      "What prevents endorsement?",
      "The need for a revised budget",
      "Lack of appreciation",
      "A completed budget review",
      "Much as introduces concession; the main clause states the restriction."
    ]
  },
  "C1-11": {
    "reading": [
      "Rural rates are lower than those of urban centres. This difference is greatest among younger applicants.",
      "What does those refer to?",
      "Rates",
      "Rural centres",
      "Younger applicants",
      "Those substitutes for the plural noun rates."
    ],
    "listening": [
      "The first group completed the survey; the second did so a week later.",
      "What does did so refer to?",
      "Completed the survey",
      "Joined the first group",
      "Changed the survey",
      "Did so substitutes for the preceding verb phrase."
    ]
  },
  "C1-12": {
    "reading": [
      "The witness remembered seeing the sign before the gate closed. She denied having entered the restricted area.",
      "What does the witness deny?",
      "Entering the restricted area",
      "Seeing the sign",
      "Remembering the gate",
      "Deny + perfect gerund refers to the earlier alleged entry."
    ],
    "listening": [
      "The editor regretted to inform us that the paper had been rejected, although she did not regret reviewing it.",
      "What did the editor regret announcing?",
      "The rejection",
      "The review itself",
      "Acceptance",
      "Regret to inform introduces unwelcome news; regret -ing evaluates a past action."
    ]
  },
  "C1-13": {
    "reading": [
      "The second estimate was only marginally higher than the first. More importantly, both estimates rely on the same assumptions.",
      "Which issue is presented as more significant?",
      "The shared assumptions",
      "The tiny numerical difference",
      "The order of the estimates",
      "More importantly marks viewpoint emphasis."
    ],
    "listening": [
      "Frankly, the report is remarkably clear, but it only partly addresses the main concern.",
      "How fully does it address the concern?",
      "Partly",
      "Completely",
      "Not at all",
      "Only partly limits extent; frankly frames stance."
    ]
  },
  "C1-14": {
    "reading": [
      "Among these respondents, longer waits were associated with lower satisfaction. No causal conclusion can be drawn from the pilot alone.",
      "What is the defensible conclusion?",
      "An association within this sample",
      "A universal causal effect",
      "No relationship was observed",
      "Scope restriction and passive hedging preserve evidence limits."
    ],
    "listening": [
      "Having reviewed the preliminary findings, the authors recommend a larger trial before making general claims.",
      "What do the authors recommend?",
      "A larger trial",
      "Immediate generalisation",
      "Discarding all findings",
      "The participle establishes prior review; recommend identifies the proposed step."
    ]
  }
};
if(typeof module!=="undefined"&&module.exports)module.exports=contexts;else root.grammarToeflContexts=contexts;
})(typeof window!=="undefined"?window:globalThis);
