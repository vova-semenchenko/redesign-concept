# UAPP voice & tone — reference for homepage copy

Working reference for anyone writing or reviewing the prototype's English copy (human or agent). Grounded in the [brief](raw-briefs/uapp-redesign-brief.md) (brand qualities §4, mandatory copy §8) and the [brand style guide](concept-research.md) (tonal benchmark §8). Voice chart format follows Podmajersky, *Strategic Writing for UX*; tone dimensions follow NN/g.

## 0. Mandate boundaries and verification against the brief

The source of truth for copy content is the brief: §1 ("the ready English copy in the client spec is mandatory in content/message; wording may be refined, positioning must not be rewritten"), §8 (the copy itself), §11 (evaluation checklist item). This yields three levels of freedom:

| Level | Scope | What is allowed |
|---|---|---|
| **Mandated** | Hero (H1 + sub + CTA + trust metrics), positioning band, expertise cards, 6 Selected work cases, AI block, Approach / Why us | Targeted wording refinements only. Content, message, positioning, facts and figures are immutable |
| **Editable** | Solutions (marked "draft, editable" in the brief); the choice of one of the three H1 options | May be edited while staying within the voice of §1–2 and the banking-first positioning |
| **Free** | Microcopy, labels, navigation, form states, helper text | Written from scratch following this document |

**Verification rule (permanent, for humans and agents):**

- Before changing any copy in the prototype, determine the block's level using the table above; for mandated blocks, check the result against the verbatim brief §8 text.
- **Forbidden:** globally replacing mandated copy, writing original copy for mandated blocks from scratch, merging several mandated messages into one, adding facts or figures absent from the brief.
- If a mandated wording seems weak — record the suggestion separately (comment, issue) without changing the prototype text until it is approved.
- The unit of review is the block, not the sentence: free copy must read as a continuation of the mandated copy.

## 1. Voice — three principles

Derived from the brief's brand qualities (institutional trust · engineering precision · premium feel · regulated-grade · AI-native). The voice never changes anywhere on the site.

| | **Engineers you can trust with money** | **Precision over promotion** | **Calm confidence** |
|---|---|---|---|
| **Concept** | Trust is built from facts: numbers, standards, protocol names. We don't reassure — we show | Every claim is checkable. An adjective that can't be proven is replaced with a fact that can | We don't need to shout. Confidence lives in a short sentence, not an exclamation mark |
| **Vocabulary — yes** | ISO 20022, SEPA Instant, reconciliation, card tokenization, Secure Enclave, on-chain compliance, audit, uptime; numbers: 8+ years, 170+ projects, 15 countries, $1B+ | Engineering verbs: build, run, integrate, sign, reconcile, ship. Concrete objects: payment rails, core integrations, message lifecycle | we / you; present tense; short declaratives |
| **Vocabulary — no** | Outsourcing genericisms: full-cycle development, digital transformation, end-to-end solutions, "robust solutions", dedicated teams | Empty intensifiers: world-class, cutting-edge, seamless, innovative, truly, best-in-class | Crypto hype: revolutionary, the future of finance, Web3 revolution; exclamatory sentences; emoji |
| **Verbosity** | A metric without commentary is stronger than a metric with one | Front-load: the point lives in the first 3–4 words. One idea per sentence | H1 ≤ 6 words; subheading ≤ 2 lines; card ≤ 40 words |
| **Grammar** | Active voice. The subject is we or the system ("The agent reconciles…"), never impersonal "it is provided" | Present simple by default; perfect only for track record ("have trusted us") | Contractions allowed (we're, you'll); full forms in compliance/security claims (do not, cannot) |
| **Punctuation** | The period at the end of the H1 is a signature device of the mandated copy ("Engineering for regulated finance.") | Em dash ≤ 1 per block; no exclamation marks; no rhetorical questions in headings | Lists without semicolons; metrics joined with a middle dot: "8+ years · 170+ projects" |
| **Capitalization** | Sentence case everywhere: headings, buttons, labels | Products and standards as proper names: Embedded Crypto for Banks, ISO 20022 Toolkit | Never Title Case in navigation or CTAs |

## 2. Site tone on the 4 NN/g dimensions

Each dimension is a spectrum; UAPP's position is fixed:

| Dimension | Position | What it means in the copy |
|---|---|---|
| Humor | serious, no exceptions | No jokes, puns, or "Oops!". The domain is money under regulation |
| Formality | formal-neutral | An engineer talking to a CTO: direct, no officialese, no chumminess |
| Respectfulness | respectful | The reader is a seasoned decision-maker; don't explain the obvious, don't push urgency |
| Enthusiasm | matter-of-fact | Excitement is carried by facts ("7+ chains", "real-time KYC"), not adjectives |

The tone barely drifts across the page — deliberately: banking-grade evenness of tone is itself a signal. Permitted shifts are in §3.

## 3. Tone map by Home block

| Block (brief §6) | Job of the copy | Tone shift |
|---|---|---|
| Hero | one message + proof of scale | maximum confidence, zero explanation |
| Positioning band | "both shores" differentiation | the only place where imagery is allowed — and it's already in the mandate ("both sides") |
| Trust band | numbers, partners | dry facts, no commentary |
| Expertise, Solutions | "they live in my world" | terminological precision beats simplicity: a dumbed-down ISO 20022 description destroys an expert's trust |
| Selected work | "this is real" | NDA restraint: "Client withheld under NDA" — no hints, no detail beyond what's permitted |
| AI across every layer | AI throughout | the highest slop risk on the page — specifics only: where exactly AI sits in the process and in the products |
| Team | trust in people | domain roles only, no Frontend/Backend split; no "ninja/rockstar" |
| Final CTA + form | remove friction | instructional minimalism: what to write, what happens next, who replies |

## 4. UI-state microcopy (prototype)

- **CTAs:** verb + object, describing the outcome: "Describe your challenge" (mandated), "See the case", "Explore ISO 20022 Toolkit". Never "Submit", "Learn more", "Click here".
- **Form:** visible labels (not placeholders); a placeholder is only a format example. Post-submit copy states what happens and when ("We'll reply within one business day" — only if true; we don't write unverified promises).
- **Validation errors:** what's wrong + how to fix it, without blame. Banned: invalid / illegal / incorrect. Example: `Enter a work email, like name@company.com` instead of `Invalid email address`. Show after the user leaves the field, not while typing.
- **Empty/intermediate states** (if they appear in showcase mockups): name the real operation; no "Please wait…", no fake progress.
- **All other states:** keep the message hierarchy — fact first (what happened), then action (what to do about it), then context (why), then tone. Cut anything that does not serve one of the four.

## 5. Anti-slop filter

Banlist (with what to replace it with):

| Banned | Replace with |
|---|---|
| seamless, effortless, frictionless | name what integrates and how: "settlement webhooks, no manual reconciliation" |
| leverage, harness, unlock, empower, unleash | use, build, run |
| cutting-edge, innovative, transformative, game-changer, next-level | a year, a standard, a metric |
| robust, scalable (as empty epithets) | a number: uptime, volume, chain count |
| streamline, optimize (with no object) | the concrete action: "cuts reconciliation from days to hours" |
| delve, tapestry, landscape, realm, journey | — (delete) |
| "in today's fast-paced world", "unlock the power of", "take X to the next level" | — (delete) |

Structural bans: the "It's not X, it's Y" construction; parallel triplets where one item is enough; rhetorical questions in headings; moralising wrap-ups; more than one em dash per block; identical length of adjacent sentences (vary the rhythm).

The words robust, key, critical, secure are fine in their technical sense with an object ("bank-grade security", "signing key") — the filter targets subject-less epithets, not terminology.

## 6. Checklist before finalizing a block

1. Is the point in the first words? (front-load)
2. Is every adjective either proven by an adjacent fact or deleted?
3. Active voice, named subject?
4. Sentence case; terms consistent with the rest of the page (one concept — one name)?
5. Banlist §5 and structural bans — clean?
6. Does the block's tone match the map in §3?
7. Is the mandated content (brief §8) refined only, not rewritten?
8. Read aloud — does it sound like an engineer, not a landing page?

The positive benchmark when in doubt is the hero copy from the brief: "We build the systems that move money." Six words, active voice, zero adjectives.
