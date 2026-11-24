/* Normalise first form to 17 responses, 10 conversation, 8 announcement, 12 academic items. */
(function(){
 const original=listeningPracticeForms[0], type='Listen and Choose a Response';
 const rows=[
 ["Could you confirm which entrance is open?","The courtyard entrance beside the bicycle racks.","The entrance closes at six.","The building is being renovated.","I entered the room yesterday."],
 ["Would you like me to send a copy to your supervisor?","Yes, please include her in the email.","The supervisor's office is upstairs.","I copied the document yesterday.","The email has three attachments."],
 ["Do you know how long the appointment will take?","About twenty minutes, including the initial questions.","It starts at three tomorrow.","The appointment is in room eight.","I booked a different appointment."],
 ["I don't think I've met your project partner.","Let me introduce you before we begin.","The project is due next month.","I met the lecturer yesterday.","We chose a different topic."],
 ["Can we rearrange the tables before the session?","Yes, let's put them in a semicircle.","The session lasts two hours.","The tables were delivered yesterday.","I arranged another meeting."]
 ];
 const extraConv=["Student: I printed my conference badge, but it shows the name of my previous department.\nAssistant: Your registration was created before you transferred. I can update the record and print a replacement badge now.\nStudent: Thank you. I need it before the opening session.",[
 ["Why does the student need help?","The badge shows an outdated department.","The registration was never submitted.","The opening session was cancelled.","The badge has been lost."],
 ["What will the assistant do?","Update the record and print a replacement.","Send the student to another conference.","Request a new registration fee.","Change the opening session time."]]];
 const extraAnn=["The campus lost-property office will be open on Saturday morning this month. Anyone collecting an item must describe it and provide identification. Items found after Friday afternoon will be processed on Monday rather than made available during the weekend.",[
 ["What is required to collect an item?","A description and identification.","A purchase receipt for every item.","A new campus card.","A written recommendation."],
 ["When will items found late on Friday be processed?","Monday.","Saturday morning.","Immediately on Friday night.","The following month."]]];
 let audioNo=22;
 function makeAudio(source){const audio='audio/exam-listening/1-'+(++audioNo)+'.mp3';listeningExamAudio.push({audio,source});return audio;}
 function makeItem(type,source,audio,ask,answer,wrong){const options=[answer,...wrong],rotation=audioNo%4;options.push(...options.splice(0,rotation));return {type,source,audio,ask,options,answer,why:'Correct answer: '+answer+'. Review the relevant part of the recording.'}}
 const responses=original.filter(x=>x.type===type);
 rows.forEach(([source,answer,...wrong])=>responses.push(makeItem(type,source,makeAudio(source),'Choose the most appropriate response.',answer,wrong)));
 function trimmed(t,n){const groups=new Map();for(const x of original.filter(x=>x.type===t)){if(!groups.has(x.audio))groups.set(x.audio,[]);groups.get(x.audio).push(x)}return [...groups.values()].flatMap(g=>g.slice(0,n));}
 function extra(t,[source,qs]){const audio=makeAudio(source);return qs.map(([ask,answer,...wrong])=>makeItem(t,source,audio,ask,answer,wrong));}
 const conv='Listen to a Conversation',ann='Listen to an Announcement',talk='Listen to an Academic Talk';
 listeningPracticeForms[0]=[...responses,...trimmed(conv,2),...extra(conv,extraConv),...trimmed(ann,2),...extra(ann,extraAnn),...trimmed(talk,4)];
 if(listeningPracticeForms[0].length!==47)throw Error('First Listening form is incomplete');
})();
attachListeningForms();
