/* Original synthetic-audio listening practice. Fixed route, not adaptive ETS content. */
const listeningPracticeForms = Array.from({length:24},()=>[]);
const listeningExamAudio = [];
(function(){
const responses=[
  [
    "Do you know whether the library stays open during the holiday?",
    [
      "Yes, but it closes at six instead of ten.",
      "I borrowed that book last week.",
      "The holiday was really enjoyable.",
      "It's on the second floor."
    ],
    "The speaker wants the holiday opening hours."
  ],
  [
    "Would you mind moving your bag so I can sit down?",
    [
      "Of course. I'll put it under the table.",
      "No, I haven't packed for the trip yet.",
      "Yes, the bag is quite heavy.",
      "I sat there yesterday."
    ],
    "The speaker politely asks for space to sit."
  ],
  [
    "I'm afraid I won't be able to finish the report by Thursday.",
    [
      "Would Friday afternoon give you enough time?",
      "Thursday was the day we started.",
      "It's already been printed in colour.",
      "I don't usually read reports."
    ],
    "The speaker needs an extension."
  ],
  [
    "How did you find the guest lecture yesterday?",
    [
      "The examples made the topic much clearer.",
      "I found it in the lost property office.",
      "The lecture room is down the hall.",
      "Yesterday was a busy day."
    ],
    "How did you find means what did you think of it."
  ],
  [
    "Could you give me a hand with these boxes?",
    [
      "Sure. Which ones should I carry first?",
      "I hurt my hand last summer.",
      "The boxes were delivered on Monday.",
      "You can buy them at the shop."
    ],
    "Give me a hand means help me."
  ],
  [
    "I thought the meeting was supposed to start at nine.",
    [
      "It was moved to half past nine this morning.",
      "I usually leave home at eight.",
      "The room can hold twenty people.",
      "Yes, the meeting lasted an hour."
    ],
    "The response explains the change in schedule."
  ],
  [
    "Have you had a chance to look over my draft?",
    [
      "Not yet, but I'll read it after lunch.",
      "The window overlooks the courtyard.",
      "I wrote my own draft last year.",
      "The chance of rain is quite low."
    ],
    "Look over means review."
  ],
  [
    "You wouldn't happen to have a spare pen, would you?",
    [
      "Here, you can borrow this one.",
      "I happened to be there yesterday.",
      "The pen was made in Germany.",
      "I would write a longer answer."
    ],
    "This is a polite request to borrow a pen."
  ],
  [
    "I'm not sure which train will get us there before noon.",
    [
      "Let's check the departure times together.",
      "We had lunch at twelve yesterday.",
      "The train was painted blue.",
      "I'm sure you enjoyed the visit."
    ],
    "The speaker needs help choosing a train."
  ],
  [
    "Why don't we ask our tutor to clarify the assignment?",
    [
      "Good idea. We can email her this evening.",
      "Because the assignment is five pages long.",
      "I asked for a glass of water.",
      "Our tutor graduated last year."
    ],
    "Why don't we introduces a suggestion."
  ],
  [
    "Is there any way I could exchange these tickets?",
    [
      "Yes, provided the performance hasn't sold out.",
      "The theatre is across the street.",
      "I usually travel by bus.",
      "The tickets are made of thick paper."
    ],
    "The speaker asks about the possibility of an exchange."
  ],
  [
    "I could hardly hear the speaker from the back of the room.",
    [
      "Perhaps we should sit closer next time.",
      "The speaker arrived early.",
      "The room was cleaned this morning.",
      "I can hear music in the lobby."
    ],
    "The reply addresses the difficulty hearing."
  ]
];
const groups=[
  [
    "Listen to a Conversation",
    "Library reservation",
    "Maya: Hi, I reserved a study room for our group tomorrow, but the confirmation says the room is only available for thirty minutes.\nClerk: That's the default booking length. How many people are in your group?\nMaya: Four. We need about two hours to practise our presentation.\nClerk: The smaller rooms can be extended if nobody has booked the next slot. Room eight is free for the whole afternoon, though it doesn't have a projector.\nMaya: That's fine. We can bring a laptop. Could you transfer the booking to room eight?\nClerk: Certainly. I'll send an updated confirmation.",
    [
      [
        "Why does Maya speak to the clerk?",
        "Her current reservation is too short.",
        "She lost her laptop.",
        "She wants to cancel the presentation.",
        "She cannot find the library."
      ],
      [
        "What limitation does room eight have?",
        "It has no projector.",
        "It can hold only two people.",
        "It is unavailable in the afternoon.",
        "It requires an additional payment."
      ],
      [
        "What will the clerk do next?",
        "Send a revised booking confirmation.",
        "Reserve a projector for Maya.",
        "Close the smaller rooms.",
        "Cancel all bookings for the afternoon."
      ]
    ]
  ],
  [
    "Listen to a Conversation",
    "Course project",
    "Student: Professor, we collected responses for our project, but almost everyone who answered was from the same department.\nProfessor: Then you should be careful about saying the results represent the entire college. How did you recruit people?\nStudent: We shared the survey in our department's group chat.\nProfessor: Try posting it through the student association, which reaches several departments. Keep a record of where responses come from.\nStudent: Should we delete the first responses?\nProfessor: No. Include them, but describe the recruitment method and report the limitation in your paper.",
    [
      [
        "What problem does the student identify?",
        "The respondents mainly come from one department.",
        "The survey questions are too long.",
        "The responses were accidentally deleted.",
        "The project deadline has passed."
      ],
      [
        "Why does the professor mention the student association?",
        "It can help reach a broader group.",
        "It can grade the project.",
        "It designed the original questionnaire.",
        "It can remove duplicate responses automatically."
      ],
      [
        "What does the professor recommend doing with the original responses?",
        "Keep them and explain the sampling limitation.",
        "Discard them and restart the survey.",
        "Publish them without analysing them.",
        "Replace them with estimated answers."
      ]
    ]
  ],
  [
    "Listen to a Conversation",
    "Equipment collection",
    "Jon: I came to pick up a camera for the documentary workshop. I booked one for the weekend.\nAssistant: I see your reservation. Have you completed the equipment induction?\nJon: I did the online safety module yesterday.\nAssistant: That covers general rules, but you also need a brief in-person demonstration. We have one at eleven today. It lasts fifteen minutes.\nJon: I have class until eleven twenty. Is there another option?\nAssistant: There's a demonstration at two. I'll hold your camera until then.\nJon: Great. I'll come back after lunch.",
    [
      [
        "Why can't Jon collect the camera immediately?",
        "He has not completed the in-person demonstration.",
        "He booked the wrong type of equipment.",
        "His online account has been suspended.",
        "The camera has already been returned."
      ],
      [
        "Why does Jon reject the eleven o'clock session?",
        "He has a class at that time.",
        "He thinks the session is too long.",
        "He needs the camera before eleven.",
        "He has already attended that session."
      ],
      [
        "What arrangement do they make?",
        "Jon will attend the afternoon demonstration and collect the camera.",
        "Jon will borrow another student's camera.",
        "The assistant will deliver the camera to class.",
        "Jon will repeat the online safety module."
      ]
    ]
  ],
  [
    "Listen to a Conversation",
    "Language exchange",
    "Leah: Are you still coming to the language exchange on Wednesday?\nMateo: I want to, but I'm worried my English isn't good enough for the discussion group.\nLeah: The first thirty minutes are organised in pairs. The host gives you question cards, so you don't have to invent a topic.\nMateo: That sounds manageable. What happens afterwards?\nLeah: There's an informal group conversation, but you can stay with a partner if you prefer.\nMateo: In that case, I'll join the paired session and decide later whether to stay.",
    [
      [
        "Why is Mateo hesitant about attending?",
        "He doubts his ability to participate in English.",
        "He cannot travel on Wednesdays.",
        "He has lost the registration form.",
        "He dislikes meeting the host."
      ],
      [
        "How do question cards help participants?",
        "They provide topics for the paired conversation.",
        "They assess participants' grammar scores.",
        "They assign everyone a permanent partner.",
        "They replace spoken conversation with writing."
      ],
      [
        "What does Mateo decide?",
        "Attend the paired session and consider the rest later.",
        "Skip the exchange completely.",
        "Lead the group discussion.",
        "Join only the informal conversation."
      ]
    ]
  ],
  [
    "Listen to an Announcement",
    "Science building access",
    "Attention, students using the science building. On Monday morning the main entrance will be closed while the automatic doors are replaced. Please enter through the courtyard door beside the bicycle racks. The laboratory timetable will remain unchanged. Anyone who needs step-free access should contact reception before arriving so staff can direct them to the accessible side entrance. The main entrance is expected to reopen by Tuesday afternoon.",
    [
      [
        "What is the announcement mainly about?",
        "A temporary change to building access.",
        "A revised laboratory timetable.",
        "A new bicycle storage policy.",
        "The cancellation of Monday classes."
      ],
      [
        "Which entrance should most students use on Monday morning?",
        "The courtyard door near the bicycle racks.",
        "The main automatic doors.",
        "The accessible side entrance only.",
        "The laboratory emergency exit."
      ],
      [
        "What should students needing step-free access do?",
        "Contact reception before arriving.",
        "Wait until Tuesday afternoon.",
        "Bring their own ramps.",
        "Attend the laboratory online."
      ]
    ]
  ],
  [
    "Listen to an Announcement",
    "Student conference",
    "This is a reminder for students presenting at Friday's research conference. Please send your presentation slides to the organising team by Wednesday evening, even if you plan to bring your own laptop. We will test all files on the venue computers. Posters can be delivered to the registration desk from eight o'clock on Friday morning. Presenters who need extra setup time should email us before Thursday so we can arrange early access.",
    [
      [
        "Why must presenters send slides in advance?",
        "The organisers need to test the files on venue computers.",
        "The slides will be printed as posters.",
        "Presenters are not allowed to use laptops.",
        "The conference is being moved online."
      ],
      [
        "When can posters be delivered?",
        "From eight on Friday morning.",
        "Before Wednesday evening only.",
        "At noon on Thursday.",
        "After the conference closes."
      ],
      [
        "What should someone needing extra setup time do?",
        "Email the organisers before Thursday.",
        "Arrive without telling anyone.",
        "Send a poster instead of slides.",
        "Cancel the presentation."
      ]
    ]
  ],
  [
    "Listen to an Announcement",
    "Community garden",
    "The campus garden's Saturday workshop has been moved indoors because heavy rain is forecast. Instead of planting seedlings, participants will learn how to plan a small growing area and prepare seed labels. Please meet in room fourteen of the community centre at ten, as originally scheduled. Gardening gloves will not be necessary, but bring a notebook if you have one. The outdoor planting session will be rearranged for a later date.",
    [
      [
        "Why has the workshop changed?",
        "Heavy rain is expected.",
        "The community centre is closing.",
        "The plants have all been sold.",
        "The instructor is unavailable."
      ],
      [
        "What activity will participants do instead of planting?",
        "Plan a growing area and prepare labels.",
        "Repair gardening equipment.",
        "Measure rainfall outside.",
        "Visit another campus garden."
      ],
      [
        "What remains the same?",
        "The starting time.",
        "The workshop location.",
        "The planned activity.",
        "The equipment required."
      ]
    ]
  ],
  [
    "Listen to an Academic Talk",
    "Urban temperature",
    "Today I'd like to explain why two neighbourhoods in the same city can have different temperatures. Dark paved surfaces absorb solar energy during the day. Some of that energy is stored and released after sunset. In contrast, planted areas can cool their surroundings because water evaporates from leaves and soil. Building arrangement matters as well. A narrow street may receive less direct sunlight but also have less ventilation. This means that a single thermometer in the city centre cannot describe every local condition. In a research project, we might place sensors in several streets, record their surroundings, and compare temperatures at the same time of day. The goal is to separate the effects of materials, vegetation, and local airflow rather than attributing every difference to one cause.",
    [
      [
        "What is the main purpose of the talk?",
        "To explain factors that cause temperature differences within cities.",
        "To describe how thermometers are manufactured.",
        "To argue that every city has the same climate.",
        "To compare different types of rainfall."
      ],
      [
        "Why can paved areas remain warm after sunset?",
        "They release energy stored during the day.",
        "They continue receiving direct sunlight.",
        "They produce water through evaporation.",
        "They prevent all air movement."
      ],
      [
        "What is one possible disadvantage of a narrow street?",
        "Ventilation may be limited.",
        "It always absorbs more sunlight.",
        "Trees cannot grow nearby.",
        "Temperature cannot be measured there."
      ],
      [
        "Why does the lecturer recommend sensors in several streets?",
        "To compare local conditions and identify different influences.",
        "To make the city centre warmer.",
        "To avoid recording the surroundings.",
        "To measure temperatures on different days only."
      ]
    ]
  ],
  [
    "Listen to an Academic Talk",
    "Memory and study",
    "A useful distinction in learning research is the difference between recognition and recall. When students read a familiar page, the words may look recognisable, which creates a feeling of understanding. But during an exam they may need to produce the information without seeing it. This is where retrieval practice becomes useful. For example, after studying a short explanation, close the book and write down what you remember. Then reopen the book and check what was missing or inaccurate. The checking step matters because repeated mistakes can become familiar too. Another strategy is to space practice over several days rather than repeat the same exercise many times in one sitting. Spacing makes retrieval a little more demanding, but that demand can help strengthen memory. These techniques complement initial reading; they do not remove the need to understand the subject.",
    [
      [
        "What distinction does the lecturer make?",
        "Recognising material and recalling it independently.",
        "Reading printed books and digital books.",
        "Studying individually and studying in a classroom.",
        "Remembering numbers and remembering names."
      ],
      [
        "What example of retrieval practice is given?",
        "Closing a book and writing down remembered information.",
        "Copying every sentence while reading.",
        "Listening to an explanation repeatedly.",
        "Highlighting the entire chapter."
      ],
      [
        "Why is checking the recalled information important?",
        "It helps prevent repeated errors from becoming familiar.",
        "It removes the need for future revision.",
        "It ensures that all reading is unnecessary.",
        "It makes the material more difficult to recognise."
      ],
      [
        "What is the benefit of spacing practice?",
        "More demanding retrieval can strengthen memory.",
        "It guarantees that learners never forget anything.",
        "It avoids the need for feedback.",
        "It makes all practice sessions equally easy."
      ],
      [
        "What is the lecturer's attitude toward initial reading?",
        "It remains important alongside retrieval practice.",
        "It should be completely replaced by testing.",
        "It is only useful for advanced learners.",
        "It is less effective when material is understood."
      ]
    ]
  ],
  [
    "Listen to an Academic Talk",
    "Restoring rivers",
    "Many rivers have been straightened to move water quickly through agricultural or urban areas. Straight channels can be efficient for transport or drainage, but they often reduce the variety of habitats. A restoration project may reconnect the channel with part of its floodplain, allowing high flows to spread over a wider area. It might also create shallow gravel beds and deeper pools, which support organisms with different requirements. However, a project cannot be evaluated just by looking at its appearance immediately after construction. Sediment arriving from upstream may fill new pools, and changing water levels can affect newly planted vegetation. Researchers therefore monitor the site over several seasons. They compare physical conditions, water quality, and the presence of aquatic organisms. The aim is not necessarily to recreate an exact historical river, but to restore processes that can support a functioning ecosystem under present conditions.",
    [
      [
        "What is the main subject of the talk?",
        "How river restoration projects work and are evaluated.",
        "How to build transport canals.",
        "Why all rivers should be straightened.",
        "How to measure the age of rocks."
      ],
      [
        "What is a possible benefit of reconnecting a floodplain?",
        "High water can spread across a wider area.",
        "All sediment stops entering the river.",
        "The river becomes permanently dry.",
        "Water must travel more quickly through the channel."
      ],
      [
        "Why does the lecturer mention gravel beds and pools?",
        "They illustrate habitat variety for different organisms.",
        "They show why all river features should be removed.",
        "They prevent upstream sediment from moving.",
        "They replace the need for water quality monitoring."
      ],
      [
        "Why is long-term monitoring needed?",
        "Conditions can change after construction.",
        "Restoration sites look identical during all seasons.",
        "Researchers cannot inspect a newly constructed site.",
        "The original river must be recreated exactly."
      ],
      [
        "What is the ultimate restoration goal described?",
        "Support functioning ecological processes under current conditions.",
        "Preserve the channel's appearance without change.",
        "Remove all vegetation from the banks.",
        "Increase drainage speed regardless of ecology."
      ]
    ]
  ]
];
const form=0;
const items=listeningPracticeForms[form];
function addAudio(source){const audio='audio/exam-listening/1-'+(listeningExamAudio.length+1)+'.mp3';listeningExamAudio.push({audio,source});return audio;}
function push(type,source,audio,ask,choices,why,i){const answer=choices[0],options=choices.slice(),r=i%4;options.push(...options.splice(0,r));items.push({type,source,audio,ask,options,answer,why});}
responses.forEach(([source,options,why],i)=>push('Listen and Choose a Response',source,addAudio(source),'Choose the most appropriate response.',options,why,i));
groups.forEach(([type,title,source,questions])=>{const audio=addAudio(source);questions.forEach(([ask,...options],i)=>push(type,source,audio,ask,options,'Correct answer: '+options[0]+' Listen for the relevant detail in the recording.',items.length));});
})();
