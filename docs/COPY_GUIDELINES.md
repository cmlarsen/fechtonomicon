# Copy Guidelines: Avoiding AI Prose Tics ("Claudisms")

A reference for keeping machine-sounding prose out of everything this project publishes in words — the README, marketing pages, App Store copy, in-app microcopy, release notes, docs, and issue/PR text. It catalogs the habits current large language models (as of July 2026) fall into when they write, so that copy drafted or polished with AI help reads like a person wrote it.

This guide is repo-agnostic. The catalog and rules apply to any repository; the [worked examples](#applying-this-to-fechtonomicon) at the end use this project's own copy to show the method.

---

## The one rule

> **The deepest tell is an abstraction standing where a specific belongs. The strongest cure is concreteness.**

Almost every item below is a special case of that. A model writes `blazing fast` because it does not know the benchmark; a person writes `renders 10,000 rows in 40 ms`. A model writes `trusted by thousands`; a person names the customer. When you are unsure whether a sentence is a tic, ask what specific fact it is standing in for — and write that instead.

## Read this first: rate, not presence

This is not a list of forbidden words. **One** em dash, **one** rule-of-three, **one** `notably`, **one** reader question is normal — often skilled — writing. The tell is *reflexive, above-baseline frequency* and *mechanical uniformity*: the third tricolon in a paragraph, the em dash in every other sentence, a `**Bold label:**` on all twelve bullets.

Two consequences worth stating up front, because over-correction is its own tell:

- **Absence is not innocence, and it is not proof either.** Because `delve` and `as an AI` were mocked, the newest models suppress them. Their presence is a strong signal; their *absence* tells you nothing. Do not scrub copy into conspicuous em-dash-phobia or robotic word-avoidance — that pattern is itself recognizable as "someone hiding AI."
- **Register decides.** Curly quotes are correct in rendered marketing prose and wrong in a plain-text README. Emoji fit a deliberately playful consumer voice and jar in a developer tool. Judge every flag against the *specific piece's* intended voice, not a universal ban. See [When these are actually fine](#when-these-are-actually-fine).

---

## How to use this guide

- **Writing copy (human or AI-assisted):** internalize the [twelve principles](#the-twelve-principles). They are the positive form of the whole catalog.
- **Editing a draft:** skim the [catalog](#the-catalog) by category, or scan the [grep quick-list](#grep-quick-list) against the text. Treat every hit as a *prompt to look*, not an automatic deletion — apply the rate-and-register test above.
- **Prompting a model to write for this repo:** paste the twelve principles and the [claudism index](#claudism-index-58) into the system/style prompt, and tell it to prefer concrete specifics over abstractions.
- **Severity** marks how reliable a tell each item is (`HIGH` = strong, `MED` = moderate, `LOW` = weak/contextual). **Currency** marks whether it is long-known (`classic`), still typical of mid-2026 frontier models (`current`), or a newer 2024–2026 habit (`emerging`). **[claudism]** marks tics especially characteristic of Claude-family models.

---

## The twelve principles

The rules that, followed, make the rest of this document unnecessary. Written as imperatives for a copywriter.

1. Lead with the concrete claim, not a warm-up. Open on a specific problem, number, or fact ('Your team loses two hours a week hunting for files'), never on era-setting ('In today's fast-paced world') or a self-graded question ('Great question!').

2. Show, don't certify. Replace every abstract quality claim with the evidence that would justify it: 'Renders 10k rows in 40ms' beats 'blazing fast'; '99.99% uptime over 12 months' beats 'industry-leading'; a named customer beats 'trusted by thousands.' If you can't cite the proof, cut the claim.

3. Prefer the plain word. Use over utilize/leverage; many over myriad/plethora; has over boasts; start over embark; improve over elevate; build over foster. Latinate and 'analysis-adjacent' vocabulary should earn its place with a precise technical meaning, not decorate.

4. Make one honest claim instead of a rhetorical swap. Kill the negation-elevation frame ('not just X — it's Y'), the both-sides balance ('on one hand... on the other'), and the essence-frame ('at its core, it's about'). State what the thing is and does, once.

5. Write prose by default; reserve lists, tables, and callouts for content whose shape genuinely demands them (4+ parallel items, multi-dimensional data, a load-bearing warning). Never bold the lead noun of every bullet or colon-gloss an entire list.

6. Vary rhythm and structure deliberately. Break the reflexive rule-of-three; follow a long sentence with a short one; let list counts match reality (two, four, one). Uniform tricolons and isometric fragments read as machine cadence.

7. Commit. Delete stacked hedges ('may potentially'), scope-preambles ('generally speaking'), and the value-stamps that announce importance instead of demonstrating it ('it's worth noting,' 'plays a crucial role'). Concentrate any genuine uncertainty in one clearly-marked spot; let every other sentence stand.

8. Strip the conversation out of the copy. A README, landing page, or doc has no narrator and no interlocutor: remove 'Let me walk you through,' 'Would you like me to,' 'Hope this helps,' 'You're absolutely right,' 'Perfect!,' and every offer, agreement receipt, apology, and self-narrated action.

9. Match emotional temperature to the stakes. No manufactured enthusiasm ('We're thrilled to announce'), pep talks ('You've got this!'), celebration of routine actions ('You're all set! 🎉'), or therapy-speak validation. State the neutral fact neutrally: 'Dark mode is here.' 'Changes saved.'

10. Keep typography plain and honest. Straight ASCII quotes in code/CLI/README source; em dashes at most one per few hundred words; no emoji as bullets, headers, status markers, or pointers; no ✅/❌ grids or arrow-chains in prose. End on your strongest concrete point — no recap, no summary label, no sign-off.

11. Use real specifics over plausible abstractions. Name the actual customer, number, workflow, or before/after; cite the named source, not 'experts argue' or 'studies show.' Missing specificity is the deepest tell, and concreteness is the strongest cure.

12. Let the piece have ragged edges. Not every thread needs a neat bow, not every section a reconciling final line, not every point a matching counterpoint. Take a position and leave a real caveat unresolved rather than tying everything off.

---

## The catalog

193 attested tics, grouped into 9 categories. 58 are high-severity, 27 are newly emerging, and 58 are flagged as claudisms. Within each category, strongest tells first.

**Jump to:**
- [Lexical tics — single words & verbs](#cat-lexical) — 40
- [Phrase clichés & set formulas](#cat-phrase-cliche) — 38
- [Sentence constructions](#cat-syntax-construction) — 20
- [Rhetorical moves](#cat-rhetorical) — 18
- [Structure & formatting](#cat-structure-formatting) — 29
- [Punctuation & typography](#cat-punctuation-typography) — 9
- [Tone & sycophancy](#cat-tone-sycophancy) — 8
- [Conversational / assistant register](#cat-interaction-chat) — 19
- [Meta, hedging & disclaimers](#cat-meta-hedging) — 12
- [Claudism index](#claudism-index-58)
- [Grep quick-list](#grep-quick-list)
- [When these are actually fine](#when-these-are-actually-fine)

<a id="cat-lexical"></a>

### Lexical tics — single words & verbs

*Individual words an LLM reaches for far above human baseline. Usually a plain synonym fixes them.*

#### T1. delve

`HIGH` · `classic`

**What it is.** The canonical AI verb for 'look at / go into,' usually 'delve into.' Measured at many times human baseline and hard-flagged by detectors. Newest frontier models (Claude 5, Opus 4.8, GPT-5.x, Gemini 3) have measurably dialed it back after it became a meme, so treat its presence as high-confidence but its absence as non-informative.

**Looks like:** `Let's delve into the details.` · `In this guide we delve into the key features.` · `Before we delve deeper, it's worth noting...`

**Why it's a tell.** Almost no human reaches for 'delve' in casual product copy; its frequency spiked precisely with instruction-tuned LLMs.

**Instead.** 'look at,' 'go into,' 'dig into,' or just start the explanation.

**Fine when.** 'Delve' has rare legitimate literary uses; flag it in plain product/marketing/docs register, not in deliberately ornate prose.

#### T2. Grandiose scene-setting nouns (tapestry / realm / landscape / ecosystem / journey)

`HIGH` · `classic`

**What it is.** Inflated abstractions used to sound weighty: 'a rich tapestry of,' 'in the realm of,' 'the ever-evolving landscape of,' 'a vibrant ecosystem,' 'embark on a journey.' Covers the figurative-spatial framing 'in the realm/world of X' and 'weave a tapestry.'

**Looks like:** `a rich tapestry of features that work in harmony` · `in the realm of productivity software` · `navigating the ever-evolving landscape of AI` · `a bustling ecosystem of plugins`

**Why it's a tell.** These co-occur with 'delve' and 'vibrant' as a giveaway cluster; humans name the concrete thing (market, tools, field) rather than a metaphorical abstraction.

**Instead.** Name the actual thing: 'market,' 'field,' 'tools,' or list the items. Ban tapestry/realm/landscape/ecosystem/journey in copy.

**Fine when.** 'Landscape'/'ecosystem' are legitimate literal terms (a photographic landscape, a software ecosystem's dependency graph). Flag only the figurative decorative use.

#### T3. boasts

`HIGH` · `classic`

**What it is.** Marketing verb for 'has,' attributing bragging to an inanimate product or place: 'the app boasts,' 'the city boasts.'

**Looks like:** `The dashboard boasts a sleek, intuitive interface.` · `Our platform boasts over 10,000 integrations.` · `The hotel boasts stunning ocean views.`

**Why it's a tell.** Spec-sheet anthropomorphism saturating AI marketing and travel copy; strong tell with 'sleek/stunning.'

**Instead.** 'has,' 'includes,' 'comes with,' or state the number plainly.

**Fine when.** None in product copy; 'boast' in the sense of a person bragging is fine in narrative prose.

#### T4. leverage / utilize

`HIGH` · `classic`

**What it is.** Latinate upgrades of 'use.' 'Leverage' as a transitive verb and 'utilize' where 'use' fits. Part of the RLHF-overrewarded analysis cluster.

**Looks like:** `leverage AI to streamline your workflow` · `utilize our built-in templates` · `leverage the power of automation`

**Why it's a tell.** Corporate-register substitutions LLMs default to; 'utilize' almost never beats 'use.'

**Instead.** 'use' in nearly every case; 'take advantage of' if you mean gaining leverage.

**Fine when.** 'Leverage' in finance (debt leverage) and 'utilize' meaning 'put to a specific use it wasn't designed for' are legitimate technical senses.

#### T5. seamless / seamlessly

`HIGH` · `current`

**What it is.** Frictionless-experience word, especially 'seamless integration' and 'seamlessly integrates with.'

**Looks like:** `seamless integration with your favorite tools` · `seamlessly sync across devices` · `a seamless user experience`

**Why it's a tell.** Possibly the most clichéd two-word pairing in AI SaaS copy; promises smoothness instead of describing behavior.

**Instead.** Say what happens: 'Push a task to Slack with one click.' 'Syncs in the background, no config.'

**Fine when.** A genuinely seamless OAuth handoff can be described as such once, literally; the tell is reflexive use on every feature.

#### T6. myriad / plethora / a wealth of / an array of

`HIGH` · `classic`

**What it is.** Fancy quantity words for 'many/lots': 'a myriad of options,' 'a plethora of features,' 'a wealth of,' 'a treasure trove of,' 'a wide array of,' 'an abundance of.'

**Looks like:** `a myriad of customization options` · `a plethora of integrations` · `a wealth of resources`

**Why it's a tell.** Register-inflated substitutes for 'many' far above human baseline; 'plethora' technically implies excess, which models ignore.

**Instead.** 'many,' 'lots of,' 'a wide range of,' or give the actual number.

**Fine when.** 'Myriad' as a bare adjective ('myriad reasons') is acceptable occasionally in literary register.

#### T7. elevate / take it to the next level

`HIGH` · `current`

**What it is.** Aspirational improvement verb aimed at the reader's workflow/brand: 'elevate your X,' 'take your X to the next level,' 'level up,' 'supercharge.'

**Looks like:** `elevate your workflow` · `take your marketing to the next level` · `supercharge your workflow with automations`

**Why it's a tell.** Marketing-deck verbs for any improvement, with no concrete meaning.

**Instead.** 'improve,' or say what changes ('cuts your setup time in half').

**Fine when.** 'Elevate' literally (elevate the platform 20cm) is fine.

#### T8. unlock / harness / unleash the power (of)

`HIGH` · `current`

**What it is.** Power-verb collocations framing outcomes as gated treasure or a mighty force to tame: 'unlock the full potential of,' 'harness the power of,' 'unleash your X,' 'tap into.'

**Looks like:** `Unlock the full potential of your data.` · `Harness the power of AI to move faster.` · `Unleash your team's creativity.`

**Why it's a tell.** Overwhelmingly used with potential/possibilities/power/insights; the locked-gate and taming metaphors rarely map to anything real.

**Instead.** State the concrete benefit: 'Query your data in plain English.'

**Fine when.** 'Unlock' literally (unlock a feature flag, unlock the door) is fine.

#### T9. empower

`HIGH` · `current`

**What it is.** Enablement verb aimed at users/teams: 'empower teams/creators to.'

**Looks like:** `empower teams to do their best work` · `empowering creators everywhere` · `tools that empower you to succeed`

**Why it's a tell.** Values-statement verb models reach for to sound benevolent; semantically thin next to 'let/help.'

**Instead.** 'let,' 'help,' 'give you the tools to.'

**Fine when.** 'Empower' has a specific meaning in access-control/permissions contexts; fine there.

#### T10. nuanced

`HIGH` · `current` · `claudism`

**What it is.** Sophistication adjective for takes/understanding/views: 'a nuanced take,' 'the answer is nuanced.' A pronounced Claude favorite.

**Looks like:** `This is a more nuanced issue than it appears.` · `a nuanced understanding of the tradeoffs` · `the answer is nuanced`

**Why it's a tell.** Claude reaches for 'nuanced' to flatter complexity and hedge, flagging sophistication without delivering the distinctions.

**Instead.** State the actual distinctions ('it helps for X but hurts for Y').

**Fine when.** 'Nuanced' is a real, useful adjective; flag the empty announcement of nuance that isn't then delivered, not accurate uses.

#### T11. genuinely

`HIGH` · `current` · `claudism`

**What it is.** Sincerity intensifier: 'genuinely useful,' 'I genuinely think,' 'genuinely impressive.'

**Looks like:** `This is genuinely useful.` · `I genuinely think this is the right call.` · `a genuinely delightful experience`

**Why it's a tell.** Distinctive Claude verbal habit; protesting sincerity implies other statements might not be, reading as assistant earnestness.

**Instead.** Delete it — the sentence is equally true without it.

**Fine when.** One 'genuinely' for real contrast ('it looks fake but genuinely works') is fine; the tell is reflexive sprinkling.

#### T12. Novelty/magnitude hype superlatives (cutting-edge / game-changer / revolutionary / groundbreaking / transformative)

`HIGH` · `current`

**What it is.** Single-word novelty and magnitude claims applied to routine products.

**Looks like:** `cutting-edge technology` · `a game-changer for productivity` · `a revolutionary, groundbreaking approach` · `a truly transformative experience`

**Why it's a tell.** Among the most reliable AI-marketing fingerprints; assert impact the copy never substantiates and pile up together.

**Instead.** Delete the label and prove it ('renders 3x faster than v2').

**Fine when.** Rarely a genuine breakthrough merits one of these once, with evidence.

#### T13. Authority/rank superlatives (best-in-class / world-class / industry-leading / state-of-the-art / next-generation)

`HIGH` · `current`

**What it is.** Compound self-ranking claims of market superiority or standard-setting quality, distinct from the novelty cluster: 'best-in-class,' 'world-class,' 'industry-leading,' 'top-tier,' 'gold standard,' 'state-of-the-art,' 'next-generation.'

**Looks like:** `industry-leading uptime` · `a world-class support team` · `state-of-the-art encryption`

**Why it's a tell.** Unfalsifiable rank claims the writer can't substantiate; people who mean it cite the number or the competitor.

**Instead.** Replace with evidence: '99.99% uptime over 12 months.' No number, no claim.

**Fine when.** 'State-of-the-art' can be literal in a research context citing a benchmark result.

#### T14. blazing fast / lightning-fast

`HIGH` · `current`

**What it is.** Signature README speed cliché: 'blazing fast,' 'blazingly fast,' 'lightning-fast,' 'built for speed.'

**Looks like:** `A blazing-fast, zero-config bundler.` · `Lightning-fast search across your entire codebase.`

**Why it's a tell.** The most recognizable AI/dev-marketing performance claim, never accompanied by a benchmark.

**Instead.** Cite the measurement: 'Cold builds in ~200ms on a 10k-file repo.' No number, don't claim speed.

**Fine when.** None; even with a real benchmark, state the number instead of the cliché.

#### T15. Stock product self-praise adjectives (powerful / intuitive / delightful / effortless / beautiful)

`HIGH` · `current`

**What it is.** A fixed adjective set asserting quality instead of showing it: 'powerful yet intuitive,' 'delightfully simple,' 'beautifully designed,' 'effortlessly scalable.'

**Looks like:** `A powerful yet intuitive platform.` · `Delightfully simple and beautifully designed.` · `Blazingly fast and effortlessly scalable.`

**Why it's a tell.** LLM landing-page copy leans on this exact cluster; a strong composite fingerprint.

**Instead.** Replace claims with specifics: 'Renders 10k rows in 40ms.'

**Fine when.** A single earned adjective backed by a demonstration is fine; the tell is the stacked cluster.

#### T16. robust

`MED` · `current`

**What it is.** All-purpose strength adjective for features, systems, and frameworks: 'robust suite,' 'robust set of tools.'

**Looks like:** `a robust suite of features` · `robust and scalable architecture` · `robust support`

**Why it's a tell.** One of the most over-represented adjectives in LLM technical copy when used as vague praise; attaches to anything.

**Instead.** 'strong,' 'reliable,' or state the concrete capability ('handles 10k requests without dropping any').

**Fine when.** 'Robust' is a precise term in engineering and statistics (robust error handling, robust to node failure, a statistically robust estimator). Flag only the empty marketing sense.

#### T17. Dev-cred reliability adjectives (battle-tested / production-ready / rock-solid / enterprise-grade)

`MED` · `current`

**What it is.** Unearned maturity claims beyond 'robust': 'battle-tested,' 'production-ready,' 'rock-solid,' 'bulletproof,' 'enterprise-grade,' 'hardened.'

**Looks like:** `Battle-tested in production at scale.` · `A rock-solid, enterprise-grade foundation.` · `Production-ready from day one.`

**Why it's a tell.** Recur across generated README/tech copy with no incident numbers or scale figures to back them.

**Instead.** Provide the evidence: 'Running in production 3 years; 40M requests/day.' Otherwise cut.

**Fine when.** Fine when paired with the actual figures that substantiate them.

#### T18. foster

`MED` · `classic`

**What it is.** Abstract verb for 'encourage/build,' with community, collaboration, growth, innovation.

**Looks like:** `foster a sense of community` · `foster collaboration across teams` · `foster innovation`

**Why it's a tell.** Rare outside grant applications; clusters with abstract nouns to produce content-free uplift.

**Instead.** 'build,' 'encourage,' 'help,' 'make it easier to' — attached to a concrete action.

**Fine when.** 'Foster' in its literal care sense (foster a child, foster care) is unrelated and fine.

#### T19. garner

`MED` · `classic`

**What it is.** Elevated verb for 'get/attract/earn': 'garner attention,' 'garner support,' 'garner praise.'

**Looks like:** `garner widespread attention` · `garner positive reviews` · `helped the project garner support`

**Why it's a tell.** Journalistic/formal verb overused in ordinary contexts; 'garner attention' is a stock collocation.

**Instead.** 'get,' 'attract,' 'win,' 'earn,' 'pick up.'

**Fine when.** Acceptable in formal news register; flag in product/marketing copy.

#### T20. Importance intensifiers (crucial / pivotal / vital / essential / paramount / integral / key)

`MED` · `current`

**What it is.** Single-word significance markers sprinkled to signal that something matters without earning it.

**Looks like:** `It's crucial to understand your audience.` · `a pivotal role in modern workflows` · `Security is paramount.` · `an integral part of the stack`

**Why it's a tell.** 'Crucial'/'pivotal' rank among the highest over-represented adjectives in LLM text; they assert importance rhetorically and stack several per page.

**Instead.** Cut most; if something matters, show the consequence of ignoring it. Otherwise 'important,' 'needed,' or nothing.

**Fine when.** 'Essential' and 'key' are often the precise word for something genuinely load-bearing. Flag reflexive sprinkling that manufactures unearned importance, not accurate single uses.

#### T21. streamline

`MED` · `current`

**What it is.** Efficiency verb for simplifying a process, paired endlessly with 'workflow'/'operations.'

**Looks like:** `streamline your workflow` · `streamline repetitive tasks` · `streamline the entire process`

**Why it's a tell.** Generic productivity claim rather than a described improvement.

**Instead.** 'simplify,' 'speed up,' 'cut steps from,' or name what gets removed.

**Fine when.** Legitimate when describing an actual process change (streamlined the 7-step checkout to 3).

#### T22. embark on a journey

`MED` · `classic`

**What it is.** Grandiose verb for 'start,' almost always 'embark on a journey.'

**Looks like:** `embark on your fitness journey` · `embark on this adventure with us` · `before you embark on your next project`

**Why it's a tell.** Signature AI onboarding cliché; epic register for the mundane act of starting.

**Instead.** 'start,' 'begin,' 'get going.' Drop 'journey.'

**Fine when.** None in product copy.

#### T23. showcase

`MED` · `current`

**What it is.** Display verb for portfolios, features, work: 'showcase your X.'

**Looks like:** `showcase your best work` · `a page to showcase your projects` · `showcasing the platform's capabilities`

**Why it's a tell.** Over-preferred to plain 'show'/'display.'

**Instead.** 'show,' 'display,' 'present.'

**Fine when.** 'Showcase' as a noun (a product showcase event) is fine.

#### T24. meticulous / meticulously

`MED` · `current`

**What it is.** Craft-signaling adverb, especially 'meticulously crafted/designed/curated.'

**Looks like:** `meticulously crafted for performance` · `every detail meticulously designed` · `a meticulously curated collection`

**Why it's a tell.** Self-congratulatory quality claim that asserts care rather than showing it.

**Instead.** Show the care ('we hand-checked every icon at three sizes') or use 'carefully.'

**Fine when.** Fine describing genuinely painstaking real work when specifics follow.

#### T25. truly

`MED` · `current` · `claudism`

**What it is.** Earnestness intensifier, sibling of 'genuinely': 'truly powerful,' 'a truly transformative experience,' 'what truly matters.'

**Looks like:** `A truly seamless experience.` · `This is truly game-changing.` · `What truly sets us apart.`

**Why it's a tell.** Adds no meaning and pairs with already-inflated adjectives, compounding the tell.

**Instead.** Delete 'truly.' If the adjective can't stand without it, replace the adjective with a fact.

**Fine when.** 'Truly' for genuine emphasis once in a passage is acceptable.

#### T26. vibrant / bustling

`MED` · `current`

**What it is.** Liveliness adjectives for communities, cities, ecosystems: 'a vibrant community,' 'a bustling marketplace.'

**Looks like:** `join our vibrant community of developers` · `a bustling ecosystem of plugins` · `the vibrant world of open source`

**Why it's a tell.** Stock 'lively' descriptors; 'vibrant community' screams template.

**Instead.** 'active,' 'busy,' or show it ('4,000 people post daily'). Often just cut.

**Fine when.** 'Vibrant' literally about color is fine.

#### T27. notably

`MED` · `current`

**What it is.** Metadiscourse salience marker: sentence-initial 'Notably,' plus the hedge-adverb 'notably.'

**Looks like:** `Notably, the update improves battery life.` · `Notably absent is any mention of price.` · `This is notably faster.`

**Why it's a tell.** Directs attention rather than earning it; clusters with 'importantly'/'interestingly' as filler.

**Instead.** Delete and lead with the fact; restructure if contrast is meant.

**Fine when.** A standard analytical discourse marker in good nonfiction; tell only at high density or when nothing notable follows. Not distinctively Claude.

#### T28. comprehensive / holistic

`MED` · `current`

**What it is.** Completeness adjectives for guides/solutions: 'a comprehensive guide,' 'a holistic approach.'

**Looks like:** `a comprehensive guide to getting started` · `our comprehensive suite of tools` · `a holistic approach to wellness`

**Why it's a tell.** Promise totality no document delivers; 'holistic' carries a New-Age flavor.

**Instead.** 'complete,' 'full,' 'covers X to Y,' or drop it and let scope speak.

**Fine when.** 'Comprehensive' is accurate when coverage genuinely is complete — a legitimate claim, not inherently puffery. Weight 'holistic' higher than 'comprehensive.'

#### T29. resonate / resonates

`MED` · `current`

**What it is.** Connection verb for emotional/thematic fit: 'content that resonates,' 'resonates with your audience.'

**Looks like:** `messaging that resonates with your audience` · `does this resonate with you?` · `a story that truly resonates`

**Why it's a tell.** Abstract stand-in for 'connects/rings true'; 'resonate with your audience' is a fixed phrase.

**Instead.** 'connects with,' 'rings true,' 'lands,' or describe the reaction.

**Fine when.** 'Resonate' literally (a resonating frequency) is fine; long-standing marketing word, so weight as current not novel.

#### T30. nestled

`MED` · `classic`

**What it is.** Placement verb from AI travel/lifestyle copy: 'nestled in the heart of,' 'nestled among.'

**Looks like:** `nestled in the heart of downtown` · `a cozy cabin nestled among the pines` · `nestled between the mountains and the sea`

**Why it's a tell.** 'Nestled in the heart of' is a near-signature AI real-estate/travel opener.

**Instead.** 'in,' 'located in,' or give the actual location ('two blocks from the station').

**Fine when.** Occasional literal use in genuinely descriptive nature writing.

#### T31. thoughtful / thoughtfully

`MED` · `current` · `claudism`

**What it is.** Approval adjective for designs/defaults/decisions: 'a thoughtful set of defaults,' 'thoughtfully designed.' Claude-leaning praise word.

**Looks like:** `a thoughtful set of defaults` · `thoughtfully designed for focus` · `a thoughtful approach to the problem`

**Why it's a tell.** Abstract compliment describing intention rather than any observable property.

**Instead.** Point to the decision that shows the thinking ('it remembers your last folder, so you skip the picker').

**Fine when.** Describing an actual person's considerateness is fine.

#### T32. Affect verbs (delighted / thrilled / excited)

`MED` · `current` · `claudism`

**What it is.** Manufactured emotional investment in mundane subject matter.

**Looks like:** `I'm thrilled to walk you through this.` · `We're delighted to introduce dark mode.` · `I'm excited to help you get set up!`

**Why it's a tell.** Emotional temperature miscalibrated to neutral content reads synthetic.

**Instead.** Drop the emotion verb. 'Dark mode is here.'

**Fine when.** Genuine excitement about genuinely major news, shown through the fact, can carry one.

#### T33. quiet / quietly

`MED` · `emerging`

**What it is.** Poetic adverb applied to abstractions to sound evocative: 'quiet confidence,' 'quietly powerful,' plus the now-common -ly verb forms 'quietly building,' 'quietly dominating,' 'quietly transforming.'

**Looks like:** `quiet confidence` · `quietly orchestrating your workflows` · `quietly building the future`

**Why it's a tell.** Newly ubiquitous 2026 tell; reads as hollow poeticism.

**Instead.** Delete 'quiet/quietly' as a modifier of abstractions. Say what the thing does.

**Fine when.** Literal quiet (a quiet fan, quiet hours) is fine.

#### T34. effortlessly / with ease

`MED` · `current`

**What it is.** Ease-adverb sibling of 'seamlessly': 'effortlessly manage,' 'scale effortlessly,' 'connect with ease.'

**Looks like:** `Effortlessly sync across all your devices.` · `Manage your whole team with ease.`

**Why it's a tell.** Frictionless-fantasy intensifier pairing mechanically with verbs; adds no information.

**Instead.** Cut the adverb or show why it's easy ('one click connects your GitHub — no config file').

**Fine when.** Rarely, when the ease is the genuine differentiator and demonstrated.

#### T35. Simply / just minimizer

`MED` · `current`

**What it is.** Step-flattening adverbs in docs/microcopy framing every action as trivial: 'Simply click,' 'Just enter your email,' 'All you have to do is,' 'It's as easy as.'

**Looks like:** `Simply run the installer and you're done.` · `Just paste your API key to get started.` · `All you have to do is connect your account.`

**Why it's a tell.** Reflexively minimizes steps regardless of difficulty; both an AI tic and condescending microcopy that backfires when the step isn't simple.

**Instead.** State the action plainly: 'Run the installer.' 'Paste your API key.'

**Fine when.** Acceptable when a step truly is one trivial action; tell only when it minimizes real complexity or recurs on every instruction.

#### T36. intricate / intricacies

`MED` · `current`

**What it is.** Complexity-flagging vocabulary in the 'nuanced' family: 'the intricacies of,' 'an intricate web of.'

**Looks like:** `Navigating the intricacies of tax law.` · `An intricate web of dependencies.`

**Why it's a tell.** Sophistication-signaling word preferred over plain 'details'/'complexity'; often paired with 'navigate' and 'delve.'

**Instead.** 'details' or 'complexity,' or name the specific complication.

**Fine when.** Literal intricacy (an intricate mechanical watch) is fine.

#### T37. Foundational metaphor (cornerstone / backbone / bedrock)

`MED` · `current`

**What it is.** Structural metaphors asserting centrality: 'the cornerstone of,' 'the backbone of your workflow,' 'the bedrock of trust,' 'lies at the heart of.'

**Looks like:** `Security is the cornerstone of our platform.` · `The API is the backbone of the whole system.`

**Why it's a tell.** Stock architectural metaphor inflating importance without argument.

**Instead.** State the actual dependency: 'Every integration goes through this one API.'

**Fine when.** Occasional single use for a genuinely load-bearing component is acceptable.

#### T38. Hedge-adverb density (arguably / relatively / somewhat / essentially / largely)

`MED` · `current`

**What it is.** High per-sentence load of noncommittal adverbs: 'arguably,' 'relatively,' 'somewhat,' 'fairly,' 'essentially,' 'effectively,' 'largely,' 'to some extent,' 'more or less.'

**Looks like:** `This is arguably the most notable improvement, and it's relatively easy to set up.` · `The results are essentially the same, more or less.` · `It's a somewhat faster, largely seamless experience.`

**Why it's a tell.** Not any single word but the density — nearly every claim softened — produces the model's uniform, evidence-free cautiousness.

**Instead.** Do a qualifier pass and delete ~90%. Keep an adverb only when it carries real information.

**Fine when.** A single qualifier for genuine precision is fine; don't trade AI-tentativeness for false certainty. The tell is density.

#### T39. 'signal' as abstract noun

`LOW` · `emerging`

**What it is.** Strategy-register 'signal' replacing a concrete observation: 'sends a strong signal,' 'a clear signal to the market,' 'signal vs. noise.'

**Looks like:** `A clean design sends a signal that you care.` · `This is a strong signal to your customers.`

**Why it's a tell.** Sounds strategic while abstracting away what the reader actually perceives.

**Instead.** State the concrete thing perceived ('customers see you ship weekly'), not the meta-'signal.'

**Fine when.** Literal signal (a network signal, a signal-processing term) is fine.

#### T40. Downtoner density (a bit / a little / somewhat / kind of)

`LOW` · `current` · `claudism`

**What it is.** Soft-hedging register leaning on 'a bit,' 'a little,' 'somewhat,' 'slightly,' 'kind of,' giving prose an apologetic texture.

**Looks like:** `This is a bit tricky.` · `The setup is a little involved.` · `It's somewhat surprising, but...`

**Why it's a tell.** High per-paragraph downtoner load is a Claude conversational fingerprint; copy should assert a degree, not apologize.

**Instead.** Cut the downtoner or name the real magnitude ('three extra steps,' not 'a bit involved').

**Fine when.** One downtoner for genuine precision is fine; the tell is density across many sentences.

---

<a id="cat-phrase-cliche"></a>

### Phrase clichés & set formulas

*Multi-word canned phrases and marketing boilerplate that arrive pre-assembled.*

#### T41. testament / serves as / stands as / marks

`HIGH` · `classic`

**What it is.** Evasive linking constructions that assert significance without content: 'a testament to,' 'stands as a testament to,' 'serves as a reminder of,' 'marks a turning point,' 'represents.'

**Looks like:** `This release is a testament to our team's dedication.` · `The building serves as a reminder of the city's heritage.` · `It marks a new chapter for the product.`

**Why it's a tell.** Hollow importance-claims that reframe a fact as evidence of an abstraction; humans show the thing rather than certifying it.

**Instead.** Give the fact and let the reader conclude: '99.99% uptime over the last year.' Avoid testament/stands as/serves as/marks.

**Fine when.** 'Represents'/'serves as' have plain technical senses (this byte represents the flag). Flag the ceremonial significance-assertion, not literal description.

#### T42. In today's fast-paced / digital world

`HIGH` · `classic`

**What it is.** Generic scene-setting opener situating the reader in a vague modern moment: 'In today's fast-paced world,' 'In today's digital age,' 'In an increasingly connected world.'

**Looks like:** `In today's fast-paced world, staying organized is harder than ever.` · `In today's digital age, data is your most valuable asset.`

**Why it's a tell.** The single most-flagged AI opener; asserts nothing specific and only warms up before the real sentence.

**Instead.** Open on the concrete problem: 'Your team loses two hours a week hunting for files.'

**Fine when.** None.

#### T43. That's where X comes in

`HIGH` · `current`

**What it is.** Problem-then-solution bridge: 'That's where [Product] comes in,' 'This is where X shines.'

**Looks like:** `Manually reconciling invoices is painful. That's where Ledgerly comes in.` · `This is where automation shines.`

**Why it's a tell.** Near-universal fill-in-the-blank template in AI landing copy.

**Instead.** Introduce the product by what it does: 'Ledgerly reconciles invoices automatically.'

**Fine when.** None.

#### T44. Navigating the complexities of

`HIGH` · `current`

**What it is.** Figurative-journey framing of a difficult topic: 'navigating the complexities of,' 'navigate the world of,' 'navigating the challenges of.'

**Looks like:** `Navigating the complexities of tax compliance is exhausting.` · `We help you navigate the ever-changing world of SEO.`

**Why it's a tell.** Figurative 'navigate' plus 'complexities' is a stock difficulty-acknowledgment.

**Instead.** Use a literal verb: 'Tax compliance is confusing — we file it for you.'

**Fine when.** Literal navigation (navigate to Settings) is fine.

#### T45. More than just X / reimagined

`HIGH` · `current`

**What it is.** Elevation frame claiming the product exceeds a modest category: 'more than just a X,' 'not your average X,' 'X, reimagined,' 'the last X you'll ever need.'

**Looks like:** `More than just a note-taking app.` · `This isn't your average CRM.` · `Project management, reimagined.`

**Why it's a tell.** Template hinge promising elevation without a concrete differentiator.

**Instead.** State the differentiator: 'A note app that links every note to a task.'

**Fine when.** None.

#### T46. revolutionize / transform the way you

`HIGH` · `classic`

**What it is.** Grand change claims on mundane workflows: 'revolutionize the way you X,' 'transform the way you work,' 'reinvent how teams X.'

**Looks like:** `Revolutionize the way you manage projects.` · `Transform the way your team communicates.`

**Why it's a tell.** Change-the-way-you-X template with revolution-scale verbs for feature-scale changes.

**Instead.** Describe the concrete change: 'Assign a task and it shows up on everyone's calendar automatically.'

**Fine when.** None.

#### T47. So you can focus on what matters / we do the heavy lifting

`HIGH` · `current`

**What it is.** Benefit-tail promising removed drudgery: 'so you can focus on what matters most,' 'we do the heavy lifting,' 'let us handle the rest,' 'so you can focus on what you do best.'

**Looks like:** `Automate the busywork so you can focus on what matters most.` · `We do the heavy lifting so you don't have to.` · `Set it up once and let us handle the rest.`

**Why it's a tell.** Empty, universally-applicable value proposition naming no actual task.

**Instead.** Name the specific thing removed and enabled: 'Auto-reconciles Stripe payouts, so you stop exporting CSVs at month-end.'

**Fine when.** None.

#### T48. No one-size-fits-all / no silver bullet

`HIGH` · `current`

**What it is.** Stock non-commitment idioms: 'no one-size-fits-all solution,' 'no single right answer,' 'no silver bullet,' 'your mileage may vary.'

**Looks like:** `There's no one-size-fits-all answer to this.` · `There's no silver bullet when it comes to security.` · `When it comes to pricing, one size doesn't fit all.`

**Why it's a tell.** Prefab phrase acknowledging complexity without resolving it; its blandness is the tell.

**Instead.** Name the actual variable: 'The right plan depends on team size — under 10, start with Team.'

**Fine when.** None.

#### T49. Let me know if you need anything else / Hope this helps

`HIGH` · `classic`

**What it is.** Warm helper-closers: 'Let me know if you need anything else,' 'Let me know if you have any questions,' 'I hope this helps!,' 'Hope that clears things up!'

**Looks like:** `Let me know if you need anything else!` · `I hope this helps!` · `Hope that helps!`

**Why it's a tell.** A written deliverable is not a conversation awaiting a reply; the standing offer and the hopeful closer are among the most-cited AI-text tells.

**Instead.** End on the last substantive sentence; point to a real support channel if needed ('Questions? See the docs').

**Fine when.** None in product copy.

#### T50. In a world where / In an era where / Now more than ever

`MED` · `current`

**What it is.** Movie-trailer conditional opener establishing stakes: 'In a world where,' 'In an era where,' 'In a time when,' 'Now more than ever.'

**Looks like:** `In a world where attention is scarce, clarity wins.` · `In an era where data breaches make headlines, security matters.` · `Now more than ever, teams need to move fast.`

**Why it's a tell.** Content-free trailer-voice scene-setting flagged alongside 'in today's fast-paced world.'

**Instead.** Lead with the stake itself: 'Data breaches are up 40% this year.'

**Fine when.** None.

#### T51. When it comes to X

`MED` · `current`

**What it is.** Topic-introducing pivot replaceable by 'for'/'with' or deletion.

**Looks like:** `When it comes to security, we don't cut corners.` · `When it comes to performance, every millisecond counts.`

**Why it's a tell.** Grammatical padding adding four words and zero information; clusters unnaturally in generated copy.

**Instead.** 'We don't cut corners on security.'

**Fine when.** Occasional use as a genuine topic shift is acceptable; the tell is stacking it at paragraph/list-item starts.

#### T52. plays a crucial/pivotal/vital role

`MED` · `current`

**What it is.** Vague importance-assertion naming no mechanism; the adjective rotates through crucial/pivotal/vital/key/integral.

**Looks like:** `Caching plays a crucial role in keeping the app responsive.` · `Metadata plays a vital role in search accuracy.`

**Why it's a tell.** Empty scaffolding around a significance claim.

**Instead.** State the effect: 'Caching cuts load times from 900ms to 40ms.'

**Fine when.** None.

#### T53. Gone are the days / Say goodbye to

`MED` · `classic`

**What it is.** Before/after opener contrasting an obsolete past with the product's present, including the inverted 'Gone are the days of X' and paired 'Say goodbye to X. Say hello to Y.'

**Looks like:** `Gone are the days of digging through spreadsheets.` · `Say goodbye to messy handoffs. Say hello to clarity.` · `Long gone are the spreadsheets of yesterday.`

**Why it's a tell.** Stock nostalgic-obsolescence framing; the 'old days' are usually a strawman the copy invented.

**Instead.** State the improvement: 'Find any file in two keystrokes.' Cite a specific prior workflow if contrasting.

**Fine when.** None.

#### T54. The key to X lies in / the secret to

`MED` · `current`

**What it is.** Insight frame presenting a banal point as a hidden secret: 'The key to X lies in Y,' 'The secret to X is Y,' 'The real magic happens when.'

**Looks like:** `The key to great onboarding lies in reducing friction.` · `The secret to fast queries is a good index.` · `The real magic happens when your tools talk to each other.`

**Why it's a tell.** Promises revelation then delivers the obvious.

**Instead.** Just make the point: 'Fewer setup steps means more people finish onboarding.'

**Fine when.** None.

#### T55. At the end of the day / bottom line / when all is said and done

`MED` · `classic`

**What it is.** Folksy summarizing cliché introducing a supposed bottom-line truth.

**Looks like:** `At the end of the day, users just want it to work.` · `When all is said and done, the results speak for themselves.` · `The bottom line is you'll ship faster.`

**Why it's a tell.** Announces a conclusion instead of earning one; the payload is usually a truism.

**Instead.** State the conclusion without wind-up: 'Users just want it to work.'

**Fine when.** None.

#### T56. Look no further / your go-to

`MED` · `classic`

**What it is.** Search-ending marketing reassurance: 'Look no further,' 'Your search ends here,' 'your go-to solution for.'

**Looks like:** `Looking for a faster CI pipeline? Look no further.` · `Your go-to tool for team scheduling.`

**Why it's a tell.** Canned SEO-listicle CTA that signals templated generation.

**Instead.** Lead with the concrete claim: 'CI runs that finish in under 90 seconds.'

**Fine when.** None.

#### T57. The possibilities are endless

`MED` · `classic`

**What it is.** Open-ended enthusiasm close implying unlimited use cases: 'the sky's the limit,' 'only limited by your imagination,' 'and so much more.'

**Looks like:** `Automate reports, sync data, trigger alerts — the possibilities are endless.` · `With our API, the sky's the limit.`

**Why it's a tell.** Vacuous closer substituting hype for a specific benefit; reads as a shrug.

**Instead.** Name the best two or three real use cases and stop.

**Fine when.** None.

#### T58. Social-proof cliché (Join thousands / Trusted by / Loved by teams)

`MED` · `current`

**What it is.** Generic crowd-appeal openers with vague quantities: 'Join thousands of teams,' 'Trusted by developers worldwide,' 'Used by millions.'

**Looks like:** `Join thousands of teams who ship faster.` · `Trusted by developers around the world.` · `Loved by startups and enterprises alike.`

**Why it's a tell.** Round unverifiable number, no named customer; genuine social proof cites logos or exact figures.

**Instead.** Use a real checkable figure or named customer, or drop it.

**Fine when.** Fine with a real number ('Trusted by 3,200 teams') or actual logos.

#### T59. Unwavering commitment / dedicated to excellence

`MED` · `classic`

**What it is.** Values-page language asserting virtue without action: 'our unwavering commitment to quality,' 'dedicated to excellence,' 'we pride ourselves on,' 'we go above and beyond.'

**Looks like:** `Our unwavering commitment to customer success.` · `We're dedicated to delivering excellence.` · `We pride ourselves on attention to detail.`

**Why it's a tell.** Pure assertion of a disposition with zero evidence; reads as a mission-statement generator.

**Instead.** Show it as a concrete policy: '24-hour response on every support ticket, including weekends.'

**Fine when.** None.

#### T60. At your fingertips

`MED` · `current`

**What it is.** Access metaphor promising instant availability: 'everything you need at your fingertips,' 'powerful tools at your fingertips.'

**Looks like:** `All your data, right at your fingertips.` · `Powerful analytics at your fingertips.`

**Why it's a tell.** Dead metaphor appearing almost exclusively in templated marketing; describes no actual interaction.

**Instead.** Describe the access: 'Search every ticket from the command bar (Cmd-K).'

**Fine when.** None.

#### T61. The future of X (is here)

`MED` · `current`

**What it is.** Epochal framing positioning the product as inevitable: 'the future of work,' 'the future of X is here,' 'welcome to the future of.'

**Looks like:** `The future of team collaboration is here.` · `Welcome to the future of personal finance.`

**Why it's a tell.** Grand temporal claim with no content; movie-trailer register for a tagline.

**Instead.** State what the product does today in concrete terms.

**Fine when.** None.

#### T62. Designed / built with X in mind

`MED` · `current`

**What it is.** Intent-signaling frame gesturing at a design value without demonstrating it: 'designed with simplicity in mind,' 'built with you in mind,' 'crafted with privacy in mind.'

**Looks like:** `Designed with your privacy in mind.` · `Built with developers in mind.` · `Every feature was crafted with simplicity in mind.`

**Why it's a tell.** Claims a goal instead of showing the decision that followed from it.

**Instead.** Show the decision: 'No account required, and nothing leaves your device.'

**Fine when.** None.

#### T63. Peace of mind

`MED` · `current`

**What it is.** Reassurance-benefit noun phrase, especially in security/backup/pricing copy: 'for total peace of mind,' 'giving you peace of mind.'

**Looks like:** `Automatic backups, for total peace of mind.` · `Cancel anytime — peace of mind included.`

**Why it's a tell.** Abstract emotional payoff bolted onto a feature; the exact phrase recurs across unrelated copy.

**Instead.** State the mechanism: 'Restore any file from the last 90 days in two clicks.'

**Fine when.** None.

#### T64. Dev-ease cliché cluster (out of the box / it just works / zero-config / first-class support / batteries included)

`MED` · `current`

**What it is.** README/docs performative-simplicity phrases: 'works out of the box,' 'it just works,' 'zero config,' 'first-class TypeScript support,' 'batteries included,' 'sensible defaults.'

**Looks like:** `Works out of the box — no config required.` · `First-class TypeScript support.` · `Zero-config setup: it just works.`

**Why it's a tell.** Stock developer-marketing reassurances the model emits together, promising frictionlessness without specifying what's preconfigured.

**Instead.** Say what's preconfigured: 'Ships with ESLint, Prettier, and TS configs already wired up.'

**Fine when.** Acceptable once when literally true and the specifics are nearby.

#### T65. Under the hood

`MED` · `current`

**What it is.** Technical-reveal transition: 'under the hood,' 'let's look under the hood,' 'behind the scenes.'

**Looks like:** `Under the hood, it's just a Postgres table.` · `Let's peek under the hood.` · `Behind the scenes, we batch every request.`

**Why it's a tell.** Worn car-engine metaphor overused as a section-header reflex to introduce any implementation detail.

**Instead.** Just introduce the mechanism: 'Internally, requests are batched every 50ms.'

**Fine when.** Occasional single use is tolerable in a casual dev blog.

#### T66. Ready to X? [imperative] today (CTA closer)

`MED` · `current`

**What it is.** Templated call-to-action ending generated marketing: 'Ready to get started?,' 'Ready to transform your workflow? Sign up today,' 'Start your free trial today.'

**Looks like:** `Ready to ship faster? Start free today.` · `Ready to take control of your finances? Get started now.`

**Why it's a tell.** Formulaic question-then-imperative with default 'today'/'now' urgency, verbatim across unrelated products.

**Instead.** Make the CTA specific and singular: 'Create your first project (no card needed).'

**Fine when.** A specific, earned CTA is legitimate copywriting; the tell is the generic rhetorical-question version.

#### T67. The [smarter/easier/better] way to X

`MED` · `current`

**What it is.** Comparative-headline template asserting superiority over an implied old way: 'The smarter way to manage tasks,' 'A better way to work,' 'X, done right.'

**Looks like:** `The smarter way to manage invoices.` · `A better way to run standups.` · `Email, done right.`

**Why it's a tell.** Comparative claim with no stated baseline; a mold that fits any product.

**Instead.** Say the concrete differentiator: 'Invoices that reconcile themselves.'

**Fine when.** None.

#### T68. Without further ado

`MED` · `classic`

**What it is.** Filler transition into the main content: 'Without further ado, let's get started,' 'With that out of the way.'

**Looks like:** `Without further ado, let's dive in.` · `With that said, without further ado — here's the setup.`

**Why it's a tell.** Throat-clearing ceremony that adds delay.

**Instead.** Delete it and start the content.

**Fine when.** None.

#### T69. Corporate idiom reflex (move the needle / low-hanging fruit / best of both worlds / north star)

`MED` · `current`

**What it is.** Business-jargon idioms in strategy/marketing register: 'move the needle,' 'low-hanging fruit,' 'circle back,' 'on the same page,' 'best of both worlds,' 'boil the ocean,' 'north star.'

**Looks like:** `Grab the low-hanging fruit first.` · `This really moves the needle on retention.` · `The best of both worlds.`

**Why it's a tell.** Clustered dead idioms signaling a model imitating corporate speech; 'best of both worlds' especially is a generated-copy staple.

**Instead.** Replace with the literal meaning: 'the easy wins,' 'improves retention by X,' 'combines Y and Z.'

**Fine when.** An occasional idiom in a deliberately casual voice is fine; the tell is clustering.

#### T70. Depending on your specific needs

`MED` · `current`

**What it is.** Punting the decision to the reader's unstated context: 'depending on your specific needs,' 'based on your use case,' 'tailored to your requirements.'

**Looks like:** `Choose the plan that best fits your specific needs.` · `Depending on your use case, you may prefer the CLI.` · `Results will vary based on your particular setup.`

**Why it's a tell.** Offloads all specificity onto the reader.

**Instead.** Segment explicitly ('Solo devs: use the CLI. Teams: use the dashboard') or recommend a default.

**Fine when.** Fine when immediately followed by the concrete segmentation.

#### T71. It's fair/safe to say / needless to say / it goes without saying

`MED` · `current`

**What it is.** Filler certainty-frames that add no information: 'It's fair to say,' 'It's safe to say,' 'Suffice it to say,' 'Needless to say,' 'It goes without saying' (then saying it).

**Looks like:** `It's fair to say the response has been positive.` · `Needless to say, security is a priority.` · `It goes without saying that speed matters.`

**Why it's a tell.** Spends a clause establishing permission to state something before stating it; the self-negating 'goes without saying' is especially tell-tale.

**Instead.** Delete the frame: 'The response has been positive.'

**Fine when.** None.

#### T72. Imagine a world where / Picture this

`MED` · `current`

**What it is.** Vision framing opening copy with a hypothetical scene rather than a fact: 'Imagine a world where,' 'Picture this:,' 'What if you never had to…'

**Looks like:** `Imagine a world where every tool talks to every other tool.` · `Picture this: no more manual work.` · `What if you never had to think about it again?`

**Why it's a tell.** Named trope and stock AI marketing opener signaling templated hype.

**Instead.** Open with what the product does and for whom, in concrete terms.

**Fine when.** None.

#### T73. Reflexive 'worth' value-stamp (worth considering / worth exploring)

`MED` · `current`

**What it is.** 'It's worth considering,' 'worth exploring,' 'worth keeping in mind,' 'worth pointing out' — rubber-stamps an idea as merited before or instead of delivering it.

**Looks like:** `It's worth considering whether a monthly plan fits your needs.` · `This is an area worth exploring as you scale.` · `That's worth keeping in mind when choosing a tier.`

**Why it's a tell.** Hollow value-signaling asserting the reader should care without giving a reason.

**Instead.** Cut to the imperative or claim: 'Consider a monthly plan.' 'This scales well.'

**Fine when.** None.

#### T74. Please note that / Note that

`MED` · `current`

**What it is.** Politeness-plus-caution ritual prepended to a sentence, especially in docs/changelogs: 'Please note that,' 'Note that,' 'Please note:.'

**Looks like:** `Please note that this action cannot be undone.` · `Note that the API rate limit is 100 requests per minute.` · `Please note: some features require a paid plan.`

**Why it's a tell.** Disproportionately common in generated documentation; real writers put the warning in the warning.

**Instead.** Drop it and let formatting carry weight: 'This can't be undone,' or a callout box.

**Fine when.** None.

#### T75. Marveling at the topic

`MED` · `current` · `claudism`

**What it is.** Expressing wonder at the subject to flatter it and the asker: 'What a fascinating problem!,' 'This is such a rich topic,' 'Oh, this is a fun one.'

**Looks like:** `What a fascinating problem!` · `This is such a rich topic.` · `There's something really beautiful about this question.`

**Why it's a tell.** Performative intellectual delight signaling an eager-to-please tutor persona.

**Instead.** Remove the marveling and demonstrate the topic's interest through the content.

**Fine when.** None.

#### T76. Feel free to / don't hesitate to

`MED` · `classic`

**What it is.** Over-gracious permission-granting closer: 'Feel free to reach out anytime,' 'Feel free to customize this,' 'Don't hesitate to ask.'

**Looks like:** `Feel free to reach out if anything's unclear.` · `Feel free to customize this to your needs.` · `Don't hesitate to ask if you have questions!`

**Why it's a tell.** Customer-service register granting permission the reader doesn't need; boilerplate politeness.

**Instead.** Use a direct imperative: 'Reach out at support@…' or 'Customize it in Settings.'

**Fine when.** None.

#### T77. Here's the thing / Here's what I found (false-suspense reveal)

`MED` · `current` · `claudism`

**What it is.** Spoken-style lead-in framing content as a reveal or a report of the model's work, promising a contrarian insight: 'Here's the thing,' 'Here's what I found,' 'Here's what most people miss,' 'Here's the kicker,' 'Here's where it gets interesting.'

**Looks like:** `Here's the thing: most tools optimize for the wrong metric.` · `Here's what I found:` · `But here's the kicker — it's free.`

**Why it's a tell.** Manufactures suspense that rarely pays off, and 'what I found' frames the text as a live report rather than authored content.

**Instead.** Deliver the point without the drumroll: 'Most tools track vanity metrics.'

**Fine when.** None.

#### T78. Performed emotion via body clichés (racing heart, tight throat)

`LOW` · `emerging`

**What it is.** Emotion rendered through stock somatic cues — 'her heart raced,' 'a knot in his stomach,' 'his throat tightened,' 'a chill ran down her spine' — instead of stated plainly or shown with an odd specific. Bleeds into brand storytelling, founder notes, testimonials.

**Looks like:** `My heart raced as the dashboard finally loaded.` · `A knot formed in her stomach before the launch.`

**Why it's a tell.** The catalogue of body-clichés models draw on is small and uniform (measured ~81% AI vs ~38% human); humans name the feeling flatly or reach for something idiosyncratic.

**Instead.** State the emotion directly or use a concrete non-stock detail; in product copy cut manufactured feeling entirely.

**Fine when.** Body language is standard craft in fiction; the tell is the narrow set of stock clichés used reflexively.

---

<a id="cat-syntax-construction"></a>

### Sentence constructions

*Recurring sentence shapes — antithesis, sweeps, participial pileups, connective density.*

#### T79. Negation-elevation antithesis (not just X — it's Y)

`HIGH` · `current`

**What it is.** The flagship LLM sentence frame: negate a modest reading, then swap in a grander, vaguer one. Appears as 'It's not just X, it's Y,' 'not just a tool — a platform,' 'This isn't X. It's Y.' The second term is almost always more abstract/emotional than the first. Banning the literal phrase just pushes models to synonymous frames ('While X is true, Y is paramount'), so the tell is the rhetorical move, not the exact words.

**Looks like:** `It's not just a to-do list — it's a way to think.` · `TaskFlow isn't just project management. It's peace of mind.` · `This isn't just faster. It's a fundamentally different workflow.`

**Why it's a tell.** The single most-cited AI signature; roughly 3x more frequent in AI text than human, and it has not abated in newer models — one of the most persistent tells.

**Instead.** State the actual claim directly and drop the negated setup. Limit any genuine contrast to at most one per document and make the negated half carry real information.

**Fine when.** One well-earned antithesis in a long piece, where the negated half corrects a specific real misconception, is normal writing.

#### T80. Two-sentence negative reframe (period-split)

`HIGH` · `current` · `claudism`

**What it is.** The antithesis broken across two short sentences/fragments for gravitas: 'This isn't about speed. It's about trust.' Claude especially favors the clipped period-split.

**Looks like:** `This isn't about doing more. It's about doing what matters.` · `It's not a feature. It's a promise.` · `Not because it's easy. Because it's right.`

**Why it's a tell.** The full stop performs rehearsed emphasis; the affirmation half is reliably a vague abstraction (trust, matter, promise).

**Instead.** Merge into one informative sentence or cut the negation; ground both halves in concrete nouns.

**Fine when.** A single instance for a genuine, concrete contrast is acceptable.

#### T81. not A, not B, but C triple-negation turn

`HIGH` · `emerging`

**What it is.** Stacks two or three negations before the affirmative pivot: 'Not a fad, not a phase — a fundamental shift.'

**Looks like:** `Not a tool, not a service — a partner.` · `This isn't hype. It isn't a trend. It's the future of work.` · `No gimmicks, no lock-in, no surprises — just software that works.`

**Why it's a tell.** Escalation of the single antithesis into a rhythmic pile of negations, each adding drama but no facts; reads as genre parody.

**Instead.** Drop the negations and open with the affirmative claim plus one concrete reason.

**Fine when.** None.

#### T82. Front-loaded participial pileup (Boasting… / Offering…)

`HIGH` · `classic`

**What it is.** Sentence opens with one or two participial phrases before the subject appears: 'Boasting a clean interface and offering real-time sync, the app...'

**Looks like:** `Boasting an intuitive design and offering seamless integration, TaskFlow stands out.` · `Combining speed with simplicity, our platform delivers results.` · `Designed for teams and built for scale, it just works.`

**Why it's a tell.** Inverted participle-first shape is a hallmark of generated product blurbs; humans rarely open marketing sentences with 'Boasting.'

**Instead.** Lead with the subject and a strong verb: 'TaskFlow syncs in real time and keeps your interface clean.'

**Fine when.** An occasional participial opener is normal; the tell is stacking two and using it as a default shape.

#### T83. Formal connective density (Moreover / Furthermore / Additionally / Consequently)

`HIGH` · `classic`

**What it is.** Essay-register sentence-initial connectives gluing paragraphs and list items: 'Moreover,' 'Furthermore,' 'Additionally,' 'Consequently,' 'Thus,' 'Hence,' 'Nevertheless.' At far higher density than human writing, which prefers 'also,' 'and,' 'but,' 'so,' or nothing.

**Looks like:** `Moreover, the platform scales effortlessly.` · `Furthermore, it integrates with your existing stack.` · `Additionally, users can customize every view.`

**Why it's a tell.** Top-ranked stylometric marker; humans rarely open consecutive sentences with 'Moreover'/'Furthermore' outside academic writing, never in READMEs or product copy.

**Instead.** Delete or use a plain connective ('Also,' 'And,' 'But,' 'So'). Usually the sentence stands alone.

**Fine when.** Appropriate in genuinely academic or formal legal writing; flag in product/marketing/casual docs register.

#### T84. That said / that being said

`HIGH` · `current` · `claudism`

**What it is.** Concessive pivot walking back or qualifying the prior sentence, almost always after a compliment it now qualifies: 'That said,' 'That being said,' 'With that said,' 'Having said that.'

**Looks like:** `The API is fast. That said, rate limits still apply.` · `It's a solid choice for most teams. That being said, it isn't cheap.` · `With that said, let's look at the config options.`

**Why it's a tell.** One of the most reliable mid-2026 tells; the praise-pivot-qualify rhythm is the model's default suture.

**Instead.** Use 'but' or 'though,' or start a new sentence with the real point. Better: don't manufacture a balancing caveat at all.

**Fine when.** One well-placed concessive 'that said' in genuine argument is fine; the tell is reflexive per-turn qualification.

#### T85. Hedge-stacking (stacked modals)

`HIGH` · `current`

**What it is.** Piling multiple softeners in one clause: 'may potentially,' 'might in some cases,' 'could possibly sometimes,' 'can occasionally, in certain situations.'

**Looks like:** `This may potentially cause issues in some cases.` · `You might occasionally find that it could slow down.` · `It can sometimes, under certain conditions, affect performance.`

**Why it's a tell.** Redundant modal stacking is a hallmark of uncertainty-avoidance; no careful writer double-hedges.

**Instead.** Keep at most one qualifier: 'This can cause issues.'

**Fine when.** None — a single modal is fine, but stacking never is.

#### T86. One-word rhetorical-question cataphora (The result?)

`HIGH` · `emerging` · `claudism`

**What it is.** A noun phrase punctuated as a question, immediately answered: 'The result? Fewer bugs.' 'The catch? There isn't one.' 'The best part? It's free.'

**Looks like:** `The result? A workflow that runs itself.` · `The catch? There is none.` · `Our secret? Relentless simplicity.`

**Why it's a tell.** Mini call-and-response deployed reflexively to create momentum; the question is filler and the fragment could be a plain sentence.

**Instead.** Convert to a declarative ('The result is a workflow that runs itself') or show the result.

**Fine when.** Reserve genuine questions for ones the reader would actually ask; a single earned instance is tolerable.

#### T87. Less X, more Y comparative antithesis

`MED` · `current`

**What it is.** Balanced comparative pair trading one quality for another: 'Less busywork, more deep work,' 'Less noise, more signal,' 'Fewer tabs, more focus.'

**Looks like:** `Less admin, more impact.` · `Less scrolling, more living.` · `Fewer tabs, more focus.`

**Why it's a tell.** Pre-fab slot: pick a pain word and a virtue word and balance them; swapping the nouns produces infinite interchangeable taglines.

**Instead.** Say the concrete outcome: 'Cut status meetings to one a week.'

**Fine when.** A single earned instance in a tagline is fine.

#### T88. From X to Y sweep (merism), incl. 'from X to Y to Z'

`MED` · `current`

**What it is.** Range construction gesturing at totality by naming endpoints: 'from startups to enterprises,' 'everything from A to B,' and the triple 'from ideation to implementation to iteration.'

**Looks like:** `From solo founders to Fortune 500 teams.` · `Everything from your morning coffee to your midnight ideas.` · `From code to cloud to customer.`

**Why it's a tell.** Default 'we cover it all' gesture; endpoints chosen for rhetorical span, not accuracy, so it asserts nothing checkable.

**Instead.** Name the actual scope or the specific case that matters.

**Fine when.** A genuine, accurate range with a meaningful middle ('from parsing to type-checking to codegen') is fine.

#### T89. Whether you're X or Y audience spanner

`MED` · `current`

**What it is.** Opens by enumerating two or three maximally-distant reader personas to imply universal fit, often tailed by 'we've got you covered.'

**Looks like:** `Whether you're a solo founder or an enterprise team, we've got you covered.` · `Whether you're new to coding or a seasoned pro, this guide helps.` · `Whether it's your first note or your ten-thousandth.`

**Why it's a tell.** Inclusivity hedge letting the model avoid committing to a real audience; the distant personas (student/CEO) flag generated positioning.

**Instead.** Speak to one real user and situation, or state the capability flatly: 'Set up a project in under a minute.'

**Fine when.** None.

#### T90. Staccato fragment triad

`MED` · `current` · `claudism`

**What it is.** Three or more ultra-short declarative fragments in a row, anaphoric subject + copula clipped to two or three words: 'It's fast. It's private. It's yours.'

**Looks like:** `It's fast. It's private. It's yours.` · `No ads. No tracking. No nonsense.` · `Built for focus. Made for flow. Ready when you are.`

**Why it's a tell.** A Claude-era emphasis default; mechanical isometry (each fragment the same shape and length) reads as generated.

**Instead.** Collapse into one real sentence, or keep at most one fragment and break the parallelism.

**Fine when.** One punchy fragment pair for a genuine climactic beat is acceptable.

#### T91. Parallel purpose-clause pair (Designed to X. Built to Y.)

`MED` · `current` · `claudism`

**What it is.** Twin past-participle intent clauses, usually fragments: 'Designed to focus. Built to last.' 'Made for makers. Tuned for teams.'

**Looks like:** `Designed for clarity. Built for speed.` · `Made to move fast. Built to scale.` · `Engineered for privacy. Optimized for you.`

**Why it's a tell.** Matched '[Participle] for/to [noun]' template produces interchangeable taglines; structurally identical halves are the signature.

**Instead.** Keep one clause with a specific, verifiable claim; break the mirrored structure.

**Fine when.** A single such pairing with concrete, non-generic virtues is acceptable.

#### T92. Trailing participial padding (underscoring its role as…)

`MED` · `current`

**What it is.** Sentences tacking on an '-ing' clause that editorializes about what was just said: 'ensuring,' 'underscoring,' 'highlighting,' 'reflecting,' 'contributing to.'

**Looks like:** `The API is fast, ensuring a smooth experience.` · `It integrates widely, underscoring its role as a hub.` · `Users love it, reflecting the product's quality.`

**Why it's a tell.** The participial tail restates significance; a hallmark of AI sentence padding.

**Instead.** End the sentence at the fact. Delete '-ing' clauses that merely comment on the preceding statement.

**Fine when.** A participial clause that adds genuinely new information is fine.

#### T93. Feature-verb frame (allows you to / enables you to / lets you)

`MED` · `current`

**What it is.** Roundabout capability construction with the feature as subject and the reader as object: 'X allows you to Y,' 'this enables you to,' 'empowers you to,' 'makes it possible to.'

**Looks like:** `The dashboard allows you to track spending in real time.` · `Webhooks enable you to trigger custom workflows.` · `This lets you collaborate without leaving the app.`

**Why it's a tell.** Inflated indirection padding every feature into subject-allows-you-to-verb instead of stating the capability directly.

**Instead.** Make the reader the subject: 'Track spending in real time.' 'Trigger workflows with webhooks.'

**Fine when.** 'Lets you' occasionally is fine; the tell is the uniform frame on every feature line.

#### T94. Vague 'This' connective (This ensures / This means / This allows)

`MED` · `current` · `claudism`

**What it is.** Sentences opening with a bare 'This' referring loosely back, then editorializing on a generic benefit: 'This ensures…,' 'This means you can…,' 'This makes it easy to…'

**Looks like:** `This ensures a smooth experience for every user.` · `This means less time on setup and more time building.` · `This allows teams to move faster.`

**Why it's a tell.** Cohesion crutch manufacturing cause-effect after every feature sentence; the referent of 'This' is often fuzzy and the payoff generic.

**Instead.** Merge into the prior sentence or name the concrete result: 'Setup takes one command instead of a config file.'

**Fine when.** 'This' with a clear referent and a specific consequence is fine.

#### T95. Uniform sentence length (low burstiness)

`MED` · `current`

**What it is.** Sentences and paragraphs of near-identical length and structure, producing smooth, monotonous rhythm with little variation.

**Looks like:** `The tool is fast. The setup is simple. The results are clear. The team is happy.` · `It helps you plan. It helps you build. It helps you ship.`

**Why it's a tell.** 2026 detectors explicitly score burstiness; models play it safe statistically, yielding low variance human writing rarely maintains.

**Instead.** Deliberately vary sentence length — follow a long sentence with a three-word one. Read aloud and break up runs of similar-sized sentences.

**Fine when.** A corpus-level signal, not a per-sentence rule. Punchy uniform short sentences are a deliberate style (technical instructions, ad copy); never flag an individual short sentence.

#### T96. That's not to say (reflexive counter-caveat)

`MED` · `current` · `claudism`

**What it is.** Pre-emptive walk-back after a strong statement: 'That's not to say,' 'That doesn't mean,' 'Not that X is bad,' 'Of course, that isn't to suggest.'

**Looks like:** `It's fast. That's not to say it's perfect.` · `The defaults are great — that doesn't mean you can't customize.` · `Of course, that's not to suggest it works for everyone.`

**Why it's a tell.** The model can't leave a confident claim unqualified, so it immediately mints the counter-caveat; praise-then-retreat mirrors the 'that said' reflex.

**Instead.** Let the strong claim stand; state a real exception as its own later point.

**Fine when.** A genuine, load-bearing qualification stated once is fine.

#### T97. Running process narration (I'm going to… / Now I'll…)

`MED` · `emerging` · `claudism`

**What it is.** Play-by-play of the model's own steps in first-person present, carried over from tool-using/coding agent transcripts.

**Looks like:** `I'm going to start by outlining the sections.` · `Now I'll add the error handling.` · `What I'm doing here is normalizing the input first.`

**Why it's a tell.** Literal narration style of an agent executing a task; when it survives into docs/copy it exposes the generation process.

**Instead.** Rewrite in the imperative or descriptive voice: 'Start by outlining the sections' or 'The input is normalized first.'

**Fine when.** None in finished content; belongs only in live agent transcripts.

#### T98. Parallel-grammar bullets forced into lockstep

`LOW` · `current`

**What it is.** Every list item hammered into the identical grammatical shape (all verb-first imperatives, all noun phrases), producing conspicuously uniform cadence.

**Looks like:** `- Improve performance
- Reduce costs
- Increase reliability
- Simplify maintenance`

**Why it's a tell.** Perfect grammatical parallelism across every item, every time, is machine-clean in a way human lists rarely are.

**Instead.** Aim for parallelism only where it aids clarity; let natural phrasing vary.

**Fine when.** Parallel structure genuinely aids clarity in many lists; the tell is metronome regularity across every item everywhere.

---

<a id="cat-rhetorical"></a>

### Rhetorical moves

*Argument-shaped habits: false balance, staged suspense, abstract stand-ins for specifics.*

#### T99. Hollow LLM-safe truism / platitude

`HIGH` · `emerging`

**What it is.** Unfalsifiable universal 'insights' dressed as substance: 'Consistency is key,' 'Success takes time,' 'Communication is everything,' 'The best tools get out of your way.'

**Looks like:** `At the end of the day, consistency is what wins.` · `Building trust takes time.` · `Great products start with great teams.`

**Why it's a tell.** 'Confident vagueness' — a core 2026 tell: sentences that sound assured and can't be wrong because they say nothing.

**Instead.** Cut it, or replace with a specific, falsifiable claim tied to your product or data.

**Fine when.** None.

#### T100. Rule of three / tricolon reflex

`HIGH` · `classic`

**What it is.** Compulsive default to threes: adjective triads ('fast, simple, and reliable'), three-verb sentences ('plan, build, ship'), three bullets under every heading, three-part parallel clauses. Near-isometric length and identical punctuation across the three are the tell; the count itself becomes the signature.

**Looks like:** `Powerful, intuitive, and beautiful.` · `Plan it, build it, ship it.` · `Capture ideas, organize thoughts, and get things done.`

**Why it's a tell.** A single tricolon is craft; reflexive document-wide threes (and content forced into three when it's really two or five) are a pattern-recognition failure.

**Instead.** Let the count match reality — use two, four, or one. Break isometry so triads don't scan as a template.

**Fine when.** The rule of three is a legitimate classical device; one well-placed, earned triad is good writing. Flag only reflexive, document-wide repetition.

#### T101. Here's X: cataphora opener

`HIGH` · `current` · `claudism`

**What it is.** Announces a payoff before delivering it via forward-pointing 'here's': 'Here's the thing:,' 'Here's what makes it different:,' 'Here's why that matters:.'

**Looks like:** `Here's the thing: most tools solve the wrong problem.` · `Here's what nobody tells you about productivity apps:` · `Here's why teams love it:`

**Why it's a tell.** Colon-cataphora is a strong Claude-era conversational tell staging a reveal to create engagement the content may not merit.

**Instead.** Just state the point; delete the announcement and lead with the claim.

**Fine when.** None.

#### T102. Manufactured both-sidesism

`HIGH` · `classic` · `claudism`

**What it is.** Reflexive balancing structures imposing symmetry whether or not the topic is balanced: 'On one hand… on the other hand,' 'There are pros and cons,' 'While X, it's also true that Y,' 'a double-edged sword.'

**Looks like:** `On one hand, it's affordable; on the other hand, it lacks integrations.` · `There are pros and cons to each approach.` · `While automation saves time, it can also reduce flexibility.`

**Why it's a tell.** Safety training pushes evenhandedness onto questions with a clear answer, de-voicing copy that should take a position; a stronger reflex in Claude than peers.

**Instead.** Pick a side and say it. If a trade-off genuinely matters, name the specific one, not abstract 'pros and cons.'

**Fine when.** Many topics have real tradeoffs worth presenting; the tell is manufacturing symmetry (inventing a con to fill a column) when reality is lopsided.

#### T103. Abstract example instead of concrete specifics

`HIGH` · `current`

**What it is.** Plausible but generic hypotheticals in place of real numbers, names, and lived detail: 'Imagine a developer who…' rather than an actual case.

**Looks like:** `Imagine a team that ships faster than ever before.` · `Consider a user who wants to save time.` · `Picture a world where everything just works.`

**Why it's a tell.** Humans draw on specific figures and named experiences; AI generates vague plausible scenarios. Missing specificity is one of the strongest tells.

**Instead.** Replace every hypothetical with a real example: a named customer, an exact number, a concrete before/after.

**Fine when.** A brief illustrative hypothetical is fine when a real example genuinely isn't available and the point needs one.

#### T104. Ultimately / In the end false-synthesis closer

`HIGH` · `current`

**What it is.** Paragraph- or answer-ending 'Ultimately,' 'In the end,' 'At its core,' pretending to distill everything into a final truth, followed by a bland generality.

**Looks like:** `Ultimately, the right tool is the one that fits your workflow.` · `In the end, consistency is what matters.` · `At its core, it comes down to trust.`

**Why it's a tell.** Performs closure without adding information; the sentence after is nearly always a truism.

**Instead.** Delete the closer; if a conclusion is needed, make it specific and non-obvious.

**Fine when.** 'Ultimately' can genuinely mark a final logical consequence; the tell is the empty-truism payload.

#### T105. Think X, but Y / It's like X for Y analogy pitch

`MED` · `current`

**What it is.** Positions the product as a known thing plus a twist: 'Think Notion, but for engineers,' 'Imagine email without the noise,' 'It's like Figma — but for words.'

**Looks like:** `Think Slack, but for async teams.` · `Imagine a spreadsheet that thinks for you.` · `It's Uber, but for X.`

**Why it's a tell.** Default LLM elevator-pitch shape leaning on borrowed identity rather than describing the thing on its own terms.

**Instead.** Describe what the product actually does in its own words; use an analogy only when it genuinely clarifies, once.

**Fine when.** A single genuinely clarifying analogy is good copywriting.

#### T106. Contrast-then-resolve paragraph engine (X. But Y.)

`MED` · `current` · `claudism`

**What it is.** Reflexive setup/payoff rhythm structuring whole paragraphs: acknowledge a problem, then pivot with 'But' to the resolution.

**Looks like:** `Building software is hard. But it doesn't have to be.` · `You've tried everything. But you haven't tried this.` · `Deadlines are stressful. But they don't have to be.`

**Why it's a tell.** Default two-beat tension-and-release; when every section follows problem→But→solution, the structural preference shows through.

**Instead.** Vary paragraph architecture; sometimes make the point without staging an obstacle first.

**Fine when.** A single genuine problem/solution pivot is normal; the tell is every paragraph following it.

#### T107. Circular closer restating the opener

`MED` · `current`

**What it is.** The final sentence paraphrases the opening thesis, so the piece ends where it began.

**Looks like:** `Opening: 'X is a powerful tool for managing tasks.' Closing: 'In short, X is a powerful tool that makes managing tasks easier.'`

**Why it's a tell.** Essay convention producing zero new information at the end; human writing ends on the sharpest forward point.

**Instead.** End on the most useful or concrete point; never close by paraphrasing your first sentence.

**Fine when.** None.

#### T108. Dialectical 'both things can be true' balance move

`MED` · `emerging` · `claudism`

**What it is.** Reflexive resolution-by-holding-two-truths: 'Both things can be true,' 'There's a real/genuine tension here,' 'It's a bit of both,' 'The tension is the point.'

**Looks like:** `Both things can be true: it's powerful and it's overkill for most teams.` · `There's a genuine tension here.` · `Honestly, it's both.`

**Why it's a tell.** Signature Claude reasoning cadence manufacturing evenhandedness; in copy it hedges the very point the content exists to make.

**Instead.** Commit to the claim the piece actually needs and drop the balancing frame.

**Fine when.** When two things genuinely are both true and both load-bearing, say so once, plainly.

#### T109. Vague authority attribution (Experts argue / Studies show)

`MED` · `classic`

**What it is.** Citing unnamed authorities: 'Experts argue,' 'Studies show,' 'Research indicates,' 'Industry reports suggest,' and the distancing 'One could argue,' 'Some might say,' 'Critics might point out.'

**Looks like:** `Experts argue this is the future.` · `Studies show users prefer simplicity.` · `One could argue this is the best tool in its class.`

**Why it's a tell.** Concrete writing names a source or number; AI reaches for anonymous authority (or launders its own claim through a phantom 'one') because it lacks a specific one.

**Instead.** Cite the actual study/person/number, or own the claim directly: 'This is the best tool in its class.'

**Fine when.** Citing a named, real source is good writing; only vague unnamed attribution is the tell.

#### T110. Reader-directed rhetorical hooks (Sound familiar? / Ever wondered? / Tired of X?)

`MED` · `current`

**What it is.** Engagement-bait questions opening a section or pitch: 'Sound familiar?,' 'Ever wondered why?,' 'What if you could?,' 'We've all been there,' 'Tired of X?'

**Looks like:** `Spending hours on manual reports? Sound familiar?` · `What if setup took thirty seconds instead of a day?` · `Tired of juggling five tools?`

**Why it's a tell.** Content-farm/infomercial device manufacturing relatability; stacks into a recognizable rhythm.

**Instead.** Lead with the concrete pain or fact, stated declaratively.

**Fine when.** A single specific, earned reader question is legitimate; the tell is the generic template version.

#### T111. Neat-bow resolution (every thread tied off)

`MED` · `emerging`

**What it is.** Compulsion to resolve cleanly: every section lands on acceptance, every tension reconciles, every doc closes on an up-note with no loose ends.

**Looks like:** `And that's the beauty of it — everything just works, together, in harmony.` · `In the end, it all comes together.` · `Ultimately, it's a win for everyone.`

**Why it's a tell.** A structure-only tell (AI identifiable from shape alone at ~93% in 2026 research); real writing has ragged edges — unresolved caveats, abandoned sub-points, lopsided emphasis.

**Instead.** Let at least one caveat stay unresolved; end a section without a reconciling sentence; cut the totalizing final line.

**Fine when.** None — genuine closure of a genuinely resolved point is fine, but uniform tidy closure across every section is the tell.

#### T112. Restating the question before answering

`MED` · `current` · `claudism`

**What it is.** Mirroring the query back as a comprehension check before answering: 'So you're asking whether…,' 'If I understand correctly, you want to know…,' 'The question here is really about…'

**Looks like:** `So you're asking whether the free tier includes API access.` · `If I understand correctly, you want to know how to migrate.` · `The question here is really about pricing.`

**Why it's a tell.** Conversational alignment move padding the front of a reply; restates what the reader already knows they asked. Claude does this more reflexively than peers.

**Instead.** Cut the restatement and answer; the heading or context already frames the topic.

**Fine when.** None.

#### T113. Praise-then-pivot sandwich

`MED` · `current` · `claudism`

**What it is.** When correcting or disagreeing, opening with praise and a 'but'/'though' to cushion a correction that should be direct.

**Looks like:** `That's a great instinct, though there's a subtlety here.` · `You're absolutely right that X — that said, Y.` · `I love where you're going with this, but consider...`

**Why it's a tell.** Compulsory compliment-before-critique is a conflict-averse RLHF artifact burying the signal under obligatory flattery.

**Instead.** State the correction plainly first; compliment only when true and relevant.

**Fine when.** None.

#### T114. Pre-answer validation ritual

`MED` · `current` · `claudism`

**What it is.** Spending the first clause affirming the user's judgment, feelings, or premise before delivering substance.

**Looks like:** `That's a really smart way to think about it, and you're right to be cautious here.` · `You're asking exactly the right question.` · `It makes total sense that you'd feel that way.`

**Why it's a tell.** Obligatory emotional/intellectual validation before content is a therapy-inflected RLHF pattern.

**Instead.** Skip validation and answer; affirm a premise only when it's load-bearing for the explanation.

**Fine when.** None.

#### T115. Think of it as / like (patronizing analogy reflex)

`LOW` · `current`

**What it is.** Reflexively reframing every concept as a folksy analogy the reader didn't ask for.

**Looks like:** `Think of it as a highway system for your data.` · `Think of it like a Swiss Army knife for developers.` · `It's basically a Rolodex, but smart.`

**Why it's a tell.** Teacher-mode filler characteristic of assistant prose.

**Instead.** Explain the thing directly; reserve analogy for genuinely hard concepts, once.

**Fine when.** One analogy that truly aids understanding of something difficult is fine.

#### T116. Concessive dismissal (Despite its challenges…)

`LOW` · `current`

**What it is.** Fixed balance formula: acknowledge upside, name vague challenges, wave them away to sound measured: 'Despite its challenges,' 'While not without limitations,' 'It's not perfect, but.'

**Looks like:** `Despite its challenges, the future looks bright.` · `While not without limitations, it delivers real value.` · `It's not perfect, but it gets the job done.`

**Why it's a tell.** Reflexive both-sides-then-reassure move producing empty even-handedness.

**Instead.** Be specific about the actual limitation and what you're doing about it, or omit the concession.

**Fine when.** Naming a real, specific limitation and a real response is good writing.

---

<a id="cat-structure-formatting"></a>

### Structure & formatting

*Reflexive document architecture — bulletization, headers, recaps, bold labels, callouts.*

#### T117. Bold-lead bullet with colon (\*\*Term:\*\* gloss)

`HIGH` · `current` · `claudism`

**What it is.** Vertical lists where every item opens with a bolded phrase, a colon, then an explanatory sentence, repeated mechanically down the whole list.

**Looks like:** `**Security**: Environment-based configuration keeps secrets out of code.` · `**Speed:** Requests resolve in milliseconds.` · `- **Type safety:** Catch errors before runtime.`

**Why it's a tell.** The single most recognizable AI list pattern; the perfectly regular bold-noun-colon-sentence cadence reads as generated on sight, and Claude is a heavy user.

**Instead.** Write flowing prose, or use a real table for reference material; don't bold the lead of every bullet or colon-gloss every item.

**Fine when.** The 'Term: explanation' shape is the correct definition-list pattern for genuine reference material — glossaries, API parameter tables, CLI option lists. The tell is applying it to everything, including prose that should stay prose.

#### T118. Inline bold meta-labels (Why it matters: / The catch:)

`HIGH` · `emerging`

**What it is.** Newsletter-style bolded inline labels starting sentences to categorize the next clause: '\*\*Why it matters:\*\*,' '\*\*The catch:\*\*,' '\*\*What this means for you:\*\*,' '\*\*Bottom line:\*\*.'

**Looks like:** `**Why it matters:**` · `**The catch:**` · `**What this means for you:**`

**Why it's a tell.** Bold-label-colon-explanation move lifted from briefing newsletters (Axios); sprinkled through an answer it reads as a machine imitating editorial house style.

**Instead.** Remove the bold labels and write the sentence plainly ('The tradeoff is…').

**Fine when.** A publication whose actual house style is this format is the exception.

#### T119. Reflexive bulletization

`HIGH` · `current`

**What it is.** Any multi-part answer converted to a bulleted/numbered list even when two to four flowing sentences would read better and preserve the connective logic.

**Looks like:** `There are a few things to keep in mind:
- It's fast
- It's affordable
- It's easy to set up` · `Consider the following factors:`

**Why it's a tell.** Humans list only genuinely parallel discrete items; models list reflexively because RLHF rewarded scannability, chopping causal/narrative content into fragments that lose the 'because' and 'therefore.'

**Instead.** Default to prose; reserve lists for 4+ truly parallel, order-independent items (steps, specs, options).

**Fine when.** Lists are correct for genuinely parallel discrete items; the tell is chopping connected reasoning into disconnected bullets.

#### T120. Emoji as headers / bullets / list markers

`HIGH` · `current`

**What it is.** Emoji standing in for bullet points, prefixing every list item, or decorating headings: '## 🚀 Getting Started,' '✅ Fast\n🔒 Secure,' '💡 Pro tip:.'

**Looks like:** `## 🚀 Getting Started` · `🚀 Fast
🔒 Secure
💡 Simple` · `### 📦 Installation`

**Why it's a tell.** Decorative emoji-per-item and emoji-decorated headings in technical docs are near-exclusively an LLM/marketing-bot habit; one of the most-cited over-formatting tells.

**Instead.** Use plain bullets and plain heading text in sentence case; remove emoji from product docs entirely.

**Fine when.** A deliberately playful consumer brand may use them; judge against the product's established voice, not a universal ban.

#### T121. Check/cross comparison and checkmark benefit bullets (✅ / ❌ / ✓)

`HIGH` · `emerging`

**What it is.** Comparisons built from ✅ for good and ❌ for bad (Do/Don't or Us vs. Them grids), and benefit lists where every line begins with a check glyph.

**Looks like:** `✅ Async by default   ❌ Blocking calls` · `| Feature | Us ✅ | Them ❌ |` · `✓ Free forever
✓ No credit card`

**Why it's a tell.** The green-check/red-cross comparison layout and check-prefixed benefit bullets surged in 2024-2026 and appear almost nowhere in pre-LLM human docs.

**Instead.** Use a plain table with words (Yes/No, Supported/Not supported) or prose; plain bullets for benefits.

**Fine when.** None in professional product copy.

#### T122. Anaphoric line openers (You get… You get…)

`MED` · `current` · `claudism`

**What it is.** Consecutive sentences/items beginning with the same word or phrase for cumulative effect, the final item usually swerving to something vague/emotional: 'You get speed. You get security. You get support.' Also 'No X. No Y. No Z.' and 'We believe in X…'

**Looks like:** `You get more done. You get more time. You get more freedom.` · `No setup. No credit card. No catch.` · `We believe in simplicity. We believe in speed. We believe in you.`

**Why it's a tell.** LLMs over-apply anaphora to generate rhythm on demand; the repeated frame plus tricolon count reads as manufactured cadence.

**Instead.** Use anaphora at most once for a genuinely climactic list; otherwise vary openings.

**Fine when.** Deliberate anaphora is a real rhetorical device; the tell is reflexive over-application.

#### T123. Signposted conclusion (In conclusion / To sum up / In summary)

`MED` · `classic`

**What it is.** Announcing the summary rather than concluding: 'In conclusion,' 'To sum up,' 'In summary,' plus tacked-on 'Key Takeaways' / 'TL;DR' recap sections regardless of length.

**Looks like:** `In conclusion, the tool saves time.` · `## Key Takeaways` · `To sum up, here's what matters.`

**Why it's a tell.** Betrays the rigid intro-body-conclusion essay template; short content doesn't need a summary that just repeats the body.

**Instead.** End on the strongest concrete point with no label. Cut recap sections from short and medium content.

**Fine when.** A genuine one-line synthesis at the end of genuinely long content can help — folded into the last sentence, not a labeled box.

#### T124. A few things to consider (enumeration preamble)

`MED` · `current`

**What it is.** Meta-sentence announcing a forthcoming list of caveats before delivering it: 'There are a few things to consider,' 'Here are several factors to keep in mind,' 'A couple of considerations,' 'A few things:.'

**Looks like:** `There are a few things to consider before upgrading.` · `Here are several factors to keep in mind.` · `Two things worth noting:`

**Why it's a tell.** Scaffolds the answer by announcing structure before delivering it; the meta-preamble plus inevitable bullet list is a recognizable shape.

**Instead.** Skip the announcement and give the list, or fold two or three points into prose.

**Fine when.** None.

#### T125. Distributed hedging (structural)

`MED` · `emerging` · `claudism`

**What it is.** Whole-document pattern: hedges sprinkled into nearly every sentence rather than confined to one caveat, producing uniform tentativeness with no sentence fully committing.

**Looks like:** `This generally works well, though results may vary, and in most cases you'll likely see some improvement, at least to some extent.` · `It's often a solid choice, and while it can occasionally fall short, it typically performs reasonably well.`

**Why it's a tell.** A leading 2026 discriminator: Claude spreads caution across the text instead of quarantining it, so no sentence stands unqualified.

**Instead.** Give hedges a budget — most sentences commit fully; concentrate genuine uncertainty in one clearly-marked spot.

**Fine when.** Some documents (safety, medical, forecasting) legitimately carry hedges in most sentences. Flag the texture where NO sentence commits, not the count.

#### T126. Bolded TL;DR / Bottom-line / Key Takeaways callout

`MED` · `current`

**What it is.** A bolded summary lead at top or bottom: '\*\*TL;DR:\*\*,' '\*\*Bottom line:\*\*,' '\*\*In short:\*\*,' '\*\*Key takeaway:\*\*,' plus upfront '\*\*Quick answer:\*\*' / '\*\*At a glance:\*\*' boxes that mirror the body.

**Looks like:** `**TL;DR:** it's faster and cheaper.` · `**Bottom line:** ship it.` · `**Quick answer:** you don't need Redis for this.`

**Why it's a tell.** Stock assistant scaffold for summarizing itself; the label plus bold is the tell, and the pre-summary duplicates the body.

**Instead.** Write the summary sentence unlabeled, or for short content cut it entirely; let the first sentence be the summary in long content.

**Fine when.** A genuine TL;DR on a very long technical doc can help — unlabeled, or as one line.

#### T127. Gerund / stock section headings (Getting Started, Final Thoughts)

`MED` · `current`

**What it is.** Recurring boilerplate heading phrasings regardless of topic: 'Getting Started,' 'Understanding the Basics,' 'Putting It All Together,' 'Wrapping Up,' 'Final Thoughts.'

**Looks like:** `Getting Started` · `Putting It All Together` · `Final Thoughts`

**Why it's a tell.** A stable documentation/blog-template default; their sameness across unrelated pieces marks them as boilerplate.

**Instead.** Write headings specific to the content ('Installing the CLI'); avoid 'Final Thoughts' and 'Putting It All Together.'

**Fine when.** 'Getting started' as a genuine first-run section heading is fine; the tell is the full stock stable used reflexively.

#### T128. Dramatic ominous noun-phrase headings (The Hidden Cost of X)

`MED` · `emerging`

**What it is.** Section headings recast as portentous noun phrases instead of plain labels: 'The Pricing Trap,' 'The Hidden Cost of Convenience,' 'The Real Reason X Fails,' 'The Uncomfortable Truth About Y.'

**Looks like:** `The Hidden Cost of Free Plans` · `The Real Reason Your Team Is Slow` · `The Onboarding Trap`

**Why it's a tell.** A 2026-flagged tell: dramatizes an ordinary heading into a suspenseful noun phrase promising a revelation the section rarely delivers.

**Instead.** Use a plain, informative heading: 'How free-plan limits add up.'

**Fine when.** An occasional editorial hook heading in genuine opinion writing is acceptable.

#### T129. Question-as-header

`MED` · `current`

**What it is.** Section headers phrased as reader-voiced questions, FAQ-style, even outside an FAQ: 'Why does this matter?,' 'What's next?,' 'But is it secure?'

**Looks like:** `Why does this matter?` · `What's next?` · `But is it secure?`

**Why it's a tell.** An SEO/FAQ pattern models absorbed; ventriloquizes the reader and adds a chatty layer over a plain label.

**Instead.** Use noun-phrase headers ('Security,' 'Getting started') or none.

**Fine when.** FAQ-style question headers are legitimate and effective in genuine Q&A/support content, and help search. Flag only outside real FAQ contexts or when every header becomes a question.

#### T130. Colon-then-list reflex

`MED` · `current`

**What it is.** A lead-in sentence ending in a colon that mechanically hands off to a bulleted list: 'Here's what you need to know:,' 'The benefits are clear:,' 'There are three things to consider:.'

**Looks like:** `There are three things to consider:` · `Here's how it works:` · `The advantages are clear:`

**Why it's a tell.** Reflexive announce-then-bullet structure signals a model reaching for a list scaffold; the announcing clause is filler.

**Instead.** Integrate the items into a sentence, or cut the announcing clause and let the list stand.

**Fine when.** A colon introducing a genuinely parallel list is standard; the tell is the empty announcing clause.

#### T131. Table where a sentence fits

`MED` · `current`

**What it is.** Rendering a two-row or two-item comparison as a full markdown table when a sentence would carry the same information.

**Looks like:** `| Plan | Price |
|------|-------|
| Free | $0 |
| Pro | $10 |` · `Here's a comparison table:`

**Why it's a tell.** Tables have overhead that only pays off with several rows and columns; a table for one differentiator is formatting theater. Gemini-family especially over-tables.

**Instead.** Use a table only for genuinely multi-dimensional data (3+ rows AND 2+ meaningful columns); for one or two facts, write the sentence.

**Fine when.** Tables are the right tool for genuinely tabular data; flag only the inflated two-item case.

#### T132. Header for every micro-section

`MED` · `current`

**What it is.** H2/H3 headers stamped onto one- or two-sentence sections, over-segmenting short content into a formal skeleton.

**Looks like:** `## Overview
This tool syncs your files.

## How it works
It watches a folder and uploads changes.`

**Why it's a tell.** Real documents earn a header when a section has enough content to navigate to; headers over two-sentence blocks signal a template applied top-down.

**Instead.** Add a header only when the section runs several paragraphs and a reader might jump to it.

**Fine when.** None — but genuine reference docs with many short defined sections are the exception.

#### T133. Intro-body-conclusion mini-essay shape

`MED` · `classic`

**What it is.** The five-paragraph-essay skeleton imposed on everything: a framing intro that previews, a body, a wrap-up that concludes, even for a request wanting one direct answer.

**Looks like:** `In today's fast-paced world, choosing the right tool matters. In this response, I'll walk through...` · `Overall, as we've seen, X remains a strong choice.`

**Why it's a tell.** The preview-deliver-conclude arc is a schoolroom template; product copy and direct answers just deliver.

**Instead.** Lead with the answer; cut previews ('In this response I'll…') and conclusions ('Overall, as we've seen…').

**Fine when.** Genuinely long-form essays legitimately have intros and conclusions; the tell is imposing the shape on short/direct content.

#### T134. Learning-outcome preview (By the end of this guide, you'll…)

`MED` · `current`

**What it is.** Course-syllabus framing prepended to docs/tutorials: 'In this guide, we'll cover…,' 'By the end of this article, you'll be able to…,' 'This post will walk you through.'

**Looks like:** `In this guide, we'll walk through everything you need to know.` · `By the end of this tutorial, you'll have a working app.`

**Why it's a tell.** A promised-syllabus preamble that delays the content; part of the intro-body-conclusion reflex.

**Instead.** Start doing the thing; if a preview helps, make it one specific line.

**Fine when.** A genuine one-line scope statement on a long tutorial is fine.

#### T135. N reasons / N ways listicle skeleton

`MED` · `current`

**What it is.** The numbered-listicle frame promising a round count: '3 reasons to switch,' '5 ways to improve your workflow,' 'The 7 best practices for.'

**Looks like:** `3 reasons to switch today:` · `Here are 5 ways to improve your workflow` · `The 7 best practices for...`

**Why it's a tell.** The round-number promise is content-farm DNA; signals template over substance.

**Instead.** Drop the numbered promise; cover what matters in the shape the content demands.

**Fine when.** None.

#### T136. Per-section mini-recap (In short, / The takeaway:)

`MED` · `current`

**What it is.** Each section closing with a one-line restatement of what it just said: 'In short,' 'The takeaway:,' 'Bottom line.'

**Looks like:** `In short, it's fast and cheap.` · `The takeaway: simpler is better.` · `Bottom line, it just works.`

**Why it's a tell.** Recapping at the end of every section is a comprehension-anxiety tic; the reader just read it.

**Instead.** Trust the section to make its point; keep at most one synthesis for the whole piece.

**Fine when.** None.

#### T137. Symmetric Pros/Cons or Do/Don't scaffold

`MED` · `current`

**What it is.** Reflexively splitting analysis into two balanced halves even when reality is lopsided, padding the weaker side: '\*\*Pros:\*\* … \*\*Cons:\*\* …,' '✅ Do this / ❌ Don't,' 'On one hand… on the other.'

**Looks like:** `**Pros:** ...
**Cons:** ...` · `✅ Do this
❌ Don't do that` · `On one hand... On the other hand...`

**Why it's a tell.** Tidy two-column balance implies false symmetry; models pad the weaker side to keep the scaffold even.

**Instead.** State the real balance in prose; if something is mostly upside with one caveat, say that.

**Fine when.** A genuine, roughly-balanced pros/cons comparison is fine as prose or a real table.

#### T138. Nested sub-bullet outlines

`MED` · `current`

**What it is.** Proliferating second- and third-level sub-bullets turning a casual answer into a formal indented outline hierarchy.

**Looks like:** `- Setup
  - Install the CLI
    - Run the installer
    - Verify the version
  - Configure
- Usage`

**Why it's a tell.** Deep nesting mirrors an internal plan/spec rather than readable copy; humans rarely go past one level in prose contexts.

**Instead.** Flatten to a single level or convert to prose/steps; if hierarchy is essential, use headers plus short lists.

**Fine when.** Genuinely hierarchical reference material (a nested config schema) legitimately nests.

#### T139. Sentence-per-paragraph staccato

`MED` · `emerging`

**What it is.** Breaking prose into a stack of one-sentence paragraphs for supposed punch, LinkedIn/hustle-post style.

**Looks like:** `It changes everything.

Seriously.

And here's why.` · `This is the part most people miss.

Read that again.`

**Why it's a tell.** Mechanical one-line paragraphing manufactures false emphasis and fragments the argument; an engagement-bait cadence from social copy.

**Instead.** Group related sentences into real paragraphs; use an isolated sentence only for one genuinely climactic beat.

**Fine when.** An occasional one-sentence paragraph for real emphasis, or in genuine short-form social copy, is fine.

#### T140. Horizontal-rule section dividers (---)

`MED` · `current` · `claudism`

**What it is.** Frequent '---' rules inserted between every section, even short ones.

**Looks like:** `...that's the summary.

---

## Next steps` · `### Step 1
...

---

### Step 2`

**Why it's a tell.** Liberal horizontal rules between short sections are an assistant layout habit; human authors rarely rule-divide a short document.

**Instead.** Rely on headings and whitespace; delete the rules or reserve one for a genuine top-level break.

**Fine when.** A single rule at a major top-level shift is fine.

#### T141. Callout-block / admonition reflex (Note / Tip / Warning)

`MED` · `current` · `claudism`

**What it is.** Reflexively wrapping every aside in a callout or bolded admonition label: '\*\*Note:\*\*,' '\*\*Tip:\*\*,' '\*\*Pro tip:\*\*,' '\*\*Important:\*\*,' '> \*\*Warning:\*\*.'

**Looks like:** `**Note:** This requires v2 or later.` · `**Pro tip:** cache aggressively.` · `> **Important:** back up your data first.`

**Why it's a tell.** Every incidental remark becoming a formal Note/Tip/Warning is a docs-template reflex; real writers fold most into the sentence flow.

**Instead.** Inline the aside as a normal sentence; reserve callouts for genuinely load-bearing warnings.

**Fine when.** Admonition callouts are a standard, endorsed docs convention (Sphinx, MkDocs, Docusaurus, GitHub). In real documentation they're good practice; flag reflexive overuse and manually-faked bolded labels in non-doc prose.

#### T142. Enumerating preface / unprompted recap (A few things: / To recap)

`LOW` · `current`

**What it is.** Spoken setup counting upcoming points ('A few things:,' 'Two things:') or restating prior context as a session summary ('To recap what we've covered,' 'So, to summarize what we've done').

**Looks like:** `A few things:` · `To recap what we've covered so far:` · `So, to summarize what we've done:`

**Why it's a tell.** Conversational scaffolding; 'what we've done' presumes a running session with accumulated history that standalone copy doesn't have.

**Instead.** Replace the count with a list/heading; if a summary helps, give it a heading and drop the 'we've done' framing.

**Fine when.** A labeled 'Summary' section for genuinely long content is fine.

#### T143. Title Case headings everywhere

`LOW` · `classic`

**What it is.** Every major word capitalized (Getting Started With The API), applied uniformly even in casual README/blog contexts where sentence case is idiomatic.

**Looks like:** `Getting Started With The API` · `How To Configure Your Environment` · `Frequently Asked Questions About Billing`

**Why it's a tell.** Uniform Title Case across all headers reads as templated; much human dev writing uses sentence case.

**Instead.** Use sentence case ('Getting started with the API') consistently.

**Fine when.** Title case is a legitimate standard convention (AP style, most marketing and formal docs). Flag only in developer README/blog register where sentence case is idiomatic.

#### T144. Colon-subtitle titles (X: The Y of Z)

`LOW` · `current`

**What it is.** Two-part headings joined by a colon in a subtitle formula: 'Caching: The Secret to Speed,' 'Onboarding: Your First Five Minutes,' 'Observability: Why It Matters Now.'

**Looks like:** `Caching: The Secret to Speed` · `Onboarding: Your First Five Minutes` · `Observability: Why It Matters Now`

**Why it's a tell.** The 'Topic: The Adjective Noun of Benefit' formula is heavily overrepresented in LLM marketing output.

**Instead.** Use a single plain heading.

**Fine when.** The colon-subtitle is a standard, respectable format in books, papers, and articles. Flag only in bulk/generated blog contexts.

#### T145. Enumerating non-sequential prose (1/2/3 reflex)

`LOW` · `current`

**What it is.** Turning related but unordered points into a numbered 1./2./3. list, implying a rank or sequence that isn't there.

**Looks like:** `There are three reasons this matters: 1. ... 2. ... 3. ...` · `Consider the following: 1) cost, 2) speed, 3) safety.`

**Why it's a tell.** Numbering implies order or priority; the reflex to enumerate every small cluster is an assistant structuring habit.

**Instead.** Use prose ('for three reasons: cost, speed, and safety') or plain bullets; reserve numbers for real sequences.

**Fine when.** Numbered lists are correct for genuinely sequential steps.

---

<a id="cat-punctuation-typography"></a>

### Punctuation & typography

*Surface signals: the em-dash flood, curly quotes in plain text, emoji, arrows.*

#### T146. Exclamation-mark inflation

`HIGH` · `current`

**What it is.** Exclamation points on neutral or procedural statements to inject upbeat energy.

**Looks like:** `Your changes have been saved!` · `Let's get started!` · `Here are your results!`

**Why it's a tell.** Assistant tuning biases toward warm, high-energy punctuation; a trail of exclamation points on mundane statements is a strong at-a-glance tell.

**Instead.** Default to periods; allow at most one exclamation point per document, for something genuinely worth it.

**Fine when.** A deliberately playful consumer brand voice may use them sparingly; judge against the product's established voice.

#### T147. Bold key terms mid-sentence

`HIGH` · `current` · `claudism`

**What it is.** Bolding the 'important' word or noun phrase inside running prose, often several times per paragraph.

**Looks like:** `This is where **caching** becomes essential.` · `The key is **consistency** and **repetition**.` · `You get **speed**, **safety**, and **simplicity**.`

**Why it's a tell.** Humans rarely bold scattered terms inside paragraphs; assistant training rewards 'highlight the key concept,' producing a peppered-bold texture.

**Instead.** No inline bold in prose; let sentence structure and word choice carry emphasis.

**Fine when.** One bolded term per section for a genuinely critical warning is tolerable.

#### T148. Em-dash flood

`HIGH` · `current`

**What it is.** Em dashes deployed multiple times per paragraph for appositives, interruptions, and dramatic pauses, at a rate far above human baseline. Often the spaced typographic em dash (' — ') rather than a typed double hyphen.

**Looks like:** `The result — and this is the important part — speaks for itself.` · `It's fast, reliable — and surprisingly cheap.` · `We didn't just fix it — we rebuilt the whole thing.`

**Why it's a tell.** The highest-signal character in AI-detection folklore. Note the mid-2026 shift: OpenAI shipped a suppression toggle (Nov 2025) and GPT-5.x/Gemini 3 use them far less by default, while the Claude family still floods them — so the flood is drifting from a universal tell toward an increasingly Claude-specific one.

**Instead.** Cap at roughly one em dash per few hundred words; prefer commas, colons, parentheses, or periods. In README/CLI copy prefer none.

**Fine when.** A single em dash is correct, standard punctuation and a deliberate signature for many strong human writers. Presence is never the tell — only rate (several per short paragraph). And post-2025 suppression means the ABSENCE of em dashes no longer indicates human authorship; don't overcorrect into em-dash-phobia.

#### T149. Reveal-pivot / antithesis dash (not X — Y)

`HIGH` · `current` · `claudism`

**What it is.** Em dash used specifically as a rhetorical turn — a setup clause, a dash, then a punchy contrast or 'reveal': 'This isn't just a feature — it's a philosophy,' 'Not a bug — a design choice,' 'Not louder — clearer.'

**Looks like:** `This isn't just a feature — it's a philosophy.` · `Not a bug — a design choice.` · `Not more meetings — better ones.`

**Why it's a tell.** Combines the em-dash habit with the negate-then-elevate frame; the dash performs a dramatic beat the content hasn't earned, and the second term is the vaguer, grander one.

**Instead.** Rewrite as two plain declarative sentences, or cut the negated setup and just state the point.

**Fine when.** A single genuine contrast delivered with a dash is fine; the tell is the reflexive negate-elevate cadence.

#### T150. Curly quotes and apostrophes in plain-text contexts

`HIGH` · `emerging` · `claudism`

**What it is.** Typographic quotes (' ' “ ”) and the curly apostrophe (’) emitted in READMEs, code comments, terminal snippets, config, and CLI microcopy where straight ASCII (' and ") is the universal convention.

**Looks like:** `it’s (with U+2019) instead of it's` · `the “default” value instead of the "default" value` · `don’t forget to run the setup script`

**Why it's a tell.** A human typing in an editor or terminal produces straight ASCII; curly punctuation in monospace/plaintext is machine typography that survives even after headers, bold, and emoji are stripped.

**Instead.** Force straight ' and " everywhere in code and CLI text; add a lint/CI rule rejecting U+2018/2019/201C/201D in source.

**Fine when.** Curly quotes and apostrophes are the CORRECT typography in rendered prose, marketing HTML, and published docs — CMSes and word processors insert them automatically. Flag them ONLY in plain-text/ASCII source, never in body copy that renders.

#### T151. Semicolon (and comma splice) as em-dash substitute

`MED` · `emerging`

**What it is.** Direct fallout of the 2025-2026 em-dash crackdown: the 'dramatic clause join' slot now gets filled by a semicolon or comma splice at above-human frequency in casual/marketing/microcopy contexts.

**Looks like:** `The interface is clean; the workflow is faster.` · `It works; it just works differently.` · `You save time, you save money, it's that simple.`

**Why it's a tell.** Em-dash suppression moved the tell rather than removing it; a high semicolon rate where humans rarely reach for one signals the same clause-splicing habit.

**Instead.** Split into two sentences or use a period. Reserve semicolons for lists whose items contain internal commas.

**Fine when.** Semicolons are correct and normal in formal prose and complex lists; the tell is frequency in casual/marketing contexts that don't call for them.

#### T152. Emoji tone decoration and status sign-offs (✨ 👉 🎉 / Done! ✅)

`MED` · `current`

**What it is.** Tone-emoji dropped into professional prose or closing a completed action: 'Ship faster ✨,' 'Check out the new dashboard 👉,' 'You're all set! 🎉,' 'Done! ✅,' 'Let me know what you think 😊.'

**Looks like:** `Ship faster ✨` · `Check out the new dashboard 👉` · `Done! ✅`

**Why it's a tell.** Sprinkled tone-emoji and celebration/status emoji as completion markers are an assistant/marketing-bot affect; the trailing ✨ and 👉 pointer are especially strong tells.

**Instead.** Remove emoji from product copy, README, and docs; if a channel truly wants them, cap at one and never as a pointer.

**Fine when.** A deliberately playful brand voice may use one occasionally; the tell is default cheerfulness applied to a voice that isn't cheerful.

#### T153. Arrow connectors and decorative mid-dots (→ / •)

`MED` · `current`

**What it is.** Unicode right arrow as a prose connective for transformations/pipelines and mid-dot separators as flourishes: 'input → output,' 'idea → prototype → launch,' 'Fast • Simple • Reliable.'

**Looks like:** `input → output` · `idea → prototype → launch` · `Fast • Simple • Reliable`

**Why it's a tell.** → as a sentence-level connective and the arrow-chain 'flow diagram' in prose are disproportionately LLM habits; humans write 'to,' 'then,' or 'leads to.'

**Instead.** Use words ('from X to Y,' 'then,' 'which causes'); reserve → for literal UI navigation paths if house style allows.

**Fine when.** Arrows are standard and correct in technical contexts — pipelines, state transitions, keyboard shortcuts (Cmd → Settings). Flag only in flowing marketing prose.

#### T154. Typographic ellipsis and suspense trail (…)

`LOW` · `current`

**What it is.** The single-glyph ellipsis (…, U+2026) and trailing-off ellipses for suspense or an implied 'and more': 'And that's just the beginning…,' 'But there's a catch…'

**Looks like:** `And that's just the beginning…` · `faster, cheaper, simpler…` · `But there's a catch…`

**Why it's a tell.** The … glyph plus suspenseful trailing usage is a combined typography-and-tone tell reading as generated marketing voice.

**Instead.** Use straight '...' only for a genuine omission; usually just end the sentence with a period.

**Fine when.** A genuine trailing-off thought or true omission occasionally is fine.

---

<a id="cat-tone-sycophancy"></a>

### Tone & sycophancy

*Flattery, manufactured enthusiasm, pep talk, relentless positivity.*

#### T155. Opening flattery adjective (Great question! / Excellent point)

`HIGH` · `current` · `claudism`

**What it is.** Praising the user's question or idea before answering, including FAQ/docs copy where a rhetorical question gets an enthusiastic self-answer: 'Great question!,' 'Excellent point,' 'That's a really insightful question.'

**Looks like:** `Great question!` · `Excellent point.` · `That's a great question — and one a lot of people ask.`

**Why it's a tell.** No competent writer opens by grading the question; a hallmark RLHF reflex Claude's own system prompt now forbids ('good, great, fascinating, profound, excellent').

**Instead.** Delete the opener and start with the answer; in FAQs let the question stand as a heading.

**Fine when.** None.

#### T156. You're absolutely right (reflexive agreement)

`HIGH` · `current` · `claudism`

**What it is.** Opening a reply by validating the user, especially when reversing a position or accepting a correction, regardless of whether they're right. The most-memed Claude tic of 2025-2026.

**Looks like:** `You're absolutely right!` · `You're absolutely right — I apologize for the confusion.` · `Great catch — you're totally right about that.`

**Why it's a tell.** Documented Claude signature (users logged 100+ occurrences across one project; dedicated GitHub issues and news coverage). Moderated but not eliminated in mid-2026.

**Instead.** Drop the concession and go straight to the corrected content: 'The port default is 8080, not 3000.'

**Fine when.** None.

#### T157. Therapy-speak validation (You're not imagining it / You're not alone)

`MED` · `emerging` · `claudism`

**What it is.** Unsolicited emotional reassurance in non-therapy contexts: 'You're not imagining it,' 'You're not alone,' 'That's a completely valid concern,' 'And that's okay.'

**Looks like:** `You're not imagining it.` · `You're not alone in feeling this way.` · `That's a completely valid concern.`

**Why it's a tell.** Models switch into validation mode where it feels bizarre, e.g. product or technical copy; a documented Claude signature in 2026.

**Instead.** Remove reassurance the reader didn't ask for; address the actual problem.

**Fine when.** Appropriate and good in genuine support/coaching contexts; the tell is unsolicited use in neutral or transactional copy.

#### T158. Complimenting the reader's expertise

`MED` · `current`

**What it is.** Flattering the reader's knowledge or perceptiveness to build false rapport: 'As someone with your clearly deep understanding,' 'You obviously know your stuff,' 'Given your expertise, you'll appreciate.'

**Looks like:** `As someone with your clearly deep understanding of this...` · `You obviously know your stuff here.` · `That's a sophisticated observation.`

**Why it's a tell.** Ingratiating flattery applied indiscriminately, since the model can't assess the reader's expertise.

**Instead.** Address the reader as a peer; cut all 'you clearly/obviously' expertise-praise.

**Fine when.** None.

#### T159. I'd be happy to help / Happy to help

`MED` · `current` · `claudism`

**What it is.** Performative eagerness to assist, as closer or lead-in to an offer: 'I'd be happy to help with that,' 'Happy to help!,' 'I'd be glad to walk you through it.'

**Looks like:** `I'd be happy to help with that!` · `Happy to help!` · `More than happy to put that together for you.`

**Why it's a tell.** Assistant-training boilerplate; a Claude default for prefacing offers. Product copy has no first-person helper to be happy.

**Instead.** Describe what's available ('A full walkthrough is in the setup guide') or cut it.

**Fine when.** None in product copy.

#### T160. Encouragement / pep-talk (You've got this!)

`MED` · `current` · `claudism`

**What it is.** Unsolicited motivational reassurance about the reader's progress or ability: 'You're on the right track,' 'You've got this,' 'Great progress so far,' 'You're almost there.'

**Looks like:** `You're on the right track!` · `You've got this!` · `Nice — you're almost there!`

**Why it's a tell.** Coach-persona reassurance dispensed regardless of whether progress is good; condescending and assistant-flavored.

**Instead.** State status factually ('Two steps remain') and let users judge their own progress.

**Fine when.** None in product copy; a coaching product's deliberate voice is the exception.

#### T161. Relentless positive framing (The good news is…)

`MED` · `current` · `claudism`

**What it is.** Refusing to deliver plain negative information without a spin; every limitation reframed as opportunity: 'The good news is,' 'While it doesn't support that yet, the exciting part is,' 'Not to worry.'

**Looks like:** `The good news is there's an easy workaround!` · `While it doesn't support that yet, the exciting part is...` · `This limitation actually gives you a chance to...`

**Why it's a tell.** Trained optimism bias makes the model allergic to neutral bad news; the compulsive silver-lining is a sycophancy pattern.

**Instead.** State limitations plainly: 'This isn't supported. Use X instead.'

**Fine when.** None.

#### T162. Over-celebratory microcopy (Woohoo! You're all set!)

`MED` · `emerging`

**What it is.** In-app copy treating routine completions as triumphs: 'Woohoo! You're all set! 🎉,' 'Nice work!,' 'You did it!,' 'Congrats, your account is ready!'

**Looks like:** `Woohoo! You're all set! 🎉` · `Nice work! 🙌` · `Congrats, your account is ready!`

**Why it's a tell.** The gap between a mundane action (saving a form) and the celebration is the tell.

**Instead.** Match tone to stakes: 'Account created.' 'Changes saved.'

**Fine when.** A genuine milestone (finished a hard onboarding) can warrant modest celebration in a playful brand.

---

<a id="cat-interaction-chat"></a>

### Conversational / assistant register

*Chat-assistant habits that leak into copy that has no interlocutor.*

#### T163. As an AI self-reference

`HIGH` · `classic`

**What it is.** The model narrating its own nature: 'As an AI language model,' 'As an AI, I…,' 'Being an AI, I don't have…'

**Looks like:** `As an AI language model, I don't have personal experiences.` · `As an AI, I can't browse the internet in real time.` · `I'm just an AI, but here's my take.`

**Why it's a tell.** The most notorious classic tell, now largely trained out of frontier output — when it surfaces it dates the text to an older or smaller model, and in product copy it's a catastrophic giveaway.

**Instead.** Delete entirely; scrub any 'as an AI' / 'I don't have the ability to' residue during copy review.

**Fine when.** None. Note for detection: its presence in mid-2026 signals an older/cheaper model rather than current frontier output.

#### T164. I don't have opinions/preferences, but disclaimer

`HIGH` · `classic`

**What it is.** Prefacing a view by disowning it: 'I don't have personal opinions, but,' 'I don't have preferences, but,' 'While I can't feel, I can say.'

**Looks like:** `I don't have personal preferences, but many users favor the dark theme.` · `While I can't have opinions, the data suggests X.` · `I don't have feelings about it, but here's an assessment.`

**Why it's a tell.** Capability-disclaimer ritual bolted before an answer; de-voices the statement and flags chat-assistant origin. Weakening in frontier models but not extinct on sensitive topics.

**Instead.** Cut the disclaimer and make the claim: 'Most users prefer the dark theme.'

**Fine when.** None. Like 'As an AI,' its appearance now leans toward dating the text to an older model.

#### T165. The 'Let me…' action preamble

`HIGH` · `current` · `claudism`

**What it is.** Announcing the next action in first person before (or instead of) doing it: 'Let me take a look,' 'Let me walk you through how it works,' 'Let me explain,' 'Let me break this down.'

**Looks like:** `Let me take a look at that.` · `Let me walk you through how it works.` · `Let me break this down for you.`

**Why it's a tell.** Docs and copy have no narrator announcing their own actions; a README just explains. A chat-agent artifact.

**Instead.** Delete the preamble and perform the action directly; use a heading ('How it works') if structure helps.

**Fine when.** None in written deliverables.

#### T166. Would you like me to…? (hedged offer / follow-up menu)

`HIGH` · `current` · `claudism`

**What it is.** Ending by offering the next step as a question or a menu rather than doing it or stopping: 'Would you like me to draft that?,' 'Want me to go deeper?,' 'I can help you: 1) … 2) … 3) …'

**Looks like:** `Would you like me to draft that section?` · `Want me to go deeper on any of these?` · `From here we could: add tests, write docs, or refactor. Which would you like?`

**Why it's a tell.** A conversational handoff presuming a next turn; in static text it's a dangling solicitation with no one to answer.

**Instead.** Include the thing or don't; present genuinely optional material as available content ('An example config follows'), not a question.

**Fine when.** None in non-chat deliverables.

#### T167. Let's dive in / unpack / break it down

`HIGH` · `current`

**What it is.** Collaborative-kickoff transitions with the notorious 'dive in/into' and 'unpack' verbs: 'Let's dive in,' 'Let's dive into the details,' 'Let's unpack this,' 'Let's break it down.'

**Looks like:** `Ready to get started? Let's dive in.` · `Let's break down how it works.` · `Let's unpack what that means for your team.`

**Why it's a tell.** 'Dive in/into' and 'unpack' are among the most flagged AI verbs, and 'Let's' manufactures a togetherness the reader didn't sign up for. Double tell.

**Instead.** Use a heading or just start the explanation; replace 'unpack' with 'explain'/'means' only where content still needs it.

**Fine when.** None.

#### T168. While I can't X, I can Y capability pivot

`MED` · `current` · `claudism`

**What it is.** Capability-pivot template: 'While I can't do X, I can help with Y,' 'I'm not able to X, but I'd be happy to Y,' 'Unfortunately I can't X. However, I can Y.'

**Looks like:** `While I can't access your account, I can walk you through the steps.` · `I'm not able to place the order for you, but I can show you how.` · `Unfortunately I can't do that. However, here's an alternative.`

**Why it's a tell.** A distinctly Claude-family chat pattern with a highly recognizable rhythm; a giveaway if it leaks into non-conversational copy.

**Instead.** In copy, drop the frame and give the actionable part: 'Here's how to do X yourself.'

**Fine when.** Reserve capability pivots for live chat, and vary the phrasing even there.

#### T169. Question-recasting preamble

`MED` · `emerging` · `claudism`

**What it is.** Restating or splitting the reader's question before engaging it: 'Before we dive in, it's worth asking whether…,' 'The short answer is X. The longer answer is…,' 'To really answer this, we first need to consider…'

**Looks like:** `Before addressing that directly, it's useful to ask what you actually mean by 'fast.'` · `The short answer is yes. The longer answer is more involved.` · `To answer this properly, we first need to define our terms.`

**Why it's a tell.** A distinctly Claude move — reframe or split the question before engaging; throat-clearing that delays the answer.

**Instead.** Answer first — lead with the conclusion, then support it.

**Fine when.** None.

#### T170. Measured-agreement tokens (That makes sense / Fair point / That tracks)

`MED` · `current` · `claudism`

**What it is.** Softer cousins of 'You're absolutely right': reflexive affirmations of the user's statement before proceeding — 'That makes sense,' 'Fair point,' 'That's fair,' 'That's reasonable,' 'That tracks.'

**Looks like:** `That makes sense.` · `Fair point — let's do it that way.` · `Yeah, that tracks.`

**Why it's a tell.** Turn-level agreement receipts addressed to an interlocutor; mark conversational Claude and have no referent in standalone content.

**Instead.** Skip the acknowledgment and continue with the substance.

**Fine when.** None in product copy.

#### T171. Good catch! error-acknowledgment

`MED` · `emerging` · `claudism`

**What it is.** Reflexive praise token fired when the user points out a mistake, bug, or oversight: 'Good catch!,' 'Great catch,' 'Oh, good catch.'

**Looks like:** `Good catch!` · `Great catch — you're right, that would break on empty input.` · `Oh, good catch.`

**Why it's a tell.** Pure validation receipt aimed at an interlocutor; a staple of Claude coding/agentic sessions, more frequent than in GPT/Gemini.

**Instead.** Drop it and make the correction: 'That fails on empty input; fixed.'

**Fine when.** None in finished content.

#### T172. Gentle-disagreement / performative pushback frame

`MED` · `emerging` · `claudism`

**What it is.** Cushioned, pre-announced dissent (a sycophancy overcorrection): 'I'd (gently) push back on that,' 'I want to challenge that assumption,' 'Respectfully, I'd disagree,' 'I want to offer a counterpoint.'

**Looks like:** `Let me gently push back on that.` · `I want to challenge that assumption a bit.` · `Respectfully, I see it differently.`

**Why it's a tell.** Staged, pre-announced disagreement swaps one reflex (agree) for another (perform-disagreement); human writing just disagrees and gives the reason.

**Instead.** State the disagreement and the evidence directly; cut the 'let me push back' scaffolding.

**Fine when.** None in standalone content.

#### T173. Love this! / affection for the idea

`MED` · `emerging` · `claudism`

**What it is.** Expressing personal affection for the user's idea or choice: 'Love this!,' 'I love that you're thinking about accessibility,' 'Ooh, love where your head's at.'

**Looks like:** `Love this!` · `I love that you're thinking about accessibility.` · `This is chef's kiss.`

**Why it's a tell.** Casual-register warmth tic mimicking friendly Slack tone; the model professing to 'love' an idea is unmistakable affect-performance.

**Instead.** Cut it; if something is genuinely good, say specifically why it works.

**Fine when.** None.

#### T174. I'll go ahead and… / I've gone ahead and…

`MED` · `current` · `claudism`

**What it is.** Pre- or post-action narration padded with 'go ahead and': 'I'll go ahead and update that,' 'I've gone ahead and added a section.'

**Looks like:** `I'll go ahead and update that for you.` · `I've gone ahead and added a section on pricing.` · `Let me go ahead and pull that together.`

**Why it's a tell.** 'Go ahead and' is pure service-desk filler with no semantic content; no edited human sentence needs it.

**Instead.** Cut 'go ahead and' and usually the 'I'll'/'I've' framing: 'Added a section' or just present it.

**Fine when.** None.

#### T175. One-word affirmation opener (Absolutely! / Certainly! / Of course!)

`MED` · `classic`

**What it is.** A standalone enthusiastic affirmative launching a reply: 'Absolutely!,' 'Certainly!,' 'Of course!,' 'Sure thing!'

**Looks like:** `Absolutely!` · `Certainly — here's how.` · `Of course! Here's a quick rundown.`

**Why it's a tell.** Trained compliance markers with no content; 'Certainly!' as sentence one is a stock assistant tell.

**Instead.** Remove the interjection and lead with the answer; fold confirmation in plainly ('Yes — the API supports batching').

**Fine when.** None in written copy.

#### T176. Turn-acknowledgment tokens (Perfect! / Got it! / Great!)

`MED` · `emerging` · `claudism`

**What it is.** One-word enthusiastic receipts opening a turn or punctuating a step, especially 'Perfect!' after a tool result or completed action in agentic flows.

**Looks like:** `Perfect! Now let's configure the database.` · `Got it!` · `Great, that worked!`

**Why it's a tell.** Conversational backchannels treating every routine step as a small victory; 'Perfect!' after tool output is a strongly emerging Claude agentic tell.

**Instead.** Proceed without applauding the step; in microcopy replace 'Perfect! You're all set!' with 'Saved.'

**Fine when.** None in written content; strip from any agentic transcript repurposed as docs.

#### T177. Mid-stream self-correction (Actually, / Wait, / On second thought)

`MED` · `emerging` · `claudism`

**What it is.** Visibly reversing course inside the answer: 'Actually, let me reconsider,' 'Wait — that's not right,' 'On second thought,' 'Hmm, actually.'

**Looks like:** `Actually, let me reconsider.` · `Wait — that's not right.` · `On second thought, the simpler option wins.`

**Why it's a tell.** Self-narrated course-correction is chat/agent register; written content should present only the corrected conclusion.

**Instead.** Deliver the final answer and delete the visible reversal.

**Fine when.** None.

#### T178. Does that make sense? check-in closer

`MED` · `current`

**What it is.** Soliciting confirmation of understanding at the end of an explanation: 'Does that make sense?,' 'Does this help?,' 'Let me know if that's clear.'

**Looks like:** `Does that make sense?` · `Does this help?` · `Let me know if that's clear!`

**Why it's a tell.** Directly asks the reader to respond — a two-way assumption baked into one-way text.

**Instead.** Delete; clarity is the writer's job to ensure, not the reader's to confirm.

**Fine when.** None.

#### T179. Enthusiastic release opener (We're excited/thrilled to announce)

`MED` · `current` · `claudism`

**What it is.** Changelog/blog/release-note opener manufacturing corporate enthusiasm: 'We're excited to announce,' 'We're thrilled to share,' 'Today, we're launching.'

**Looks like:** `We're excited to announce dark mode!` · `We're thrilled to share what we've been building.`

**Why it's a tell.** Performed institutional emotion recurring identically across changelogs; the enthusiasm is asserted, not shown.

**Instead.** Lead with what shipped and why it matters: 'Dark mode is here. Toggle it in Settings > Appearance.'

**Fine when.** None.

#### T180. I notice / I'm noticing observational opener

`LOW` · `emerging` · `claudism`

**What it is.** Therapist/analyst-register observation lead-in: 'I notice that…,' 'I'm noticing…,' 'One thing I'm noticing is…,' 'I can't help but notice.'

**Looks like:** `I notice you're using the legacy API.` · `I'm noticing a pattern here.` · `One thing I notice is the repetition.`

**Why it's a tell.** A narrating observer voice tied to Claude's reflective register; content has no observer.

**Instead.** State the observation as fact: 'This uses the legacy API.'

**Fine when.** None in standalone copy.

#### T181. Gratitude inflation (Thank you for sharing / I appreciate you)

`LOW` · `current` · `claudism`

**What it is.** Effusive thanks for ordinary inputs: 'Thank you for sharing that,' 'Thanks for the thoughtful question,' 'I appreciate you flagging this,' 'Thanks for your patience.'

**Looks like:** `Thank you for sharing that!` · `Thanks for the thoughtful question.` · `I appreciate you bringing this up.`

**Why it's a tell.** Reflexive gratitude for routine conversational moves is trained politeness; 'thoughtful question' doubles as flattery. A Claude-leaning warmth reflex.

**Instead.** Reserve thanks for actual favors; don't thank the reader for asking or sharing.

**Fine when.** Genuine thanks for a real favor is fine.

---

<a id="cat-meta-hedging"></a>

### Meta, hedging & disclaimers

*Self-reference, stacked qualifiers, value-stamps, bolted-on caveats.*

#### T182. It's worth noting / It's important to note

`HIGH` · `current` · `claudism`

**What it is.** Canned hedging preamble flagging the following clause as noteworthy instead of stating it: 'It's important to note that,' 'It's worth noting that,' 'It should be noted that,' 'Importantly,' 'It bears mentioning.' The clause after is always the actual content.

**Looks like:** `It's important to note that results may vary depending on your configuration.` · `It's worth noting that this feature is still in beta.` · `Importantly, this affects performance.`

**Why it's a tell.** The single most flagged AI phrase by detectors and editors; emitted reflexively where a human would just write the caveat, and recurrence across paragraphs is a near-certain tell.

**Instead.** Delete the frame and keep the clause: 'This feature is in beta.' Use layout (callout, bold) if it genuinely needs emphasis.

**Fine when.** None — the frame is always removable.

#### T183. The nuance / complexity flag

`HIGH` · `emerging` · `claudism`

**What it is.** Announcing that a topic is complicated as a substitute for engaging it: 'This is a nuanced topic,' 'It's more complicated than it seems,' 'There's a lot to unpack here,' 'a complex, multifaceted issue.'

**Looks like:** `This is a nuanced topic with no easy answers.` · `There's a lot to unpack here.` · `The truth is more complicated than a simple yes or no.`

**Why it's a tell.** Gestures at depth without delivering it — 'nuance' as a stall; a very 2025-2026 habit tied to models being praised for acknowledging complexity.

**Instead.** Don't label the complexity — resolve it. Lay out the specific trade-off or two concrete cases, or cut the sentence.

**Fine when.** None — if the topic is genuinely complex, show the complexity rather than announcing it.

#### T184. Bolted-on safety caveat (consult a professional / not financial advice)

`HIGH` · `current` · `claudism`

**What it is.** Unsolicited disclaimer appended to a neutral answer: 'always consult a qualified professional,' 'this is not financial/legal/medical advice,' 'for informational purposes only,' 'do your own research.'

**Looks like:** `…but always consult a licensed professional before making a decision.` · `This is not financial advice.` · `As with anything, do your own research before proceeding.`

**Why it's a tell.** Safety-tuned models graft liability disclaimers onto content that never asked; Claude leans especially hard on the 'consult a professional' close.

**Instead.** Remove it unless the context genuinely requires a legal disclaimer, and then place it deliberately.

**Fine when.** In genuinely medical/legal/financial/safety contexts a warranted caveat is responsible; flag the reflexive version on harmless content.

#### T185. Keep in mind / Bear in mind reader-steering

`MED` · `current`

**What it is.** Imperative addressed to the reader framing a caveat as something to hold in their head: 'Keep in mind that,' 'Please keep in mind,' 'Bear in mind,' 'Remember that.'

**Looks like:** `Keep in mind that syncing large files may take a few minutes.` · `Please bear in mind that free accounts are limited to three projects.` · `Remember that changes here apply to all team members.`

**Why it's a tell.** Substitutes a directive to the reader for a plain statement; overused in AI docs where a note or inline warning would do.

**Instead.** State it as a fact: 'Large files may take a few minutes to sync.'

**Fine when.** Reserve second-person imperatives for actual instructions; occasional use is fine.

#### T186. It depends non-answer

`MED` · `current`

**What it is.** Refusing to commit up front: 'It depends,' 'It depends on a variety of factors,' 'The answer isn't straightforward,' 'the answer is nuanced.'

**Looks like:** `It depends on a number of factors.` · `The short answer is: it depends.` · `There's no straightforward answer here.`

**Why it's a tell.** Models hedge to avoid being wrong, leading with 'it depends' even when a useful default exists; reads as evasive.

**Instead.** Give the default, then the exception: 'For most teams, the Pro plan. Go Enterprise only if you need SSO.'

**Fine when.** Sometimes 'it depends' is the honest answer — fine when it then names the factors and commits. Flag the version that dodges a question with a usable answer.

#### T187. Generally speaking / In general scope-hedge

`MED` · `current`

**What it is.** Adverbial preamble pre-softening a claim: 'Generally speaking,' 'In general,' 'By and large,' 'For the most part,' 'Broadly speaking,' 'Typically.'

**Looks like:** `Generally speaking, the setup takes under five minutes.` · `In general, users see faster load times.` · `For the most part, the defaults work well.`

**Why it's a tell.** Front-loaded scope qualifiers to avoid being pinned to an absolute; stacked at sentence starts they create uniform tentativeness.

**Instead.** Delete the preamble; if the exception matters, state it. 'Setup takes under five minutes.'

**Fine when.** One 'typically' where variance genuinely matters is fine.

#### T188. Performed-candor preface (I'll be honest / To be direct / Honestly)

`MED` · `emerging` · `claudism`

**What it is.** Announcing sincerity before an assessment as if candor were the exception: 'I'll be honest with you,' 'Let me be direct,' 'Honestly?,' 'To be transparent,' 'The honest answer is,' 'I want to be direct with you.'

**Looks like:** `I'll be honest with you: this won't scale.` · `Honestly, the docs are the weak point.` · `To be transparent about the tradeoffs here.`

**Why it's a tell.** Claude performs honesty as a rhetorical move far more than peers; if the following statement is actually direct, the frame is redundant, and it implies the surrounding text might not be honest.

**Instead.** Delete the preamble and make the blunt statement itself.

**Fine when.** None.

#### T189. Self-caution hedge (I want to be careful / I don't want to overstate)

`MED` · `current` · `claudism`

**What it is.** Flagging the reliability of the model's own claims: 'I want to be careful here,' 'I don't want to overstate this,' 'I should be upfront that,' 'with the important caveat that,' 'I could be wrong, but.'

**Looks like:** `I want to be careful not to overstate this.` · `I should be upfront: I'm not certain here.` · `with the caveat that this depends on your setup`

**Why it's a tell.** Self-referential reliability hedging belongs to an assistant worried about being wrong, not a README that should simply be right.

**Instead.** Remove it; if a real limitation exists, state it once, specifically.

**Fine when.** None in standalone copy.

#### T190. First-person epistemic hedges (I suspect / My sense is / If I had to guess)

`MED` · `current` · `claudism`

**What it is.** Measured-personal-uncertainty register: 'I suspect,' 'My sense is,' 'My hunch is,' 'I'd lean toward,' 'I tend to think,' 'If I had to guess.'

**Looks like:** `My sense is that caching is the bottleneck.` · `I suspect the config is stale.` · `If I had to guess, the API changed.`

**Why it's a tell.** A narrating deliberator with hunches is an assistant persona; GPT-family states flatter, so hedged first-person judgment skews Claude and has no place in copy with no narrator.

**Instead.** State the assessment directly, or ground it in the actual evidence.

**Fine when.** Fine in a signed human opinion piece; the tell is in un-authored product content that shouldn't have a hedging narrator.

#### T191. Over-apology reflex (I apologize for the confusion)

`MED` · `current` · `claudism`

**What it is.** Excessive, preemptive contrition, often paired with capitulation: 'I apologize for the confusion,' 'Sorry about that — you're right,' 'My apologies, let me correct that.'

**Looks like:** `I apologize for the confusion!` · `Sorry about that — you're right.` · `My apologies, let me fix that.`

**Why it's a tell.** Compulsive contrition is an RLHF politeness artifact; chained with 'you're absolutely right' it forms the classic assistant grovel.

**Instead.** Never apologize on the brand's behalf reflexively; when genuinely warranted, apologize once, plainly, and move on.

**Fine when.** A single, genuine apology for a real error is appropriate.

#### T192. Roadmap-and-recap over-signposting

`MED` · `current`

**What it is.** Sentences narrating the document's own structure: 'First, let's cover the basics,' 'Now that we understand X, let's look at Y,' 'Before we wrap up, one more thing.'

**Looks like:** `First, let's cover the basics.` · `Now that we understand X, let's look at Y.` · `Before we wrap up, one more thing.`

**Why it's a tell.** Tour-guide narration treats the reader as unable to follow without hand-holding; confident prose transitions on content, not meta-commentary.

**Instead.** Cut sentences that describe the structure; transition by connecting ideas directly.

**Fine when.** A single genuine transition in a long, complex piece is fine.

#### T193. Just to clarify / Just to confirm

`LOW` · `current`

**What it is.** Softening preface flagging a clarification the reader didn't request: 'Just to clarify,' 'Just to confirm,' 'To be clear.'

**Looks like:** `Just to clarify, this applies only to paid plans.` · `Just to confirm, you'll want the v2 endpoint.` · `To be clear, nothing is deleted.`

**Why it's a tell.** Conversational hedge assuming an ongoing back-and-forth; in writing it prefaces a statement that should just be made.

**Instead.** Cut the preface: 'This applies only to paid plans.'

**Fine when.** 'To be clear' occasionally, to head off a genuine likely misreading, is fine.

---

<a id="claudism-index-58"></a>

## Claudism index (58)

The tics above flagged as especially characteristic of Claude-family models — most of them the "assistant register" (agreement, self-narration, offers of help, hedging) leaking into copy that has no reader to talk to, plus a set of signature phrasings. If you strip only one class of tic from AI-assisted copy, strip these.

**Lexical tics — single words & verbs**

- T10. nuanced
- T11. genuinely
- T25. truly
- T31. thoughtful / thoughtfully
- T32. Affect verbs (delighted / thrilled / excited)
- T40. Downtoner density (a bit / a little / somewhat / kind of)

**Phrase clichés & set formulas**

- T75. Marveling at the topic
- T77. Here's the thing / Here's what I found (false-suspense reveal)

**Sentence constructions**

- T80. Two-sentence negative reframe (period-split)
- T84. That said / that being said
- T86. One-word rhetorical-question cataphora (The result?)
- T90. Staccato fragment triad
- T91. Parallel purpose-clause pair (Designed to X. Built to Y.)
- T94. Vague 'This' connective (This ensures / This means / This allows)
- T96. That's not to say (reflexive counter-caveat)
- T97. Running process narration (I'm going to… / Now I'll…)

**Rhetorical moves**

- T101. Here's X: cataphora opener
- T102. Manufactured both-sidesism
- T106. Contrast-then-resolve paragraph engine (X. But Y.)
- T108. Dialectical 'both things can be true' balance move
- T112. Restating the question before answering
- T113. Praise-then-pivot sandwich
- T114. Pre-answer validation ritual

**Structure & formatting**

- T117. Bold-lead bullet with colon (\*\*Term:\*\* gloss)
- T122. Anaphoric line openers (You get… You get…)
- T125. Distributed hedging (structural)
- T140. Horizontal-rule section dividers (---)
- T141. Callout-block / admonition reflex (Note / Tip / Warning)

**Punctuation & typography**

- T147. Bold key terms mid-sentence
- T149. Reveal-pivot / antithesis dash (not X — Y)
- T150. Curly quotes and apostrophes in plain-text contexts

**Tone & sycophancy**

- T155. Opening flattery adjective (Great question! / Excellent point)
- T156. You're absolutely right (reflexive agreement)
- T157. Therapy-speak validation (You're not imagining it / You're not alone)
- T159. I'd be happy to help / Happy to help
- T160. Encouragement / pep-talk (You've got this!)
- T161. Relentless positive framing (The good news is…)

**Conversational / assistant register**

- T165. The 'Let me…' action preamble
- T166. Would you like me to…? (hedged offer / follow-up menu)
- T168. While I can't X, I can Y capability pivot
- T169. Question-recasting preamble
- T170. Measured-agreement tokens (That makes sense / Fair point / That tracks)
- T171. Good catch! error-acknowledgment
- T172. Gentle-disagreement / performative pushback frame
- T173. Love this! / affection for the idea
- T174. I'll go ahead and… / I've gone ahead and…
- T176. Turn-acknowledgment tokens (Perfect! / Got it! / Great!)
- T177. Mid-stream self-correction (Actually, / Wait, / On second thought)
- T179. Enthusiastic release opener (We're excited/thrilled to announce)
- T180. I notice / I'm noticing observational opener
- T181. Gratitude inflation (Thank you for sharing / I appreciate you)

**Meta, hedging & disclaimers**

- T182. It's worth noting / It's important to note
- T183. The nuance / complexity flag
- T184. Bolted-on safety caveat (consult a professional / not financial advice)
- T188. Performed-candor preface (I'll be honest / To be direct / Honestly)
- T189. Self-caution hedge (I want to be careful / I don't want to overstate)
- T190. First-person epistemic hedges (I suspect / My sense is / If I had to guess)
- T191. Over-apology reflex (I apologize for the confusion)

---

<a id="grep-quick-list"></a>

## Grep quick-list

434 strings that warrant a second look when they appear in copy. This is a **review trigger, not a blocklist** — every one has a legitimate use in the right register and at the right rate (see the calibration note above). Case-insensitive. Useful as the seed for a lint rule or a pre-publish grep.

```text
delve
delve into
tapestry
rich tapestry
vibrant tapestry
realm
in the realm of
landscape
ever-evolving landscape
ever-changing landscape
digital landscape
ecosystem
testament
a testament to
stands as a testament
serves as a reminder
boasts
leverage
utilize
harness
harness the power of
unlock
unlock the potential
unleash
empower
robust
battle-tested
production-ready
rock-solid
bulletproof
enterprise-grade
seamless
seamlessly
seamless integration
foster
garner
myriad
plethora
a wealth of
a treasure trove of
crucial
pivotal
vital
paramount
integral
elevate
take it to the next level
level up
supercharge
streamline
embark
embark on a journey
showcase
meticulous
meticulously crafted
nuanced
genuinely
truly
vibrant
bustling
notably
comprehensive
holistic
resonate
resonates
cutting-edge
game-changer
revolutionary
groundbreaking
transformative
best-in-class
world-class
industry-leading
state-of-the-art
next-generation
top-tier
gold standard
blazing fast
blazingly fast
lightning-fast
nestled
nestled in the heart of
thoughtful
thoughtfully designed
powerful yet intuitive
delightful
effortless
effortlessly
with ease
delighted
thrilled
excited to announce
quiet confidence
quietly
simply
just
all you have to do is
intricate
intricacies
cornerstone
backbone
bedrock
sends a signal
a bit
somewhat
in today's fast-paced world
in today's digital age
in a world where
in an era where
now more than ever
when it comes to
plays a crucial role
gone are the days
say goodbye to
say hello to
that's where
comes in
the key to
lies in
the secret to
the real magic
at the end of the day
the bottom line
when all is said and done
navigating the complexities
look no further
your go-to
the possibilities are endless
the sky's the limit
and so much more
more than just
reimagined
not your average
revolutionize the way
transform the way you
so you can focus on what matters
do the heavy lifting
let us handle the rest
join thousands of
trusted by
loved by teams
unwavering commitment
dedicated to excellence
we pride ourselves on
at your fingertips
the future of
designed with
in mind
built with you in mind
peace of mind
out of the box
it just works
zero-config
first-class support
batteries included
sensible defaults
under the hood
behind the scenes
ready to get started
start your free trial today
the smarter way to
the easier way to
done right
without further ado
move the needle
low-hanging fruit
circle back
best of both worlds
north star
no one-size-fits-all
no silver bullet
your mileage may vary
depending on your specific needs
based on your use case
it's fair to say
it's safe to say
needless to say
it goes without saying
suffice it to say
consistency is key
it's not just
it isn't just
this isn't just
not just a
less is more
not only
but also
from startups to enterprises
everything from
whether you're
we've got you covered
fast, simple, and reliable
plan, build, ship
it's fast. it's private
no ads. no tracking
you get
boasting
offering
combining
designed to
built to
allows you to
enables you to
lets you
empowers you to
makes it possible to
this ensures
this means you can
this allows
moreover
furthermore
additionally
consequently
nevertheless
that said
that being said
having said that
that's not to say
that doesn't mean
may potentially
might in some cases
i'm going to start by
now i'll
here's the thing
here's what i found
here's what most people miss
here's the kicker
here's why
the result?
the catch?
the best part?
think of it as
it's like
but for
despite its challenges
while not without limitations
on one hand
on the other hand
pros and cons
double-edged sword
both things can be true
there's a genuine tension
experts argue
studies show
research indicates
one could argue
some might say
imagine a world where
picture this
what if you could
sound familiar?
ever wondered
tired of
ultimately
in the end
in conclusion
in summary
to sum up
key takeaways
tl;dr
bottom line
it's worth noting
it's important to note
it should be noted
importantly
it bears mentioning
worth considering
worth exploring
worth keeping in mind
keep in mind
bear in mind
remember that
please note
note that
it depends
it depends on a variety of factors
this is a nuanced topic
a lot to unpack
a few things to consider
several factors to keep in mind
arguably
relatively
essentially
largely
to some extent
more or less
generally speaking
in general
for the most part
typically
as an ai
as an ai language model
i don't have personal opinions
i don't have preferences
while i can't
but i can
just to clarify
just to confirm
to be clear
i'll be honest
to be honest
honestly
to be direct
let me be direct
to be transparent
i want to be careful
i don't want to overstate
i could be wrong, but
i suspect
my sense is
my hunch is
if i had to guess
so you're asking
if i understand correctly
the short answer is
the longer answer
great question
excellent point
that's a great question
you're absolutely right
you're right to
that makes sense
fair point
that tracks
that's fair
good catch
great catch
that's a really smart way
what a fascinating problem
such a rich topic
let me gently push back
i want to challenge that
respectfully, i disagree
as someone with your
you obviously know
love this
i love that you're
i'd be happy to
happy to help
let me take a look
let me walk you through
let me explain
let me break this down
i'll go ahead and
i've gone ahead and
go ahead and
would you like me to
want me to
should i
i can help you with
let me know if you need anything else
let me know if you have any questions
hope this helps
i hope this helps
feel free to
don't hesitate to
absolutely!
certainly!
of course!
sure thing!
perfect!
got it!
sounds good
actually, let me reconsider
wait — that's not right
on second thought
i notice
i'm noticing
does that make sense
let's dive in
let's dive into
let's unpack
let's break it down
we're excited to announce
we're thrilled to share
you're on the right track
you've got this
great progress
the good news is
not to worry
woohoo
you're all set
nice work!
congrats
thank you for sharing
thanks for the thoughtful question
i appreciate you
thanks for your patience
i apologize for the confusion
sorry about that
my apologies
a few things:
two things:
to recap
to summarize what we've done
you're not imagining it
you're not alone
that's completely valid
and that's okay
consult a qualified professional
this is not financial advice
do your own research
for informational purposes only
**note:**
**tip:**
**pro tip:**
**important:**
**warning:**
**why it matters:**
**the catch:**
**bottom line:**
quick answer:
at a glance:
getting started
understanding the basics
putting it all together
wrapping up
final thoughts
the hidden cost of
the real reason
the pricing trap
→
✅
❌
✓
🚀
✨
👉
🎉
💡
🔒
🔑
•
…
```

---

<a id="when-these-are-actually-fine"></a>

## When these are actually fine

Guardrails against over-correction. A strict guide that bans good writing has failed. Each of these describes a *legitimate* use of something the catalog flags — do not "fix" these.

1. Presence is not proof — rate is. A single em dash, one tricolon, one 'notably,' one 'that said,' one reader question are all normal, even skilled, writing. The tell is reflexive, above-baseline frequency and mechanical uniformity, not any single instance. Calibrate flags to density.

2. Em dashes are correct punctuation and a deliberate signature for many strong writers; flag only several-per-paragraph rates plus the negation-pivot cadence. And since 2025 suppression, the ABSENCE of em dashes no longer signals a human — don't overcorrect copy into conspicuous em-dash-phobia, itself a recognizable 'hiding AI' pattern.

3. Curly quotes and apostrophes are the correct, expected typography in rendered prose, marketing pages, and published docs (word processors and CMSes produce them automatically). They are a tell ONLY in plain-text/ASCII source: README markdown source, code comments, terminal snippets, config, CLI microcopy.

4. Ordinary words are often the precise choice. 'Robust' in engineering (robust error handling), 'comprehensive' when coverage genuinely is complete, 'essential'/'key' for a genuinely load-bearing thing, 'leverage' in finance, 'streamline' for a real process change, 'foster'/'garner'/'seamless' in their literal senses — flag the vague marketing use, not the accurate technical one.

5. The rule of three, 'from X to Y' merisms, and antithesis are legitimate rhetorical devices with deep human pedigree. One well-placed, earned instance is good writing; only reflexive document-wide repetition, or content forced into three when it's really two or five, signals AI.

6. Standard documentation conventions are good practice in their proper home: admonition callouts (Note/Tip/Warning), markdown tables for genuinely tabular data, FAQ-style question headers in real Q&A, definition-list 'Term: explanation' shapes in glossaries and API references, numbered lists for real sequences, title case in formal/marketing register. They are tells only when reflexively overused or applied where the context doesn't warrant them (a two-item 'table,' a developer README that idioms sentence case, colon-glossed prose that should flow).

7. Honest epistemic hedging, a genuine 'it depends' that then names the factors and commits, acknowledging a real tradeoff, and a warranted safety/legal/medical caveat are all responsible writing. The tells are stacked hedges that never commit, evasive non-answers to questions with usable answers, manufactured symmetry, and reflexive disclaimers stapled onto harmless content. A strict guide must not push copy toward false confidence.

8. Emoji, exclamation points, warm sign-offs, and playful microcopy are appropriate in some deliberately casual consumer brand voices. Judge against the product's own established voice, not a universal ban — the tell is default cheerfulness applied to a voice that isn't actually cheerful, or celebration miscalibrated to a mundane action.

9. First-person voice, direct 'you' address, reader questions, and CTAs are legitimate copywriting when specific and earned ('Create your first project — no card needed'). The tell is the generic template version that fits any product interchangeably ('Ready to get started?,' 'Sound familiar?'), and the assistant-persona register (offers of help, self-narrated actions, agreement receipts) leaking into content that has no interlocutor.

10. 'As an AI' and 'I don't have opinions, but' are now largely absent from frontier output; when they do appear they mainly date the text to an older or smaller model rather than flagging current top-tier copy. 'Delve' has been measurably dialed back in newest models — treat its presence as high-confidence but its absence as non-informative.

11. Discourse markers ('notably,' 'ultimately,' 'that said,' 'however') and connectives are normal connective tissue in good nonfiction; they tell only at high density or when the clause after adds nothing. Citing a named, real source is good writing — only vague unnamed attribution ('experts argue') is the tell.

12. Low burstiness is a corpus-level statistical signal, not grounds to flag any individual short sentence or one-sentence paragraph. Punchy, uniform short sentences are a deliberate, effective style in technical instructions, taglines, and ad copy.

---

<a id="applying-this-to-fechtonomicon"></a>

## Applying this to Fechtonomicon

The project's voice is deliberate — *cozy medieval manuscript with a delightful modern UX* (see `.cursorrules`). That voice permits warmth, a little flourish, and thematic color that a generic developer tool would not. It does **not** license the generic AI-marketing register the current copy drifts into. The two are different: medieval charm is specific and earned; `Immerse yourself in the art of the longsword` is a template that would fit any product with the nouns swapped.

Some real lines from `MARKETING.md` and `APP_STORE_CONTENT.md`, and the tics they hit:

| Current copy | Tics | Tighter version (keeps the voice) |
| --- | --- | --- |
| "Learning HEMA has never looked this good." | Hype self-praise; unverifiable superlative | "The cards look like a period manuscript, and swipe like a modern app." |
| "Immerse yourself in the art of the longsword through beautifully crafted flashcards…" | `Immerse yourself` imperative; `beautifully crafted` self-praise | "Study the longsword one card at a time — term, definition, source." |
| "Whether you're a seasoned HEMA practitioner, a new student, or simply fascinated by medieval martial arts…" | Audience-spanner + tricolon (fits any product) | "For fencers building vocabulary, and newcomers learning their first guards." |
| "Start your HEMA journey today with Fechtonomicon — your medieval manuscript for modern times." | `journey`; CTA closer; antithesis flourish | "Get it on the App Store. Free." |
| "terminology, techniques, and concepts from legendary masters" | Reflexive rule-of-three; `legendary` inflation | "terms and techniques from Meyer's 1570 treatise" |
| Section headers `⚔️ Learn…`, `✨ Features`, `🎨 Beautiful…` | Emoji-as-header, on nearly every heading | Plain headers; keep at most one crest emoji for the brand, not one per section. |
| The "What Users Say" block of quotes | Fabricated social proof (no attributed, real reviewers) | Remove until there are real, attributable reviews. |
| "🎉 Welcome to Fechtonomicon!" / "Good luck with your submission! 🚀⚔️" | Exclamation inflation; celebration of a routine step | "Fechtonomicon 1.0." / (drop the sign-off) |

The medieval flavor is not the problem and should stay. The fix is to make each claim *specific to this app* — Meyer, 1570, Wiktenauer citations, offline, no account — so the copy could not be lifted wholesale onto a meal-planner or a CRM.

---

## How this list was built

Compiled July 2026. Nine parallel research passes (one per tic dimension) drafted candidate tics, each grounded in current web discourse about AI writing tells; results were deduplicated, then audited by four adversarial reviewers — one for completeness, one for over-claiming (guarding the false-positive list), one for currency against mid-2026 frontier models (Claude 5, Opus 4.8, GPT-5-era, Gemini 3-era), and one specializing in Claude-specific behavior — and finally reconciled into the catalog above.

It is a snapshot. Models change; the newest ones have already dropped some classic tells (`delve`, `as an AI`) and grown new ones (therapy-speak validation, the one-word rhetorical-question cataphora, curly-quote leakage into plain text). Revisit it as the models move.
