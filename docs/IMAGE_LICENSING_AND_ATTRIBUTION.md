# Image Licensing & Attribution — Legal Findings

A focused compliance reference for anyone adding images (or other third-party
media) to Fechtonomicon term cards. It distills the legal findings from
[`MEDIA_IN_TERM_DESCRIPTIONS.md`](./MEDIA_IN_TERM_DESCRIPTIONS.md) into a
practical, contributor-facing checklist.

> **Not legal advice.** This is a good-faith summary of copyright and licensing
> rules, written to keep us safe by default. It flags jurisdictional nuance and
> deliberately never says something is "always legal." Because Fechtonomicon is
> a **commercial** app (paid + monetized) *and* a free public website, get a
> qualified IP attorney to sign off on the final sourcing manifest before we
> ship images.

---

## 0. The golden rule

> **Age makes the original manuscript public domain, but that does not by itself
> make a specific institution's *scan* free for commercial use.**

Reusability of any given image turns on three things, checked **per image**:

1. **Copyright** — is the underlying work, and any new creative layer, out of copyright?
2. **Contract** — did we accept any terms of use / rights statement to obtain the file?
3. **Jurisdiction** — US vs EU/EEA vs UK can differ.

Record the basis for every image you commit (see the [manifest](#8-per-image-provenance-manifest)).

---

## 1. Two layers: copyright vs contract

Copyright and contract are **separate**. A scan can be copyright-free yet still
carry a contractual restriction you agreed to when you downloaded it.

### 1.1 Copyright — the originals and their scans

- **The originals are public domain everywhere.** Meyer (1570), Fiore (c.1409),
  and Vadi (c.1480s) predate any copyright term by centuries. Life-plus-70
  (EU/UK) and the US 95-years-from-publication ceiling only ever attach to
  **modern outputs** — new translations, new photographs, restorations,
  editorial arrangement — never to the centuries-old originals.
- **Faithful scans of flat PD art carry no *new* enforceable copyright.** A
  straight-on, "slavish" reproduction of 2-D public-domain artwork lacks the
  originality copyright requires.

| Jurisdiction | Rule for faithful 2-D reproductions | Authority | Caveat (verified) |
|---|---|---|---|
| **US** | No new copyright | *Bridgeman Art Library v. Corel*, 36 F. Supp. 2d 191 (S.D.N.Y. 1999), applying *Feist* (1991) | **District-court** decision — persuasive, widely followed, **not** binding nationwide. *Feist*'s originality bar is the real backstop. |
| **EU / EEA** | No copyright/related rights unless the reproduction is itself the author's own intellectual creation | **Art. 14, Directive (EU) 2019/790 (DSM)**, transposition deadline **7 June 2021** | It's a **directive** — effect depends on each Member State's implementing statute. Does **not** override contracts, database rights, or access rules. |
| **UK** | Same practical result, **not squarely decided** | Originality = CJEU "author's own intellectual creation" test | *THJ Systems v Sheridan* [2023] EWCA Civ 1354 was about **software-generated charts, not artwork reproductions** — the reproduction conclusion is a widely-accepted **inference**, not a holding. UK did **not** adopt DSM Art. 14. Low-risk, **uncodified**. |

**Practical takeaway:** across US/EU/UK the trend is uniform — faithful scans of
our PD folios carry no enforceable copyright. Treat the *original artwork* as
clear worldwide; reserve caution for any **modern** reproduction/translation you
might pull alongside a scan.

### 1.2 Contract — terms of use and rights statements

Institutions routinely attach **rights statements** and **terms of use** to PD
scans that copyright alone could not support (watermarks, "non-commercial only,"
fees). These create no copyright, **but**:

- They **bind us as contract** if we *affirmatively accept* them — click-through,
  account creation, or downloading through a paywalled/terms-gated portal. A PD
  scan grabbed *after* accepting restrictive terms becomes a **contract** problem
  even though copyright is clear.
- Even without acceptance, an object's rights statement signals the institution's
  position; respect it for relationship/reputational reasons and as documentation
  for an App Store IP challenge.

**This contractual layer is the most likely real-world friction — not copyright
infringement.** Prefer open mirrors (e.g. Wikimedia Commons) over downloading
behind an accepted click-through, and record `termsAccepted: false` in the manifest.

---

## 2. License matrix for a commercial app

Use only the green rows for shipped card art. The test for NC is the **nature of
the use**, and bundling images into a paid/ad/analytics-monetized app is a
paradigm **commercial** use.

| License / mark | Ship in this app? | Why |
|---|---|---|
| **CC0 / Public Domain Mark (PDM)** | ✅ Yes | No conditions. Courtesy credit is best practice, not required. |
| **Public domain by age** (our manuscripts) | ✅ Yes | Original out of copyright; faithful scan carries no new copyright (§1.1). Still check for a contractual rights statement (§1.2). |
| **CC BY** | ✅ Yes | Commercial OK. **Attribution required** (TASL, §5). |
| **CC BY-SA (ShareAlike)** | ⚠️ With care | Commercial OK, and SA copyleft attaches **only to adaptations of the SA work**, *not* to our app or its code. **But** a cropped/recolored/composited SA image *is* an adaptation and must stay BY-SA-compatible. Prefer CC0/PD/BY for anything we crop. |
| **Any NC** (BY-NC, BY-NC-SA, BY-NC-ND) | ❌ **No** | NonCommercial bars uses whose primary purpose is commercial advantage. Our use is squarely commercial. **Excluded.** |
| **Any ND** (BY-ND, BY-NC-ND) | ❌ **No** (if cropped/overlaid) | NoDerivatives permits private modification but **prohibits distributing adaptations**. A shipping app *distributes* what users see, so we can't release a cropped/overlaid ND image. **Excluded for card art.** |

Rights-statement vocabulary (see **rightsstatements.org**): `PDM` and `CC0` are
free to use; **`NoC-US`** = No Copyright (United States only, no warranty, makes
no determination for other countries); **`NoC-NC`** = No Copyright **but
Non-Commercial use only** — **do not ship**.

---

## 3. Source rights cheat-sheet

Rights status of the sources that matter for our three disciplines. **IIIF
availability is not a license** — always confirm the per-object rights statement.

| Source | Relevance | Rights status (verified) | Ship it? |
|---|---|---|---|
| **Wikimedia Commons** | Meyer plates, Fiore (Getty/Google Art mirror), Vadi; many PD-Art / PD-old / CC0 | **Per file** — check each file's license box | ✅ if file is CC0/PD/CC BY (attribute BY/BY-SA) |
| **Wiktenauer** | The HEMA hub: folio scans + transcriptions for all three masters | **Scans** treated as PD (per *Bridgeman* + HEMA Alliance) **but not uniform — check each article's source table**. **Original text/infoboxes are CC BY-SA 4.0** (not BY-NC-SA) | ✅ scans (verify per article); do **not** copy its CC BY-SA text into proprietary UI copy without share-alike |
| ⚠️ **BSB/MDZ Meyer 1570** (`bsb11214763`) | Full 1570 treatise, rich IIIF | **`NoC-NC` — Non-Commercial only** | ❌ **Not usable in a paid app.** Route Meyer through Wikimedia / Wiktenauer / a PD-Marked exemplar instead |
| **Getty — Fiore, MS Ludwig XV 13** | The premier Fiore manuscript; IIIF + Open Content | **`NoC-US`, NOT CC0.** PD by age; safe to self-host **from the US** | ✅ (don't label it "CC0"); Getty *requests* the credit "Digital image courtesy of Getty's Open Content Program" |
| **Morgan (MS M.383)**, **Pisani-Dossi / Novati facsimile**, **BnF/Gallica (Paris Fiore, Florius)** | Other Fiore recensions | **Per-object rights statement — verify each** | ✅ if cleared |
| **The Met Open Access, Rijksmuseum, Wallace Collection, Royal Armouries** | Arms & armour / context photos (not techniques) | Met/Rijksmuseum broad **CC0**; others per-object | ✅ if CC0/open |
| **Commissioned original diagrams** (SVG) | Footwork/mechanics we can't source cleanly | **We own it outright** (work-for-hire / full assignment) | ✅ cleanest legal position; on-brand |

**Recommended per discipline:**

- **German (Meyer):** Wikimedia Commons + Wiktenauer + a PD-Marked BSB exemplar — **not** the NoC-NC `bsb11214763` scan.
- **Italian (Fiore):** Getty Ludwig XV 13 (self-hosted, NoC-US) and its Wikimedia mirror.
- **Vadi:** Wikimedia Commons + Wiktenauer (Vadi is the thinnest for IIIF; verify each folio's rights statement).

---

## 4. Video (YouTube) vs hotlinking a still image

- **Embedding YouTube via the official player is fine** — it rests on an
  **express platform license** (YouTube API Services ToS), not a contested
  copyright doctrine. The current approach (nocookie iframe on web,
  `react-native-youtube-iframe` on native) is the sanctioned mechanism. Honor
  the ToS: unmodified official player, no overlays, no downloading/caching the
  content, skip videos where the uploader disabled embedding or that are
  age-restricted.
- **Privacy caveat (EU/UK):** the `youtube-nocookie.com` embed still writes
  persistent identifiers to `localStorage`/IndexedDB on iframe **load** (before
  Play). Under EU/UK ePrivacy rules that's a consent gap. Fix with a
  **click-to-load facade** (thumbnail + play button; inject the iframe only on
  click) and disclose the YouTube embed **and PostHog** in the privacy policy.
- **Hotlinking a still image you don't host is different and riskier.** US
  circuits split on whether inline-embedding a third-party image infringes the
  display right — the 9th Cir. "server test" (*Perfect 10 v. Amazon*; reaffirmed
  *Hunley v. Instagram*, 2023) says no; S.D.N.Y. (*Goldman v. Breitbart* 2018,
  *Nicklen v. Sinclair* 2021) says it can. EU/UK use a different
  "communication to the public" framework. **The split is live and unresolved.**

**Design consequence (jurisdiction-independent):** **self-host** the PD/CC images
we're licensed to use — never hotlink third-party image servers. Self-hosting
also defeats link-rot and delivers the offline experience the app promises.

---

## 5. Attribution — the TASL rule

For **CC BY / BY-SA** (and as courtesy for CC0/PD), provide:

- **T**itle — of the work
- **A**uthor — the creator/holding institution
- **S**ource — a link to the source record
- **L**icense — a link to the *specific* license deed (e.g. "CC BY-SA 4.0" — not
  just "Creative Commons"), and **indicate any modifications** (e.g. "cropped")

CC guidance allows attribution "in any reasonable manner based on the medium."
For our app: carry TASL as **machine-readable metadata** on every image, surface
a compact credit strip under each image, tap-to-expand into the `CitationSheet`,
and maintain an app-wide **Image & Content Credits** screen (also our App Store
evidence surface).

**Enforce it in code:** no image renders without `alt` **+** `license` **+**
`attribution` (the `isRenderableImage` gate in the design doc). This makes "no
attribution → no image" a code invariant satisfying both legal and accessibility.

---

## 6. App Store / Play posture

- **Apple Guideline 5.2** — apps *should* be submitted by the entity that owns or
  has licensed the IP; **5.2.2 / 5.2.3** let App Review demand **proof of
  authorization** for third-party content on request.
- The **indemnity** obligation lives in the **Apple Developer Program License
  Agreement (DPLA)**, *not* Guideline 5.2. Google Play's IP policy is parallel.
  These are contractual **distribution-eligibility** conditions, not copyright law.
- **Answer a challenge in minutes:** PD-by-age scans and CC0/CC-BY images with a
  recorded rights statement + attribution + retrieval date clear a 5.2 request cleanly.

---

## 7. Per-image compliance checklist

Run this for **every** image before it ships:

- [ ] Underlying work PD by age? (Meyer / Fiore / Vadi originals: yes.)
- [ ] Per-object **rights statement** recorded? (PDM / CC0 / CC BY / `NoC-US` / `NoC-NC` / other)
- [ ] Rights statement **compatible with commercial use**? (Reject `NoC-NC` and all CC-NC.)
- [ ] If cropped/overlaid: license permits adaptation? (Reject ND; keep SA adaptations BY-SA-compatible.)
- [ ] **No restrictive click-through/account/paywall terms were accepted** to obtain the file (or, if they were, they permit this use)?
- [ ] **Self-hosted** a derivative copy (not hotlinked)?
- [ ] TASL captured in the data model; license linked to its **specific deed**?
- [ ] `alt` / `accessibilityLabel` written?
- [ ] Manifest row created (source URL, institution, basis, retrieval date)?

---

## 8. Per-image provenance manifest

Keep a written manifest (in the data model and/or a tracking file) so any image's
legal basis is auditable:

| Field | Example |
|---|---|
| Source URL | `https://www.getty.edu/art/collection/object/103RW1` |
| Institution | J. Paul Getty Museum |
| Rights statement | `NoC-US` (rightsstatements.org/page/NoC-US/1.0/) |
| Legal basis | PD by age + faithful-reproduction (Bridgeman/Feist; EU DSM Art. 14) |
| License to display | Public domain; Getty requests courtesy credit |
| Terms accepted? | No (open Wikimedia mirror / Open Content, no click-through) |
| Retrieval date | 2026-07-20 |
| Modifications | Cropped to figure |

---

## 9. Confirm before shipping

1. Attorney sign-off on the sourcing manifest.
2. A **commercially-clear Meyer** image set (**not** the `NoC-NC` BSB scan).
3. Each shipped image's rights statement recorded and commercial-compatible.
4. Privacy policy updated for the YouTube embed + PostHog.
5. An App Store **Image & Content Credits** screen in place.

---

*See [`MEDIA_IN_TERM_DESCRIPTIONS.md`](./MEDIA_IN_TERM_DESCRIPTIONS.md) for the
full design (data model, `ImageEmbed` component, IIIF crop tooling, community
pipeline, and phased implementation plan).*
