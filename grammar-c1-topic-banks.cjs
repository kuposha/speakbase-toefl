const q=(prompt,answer,wrong1,wrong2,why,wrong1Why,wrong2Why)=>[prompt,answer,wrong1,wrong2,why,wrong1Why,wrong2Why];
module.exports = {
"C1-01":{base:"inversion",skillTarget:"negative-inversion-advanced",profile:{
label:"negative inversion and advanced inversion",
core:"Negative inversion places an auxiliary before the subject after a fronted negative or restrictive expression. It creates formal emphasis and requires accurate auxiliary selection.",
form:"Never/Rarely/Seldom + auxiliary + subject + main verb. No sooner/Hardly + had + subject + V3 + than/when. Not until/Only after + clause/time phrase + did + subject + base verb.",
selection:"Определи negative/restrictive trigger и время clause. Затем перенеси auxiliary перед subject; если в Past Simple нет auxiliary, используй did + base verb.",
contrast:"We had never seen this → Never had we seen this. They understood only later → Only later did they understand.",
boundary:"Inversion is triggered only by specific fronted expressions; ordinary initial adverbials do not always require it. Preserve tense and do not add two auxiliaries.",
skillTarget:"negative-inversion-advanced"
},drills:[
q("Never ___ such a comprehensive dataset.","have we collected","we have collected","did we have collected","Never in initial position triggers inversion: have + subject + V3.","We have collected uses normal statement order.","Did we have collected stacks auxiliaries and has the wrong participle pattern."),
q("No sooner ___ the meeting begun than the fire alarm sounded.","had","did","has","No sooner is followed by inversion with had + subject + V3.","Did would require a base verb and a different temporal pattern.","Has changes the time reference and is not the required Past Perfect auxiliary."),
q("Hardly ___ the report when the editor requested revisions.","had they submitted","they had submitted","did they submitted","Hardly at the beginning triggers Past Perfect inversion: had + subject + V3.","They had submitted is normal statement order, not inversion.","Did they submitted combines did with a past form."),
q("Not until the final stage ___ the scale of the risk.","did the team recognise","the team recognised","had the team recognised yesterday","Not until triggers inversion; Past Simple uses did + subject + base verb.","The team recognised lacks inversion.","Had the team recognised uses a different tense and the adverbial already marks the past threshold."),
q("Under no circumstances ___ confidential records be disclosed.","should","they should","do should","Under no circumstances triggers modal inversion: should + subject.","They should keeps statement order.","Do should stacks do-support with a modal."),
q("Only after the data had been verified ___ the findings.","were the findings released","the findings were released","did the findings released","Only after at the beginning triggers inversion in the main clause.","The findings were released has no inversion.","Did the findings released uses did with an incorrect past form and does not fit passive voice."),
q("Seldom ___ a proposal of this scope been accepted so quickly.","has","have","is","The subject a proposal is singular; inversion places has before it.","Have does not agree with singular proposal.","Is cannot be followed by been accepted in this perfect passive pattern.")
]},
"C1-02":{base:"conditional",skillTarget:"inverted-and-ellipted-conditionals",profile:{
label:"inverted and ellipted conditionals",
core:"Formal conditional inversion removes if and places had, were or should before the subject. It preserves the conditional meaning while creating a more formal, concise register.",
form:"Had + subject + V3 = If subject had V3. Were + subject + (to-infinitive/adjective/noun) = If subject were… . Should + subject + base verb = If subject should… .",
selection:"Определи тип условия и время. Past unreal → Had + subject + V3; hypothetical present/future → Were + subject…; remote/contingent possibility → Should + subject + base verb.",
contrast:"Had we known, we would have acted. Were the proposal accepted, funding would follow. Should you require assistance, contact the office.",
boundary:"Do not use do-support after the inverted auxiliary. Inversion is formal; it does not change the underlying conditional time or result clause.",
skillTarget:"inverted-and-ellipted-conditionals"
},drills:[
q("___ the committee known about the conflict, it would have postponed the vote.","Had","Were","Should","Had + subject + V3 is the formal inversion of if + Past Perfect.","Were introduces a hypothetical present/future condition, not past perfect.","Should expresses a contingent possibility rather than an unreal past condition."),
q("___ the proposal to be approved, the project would begin in June.","Were","Had","Should","Were + subject + to-infinitive forms an inverted hypothetical condition.","Had requires a past participle and refers to an unreal past.","Should introduces a possible event, not the hypothetical were-to construction."),
q("___ any further information be required, please contact the registrar.","Should","Had","Were","Should + subject + base verb is a formal contingent condition equivalent to if it should be required.","Had would require V3 and a past unreal condition.","Were would need a different predicate structure."),
q("___ it not been for the external funding, the study would have ended early.","Had","Were","Should","Had it not been for expresses an unreal past condition.","Were it not for expresses a present counterfactual condition, not a past one.","Should it not be is a different contingent construction and does not match been for."),
q("___ it not for the revised methodology, the results would be unreliable.","Were","Had","Should","Were it not for expresses a hypothetical present condition.","Had requires a past participle and refers to the past.","Should does not form this present counterfactual phrase."),
q("___ the reviewers raised an objection, the editor would reconsider the decision.","Should","Had","Were","Should + subject + base verb introduces a remote possible condition.","Had raised would be past perfect and imply an unreal past condition.","Were raised would be passive/subjunctive and change the structure."),
q("Had the warning been issued earlier, fewer participants ___ affected.","would have been","would be now","will be","The result clause refers to an unreal past outcome: would have been + V3.","Would be now is present result; no present time point is given.","Will be is a real future form.")
]},
"C1-03":{base:"cleft",skillTarget:"advanced-cleft-fronting-emphasis",profile:{
label:"advanced cleft clauses, fronting and emphasis",
core:"Advanced cleft and fronting structures manipulate information flow: they distinguish presupposed background from a focused element, correct a prior assumption and foreground a clause or phrase.",
form:"It-cleft: It was not X but Y that… . Wh-cleft: What matters/concerns/needs emphasis is… . All-cleft: All that was required was… . Emphatic do: subject + do/does/did + base verb.",
selection:"Определи, какой элемент противопоставляется или выносится в фокус. Выбери it-cleft для focused constituent, wh-cleft для focus as clause complement, and emphatic do for contrastive verb emphasis.",
contrast:"It was not the cost but the delay that caused the problem. What the results demonstrate is a strong interaction. The team did identify the source.",
boundary:"Clefts and emphatic do are marked information structures, not decorative alternatives. Maintain agreement, relative marker and parallelism in coordinated focus.",
skillTarget:"advanced-cleft-fronting-emphasis"
},drills:[
q("It was not the initial sample but the second trial ___ exposed the flaw.","that","where","what","That introduces the cleft clause focused on the second trial.","Where refers to place, not the focused subject.","What does not introduce this it-cleft structure."),
q("What the committee objected to ___ the lack of transparency.","was","were","did","The wh-cleft clause is treated as a singular subject in this construction; was links it to the focus.","Were incorrectly uses plural agreement with lack.","Did cannot function as the linking verb here."),
q("All that the review established ___ that the data were incomplete.","was","were","has","All that… forms a singular focus clause in this sentence; was introduces its complement.","Were mismatches the singular all-clause focus.","Has does not link the clause to a that-complement in this pattern."),
q("The team ___ identify the source of the discrepancy, despite the initial difficulty.","did","does","was","Did provides emphatic past simple auxiliary before the base verb identify.","Does is present tense and does not match the past context.","Was cannot directly precede the base verb identify."),
q("It was the timing, rather than the cost, ___ ultimately determined the outcome.","that","who","where","That introduces the cleft clause focusing timing.","Who is used for people.","Where refers to place."),
q("What is particularly important ___ whether the control group was comparable.","is","are","do","The wh-cleft subject is singular in this construction and takes is.","Are incorrectly treats the clause as plural.","Do is not a linking verb and cannot introduce the complement."),
q("The researchers ___ acknowledge the limitations in the final paper.","did","were","have to did","Did is used for emphatic past simple + base verb acknowledge.","Were does not form an emphatic active past verb phrase here.","Have to did stacks auxiliaries and has an incorrect verb form.")
]},

"C1-04":{base:"participle",skillTarget:"advanced-non-finite-clauses",profile:{
label:"advanced non-finite clauses",
core:"Advanced non-finite clauses compress complex relations of time, cause, concession and condition. Perfect and passive participles distinguish anteriority and voice; absolute constructions may have their own explicit subject.",
form:"Having + V3 (prior active); having been + V3 (prior passive); being + adjective/V3; given/considering/provided + noun phrase/clause; noun phrase + participle (absolute construction).",
selection:"Восстанови полную finite clause и определи временное отношение и voice. Проверь, у кого есть собственный subject, и не допускай dangling modifier.",
contrast:"Having completed the analysis, the team published the report (team completed). Having been reviewed, the report was published (report was reviewed). The data having been verified, the panel approved the model (absolute clause).",
boundary:"Non-finite clauses can be concise but syntactically dense. Use explicit finite clauses when the subject or temporal relation could be misread; commas alone do not repair a dangling modifier.",
skillTarget:"advanced-non-finite-clauses"
},drills:[
q("___ subjected to repeated testing, the material showed no structural change.","Having been","Having","Being have","Having been + V3 marks an earlier passive process.","Having + V3 is active; the material receives testing.","Being have is not a grammatical non-finite pattern."),
q("The evidence ___, the committee approved the recommendation.","having been reviewed","having reviewed","reviewing it","The absolute construction has the evidence as its own subject; passive perfect participle shows it was reviewed first.","Having reviewed would mean the evidence performed the review.","Reviewing it introduces an object and changes the subject relationship."),
q("___ the limitations of the dataset, the authors avoided broad claims.","Recognising","Recognised","To recognising","Recognising is an active participle clause with the authors as understood subject.","Recognised would be passive and leave the logical subject unclear.","To recognising incorrectly combines infinitive marker and gerund."),
q("The proposal, ___ in the previous section, is evaluated below.","outlined","outlining","outline","Outlined is a passive participle modifying proposal.","Outlining implies the proposal performs the outlining.","Outline is a base verb and cannot reduce the relative clause."),
q("___ the available resources, the team postponed the second phase.","Given","Giving","Having give","Given + noun phrase introduces a condition/consideration.","Giving would mean the team is giving resources, changing the meaning.","Having give is an incorrect perfect participle form."),
q("The samples having been labelled, the technician ___ them in cold storage.","placed","placing","was placed","The absolute clause establishes prior completion; the main clause requires finite Past Simple placed.","Placing is non-finite and leaves no finite main verb.","Was placed makes technician the recipient of placement, changing the intended active subject."),
q("___ sufficient evidence, the authors would not have reached the same conclusion.","Without","Having","Being","Without + noun phrase introduces a counterfactual condition.","Having would require an object/participle clause and does not express absence.","Being cannot directly introduce the noun phrase sufficient evidence in this structure.")
]},
"C1-05":{base:"nominalisation",skillTarget:"advanced-nominalisation-abstract-noun-phrases",profile:{
label:"nominalisation and abstract noun phrases",
core:"Advanced nominalisation packages propositions into abstract noun phrases, allowing complex academic information to become the subject or object of another clause. It often combines derived nouns with dense pre- and postmodification.",
form:"Determiner + evaluative/degree modifier + derived noun + of-phrase/that-clause. Nominalisation may require article, countability and agreement changes. Verb/adjective → abstract noun (assess → assessment; valid → validity).",
selection:"Найди исходное proposition и выбери noun that preserves its meaning. Затем проверь countability, article, modifiers, possessive and preposition patterns. Не теряй агента и логическую связь.",
contrast:"Researchers assessed the validity of the model → the assessment of the model's validity. The policy was implemented rapidly → the rapid implementation of the policy.",
boundary:"Nominalisation can create excessive abstraction and obscure responsibility. Do not convert every verb; retain finite clauses when agency, sequence or causation needs to remain explicit.",
skillTarget:"advanced-nominalisation-abstract-noun-phrases"
},drills:[
q("The ___ of the proposal remains uncertain.","feasibility","feasible","feasibly","Feasibility is the abstract noun required after the article and of-phrase.","Feasible is an adjective.","Feasibly is an adverb."),
q("The rapid ___ of the regulation caused confusion.","implementation","implement","implementative","Implementation is the noun form naming the process.","Implement is a verb.","Implementative is not the standard noun form."),
q("The authors questioned the ___ of the measurements.","reliability","reliable","reliably","Reliability is the abstract noun derived from reliable.","Reliable is an adjective.","Reliably is an adverb."),
q("The committee's ___ of the evidence was thorough.","evaluation","evaluate","evaluative","Evaluation is the noun form of evaluate.","Evaluate is a verb.","Evaluative is an adjective."),
q("The unexpected ___ in demand placed pressure on suppliers.","fluctuation","fluctuate","fluctuating","Fluctuation is the noun naming a change or variation.","Fluctuate is the verb form.","Fluctuating is a participle/adjective, not the head noun."),
q("The policy was revised because it was ineffective. → The revision addressed its ___.","ineffectiveness","ineffective","ineffectively","Ineffectiveness is the abstract noun that names the quality/problem.","Ineffective is an adjective.","Ineffectively is an adverb."),
q("The ___ of the findings depends on the sampling method.","generalisability","generalisable","generalisably","Generalisability is the abstract noun naming the capacity for generalisation.","Generalisable is an adjective.","Generalisably is not a standard adverb form.")
]},
"C1-06":{base:"preposition",skillTarget:"complex-noun-phrases-prepositions-c1",profile:{
label:"complex noun phrases and prepositions",
core:"Complex academic noun phrases combine premodifiers, head nouns and postmodifying prepositional phrases. Preposition choice is often collocational and determines the semantic relation between noun and complement.",
form:"Premodifier(s) + head noun + postmodifier: evidence for the hypothesis; an account of the process; the implications of X for Y; a response to the criticism; the distinction between A and B.",
selection:"Определи head noun and its semantic relation to the complement: source, target, evidence, cause, response, distinction. Select the conventional preposition attached to the head.",
contrast:"Evidence for a claim; an explanation of a result; a response to criticism; implications for policy; distinction between two variables.",
boundary:"Prepositional patterns are lexical and may differ across related nouns (explanation of, reason for, response to). Avoid translating the Russian preposition literally.",
skillTarget:"complex-noun-phrases-prepositions-c1"
},drills:[
q("The authors provide an explanation ___ the discrepancy.","for","of","to","Explanation for introduces the phenomenon being explained.","Explanation of is also possible when the following noun is the content of an explanation, but here the intended relation is the cause/target of explanation; use for.","To is not the standard complement for explanation in this meaning."),
q("The implications ___ this finding for public policy are significant.","of","for","to","Implications of identifies the source/finding being interpreted.","For introduces the affected domain (public policy), not the source.","To is not the standard noun complement here."),
q("The study offers a response ___ earlier criticism.","to","of","for","Response to is the standard collocation.","Of does not introduce the object being responded to.","For does not form the usual response + target pattern."),
q("There is a clear distinction ___ correlation and causation.","between","among","of","Distinction between is used for two contrasted concepts.","Among is normally used for a group/set rather than a two-way distinction.","Of is not the required complement after distinction."),
q("The reliability ___ the measurement process was questioned.","of","for","with","Reliability of identifies the thing whose reliability is assessed.","For would express purpose/beneficiary, not the object being evaluated.","With is not the standard complement."),
q("The evidence ___ the proposed mechanism remains limited.","for","of","to","Evidence for identifies the claim or mechanism being supported.","Of usually identifies the source/nature of evidence; the mechanism is the claim supported.","To is not the standard collocation."),
q("The researchers discuss the relationship ___ language exposure and reading speed.","between","of","for","Relationship between links two variables.","Of would require a different noun phrase structure and does not mark the two entities symmetrically.","For does not express the relation between these two variables.")
]},

"C1-07":{base:"passive",skillTarget:"advanced-passive-impersonal-causative",profile:{
label:"advanced passive, impersonal and causative structures",
core:"Advanced passive structures include impersonal reporting, have/get causatives and complex tense/modal combinations. The choice determines whether the agent, affected object or reported proposition is foregrounded.",
form:"It is said/believed/estimated that + clause. Subject + is said/believed/estimated + to-infinitive/to have + V3. Have/get + object + V3 (causative). Modal perfect passive: modal + have been + V3.",
selection:"Определи: reporting an opinion, arranging a service, or evaluating a past passive event. Select the appropriate reporting or causative pattern and maintain the correct time relationship.",
contrast:"It is believed that the drug is effective. The drug is believed to be effective. The drug is believed to have been tested. She had the device repaired.",
boundary:"Impersonal passive does not prove the reported claim. Get-passive may be more informal or eventive. Do not confuse have someone do with have something done.",
skillTarget:"advanced-passive-impersonal-causative"
},drills:[
q("The new treatment is believed ___ effective in early trials.","to be","to have be","that it is","Subject + be believed + to-infinitive is the impersonal passive pattern.","To have be is not a grammatical perfect infinitive; it needs been.","That it is cannot follow the subject + passive reporting pattern."),
q("The ancient manuscript is thought ___ in the fifteenth century.","to have been written","to be wrote","that was written","To have been + V3 marks an earlier passive action.","To be wrote has an incorrect participle form and does not show the earlier action.","That was written does not complete the subject + reporting passive construction."),
q("It ___ that the building will reopen next spring.","is expected","expects","is expecting","It is expected that is the impersonal reporting passive.","Expects is active and would require an agent subject.","Is expecting is progressive active, not impersonal passive."),
q("The director had the damaged equipment ___.","replaced","replace","replacing","Have + object + V3 expresses arranging a service.","Replace is an active base form, not the participle.","Replacing is not the complement in this causative passive pattern."),
q("The results may have ___ during data transfer.","been corrupted","corrupted","being corrupted","Modal perfect passive = may have been + V3.","Corrupted omits been after have.","Being corrupted does not fit after may have in this sequence."),
q("The policy is reported ___ several times since its introduction.","to have been revised","to revise","that it revised","To have been revised marks repeated passive revisions before the current reporting point.","To revise is active and does not show the policy receiving revisions.","That it revised is a finite clause and gives the policy an active role."),
q("We got the technician ___ the system before the launch.","to inspect","inspect","inspected","Get + person + to-infinitive expresses arranging/persuading someone to act.","Bare inspect is used after have/make/let, not get + object.","Inspected would mean the technician was inspected, changing the meaning.")
]},
"C1-08":{base:"reporting",skillTarget:"academic-reporting-citation-language",profile:{
label:"advanced reporting and academic citation language",
core:"Academic reporting verbs describe how a source contributes to an argument: it demonstrates, suggests, challenges, acknowledges, assumes or attributes. Verb choice signals stance, evidence strength and the relation between writer and source.",
form:"Claim/argue/maintain + that-clause. Acknowledge/admit/deny + V-ing or that-clause. Attribute X to Y. Account for + noun. Demonstrate/show + that-clause or noun phrase. Caution against + V-ing.",
selection:"Определи точную функцию источника: report, support, challenge, concede, explain or attribute. Match the verb's complement and avoid using a stronger reporting verb than the evidence supports.",
contrast:"The authors demonstrate that X (evidence strongly supports). They suggest that X (cautious interpretation). They attribute the change to Y (cause/source).",
boundary:"Reporting verbs carry stance and may overstate evidence if chosen loosely. Check whether the verb is followed by that-clause, object, preposition or gerund.",
skillTarget:"academic-reporting-citation-language"
},drills:[
q("The authors attribute the increase ___ changes in sampling methods.","to","for","with","Attribute X to Y identifies the proposed source/cause of the increase.","For does not complete the standard attribute + object + to pattern.","With is not the required complement preposition."),
q("The review cautions researchers ___ treating correlation as causation.","against","from","to","Caution someone against + V-ing warns about an action.","From is not the standard complement in this warning pattern.","To would require an infinitive, not the intended gerund structure."),
q("The authors argue ___ the existing model overlooks social factors.","that","to","about","Argue + that-clause introduces the proposition.","To would require a different complement such as argue to do, not this statement.","About would require a noun phrase/gerund, not a finite that-clause."),
q("The evidence does not account ___ the sudden change in demand.","for","to","with","Account for means explain; it takes for.","To is not the preposition in this phrasal verb.","With does not complete the verb pattern."),
q("The researchers acknowledge ___ a limitation in the sample design.","having","to have","have","Acknowledge is followed by a gerund when referring to recognising an action/fact.","To have is not the selected complement pattern after acknowledge.","Bare have cannot follow acknowledge directly in this construction."),
q("The report challenges the assumption ___ language ability is fixed.","that","of","to","Assumption that introduces the proposition being assumed.","Of would require a noun or gerund phrase, not the finite clause.","To does not complete assumption + that-clause."),
q("The authors' findings are consistent ___ earlier longitudinal studies.","with","to","for","Consistent with is the standard adjective + preposition collocation.","Consistent to is not the normal collocation in this meaning.","For does not complete consistent + comparison/source.")
]},
"C1-09":{base:"hedging",skillTarget:"nuanced-modality-hedging-stance",profile:{
label:"nuanced modality, hedging and stance",
core:"Nuanced modality calibrates certainty, obligation, likelihood and evaluation to the strength of evidence. Academic stance can be expressed through modal verbs, adverbs, reporting verbs and lexical choices.",
form:"May/might/could + base verb; appears/seems to; is likely/unlikely to; arguably; conceivably; is consistent with; is suggestive of. Distinguish possibility, probability and evidence-based inference.",
selection:"Оцени evidential strength: possibility, tentative inference, likely explanation, or strong conclusion. Choose language that neither overstates nor unnecessarily weakens the claim.",
contrast:"This may indicate X (possibility). This is likely to indicate X (probability). This demonstrates X (strong evidence). This appears to be associated with X (cautious association).",
boundary:"Hedging should identify the uncertain part of a claim, not obscure the whole sentence. Distinguish causal language from association; correlation alone does not warrant causal verbs.",
skillTarget:"nuanced-modality-hedging-stance"
},drills:[
q("The observed association ___ reflect an unmeasured variable.","may","must","proves","May expresses a possible explanation without claiming certainty.","Must is a strong conclusion not warranted by the cautious context.","Proves is categorical and is not a modal expression of possibility."),
q("The pattern is ___ to be associated with seasonal variation.","likely","likelihood","likelily","Likely is the adjective required in the be likely to structure.","Likelihood is a noun and does not fit be + adjective + to-infinitive.","Likelily is not a standard adverb form."),
q("These findings are suggestive ___ a broader change in consumer behaviour.","of","to","for","Suggestive of is the standard adjective + preposition pattern.","Suggestive to is not the normal collocation in this meaning.","For does not complete suggestive + preposition."),
q("The available evidence is insufficient to ___ a causal relationship.","establish","establishing","established","To is followed by the base verb establish.","Establishing is V-ing and does not follow infinitive to.","Established is a participle and does not follow infinitive to."),
q("It would be premature to ___ that the intervention caused the improvement.","conclude","concluding","conclusion","To conclude is an infinitive after premature to.","Concluding does not follow infinitive marker to.","Conclusion is a noun, not a verb."),
q("The results are ___ consistent with the proposed mechanism, although alternative explanations remain.","broadly","broad","breadth","Broadly is an adverb modifying consistent and cautiously qualifying the fit.","Broad is an adjective.","Breadth is a noun."),
q("The new evidence ___ the possibility that the earlier estimate was too high.","raises","raise","raising","Raises is the finite third-person singular verb; raises the possibility is a cautious reporting collocation.","Raise lacks third-person -s with evidence as singular subject.","Raising is non-finite and cannot serve as the main verb here.")
]},

"C1-10":{base:"clause",skillTarget:"advanced-concession-correlative-structures",profile:{
label:"advanced concession and correlative structures",
core:"Advanced concession and correlative structures establish contrast, qualification and parallel relationships between propositions. They often require balanced syntax and carefully controlled inversion.",
form:"Not only…but also; neither…nor; whether…or; as…as; no sooner…than; rather than + noun/gerund/infinitive. Initial not only triggers inversion in the first clause.",
selection:"Определи, связывает ли структура два равноправных элемента, выражает альтернативу, добавляет контраст или усиливает неожиданность. Проверь parallelism and agreement.",
contrast:"Not only did the policy reduce costs, but it also improved access. Whether the cause was internal or external remains unclear. The results were as significant as expected.",
boundary:"Correlative elements should introduce grammatically parallel structures. Agreement with neither/nor and either/or can follow the nearer subject; initial not only requires inversion.",
skillTarget:"advanced-concession-correlative-structures"
},drills:[
q("Not only ___ the procedure, but they also documented every stage.","did the researchers repeat","the researchers repeated","had the researchers repeat","Initial Not only triggers inversion; Past Simple needs did + subject + base verb.","The researchers repeated keeps statement order and misses required inversion.","Had the researchers repeat is not a valid past perfect form."),
q("The policy was designed not only to reduce costs ___ also to improve access.","but","and","or","Not only…but also is the correlative pair.","And does not complete the paired construction.","Or introduces alternatives, not the additive correlative."),
q("Neither the proposed explanation ___ the alternative account fits the data.","nor","or","and","Neither…nor introduces two negative alternatives.","Or does not complete the correlative pair after neither.","And changes the meaning to addition."),
q("The final model was as accurate ___ the original version.","as","than","like","Equality uses as + adjective + as.","Than introduces comparative, not equality.","Like is a preposition and cannot complete the as…as pattern."),
q("Whether the effect is temporary ___ permanent remains uncertain.","or","nor","but","Whether…or introduces alternatives.","Nor is paired with neither, not whether.","But introduces contrast and does not complete the alternative pair."),
q("No sooner had the lecture begun ___ the fire alarm sounded.","than","when","that","No sooner is paired with than in this structure.","When pairs with hardly/scarcely in some patterns, not no sooner in this standard structure.","That does not complete the correlative pattern."),
q("The committee chose to revise the policy rather than ___ it entirely.","replace","replaced","to replacing","Rather than + bare infinitive is parallel with to revise.","Replaced is a past form and does not fit the infinitive pattern.","To replacing combines an infinitive marker with a gerund and is ungrammatical.")
]},
"C1-11":{base:"cohesion",skillTarget:"textual-reference-cohesion-substitution-ellipsis",profile:{
label:"textual reference, cohesion, substitution and ellipsis",
core:"Textual cohesion depends on clear reference chains, lexical repetition and substitution. Demonstratives, pronouns, one/ones, do so and ellipsis can connect sentences, but vague reference weakens academic argument.",
form:"This/these + summary noun (this finding, these results). One/ones for countable noun heads. Do so for verb phrases. So/not after think, believe, expect. Avoid ambiguous it/this/they with multiple antecedents.",
selection:"Найди antecedent и проверь, может ли читатель определить его однозначно. Для summary reference добавляй noun head; для repeated noun/verb phrase используй suitable substitute.",
contrast:"The sample was small. This limitation affects generalisability (clear noun head). The sample was small. This affects… (potentially vague).",
boundary:"Reference devices need clear antecedents and consistent number. Do not use this/which to refer vaguely to an entire preceding clause when a precise summary noun is needed.",
skillTarget:"textual-reference-cohesion-substitution-ellipsis"
},drills:[
q("The sample included only twelve participants. This ___ limits the generalisability of the results.","small sample size","they","one","This + noun phrase makes the reference explicit and identifies the limitation.","They is a pronoun with an unclear plural antecedent in this sentence.","One would refer to a countable noun but does not specify the limitation."),
q("The first dataset was incomplete, whereas the second ___ was comprehensive.","one","ones","do","One substitutes for the singular countable noun dataset.","Ones is plural and does not match singular dataset.","Do substitutes for a verb phrase, not a noun."),
q("The researchers repeated the procedure and the control group did ___ as well.","so","one","it so","Did so substitutes for the verb phrase repeated the procedure.","One substitutes for a noun phrase.","It so is not the required verb-phrase substitute after did."),
q("Several studies reported a similar effect. These ___ suggest a consistent pattern.","findings","it","one","These findings gives a plural summary noun phrase with a clear reference to the reported effects.","It is singular and has unclear reference to several studies/effects.","One is singular and cannot agree with these."),
q("The first method was more expensive than the second ___.","one","ones","do","One substitutes for the singular countable noun method.","Ones is plural; only one second method is implied.","Do cannot replace the noun method."),
q("We hope the results will improve, and the authors hope ___ as well.","so","one","do so","Hope so substitutes for the proposition that the results will improve.","One substitutes for a countable noun, not a proposition.","Do so substitutes for an action phrase, not the proposition after hope in this sentence."),
q("The survey was conducted online, which ___ reduced the cost of data collection.","in turn","they","one","In turn links the online method to its consequence with a clear discourse relation.","They lacks a clear plural antecedent and would require a finite verb structure.","One cannot refer to the preceding clause or express the consequence.")
]},
"C1-12":{base:"verbPattern",skillTarget:"advanced-verb-complementation",profile:{
label:"advanced verb complementation",
core:"Advanced verb complementation includes object complements, bare infinitives, -ing clauses, to-infinitives and finite that-clauses. Some verbs of perception, causation and evaluation license multiple structures with meaning differences.",
form:"Verb + object + bare infinitive (make/let/see/hear in some active patterns); passive perception/cause + to-infinitive; consider/find + object + adjective; verbs + that-clause; prevent/prohibit + object + from + V-ing.",
selection:"Найди управляющий verb and identify whether the complement is an object, infinitive, participle or clause. Check voice and meaning before selecting the form.",
contrast:"I saw him leave (complete event). I saw him leaving (process). He was seen to leave (passive perception). The rule prevented them from entering.",
boundary:"Perception verbs may permit bare infinitive or -ing with different aspectual focus. Passive changes the infinitive pattern. Lexical complementation should be learned with examples.",
skillTarget:"advanced-verb-complementation"
},drills:[
q("The committee found the proposal ___ and impractical.","unworkable","unworkably","to unwork","Find + object + adjective complement describes the proposal.","Unworkably is an adverb, not an object complement adjective.","To unwork is an infinitive and does not express the evaluation."),
q("The new regulation prevents companies ___ sharing personal data without consent.","from","to","of","Prevent + object + from + V-ing is the standard pattern.","To does not follow prevent in this construction.","Of is not the required complement preposition."),
q("The witness was heard ___ that the door had been open.","to say","say","saying to","In passive perception, hear + object + bare infinitive changes to be heard + to-infinitive.","Bare say is used in active perception, not after passive was heard.","Saying to does not form the passive perception structure."),
q("I noticed the researcher ___ the samples when I entered the room.","labeling","to label","label","Notice + object + V-ing focuses on an action in progress.","To label is not the normal active perception complement in this context.","Bare label would present the complete event rather than the observed ongoing process."),
q("The chairperson made the participants ___ their comments concise.","keep","to keep","keeping","Make + object + bare infinitive is the active causative pattern.","To keep is used after be made in passive, not active made the participants.","Keeping is a gerund and does not follow make + object here."),
q("The participants were allowed ___ the session early.","to leave","leave","leaving","Allow + object + to-infinitive; passive be allowed to do.","Bare leave is not used after passive were allowed.","Leaving is a gerund, not the infinitive complement."),
q("The study led the authors ___ their original hypothesis.","to reconsider","reconsider","reconsidering","Lead + object + to-infinitive expresses a resulting action.","Bare reconsider does not follow lead + object in this pattern.","Reconsidering does not complete the verb + object + infinitive structure.")
]},

"C1-13":{base:"adverb",skillTarget:"advanced-adverbial-phrases-degree-viewpoint",profile:{
label:"advanced adverbial phrases and emphasis",
core:"Advanced adverbials express stance, viewpoint, approximation, degree and evaluation. Their scope may extend over an adjective, a verb phrase or an entire proposition; placement controls interpretation.",
form:"To a considerable extent; broadly speaking; from a methodological perspective; relatively speaking; arguably; scarcely; not least; in practical terms. Adverbials may be clause-initial, medial or final depending on scope.",
selection:"Определи scope и функцию adverbial phrase: degree, viewpoint, qualification or stance. Place it so that the intended target is clear and the register remains appropriate.",
contrast:"Broadly speaking, the results support the hypothesis (stance). The results are broadly consistent (degree/extent). From a methodological perspective, the sample is limited (viewpoint).",
boundary:"Avoid stacking several stance adverbs and avoid using evaluative adverbials without evidence. Position can change scope; put the phrase near the proposition it qualifies.",
skillTarget:"advanced-adverbial-phrases-degree-viewpoint"
},drills:[
q("___, the findings support the proposed interpretation, although some uncertainty remains.","Broadly speaking","Broad","Broadness","Broadly speaking is a sentence-level stance phrase qualifying the overall claim.","Broad is an adjective and does not introduce this adverbial phrase.","Broadness is a noun."),
q("The two estimates are ___ comparable, but they are not identical.","broadly","broad","broadness","Broadly modifies the adjective comparable and expresses approximate degree.","Broad is an adjective, not the adverb required before comparable.","Broadness is a noun."),
q("___, the sampling procedure introduced a potential source of bias.","From a methodological perspective","Methodological","Methodologically perspective","The phrase explicitly frames the evaluation from a methodological viewpoint.","Methodological is an adjective without a complete phrase.","Methodologically is an adverb and cannot directly modify the noun perspective in this structure."),
q("The intervention was effective, ___ because it improved access for rural participants.","not least","least not","not the least","Not least introduces an especially important supporting point.","Least not is not a standard adverbial phrase.","Not the least changes the construction and does not introduce this reason."),
q("___, the model performs well under controlled conditions.","Relatively speaking","Relative speaking","Relativity speaking","Relatively speaking is a fixed qualifying adverbial phrase.","Relative is an adjective and requires a noun or different structure.","Relativity is a noun and does not form the phrase."),
q("The observed increase was ___ small and may fall within the margin of error.","comparatively","comparative","comparison","Comparatively is an adverb modifying small and expressing relative degree.","Comparative is an adjective.","Comparison is a noun."),
q("The conclusion is convincing ___, but the causal mechanism remains unclear.","in statistical terms","statistical","statistically terms","In statistical terms is a viewpoint/domain phrase modifying the evaluation.","Statistical is an adjective without its head noun.","Statistically cannot directly modify the noun terms in this phrase.")
]},
"C1-14":{base:"editing",skillTarget:"advanced-grammar-editing-academic-prose",profile:{
label:"integrated academic grammar editing",
core:"Advanced editing integrates grammar, reference, clause structure, agreement, punctuation and register. The editor must diagnose the source of the problem, not merely replace a word with a more formal synonym.",
form:"Check: subject–verb agreement; tense/aspect consistency; reference clarity; parallel structure; complement patterns; clause boundaries; modifier attachment; punctuation and academic register.",
selection:"Редактируй предложение по слоям: сначала смысл и logical relations; затем clause boundaries and subject; далее verb forms/complements; затем modifiers/reference; в конце punctuation and register.",
contrast:"Because the sample was small, the results are tentative (finite reason clause). Due to the small sample, the results are tentative (preposition + noun phrase). The results, which were limited, are tentative (clear relative clause).",
boundary:"Not every long sentence is incorrect, and not every passive/nominalisation should be removed. Improve clarity without changing the author's intended claim or evidence strength.",
skillTarget:"advanced-grammar-editing-academic-prose"
},drills:[
q("Each of the participants ___ asked to complete the final survey.","was","were","have","Each is singular in this structure and requires was.","Were incorrectly agrees with participants inside the of-phrase.","Have is plural and does not form the required passive with singular each."),
q("The study was carefully designed; ___, its sample was too small for broad generalisation.","however","therefore","for example","However marks contrast between a strong design and a limitation.","Therefore signals consequence and does not express the concessive relation clearly.","For example introduces an illustration, not the contrast."),
q("The researchers found that the intervention ___ improved attendance.","had","having","has been","The finite reported clause requires a past-tense auxiliary consistent with found: had improved.","Having is non-finite and cannot serve as the finite verb.","Has been improved would be passive and changes the intended active result."),
q("The report explains the reasons ___ the decline in participation.","for","of","to","Reasons for is the standard collocation.","Reasons of is not the normal complement in this meaning.","Reasons to means motives for doing something, not causes of a decline."),
q("The policy was introduced to improve access, ___ also reduced administrative costs.","and it","which it","being","And it connects two finite clauses with a clear subject and verb.","Which it duplicates the relative pronoun and subject.","Being creates a dangling/fragmented non-finite clause."),
q("The evidence is limited, so the conclusion should be stated ___.","cautiously","cautious","caution","Cautiously is an adverb modifying stated.","Cautious is an adjective and does not modify the verb stated.","Caution is a noun."),
q("Having reviewed the results, ___ concluded that further testing was needed.","the committee","it","which","The subject of the participle clause must also be the logical subject of the main clause; the committee performed the review and reached the conclusion.","It would make the introductory participle clause dangle because the pronoun it cannot logically review results.","Which cannot function as the subject of this independent clause.")
]}
};

