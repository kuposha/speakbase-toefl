/* Original fixed-route writing practice. Open answers require self-review. */
const writingExamSources = [
  [
    "Library research",
    [
      "The librarian showed us where the archived newspapers were kept.",
      "Could you tell me whether this journal is available online?",
      "We have already requested the articles that you recommended.",
      "Neither of the computers in the reading room is working.",
      "The documents must be returned before the archive closes.",
      "I would have reserved a desk if I had known about the event.",
      "The catalogue contains fewer errors than it did last year.",
      "Although the book was old, its pages were in excellent condition.",
      "Please let me know when the revised schedule becomes available.",
      "What surprised me most was how quickly the staff found the record."
    ],
    "You reserved an archive appointment for Tuesday, but your research supervisor can only accompany you on Thursday. Write to the archivist. Explain the conflict, request a new appointment and ask whether your reserved materials can be held.",
    "Professor Ellis: Should university libraries prioritise digital access or continue investing in printed collections? Nina: Digital resources are easier to access from home. Omar: Printed books help me concentrate and some material is not digitised. Contribute your own position and supporting example."
  ],
  [
    "Campus transport",
    [
      "The shuttle leaves from the entrance opposite the sports centre.",
      "How long have you been waiting for the next bus?",
      "The driver asked us not to leave bags in the aisle.",
      "Several students would cycle if the campus had safer paths.",
      "The route was changed because the bridge was being repaired.",
      "By the time we arrived, the last train had already departed.",
      "It takes less time to walk than to wait for a taxi.",
      "Passengers whose cards have expired must renew them at reception.",
      "Not until the rain stopped did the group continue its journey.",
      "I am looking forward to trying the new express service."
    ],
    "The campus shuttle repeatedly arrives after your first class begins. Email the transport coordinator. Describe the problem, explain its effect on students and suggest a practical adjustment.",
    "Professor Reed: Should universities provide free public transport passes instead of building more parking? Maya: Passes could reduce congestion. Leo: Some commuters live far from transit routes. Add a reasoned contribution."
  ],
  [
    "Food and nutrition",
    [
      "The restaurant offers several dishes that contain no dairy products.",
      "We decided to cook at home rather than order another meal.",
      "She has been preparing lunches for the entire week.",
      "The vegetables should be washed before they are chopped.",
      "I wish I had checked the ingredients more carefully.",
      "There is not enough flour left to make another loaf.",
      "The recipe would be easier to follow with a few photographs.",
      "Having tasted the soup, he decided to add less salt.",
      "The more varied the menu is, the more people it can serve.",
      "Would you mind showing me how to use this kitchen scale?"
    ],
    "A catering service delivered meals that do not match the dietary information you submitted. Email the organiser. Explain what was wrong, request a replacement and ask how future orders can be corrected.",
    "Professor Diaz: Should colleges offer subsidised healthy meals? Ava: Affordable meals help students on tight budgets. Ben: Subsidies might limit other services. Contribute your perspective."
  ],
  [
    "Environment",
    [
      "The volunteers collected litter along the banks of the river.",
      "If everyone brought a reusable bottle, less plastic would be wasted.",
      "Researchers are measuring how much water the new garden saves.",
      "The seedlings were damaged by an unusually cold night.",
      "We ought to replace the broken containers before the next collection.",
      "The park has become considerably quieter since the road was closed.",
      "People who visit the reserve are asked to stay on marked paths.",
      "Only after reviewing the data did the team revise its conclusion.",
      "The amount of waste produced this month was lower than expected.",
      "I suggested that the committee organise another repair workshop."
    ],
    "Your community garden's recycling bins have disappeared during renovation. Email the project manager. Explain why they are needed, suggest a temporary arrangement and ask when permanent bins will return.",
    "Professor Park: Should cities invest in public gardens or focus on improving existing parks? Ana: New gardens provide local opportunities. Sam: Maintaining parks benefits many residents. Share your view."
  ],
  [
    "Technology",
    [
      "The application will notify you when a new update is ready.",
      "I cannot remember which password I used for this account.",
      "The files were being transferred when the connection failed.",
      "You should back up your work before installing the software.",
      "If the battery had been charged, the device would have started.",
      "The team has fixed most of the problems reported by users.",
      "The equipment is designed to be repaired rather than replaced.",
      "The website that we built loads more quickly on mobile devices.",
      "Rarely have I seen an interface that is so easy to use.",
      "We are trying to find out why the service keeps restarting."
    ],
    "You cannot access an online course because its password reset page fails. Email the technical support team. Describe the error, explain the urgency and ask for a secure way to regain access.",
    "Professor Chen: Should students be allowed to use AI tools when drafting coursework? Lina: They can support revision. Tom: Excessive reliance can weaken independent thinking. Discuss how universities should approach the issue."
  ],
  [
    "Work and careers",
    [
      "The company is looking for someone who can manage small projects.",
      "I have been working here since the beginning of September.",
      "The interview would have gone better if I had prepared more examples.",
      "She was offered a position in a different department.",
      "Could you explain what the training programme involves?",
      "The supervisor encouraged us to ask questions during the meeting.",
      "The report needs to be finished by the end of the day.",
      "We were not told that the office would be closed on Friday.",
      "What matters most is whether the applicant can learn quickly.",
      "Despite having little experience, he completed the task successfully."
    ],
    "Your internship supervisor has scheduled two training sessions that conflict with your college timetable. Email them, explain the overlap, propose alternatives and express your interest in attending.",
    "Professor Morgan: Should students work part-time during their studies? Alex: Employment builds practical skills. Mia: Work may reduce study time. Add a balanced argument."
  ],
  [
    "Health and activity",
    [
      "The instructor recommended that beginners start with lighter weights.",
      "I have not been sleeping as well as I usually do.",
      "The new walking route is shorter than the one we used before.",
      "You should stop exercising if you feel unusually dizzy.",
      "The sports hall will be closed while the floor is being replaced.",
      "My friend asked whether I wanted to join the swimming club.",
      "If the weather improves, we will train outside tomorrow.",
      "The class was cancelled because the instructor had fallen ill.",
      "Regular breaks make it easier to concentrate for long periods.",
      "It is important to choose a routine that fits your schedule."
    ],
    "You booked a beginner exercise class, but the confirmation lists an advanced session. Email the fitness centre. Explain the mistake, ask to transfer to the correct group and confirm whether your payment can be used.",
    "Professor Allen: Should universities require students to take a physical education course? Erin: It encourages activity. Kai: Mandatory classes may not suit every student's needs. Explain your position."
  ],
  [
    "Travel",
    [
      "The hotel confirmed that our room would be ready by noon.",
      "We had been travelling for six hours before we stopped for lunch.",
      "Could you tell me where the luggage storage area is?",
      "The tickets can be exchanged if the request is made in advance.",
      "I would rather take a direct flight than change planes twice.",
      "The guide advised us to carry a copy of the booking confirmation.",
      "By next Friday, they will have visited three different cities.",
      "The museum was more crowded than we had anticipated.",
      "It was the unexpected delay that caused us to miss the tour.",
      "Having checked the departure board, we went to the correct gate."
    ],
    "You booked a guided city tour, but the organiser changed the departure time without notifying you. Email the company. Describe the missed tour, ask for an alternative and request confirmation of the new arrangements.",
    "Professor Brooks: Is independent travel more educational than organised tours? Josh: Travelling alone requires problem-solving. Sara: Guides provide historical context. Contribute a supported view."
  ],
  [
    "Science education",
    [
      "The experiment was repeated to check whether the result was reliable.",
      "The students are learning how to interpret the measurements.",
      "If we change two variables at once, the results may be misleading.",
      "All samples must be labelled before they are placed in storage.",
      "The researcher explained why the original hypothesis had been rejected.",
      "There were fewer participants in the second trial than expected.",
      "The equipment should have been calibrated before the first measurement.",
      "What we observed was consistent with the earlier prediction.",
      "Only when the experiment ended were the results compared.",
      "The findings suggest that additional research may be necessary."
    ],
    "You missed a laboratory demonstration because the timetable was updated after you checked it. Email your instructor. Explain the situation, ask how to catch up and suggest a way to receive future updates.",
    "Professor Singh: Should universities devote more introductory science time to experiments rather than lectures? Eva: Experiments make concepts tangible. Ryan: Lectures establish essential theory. Offer your view."
  ],
  [
    "Art and culture",
    [
      "The exhibition includes paintings that have never been shown publicly.",
      "The artist has been working on the sculpture for several months.",
      "We were asked not to touch the objects on display.",
      "I would have enjoyed the performance more if the seats had been better.",
      "The gallery is expected to reopen at the beginning of spring.",
      "The film was not nearly as predictable as I had imagined.",
      "Could you recommend a book about the history of this building?",
      "The curator explained how the collection had been assembled.",
      "Although the tickets were expensive, the concert was worth attending.",
      "It was the lighting that made the installation particularly effective."
    ],
    "Your student art group has been assigned a small exhibition area that cannot accommodate its planned works. Email the gallery coordinator. Explain the issue, propose an alternative layout and request a meeting.",
    "Professor James: Should museums make their collections available online for free? Rose: It expands access. Daniel: Digital displays require funding and maintenance. Develop your own argument."
  ],
  [
    "Community projects",
    [
      "The organisers have invited residents to attend a planning meeting.",
      "We need to decide how the remaining funds should be spent.",
      "Anyone who wants to volunteer can complete the form online.",
      "The hall would be available if the previous event were cancelled.",
      "Several neighbours complained that they had not received the notice.",
      "The committee has been discussing the proposal since last month.",
      "The equipment must not be left outside overnight.",
      "By sharing resources, the groups were able to reduce their costs.",
      "What began as a small project eventually attracted dozens of volunteers.",
      "I would appreciate it if you could send me the updated list."
    ],
    "You volunteered for a community repair event, but the organiser assigned you a task you have not been trained to do. Email them, describe your concern, offer a suitable alternative and ask about training.",
    "Professor Patel: Should local governments fund volunteer-led projects? Finn: Volunteers understand local needs. June: Public funds need consistent accountability. Contribute your reasoning."
  ],
  [
    "Housing",
    [
      "The apartment that we viewed yesterday is close to the station.",
      "The heating had stopped working before the technician arrived.",
      "Residents are expected to keep the shared entrance clear.",
      "We would prefer a room with enough space for two desks.",
      "I asked the landlord whether the rent included electricity.",
      "The furniture will be delivered as soon as the payment is confirmed.",
      "If the window were properly sealed, the room would be warmer.",
      "The building has been inspected twice since the renovation began.",
      "There is little point in replacing the lock without notifying the residents.",
      "The sooner the leak is repaired, the less damage it will cause."
    ],
    "The heating in your student accommodation has been unreliable for several days. Email the accommodation office. Describe the problem, explain its effect and request a repair appointment.",
    "Professor Wilson: Should student residences offer more shared facilities or more private space? Julia: Shared areas encourage friendships. Mark: Private space helps students rest and study. Add your position."
  ],
  [
    "Academic writing",
    [
      "The introduction should explain why the research question is important.",
      "I have not yet decided which argument to develop first.",
      "The sources cited in the paper must be listed accurately.",
      "The tutor suggested that I remove the unnecessary repetition.",
      "Having read the feedback, I rewrote the final paragraph.",
      "The conclusion was clearer than the one in my first draft.",
      "If the evidence were stronger, the claim would be more convincing.",
      "We were advised to distinguish observations from interpretations.",
      "What the author means by this term is not entirely clear.",
      "The essay would have been stronger if it had included a counterargument."
    ],
    "You received feedback on an essay but cannot understand two comments. Email your instructor. Identify the confusing points, describe what you have tried and request a short meeting or clarification.",
    "Professor Grant: Should first-year courses emphasise writing across all subjects or leave writing instruction to specialised classes? Alice: Subject-specific practice helps. Noah: Specialists can teach transferable techniques. Explain your view."
  ],
  [
    "Weather",
    [
      "The outdoor event will take place unless the weather becomes dangerous.",
      "The forecast predicted that temperatures would fall during the night.",
      "We have been experiencing unusually strong winds this week.",
      "The paths were slippery because the rain had turned to ice.",
      "Had we checked the forecast, we would have brought waterproof coats.",
      "The organisers are considering whether to postpone the competition.",
      "There was less snow in the mountains than the report had suggested.",
      "The storm caused the electricity supply to be interrupted.",
      "It is unlikely that the fog will clear before sunrise.",
      "The students waited indoors until it was safe to leave."
    ],
    "A field trip was cancelled due to severe weather, but you already paid for transport. Email the trip coordinator. Ask about rescheduling, the payment and how students will receive updates.",
    "Professor Foster: Should universities cancel classes more readily during severe weather? Ella: Safety should come first. Adam: Frequent cancellations disrupt learning. Explain how you would balance these concerns."
  ],
  [
    "Money and planning",
    [
      "The total cost was higher than we had originally estimated.",
      "We have saved enough money to replace the broken printer.",
      "The students were asked to submit their expense forms by Monday.",
      "If we bought the materials in bulk, we could reduce the cost.",
      "The refund should appear in your account within five working days.",
      "I would like to know whether the price includes delivery.",
      "The committee has approved the revised budget for the next semester.",
      "Not all of the equipment purchased last year is still in use.",
      "The project cannot begin until the necessary funding has been secured.",
      "We decided against buying the more expensive model."
    ],
    "A student organisation charged you twice for the same event. Email its treasurer. Explain what you noticed, mention the evidence you can provide and ask for a refund timeline.",
    "Professor Wright: Should colleges teach personal budgeting as part of orientation? Lily: Financial literacy supports independence. Eric: Students have different needs and schedules. Contribute a reasoned opinion."
  ],
  [
    "Communication",
    [
      "The speaker asked us to write down our questions before the discussion.",
      "I am not sure whether my previous message reached the organiser.",
      "The instructions could have been explained more clearly.",
      "She has become much more confident since joining the debate club.",
      "We agreed to meet again once everyone had reviewed the proposal.",
      "Would you mind repeating the last part of your explanation?",
      "The announcement was sent to everyone who had registered.",
      "If the message had included a date, we would not have been confused.",
      "What made the presentation effective was the use of concrete examples.",
      "The more carefully you listen, the easier it becomes to respond."
    ],
    "Your group received conflicting instructions about a presentation deadline. Email the course coordinator. Explain the discrepancy, ask for the correct deadline and request that the entire group be notified.",
    "Professor Hall: Should group projects assess communication skills separately from the final product? Zoe: Communication shapes teamwork. Max: Assessment can become subjective. State and support your position."
  ],
  [
    "Research ethics",
    [
      "Participants must understand how their personal information will be used.",
      "The survey was designed to collect answers without identifying respondents.",
      "The team decided not to publish the photographs without permission.",
      "Had the consent form been clearer, fewer questions would have arisen.",
      "The results should be reported even when they contradict expectations.",
      "Researchers who collect sensitive data need appropriate safeguards.",
      "The information will be deleted once the analysis has been completed.",
      "We asked whether the interviews could be recorded anonymously.",
      "It is essential that participants be allowed to withdraw voluntarily.",
      "The study was revised after the reviewers raised ethical concerns."
    ],
    "You received a survey invitation that does not explain how your responses will be stored. Email the research coordinator. Ask about anonymity, data retention and your ability to withdraw.",
    "Professor Ahmed: Should universities require students to complete a research ethics module before collecting any participant data? Rita: It prevents avoidable mistakes. Luke: Requirements should reflect the level of risk. Contribute your view."
  ],
  [
    "Education",
    [
      "The course is designed for students who have never studied economics.",
      "I have been trying to improve my pronunciation through daily practice.",
      "The assignments should be submitted before the platform closes.",
      "The lesson would have been easier if we had reviewed the vocabulary first.",
      "Our teacher explained how the final grade would be calculated.",
      "There are fewer students in the evening group than in the morning group.",
      "The resources that you recommended have been particularly useful.",
      "Only after completing the exercise did I understand the rule.",
      "We would like to know whether the sessions will be recorded.",
      "Students are encouraged to revise the areas they find most difficult."
    ],
    "A class you enrolled in has changed from an evening to a morning schedule. Email the academic office. Explain your conflict, ask about another group and request confirmation of whether your registration can be transferred.",
    "Professor Scott: Should students be allowed to choose more elective courses in their first year? Helen: Choice increases motivation. Jack: A common foundation can prevent gaps. Add your perspective."
  ],
  [
    "Engineering design",
    [
      "The prototype was tested under several different operating conditions.",
      "The engineers are trying to determine why the component failed.",
      "If the material were lighter, the device would be easier to carry.",
      "The safety checks must be completed before the machine is switched on.",
      "We have already replaced the parts that were damaged during transport.",
      "The report explains how the design could be improved.",
      "The new model consumes less energy than its predecessor.",
      "Had the measurements been more accurate, the assembly would have fitted.",
      "The team is considering whether to change the shape of the housing.",
      "What matters is that the final device performs reliably."
    ],
    "You discovered that the materials ordered for your engineering project do not match the specification. Email the workshop manager. Describe the mismatch, explain the effect on testing and ask how replacements can be arranged.",
    "Professor Lee: Should engineering courses focus on physical prototypes or computer simulations? Nina: Building reveals practical constraints. Victor: Simulations enable rapid iteration. Contribute a supported argument."
  ],
  [
    "Events",
    [
      "The organisers have arranged for extra seating near the entrance.",
      "Guests who arrive after the performance begins must wait outside.",
      "The venue would have been too small without the additional room.",
      "I asked whether the registration fee included lunch.",
      "The speakers were informed that the schedule had been changed.",
      "The final programme will be available as soon as it is approved.",
      "There were not enough microphones for all the panel members.",
      "Having completed the registration, we collected our name badges.",
      "It was the unexpected number of visitors that caused the delay.",
      "We look forward to welcoming everyone to the conference."
    ],
    "You registered as a volunteer for an academic conference but have not received your assignment. Email the organiser. Mention your availability, ask what your duties will be and request arrival instructions.",
    "Professor Young: Should universities host more public academic events? Carla: They connect research with communities. Peter: Organising them requires staff time and funding. Offer your opinion."
  ],
  [
    "Personal organisation",
    [
      "I have been using a calendar to keep track of my deadlines.",
      "The tasks that take the longest should be scheduled first.",
      "If I had checked my timetable, I would not have missed the meeting.",
      "The notes need to be organised before we begin revising.",
      "She suggested setting aside time for unexpected problems.",
      "We are trying to find a routine that suits everyone.",
      "The appointment was moved because the original time was inconvenient.",
      "It is easier to concentrate when unnecessary notifications are disabled.",
      "What I find most difficult is estimating how long tasks will take.",
      "The earlier we start, the more time we will have to revise."
    ],
    "Your project team needs a shared timetable, but several members cannot access the current scheduling tool. Email the team leader. Describe the accessibility issue, propose a replacement and suggest a deadline for confirming availability.",
    "Professor Green: Should students be taught time management explicitly during their first semester? Rosa: Planning reduces stress. Ian: Students should develop individual methods. Add your view."
  ],
  [
    "Digital media",
    [
      "The video was edited to remove sections that repeated earlier points.",
      "The photographer asked us not to share the unapproved images.",
      "I have been following the podcast since its first episode.",
      "The file would be smaller if the resolution were reduced.",
      "Could you explain why the captions are missing from this recording?",
      "The report was published before all the figures had been checked.",
      "The website allows visitors to adjust the size of the text.",
      "Not until I watched the recording did I notice the missing detail.",
      "We should verify the source before sharing the article.",
      "The clearer the audio is, the easier it is to follow the discussion."
    ],
    "A lecture recording is missing captions and has distorted audio. Email the media support team. Describe the problem, explain why access matters and request a corrected version or transcript.",
    "Professor King: Should universities record every lecture? Bea: Recordings improve accessibility. Chris: Some students may skip live sessions. Discuss how recordings could be used responsibly."
  ],
  [
    "Relationships and teamwork",
    [
      "The group has agreed to divide the work according to individual strengths.",
      "We need to make sure that everyone understands the final decision.",
      "The disagreement could have been resolved with clearer communication.",
      "My colleague offered to help when she realised I was falling behind.",
      "If we had discussed the problem earlier, we might have avoided the delay.",
      "The person responsible for the design was absent from the meeting.",
      "Everyone was encouraged to contribute before the vote was taken.",
      "Although the deadline was close, the team remained well organised.",
      "What helped the group most was agreeing on specific responsibilities.",
      "I appreciate being given enough time to explain my point of view."
    ],
    "Two members of your project group have completed the same task while another task remains unfinished. Email the group leader. Explain the duplication, propose a redistribution of work and ask for a revised task list.",
    "Professor Stone: Should students choose their own project groups or be assigned to mixed groups? Fiona: Friends may communicate more easily. Raj: Mixed groups expose students to different working styles. Contribute your own position."
  ],
  [
    "Future plans",
    [
      "I hope to have completed the application by the end of this month.",
      "The university offers a programme that matches my interests.",
      "If I were accepted, I would need to arrange accommodation.",
      "The documents must be translated before they can be submitted.",
      "I have been researching scholarship opportunities for several weeks.",
      "Could you tell me when the next application period begins?",
      "The interview was scheduled after the admissions team had reviewed my file.",
      "The course would allow me to develop both theoretical and practical skills.",
      "What concerns me most is whether the qualification will be recognised.",
      "By this time next year, I will have made a decision about my studies."
    ],
    "You plan to apply for a university programme but the admissions page gives unclear information about a required document. Email the admissions office. Describe your situation, ask for clarification and request the relevant deadline.",
    "Professor Martin: Should students choose a degree primarily for career prospects or personal interest? Iris: Employment opportunities matter. Dan: Interest sustains motivation and learning. Add a reasoned contribution."
  ]
];
const writingPracticeForms = writingExamSources.map(([topic,sentences,email,discussion],form)=>{
  const questions = sentences.map((answer,i)=>{
    const words=answer.replace(/[.!?]$/,'').split(' '), order=words.map((word,index)=>({word,index}));
    let seed=(form+1)*937+(i+1)*37;
    for(let j=order.length-1;j>0;j--){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const k=seed%(j+1);[order[j],order[k]]=[order[k],order[j]];}
    if(order.every((x,j)=>x.index===j))order.reverse();
    const tokens=order.map(x=>x.word);
    return {type:'Build a Sentence',source:'Topic: '+topic,ask:'Arrange the words into a grammatical sentence.',tokens,answer,why:'Model sentence: '+answer+'. Check subject–verb agreement, word order and clause structure.'};
  });
  questions.push({type:'Write an Email',source:email,ask:'Write your email. Address all requested points and use an appropriate tone.',why:'Self-review: clear purpose, appropriate greeting and closing, all requested details, logical organisation, accurate grammar and tone.'});
  questions.push({type:'Write for an Academic Discussion',source:discussion,ask:'Write a contribution to the discussion. Explain your position and support it with a specific reason or example.',why:'Self-review: relevant position, developed reasoning, specific support, connection to the discussion, coherent and accurate language.'});
  return questions;
});
