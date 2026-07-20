# Including Accurate, Legal Images in Fechtonomicon Term Descriptions

**A research + design report for the repo owner**
*Scope: illustrating each term (guards, cuts, techniques) with public-domain historical folios, licensed images, commissioned diagrams, and embedded video. Meyer 1570 / Fiore c.1409 / Vadi c.1480s.*

> **Legal note:** This report is legally precise but is not legal advice. It flags jurisdictional nuance and never claims something is "always legal." Before shipping, have a qualified IP attorney sign off on the sourcing manifest for the specific images you commit — especially because Fechtonomicon is a **commercial** (paid + monetized) app, which narrows what you may use.

---

## 1. TL;DR / Recommendation

- **Source:** Prefer, in order, (1) Wikimedia Commons files tagged PD-Art / PD-old / CC0, (2) library/museum IIIF endpoints whose specific object carries a **Public Domain Mark or CC0** rights statement, and (3) Wiktenauer folio scans — **but check each item's rights statement individually**. Do not assume "public domain by age" clears a given *scan* for commercial use; the underlying artwork is free, but institutions attach per-object rights statements and terms of use.
- **License discipline (commercial app):** Use only **CC0 / Public Domain Mark / CC BY**, plus PD-by-age scans. **Hard-exclude every NonCommercial (NC) license** — it is incompatible with a paid/monetized app — and exclude **NoDerivatives (ND)** for any image you crop or overlay. Treat **ShareAlike (SA)** with care: SA obligations attach only to *adaptations of the SA work*, not your app or its code, but a heavily cropped/composited SA image is an adaptation and must stay SA-compatible.
- **Store:** **Self-host** a right-sized derivative crop of every PD/CC image in a project-controlled location (repo `assets/images/` served via CDN, or committed and bundled/cached). Do **not** hotlink third-party image servers. Self-hosting gives you legal durability, kills link-rot, satisfies the app's offline promise, and sidesteps the U.S. "server test" display-right dispute.
- **Render:** Build an `ImageEmbed` on **expo-image** (already installed) mirroring `VideoEmbed.tsx`, with `contentFit="contain"`, `cachePolicy="memory-disk"`, a **thumbhash** placeholder (more reliable than blurhash on web), and both `accessibilityLabel` and web `alt` set.
- **Attribute:** Carry machine-readable **TASL** (Title, Author, Source, License) on every image and surface it via a compact caption strip plus the existing `CitationSheet`. Keep a written provenance manifest so an App Store 5.2 / Play IP challenge is answerable in minutes.
- **Video:** Keep the current YouTube approach (nocookie iframe on web, `react-native-youtube-iframe` on native). It is permitted under YouTube's API Services ToS. Harden it with a click-to-load facade because the "nocookie" embed still writes browser storage before playback — a consent issue in the EU/UK.

**The single most important legal rule to internalize:** *Age makes the original manuscript public domain, but that does not by itself make a specific institution's scan free for commercial use.* Reusability turns on (a) the **per-object rights statement**, (b) any **terms of use you actually accept**, and (c) **your jurisdiction**. Verify each image individually; record the basis.

---

## 2. What already exists in the app

| Capability | Where | Status |
|---|---|---|
| YouTube embedding | `src/components/VideoEmbed.tsx` — web `youtube-nocookie.com/embed/{id}?rel=0` iframe (lazy, `strict-origin-when-cross-origin`); native `react-native-youtube-iframe` (IFrame Player API) | **Working.** ToS-compliant mechanism. Extend, don't replace. |
| "VIDEOS" card section | `TermCard.tsx` renders when `term.videoLinks` present | Working; images should slot in as a parallel "ILLUSTRATIONS" section. |
| Citation UI | `src/components/modals/CitationSheet.tsx` (bottom sheet, parchment styling) | Working; reuse it for image TASL credits. |
| Community edits | `netlify/functions/suggest-edit.ts` (Octokit → auto-PR editing discipline JSON); registry in `src/config/dataRegistry.ts` | Working scalar-field edit path; extend for image objects. |
| Image renderer | `expo-image ^3.0.10` installed | **Installed but unused for terms — this is the gap.** |
| SVG components | `react-native-svg ^15.14.0` + svg-transformer (`src/types/svg.d.ts`, used in `TabIcon.tsx`) | Available for hand-drawn diagrams. |
| Offline file cache | `expo-file-system ~19.0.17` | Available for persisting downloaded PD scans. |

**The gap:** `Term` (`src/types/term.ts`) has **no image field**. The primary work is (a) a data-model extension, (b) an `ImageEmbed` component, and (c) a vetted sourcing + provenance workflow.

---

## 3. The legal foundation

### 3.1 Public domain by age — real, but jurisdiction-scoped

The **original** Meyer (1570), Fiore (c.1409), and Vadi (c.1480s) works predate any copyright term by centuries and are public domain everywhere. Life-plus-70 (EU/UK) and the U.S. 95-years-from-publication ceiling attach only to **modern outputs** — new translations, new photographs, editorial arrangement, restorations — never to the centuries-old originals.

Two precision points the research overstated:

- **U.S. rolling cutoff:** As of **January 1, 2026**, works first published in the U.S. **in 1930 or earlier** are public domain in the U.S. (95-year ceiling, running through the end of the 95th calendar year). The earlier draft's "before 1930" is off by one — 1930 is now PD too. The 95-year figure is a **ceiling, not a universal rule**: many pre-1964 works fell into PD earlier via non-renewal or missing notice, and separate regimes govern sound recordings, unpublished works, etc. For our four-to-six-century-old manuscripts this is moot; it matters only if you reuse a **modern printed edition** as a source.
- **U.S. PD ≠ PD everywhere.** The EU/UK use life-plus-70. A pre-1930 work by a long-lived author can still be under copyright abroad. For our manuscripts the *originals* are clear worldwide; the caution applies to any modern reproduction/translation you might pull alongside a scan.

### 3.2 The faithful-reproduction rule — why museum scans are (mostly) reusable, with caveats

Does a museum's flat, straight-on **scan** of a PD page earn a fresh copyright?

| Jurisdiction | Rule | Authority | Caveats |
|---|---|---|---|
| **US** | No. A "slavish" reproduction of 2D PD art lacks originality. | *Bridgeman Art Library v. Corel*, 36 F. Supp. 2d 191 (S.D.N.Y. 1999), applying *Feist* (1991); rejects sweat-of-the-brow. | **Persuasive district-court decision, not binding circuit/Supreme Court precedent.** Widely followed; *Feist*'s originality bar is the real backstop. |
| **EU/EEA** | No — reproductions of PD **visual art** get no copyright/related rights unless the reproduction is itself the author's own intellectual creation. | **Art. 14, Directive (EU) 2019/790 (DSM)**; transposition deadline **7 June 2021**. | It is a **directive**: effect depends on each Member State's **implementing statute**, not the directive text alone. Removes states' "simple photograph" related rights. **Does not override contractual ToS, database rights, or access rules.** EU/EEA only. |
| **UK** | Same practical result, but **not squarely decided.** | Originality = CJEU "author's own intellectual creation" test, confirmed in *THJ Systems Ltd v Sheridan* [2023] EWCA Civ 1354 (Arnold LJ). | **Important correction:** *THJ* was about **software-generated trading charts, not artwork reproductions** — it did **not** rule on faithful 2D reproductions. The conclusion (a slavish reproduction involves no free creative choice, so no new copyright) is a widely-accepted **inference**, not a holding. The UK did **not** implement DSM Art. 14. Treat UK reproduction-copyright as very-low-risk but **not codified**. |

**Bottom line:** the trend across US/EU/UK is uniform — faithful scans of these PD folios carry no enforceable *copyright*. But that is only half the picture.

### 3.3 Terms of use are contract, not copyright — and rights statements matter

Institutions routinely attach **rights statements and terms of use** to PD scans that copyright cannot support (watermarks, "non-commercial only," fees). These do **not** create copyright, but:

- They **bind you as contract** if you affirmatively accept them (click-through, account creation, paywall/download-portal terms). A PD scan grabbed *after* accepting restrictive terms becomes a **contract** problem even though copyright is clear.
- Even without acceptance, a **rights statement** on the object signals the institution's position and can carry commercial-reuse limits you should respect for relationship/reputational reasons and for App Store documentation.

**This is the most likely practical friction — not copyright infringement.** Two concrete, verified examples that directly hit our disciplines:

- ⚠️ **BSB/MDZ Meyer 1570 scan (`bsb11214763`) is marked `NoC-NC` — "No Copyright – Non-Commercial Use Only."** The 1570 work is PD by age, but this specific Google-partnership digitization is contractually limited to non-commercial use. **For a commercial app, do not self-host this scan.** Use instead: a **Public-Domain-Marked** BSB exemplar, a Wikimedia Commons copy, Wiktenauer's Meyer folios (check the source table), or another library's PD digitization. (Under *Bridgeman* the U.S. copyright is nil, but that does not erase BSB's contractual non-commercial condition of access.)
- **Getty Fiore (MS Ludwig XV 13, acc. 83.MR.183) object records are marked `NoC-US` — "No Copyright – United States," not CC0.** Correction to the draft "Getty Fiore is CC0": Getty adopted CC0 for its Open Content program in March 2024, but **this manuscript's leaf records carry NoC-US**, a U.S.-only, non-license rights statement that makes no determination for other countries and carries no warranty. In practice the images are safe to self-host from the U.S. (PD by age + *Bridgeman*) and impose no attribution requirement, though Getty **requests** the courtesy credit "Digital image courtesy of Getty's Open Content Program." For EU reuse, rely on PD-by-age + DSM Art. 14, not on the NoC-US label. **Do not describe it as "CC0" or "PD everywhere."**

### 3.4 Hotlinking risk: why embedding YouTube is safe but hotlinking an image is not

- **YouTube embedding rests on an express platform license** (the API Services ToS), not on any contested copyright doctrine. That's why the current embed is safe.
- **Hotlinking a still image you don't host is different.** The Ninth Circuit's "server test" (*Perfect 10 v. Amazon*, 2007) says embedding an image on someone else's server isn't a "display" and so isn't infringement — and the Ninth Circuit **reaffirmed it in *Hunley v. Instagram*, 73 F.4th 1060 (2023)**. But the S.D.N.Y. rejects it: *Goldman v. Breitbart*, 302 F. Supp. 3d 585 (2018) and *Nicklen v. Sinclair*, 551 F. Supp. 3d 188 (2021) held that embedding third-party-hosted content **can** infringe the §106(5) display right regardless of where the file sits.
  - **Correction to the draft:** these are **trial-court** rulings, **not binding Second Circuit precedent**, and neither held embedding *always* infringes (*Goldman* was partial summary judgment on the display-right question only; *Nicklen* a motion to dismiss). The circuit split is **live and unresolved**.
  - EU/UK analyze this under "communication to the public" (*Svensson*, *BestWater*, *VG Bild-Kunst*) — a different framework entirely.
- **Design consequence (jurisdiction-independent):** **self-host** the PD/CC images you're licensed to use rather than hotlink or inline-embed third-party servers. This avoids the display-right exposure in S.D.N.Y., the "communication to the public" exposure in the EU/UK, and link-rot — all at once.

### 3.5 Creative Commons families for a commercial app

| License element | Usable in this commercial app? | Rule (per CC's own texts) |
|---|---|---|
| **CC0 / Public Domain Mark** | ✅ Yes | No conditions. Courtesy credit is best practice, not required. |
| **CC BY** | ✅ Yes | Attribution required (TASL). |
| **CC BY-SA (ShareAlike)** | ⚠️ Use with care | Commercial OK. SA/copyleft attaches **only to adaptations of the SA work**, **not** to your app or its source code. **But** a cropped/recolored/composited SA image *is* an adaptation and must be released under a BY-SA-compatible license. The live risk is the **adaptation-vs-collection line**: an unmodified SA image placed as a discrete element is a "collection" (no contagion); a modified one is an "adaptation." Prefer CC0/PD/BY for anything you crop. |
| **Any NC (BY-NC, BY-NC-SA, BY-NC-ND)** | ❌ **No** | NC bars uses whose primary purpose is commercial advantage/monetary compensation. Bundling NC images in a **paid or ad/analytics-monetized** app is a paradigm commercial use. The test is the *use*, not merely the developer's for-profit status — but our use is squarely commercial. **Excluded.** |
| **Any ND (BY-ND, BY-NC-ND)** | ❌ **No** (if you crop/overlay) | ND permits private modification but **prohibits distributing adaptations.** A shipping app *distributes* what users see, so you cannot release a cropped/overlaid ND image in it. (Whether a trivial crop is even an "adaptation" is a fact question, but don't rely on it.) **Excluded for card art.** |

> **Wiktenauer text correction:** The "TEST" research risk claim that "Wiktenauer pages are CC BY-NC-SA" is **wrong**. Per Wiktenauer's own Copyright Policy, its **original** content (article text, all infobox content, navigation indexes) is **CC BY-SA 4.0** by default — so copying that *text* triggers attribution + share-alike. Some contributed text carries different terms (CC BY, CC0, CC BY-NC-SA, or full copyright) per each article's **source table**. Wiktenauer treats its hosted **scans** as PD based on *Bridgeman* and its HEMA Alliance sponsor's policy (not, strictly, "the Wikimedia position"), but this is **not blanket** — the policy itself overrides the PD mark for institution-CC-licensed scans, permission-only scans, museum-requested disclaimers, and uncertain microfilm. **Check each article's source table.**

### 3.6 Attribution (TASL) and where to place it

For CC BY / BY-SA (and as courtesy for CC0/PD), provide **T**itle, **A**uthor, **S**ource (link), **L**icense (link to the specific deed, e.g. "CC BY-SA 4.0" — not just "Creative Commons"), and **indicate modifications**. CC guidance: attribution may be given "in any reasonable manner based on the medium." For software, an **About/Credits screen is standard and acceptable**; a per-image caption or tap-to-open sheet is cleaner. Reuse `CitationSheet.tsx` and add an app-wide **Image & Content Credits** screen (also your App Store 5.2 evidence surface).

### 3.7 App Store / Play IP posture

- **Apple Guideline 5.2.1** says apps "**should** be submitted by the person or legal entity that owns or has licensed the intellectual property." **5.2.2 / 5.2.3** (third-party services / downloadable media) state "**Authorization must be provided upon request**" — App Review can demand proof of permission for third-party content.
- **Correction:** the **indemnity** obligation lives in the **Apple Developer Program License Agreement (DPLA)**, *not* Guideline 5.2. Under the DPLA you indemnify Apple against third-party IP claims. Google Play's IP policy is parallel. None of these is "law" — they are contractual **distribution-eligibility** conditions applied globally, and do not replace actual copyright law.
- **Operational takeaway:** keep a **per-image provenance manifest** (source URL, institution, rights statement, PD/CC basis, retrieval date, whether any ToS was accepted). PD-by-age scans and CC0/CC-BY images with recorded attribution answer a 5.2 challenge cleanly.

### 3.8 Compliance checklist (per image, before it ships)

- [ ] Underlying work PD by age? (Meyer/Fiore/Vadi originals: yes.)
- [ ] Per-object **rights statement** recorded (PDM / CC0 / CC BY / NoC-US / NoC-NC / other)?
- [ ] Rights statement **compatible with commercial use**? (Reject NoC-NC and all CC-NC for shipped assets.)
- [ ] If cropped/overlaid: license permits adaptation? (Reject ND; keep SA adaptations BY-SA-compatible.)
- [ ] **No restrictive click-through/account/paywall ToS was accepted** to obtain the file (or, if it was, terms permit this use)?
- [ ] Self-hosted a derivative copy (not hotlinked)?
- [ ] TASL captured in the data model; license linked to its deed?
- [ ] `alt` / `accessibilityLabel` written?
- [ ] Manifest row created (source, institution, basis, date)?

---

## 4. Where to get the images

Ranked source catalog. **IIIF availability is not a license** — always check the per-object rights statement. "Self-host" is recommended for everything shipped.

### 4.1 Cross-discipline / preferred hubs

| Source | What it has | Rights / License | IIIF? | Hotlink or self-host | Attribution |
|---|---|---|---|---|---|
| **Wikimedia Commons** | Meyer, Fiore (Getty/Google Art Project mirror), Vadi scans; many tagged PD-Art / PD-old / CC0 | Per-file; mostly PD/CC0/CC BY/BY-SA — **check each file** | Some (via Commons/GLAM) | **Self-host.** Commons *permits but discourages* hotlinking (files can be renamed/deleted/vandalized; renaming breaks the link); license/attribution still apply regardless of access method | Per license; drop none for CC BY/BY-SA |
| **Wiktenauer** | The definitive HEMA hub: folio scans + transcriptions/translations for all three masters | Scans treated as PD (per *Bridgeman* + HEMA Alliance), **but not uniform** — check each article's **source table**. Original text/infoboxes are **CC BY-SA 4.0** | Links out to library IIIF | **Self-host scans**; do **not** copy CC BY-SA text into proprietary UI copy without share-alike | Courtesy-credit institution + Wiktenauer; SA if you copy its text |
| **rightsstatements.org vocabulary** | (Reference) how to read `PDM`, `CC0`, `NoC-US`, `NoC-NC` labels | — | — | — | — |

### 4.2 German longsword — **Joachim Meyer 1570** (`meyer1570.long.`)

| Source | What it has | Rights / License | IIIF? | Hotlink or self-host | Attribution |
|---|---|---|---|---|---|
| ⚠️ **BSB/MDZ `bsb11214763`** | Full 1570 treatise, IIIF Image API v2 (Level 2, CORS on); manifest at `api.digitale-sammlungen.de/iiif/presentation/v2/bsb11214763/manifest` | **`NoC-NC` — non-commercial only. NOT usable in this commercial app.** | ✅ Yes | — (avoid for commercial) | — |
| **Public-Domain-Marked BSB exemplar** (if one exists for Meyer) | Same work, different digitization | Only BSB items bearing **Public Domain Mark 1.0** are cleared for commercial reuse | ✅ | Self-host | Courtesy credit |
| **Wikimedia Commons — Meyer 1570 plates** | The famous Meyer woodcut plates (guards, cuts, cutting diagrams) | Per-file PD/PD-Art (check) | Some | **Self-host** | Courtesy credit |
| **Wiktenauer — Meyer 1570 article** | Curated plate crops + folio references | Scans PD (check source table); text CC BY-SA | Links out | Self-host scans | Institution + Wiktenauer |

> **Action:** because the richest single IIIF Meyer source (BSB `bsb11214763`) is commercially restricted, **route Meyer imagery through Wikimedia Commons / Wiktenauer / a PDM exemplar** and record the PD-by-age + PDM/PD-Art basis.

### 4.3 Italian longsword — **Fiore dei Liberi** (`italian.long.`)

| Source | What it has | Rights / License | IIIF? | Hotlink or self-host | Attribution |
|---|---|---|---|---|---|
| **Getty — MS Ludwig XV 13 (*Fior di Battaglia*)** | The premier Fiore manuscript; per-figure art (guards, plays, dagger/sword) | **`NoC-US`** (U.S.-only, non-license, no warranty). PD by age; safe to self-host from U.S. | ✅ `media.getty.edu/iiif/manifest/{id}`; Open Content download | **Self-host** | None required; Getty *requests* "Digital image courtesy of Getty's Open Content Program" |
| **Wikimedia Commons — Getty/Google Art Project Fiore** | Same manuscript mirrored | PD-Art (check per file) | Some | Self-host | Courtesy credit |
| **Morgan (MS M.383), Pisani-Dossi (Novati) facsimile** | Other Fiore recensions for cross-illustration | Per-object; Morgan carries its own rights statement — check | Morgan has IIIF | Self-host, verify each | Per rights statement |

> **Best 2:** Getty Ludwig XV 13 (via IIIF, self-hosted, NoC-US) and its Wikimedia mirror. Do **not** label these "CC0."

### 4.4 Vadi longsword — **Filippo Vadi** (`vadi.long.`)

| Source | What it has | Rights / License | IIIF? | Hotlink or self-host | Attribution |
|---|---|---|---|---|---|
| **Wikimedia Commons — Vadi (*De Arte Gladiatoria Dimicandi*, Rome, Bibl. Naz. Cod. 1324)** | Vadi's illustrated plays/figures | Per-file PD-Art (check) | Rarely IIIF | **Self-host** | Courtesy credit |
| **Wiktenauer — Vadi article** | Curated folio scans + transcription | Scans PD (check source table); text CC BY-SA | Links out | Self-host scans | Institution + Wiktenauer |
| **Biblioteca Nazionale Centrale (Rome) digitization** | Original codex | Verify rights statement; **less likely to expose IIIF** | Maybe | Self-host if cleared | Per rights statement |

> Vadi is the thinnest for IIIF; **Wikimedia Commons + Wiktenauer** are the practical route. Verify each folio's rights statement.

### 4.5 Generic guards / cuts / weapons + commissioning

- **Generic historical concepts** (Vom Tag, Ochs, Pflug, Alber; posta di donna; the four openings; footwork): draw from the same manuscript plates above, or **commission original line diagrams**.
- **Commissioned original diagrams (recommended for footwork/mechanics):** an artist-drawn SVG set you own outright is the cleanest legal position — no third-party rights, fully adaptable, tiny, offline-friendly, and on-brand for the "cozy manuscript" aesthetic. Deliver as `react-native-svg` components (pipeline already wired via svg-transformer + `TabIcon.tsx`). Use a **work-for-hire / full-assignment** contract so the app owns copyright; record that in the manifest.

---

## 5. How to embed it technically

### 5.1 IIIF for faithful folio crops

IIIF lets you request a right-sized, single-figure crop by URL — no need to store the master. **Image API 3.0** grammar:

```
{scheme}://{server}{/prefix}/{identifier}/{region}/{size}/{rotation}/{quality}.{format}
```

- **region:** `full` | `square` | `x,y,w,h` (pixels) | `pct:x,y,w,h` — crop to just the guard/cut figure.
- **size (3.0):** `max`, `w,`, `,h`, `w,h`, `!w,h` (fit box, keep aspect), `pct:n`; prefix with `^` to *permit* upscaling (requires the host's `sizeUpscaling` feature, else HTTP 501). Without `^`, a request that would enlarge the region **must error**.
- **Version nuance (corrected):** 3.0 **removed** the `full` size keyword — use `max`. But **2.1 supported *both* `full` and `max`** (`full` deprecated there), and **2.0 supported only `full`** (no `max`). So detect the served version and, ideally, read the host's `info.json` (`profile` / `extraFeatures`) rather than assuming a single `full`→`max` swap. BSB serves **v2** (Level 2).

Example figure crop (device-appropriate width, no upscaling):
```
https://{server}/{identifier}/pct:41,7,40,70/800,/0/default.jpg
```

**Workflow:** resolve a manifest once per manuscript → record `{identifier, region}` per technique → generate a crop URL → **download it once, commit the derivative, and self-host.** Keep the IIIF identifier + region in metadata so any crop is regenerable and auditable.

### 5.2 Hotlink vs self-host vs bundle — recommend self-host

| Strategy | Offline | Legal durability | Link-rot | Perf | Verdict |
|---|---|---|---|---|---|
| **Bundle in binary** | Best | Best | None | Fast | Only for a tiny SVG diagram set — bloats binary, needs a release to fix. |
| **Hotlink IIIF/Wikimedia** | ❌ Breaks | ❌ Depends on host ToS + display-right risk | ❌ High (renames/deletes) | Extra 3rd-party request | Avoid; optional deep-zoom-on-tap only. |
| **Self-host derivative crop** (repo `assets/images/` → CDN; cached via expo-file-system/expo-image) | ✅ After first view | ✅ Frozen PD crop + recorded provenance | ✅ None | ✅ CDN + disk cache | **Recommended default.** |

**Rationale:** self-hosting removes dependence on another server's uptime and ToS, defeats link-rot, avoids the *Goldman/Nicklen* display-right dispute, and delivers the offline caching the app already promises. Keep the source IIIF identifier in metadata for auditability.

### 5.3 expo-image specifics (verified for ^3.0.10)

Confirmed supported on all platforms **including react-native-web**: `cachePolicy` (`none`/`disk`/`memory`/`memory-disk`, default `disk`), `contentFit`, `priority` (`low`/`normal`/`high`), placeholder from `blurhash` **and** `thumbhash`, and a real underlying web `<img>` with **`alt` wired from `alt`/`accessibilityLabel`** (fixed in 3.0.0) → screen-reader + crawler-readable SEO on the Netlify build.

Two corrections to bake in:
- **`recyclingKey` is Android/iOS-only** — it's a **no-op on react-native-web**. Don't rely on it for web list behavior.
- **Prefer `thumbhash` over `blurhash` on web.** blurhash rendering has a documented reliability history on web (expo issue #29425 — web attempted an HTTP request instead of decoding the hash); thumbhash decodes reliably. Store a thumbhash string per image and **test on the exact RN 0.81 / expo-image 3.0.10 combo**.

Recommended props for manuscript figures:
```tsx
<Image
  source={{ uri: img.url }}
  placeholder={{ thumbhash: img.thumbhash }}
  contentFit="contain"           // never "cover" — you'd crop the technique
  cachePolicy="memory-disk"      // persists → offline after first view
  priority={isActiveCard ? 'normal' : 'low'}
  transition={200}               // gentle fade, fits the cozy aesthetic
  accessibilityLabel={img.alt}   // native screen readers
  alt={img.alt}                  // web <img alt> → a11y + SEO
  style={{ width: '100%', aspectRatio: img.width / img.height }}
/>
```
Only mount `ImageEmbed` for the **active/visible** card in the swiper; lean on `priority` + disk cache for the rest.

### 5.4 SVG for diagrams

Hand-drawn footwork/mechanics diagrams import as components via `react-native-svg` + svg-transformer (already used in `TabIcon.tsx`, typed in `src/types/svg.d.ts`). Zero raster weight, crisp at any density, fully owned if commissioned work-for-hire.

### 5.5 YouTube hardening

Keep the sanctioned mechanism (nocookie iframe on web, IFrame Player API on native). It is permitted **subject to acceptance of and compliance with** the YouTube API Services ToS + Developer Policies — a revocable agreement, not an unconditional right. Obligations to honor:

- Unmodified official player only; **min 200×200 viewport** with controls fully visible; **no overlays** in front of the player; **no nested/obfuscating iframes**.
- **No downloading/caching/storing** the content (so **do not** add offline video).
- **Provide an HTTP `Referer`** for identification (native WebViews that omit it hit playback/compliance issues).
- **Made-For-Kids:** disable tracking, comply with COPPA/GDPR.
- Embedding fails where the uploader disabled it **or** the video is **age-restricted** (redirects to YouTube). Skip those; don't work around them.
- Commercial apps may embed but must not overlay their own ads on the player or charge for access to the content.
- Copyright-law compliance of embedding varies by jurisdiction (permissive in the EU under *Svensson*; contested in the US) — this is separate from the ToS license and shouldn't be described as "legal everywhere."

**Privacy hardening (recommended — click-to-load facade):** the `youtube-nocookie.com` embed **defers HTTP cookies until Play**, but **still writes persistent identifiers to `localStorage`/IndexedDB on iframe *load*** (observed keys include `yt-remote-device-id` and `ytidb::LAST_RESULT_ENTRY_KEY`; treat as version-dependent examples). Because EU/UK **ePrivacy** rules (Directive Art. 5(3); UK PECR reg. 6) are technology-neutral and cover *any* client-side storage, the plain nocookie embed is **not consent-safe by default** in the EU/UK. Fix: render a static thumbnail (`https://i.ytimg.com/vi/{id}/hqdefault.jpg`) + play button and inject the real iframe **only on click** — this also defers the heavy iframe (a big perf win with many embeds). Keep the external "Watch on YouTube" `Linking` fallback. Disclose the YouTube embed **and PostHog** in the privacy policy / App Store data-collection sheet.

---

## 6. Proposed data model & components

### 6.1 `TermImage` type (`src/types/term.ts`)

```ts
export interface TermImage {
  /** Self-hosted derivative crop URL (repo asset / CDN). Required. */
  url: string;
  /** Screen-reader + web <img alt> + SEO. Required — render-gated. */
  alt: string;

  // --- Rights (all required for render) ---
  /** Human label, e.g. "Public Domain (PD-Art)", "CC BY 4.0", "No Copyright – United States". */
  license: string;
  /** Link to the license deed / rights statement page. */
  licenseUrl?: string;
  /** Full TASL attribution string, e.g. "Meyer 1570, f.12r — BSB — Public Domain". Required. */
  attribution: string;

  // --- TASL detail ---
  title?: string;
  author?: string;
  source?: string;       // human source label, e.g. "Wikimedia Commons"
  sourceUrl?: string;    // link to the source record
  institution?: string;  // holding library/museum

  // --- Provenance (audit + regenerable crop) ---
  folio?: string;        // e.g. "f.12r"
  iiif?: { identifier: string; region?: string; size?: string };
  retrieved?: string;    // ISO date the asset was fetched
  termsAccepted?: boolean; // false = grabbed under NO restrictive click-through

  // --- Render hints ---
  thumbhash?: string;    // preferred web placeholder
  contentFit?: 'contain' | 'cover';
  width?: number;
  height?: number;
}

export interface Term {
  // ...existing fields...
  images?: TermImage[];
}
```

### 6.2 Render-gate validator (the hard invariant)

```ts
/** No image renders without url + alt + license + attribution. */
export function isRenderableImage(img: TermImage): boolean {
  return Boolean(img?.url && img.alt?.trim() && img.license?.trim() && img.attribution?.trim());
}
```
This makes "no attribution → no image" a **code invariant** satisfying both legal and a11y in one gate. Run it **at display time**, not only at ingest, so a later re-crop that drops TASL simply stops rendering.

### 6.3 `ImageSection` / `ImageEmbed` (mirrors `VideoEmbed.tsx`)

```tsx
// src/components/ImageEmbed.tsx
import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';
import { colors, borderRadius } from '../theme';
// NOTE (current API): `CitationSheet` is today a plain component with props
// `{ visible, citations, onClose }` — there is no `useCitationSheet` hook yet.
// Either (a) lift `visible`/selected-image state into the parent and render
// `<CitationSheet .../>` there, or (b) add a small context+hook wrapper as part
// of Phase 1. The `openCredit` call below is illustrative of the intended UX.
import { useCitationSheet } from './modals/CitationSheet';

export function ImageEmbed({ img }: { img: TermImage }) {
  if (!isRenderableImage(img)) return null;
  const openCredit = useCitationSheet();

  return (
    <View style={{ borderColor: colors.gold.main, borderWidth: 1, borderRadius: borderRadius.md, overflow: 'hidden' }}>
      <Image
        source={{ uri: img.url }}
        placeholder={img.thumbhash ? { thumbhash: img.thumbhash } : undefined}
        contentFit={img.contentFit ?? 'contain'}
        cachePolicy="memory-disk"
        transition={200}
        accessibilityLabel={img.alt}
        alt={img.alt}
        style={{ width: '100%', aspectRatio: (img.width ?? 4) / (img.height ?? 3) }}
      />
      {/* Always-visible parchment credit strip; tap for full TASL sheet */}
      <Pressable onPress={() => openCredit(img)} style={{ backgroundColor: colors.parchment, padding: 6 }}>
        <Text style={{ fontSize: 11, color: colors.ink }}>
          {img.attribution} · {img.license}
        </Text>
      </Pressable>
    </View>
  );
}

export function ImageSection({ term }: { term: Term }) {
  const imgs = (term.images ?? []).filter(isRenderableImage);
  if (imgs.length === 0) return null;
  return (
    <View>
      <Text style={{ /* section header token */ }}>ILLUSTRATIONS</Text>
      {imgs.map((img) => <ImageEmbed key={img.url} img={img} />)}
    </View>
  );
}
```

**Slot into `TermCard.tsx`** as an "ILLUSTRATIONS" section directly beside the existing "VIDEOS" section, reusing theme tokens (`colors.gold.main` border, `borderRadius.md`, parchment background). Unlike `VideoEmbed`, no `Platform` branch is needed for the raster path — expo-image is cross-platform. **Extend `CitationSheet`** to render image TASL (title/author/source-link/license-link as tappable links) so one attribution component serves both text citations and image credits.

### 6.4 Sample JSON record (Fiore, Getty)

```json
{
  "id": "italian.long.posta_di_donna",
  "originalTerm": "Posta di Donna",
  "englishTerm": "Woman's Guard",
  "briefDescription": "A high rear guard with the sword held over the shoulder...",
  "images": [
    {
      "url": "https://cdn.jsdelivr.net/gh/OWNER/fechtonomicon@main/assets/images/fiore/posta-di-donna.webp",
      "alt": "A fencer in Posta di Donna, sword held high over the right shoulder, from Fiore's Fior di Battaglia.",
      "license": "No Copyright – United States",
      "licenseUrl": "https://rightsstatements.org/page/NoC-US/1.0/",
      "attribution": "Fiore dei Liberi, Fior di Battaglia (MS Ludwig XV 13), f.32r — J. Paul Getty Museum — Public domain by age; digital image courtesy of Getty's Open Content Program.",
      "title": "Fior di Battaglia (MS Ludwig XV 13)",
      "author": "Fiore dei Liberi",
      "institution": "J. Paul Getty Museum",
      "source": "Getty Open Content (IIIF)",
      "sourceUrl": "https://www.getty.edu/art/collection/object/103RW1",
      "folio": "f.32r",
      "iiif": { "identifier": "getty-ludwig-xv-13-p64", "region": "pct:41,7,40,70", "size": "800," },
      "retrieved": "2026-07-20",
      "termsAccepted": false,
      "thumbhash": "3PcNJYSFeXh/d3eweFaOfk9EBw==",
      "width": 800,
      "height": 1120
    }
  ]
}
```

---

## 7. Community pipeline

Extend `netlify/functions/suggest-edit.ts` (currently `updateCardField` → single scalar overwrite → Octokit PR routed by `idPrefix` in `DATA_SETS`) with an **image branch**:

1. Accept a **structured `TermImage` object** (not a scalar).
2. **Validate server-side:** reject unless `url && alt && license && attribution` are all non-empty (mirror `isRenderableImage`). Also reject any `license` matching NC or ND for shipped card art, and flag unrecognized rights statements for human review.
3. **Append** to the record's `images[]` array (do not scalar-overwrite).
4. Open the PR against the **correct discipline JSON** by `idPrefix`.
5. **Optional (preferred):** have the function **fetch the IIIF crop and commit the derivative** into `assets/images/` (self-host path) instead of storing a hotlink, and compute the thumbhash.
6. **Human PR review remains the licensing backstop** — a maintainer confirms the rights statement and that no restrictive ToS was accepted.

**Registry drift caution:** `suggest-edit.ts` duplicates the discipline registry (`DATA_SETS`) from `src/config/dataRegistry.ts`. Adding image routing widens the drift surface — consider importing a single shared registry module to keep them in sync.

**Non-negotiable rule:** *no image renders without `alt` + `license` + `attribution`* — enforced both server-side at ingest and client-side at display via `isRenderableImage`.

---

## 8. Risks & open questions

| Risk | Detail | Mitigation |
|---|---|---|
| **Commercial-use restriction on the best Meyer scan** | BSB `bsb11214763` is `NoC-NC` — **not usable commercially.** | Source Meyer from Wikimedia/Wiktenauer/a PDM exemplar; record basis. |
| **"CC0" mislabeling** | Getty Fiore is **NoC-US**, not CC0; NoC-US is U.S.-only and non-warranty. | Label rights statements exactly; rely on PD-by-age + Art. 14 for EU. |
| **Bridgeman is district-court** | Not binding nationwide; a museum could argue protection in an untested circuit. | *Feist* originality bar is the real backstop; trend is uniform; self-host + manifest. |
| **ToS/contract exposure** | Downloading behind an accepted click-through/paywall breaches contract even where copyright is nil. | Use open mirrors; record `termsAccepted: false`; don't scrape behind accepted terms. |
| **UK is uncodified** | *THJ* did not rule on reproductions; DSM Art. 14 not adopted. | Low-risk but flagged; PD-by-age original is still clear worldwide. |
| **Server-test / hotlink liability** | *Goldman/Nicklen* (S.D.N.Y.) vs *Hunley* (9th Cir.) — live split. | Self-host; never hotlink third-party image servers. |
| **NC/ND traps** | NC breaks the paid model; ND breaks cropping. | Validator rejects both for shipped card art. |
| **SA contagion (image-level)** | A cropped BY-SA image is an adaptation that must stay BY-SA. | Prefer CC0/PD/BY for cropped art; keep SA to uncropped "collection" use. |
| **Link-rot / integrity** | Wikimedia/IIIF files get renamed/deleted; identifiers change on re-digitization. | Self-host derivatives; keep IIIF identifier for regeneration. |
| **YouTube privacy (EU/UK)** | nocookie writes `localStorage` on load → ePrivacy consent gap; embeds serve YouTube's own ads. | Click-to-load facade; disclose in privacy policy. |
| **Offline weight / binary bloat** | Bundling many rasters inflates the binary, unpatchable without a release. | Bundle only a minimal SVG/hero set; CDN + disk-cache the rest. |
| **User-submitted image moderation** | Contributors may submit copyrighted/mislabeled images. | Server-side TASL validation + mandatory human PR review. |
| **Attribution durability** | A later re-crop can drop TASL. | Render-gate at display time, not just ingest. |
| **expo-image web quirks** | blurhash/contentFit/recycling sizing bugs (expo #21677/#22206/#29425); `recyclingKey` is a web no-op. | Use thumbhash on web; test on RN 0.81 / expo-image 3.0.10. |

**Confirm before shipping:** (1) attorney sign-off on the sourcing manifest; (2) a **commercially-clear Meyer** image set (not the NoC-NC BSB scan); (3) each shipped image's rights statement recorded and commercial-compatible; (4) privacy policy updated for YouTube + PostHog; (5) an App Store Image & Content Credits screen in place.

---

## 9. Phased implementation plan

**Phase 0 — Data model + proof (1–2 days).**
Add `TermImage` + `images?: TermImage[]` to `src/types/term.ts`; add `isRenderableImage`. Hand-curate **one PD image on each of 2–3 exemplar cards** — ideally one per discipline (Fiore from Getty/Wikimedia; Meyer from Wikimedia/Wiktenauer — **not** the NoC-NC BSB scan; Vadi from Wikimedia). Self-host the crops in `assets/images/`. Start the provenance manifest. No UI yet — validate the shape and the sourcing/rights workflow end to end.

**Phase 1 — Component + attribution UX (2–3 days).**
Build `ImageEmbed` / `ImageSection` on expo-image (`contentFit="contain"`, `cachePolicy="memory-disk"`, thumbhash, `alt` + `accessibilityLabel`). Add the "ILLUSTRATIONS" section to `TermCard.tsx`. Extend `CitationSheet` for image TASL; add the always-visible parchment credit strip and the app-wide **Image & Content Credits** screen. Verify web `alt`/SEO and thumbhash on RN 0.81.

**Phase 2 — IIIF / self-host tooling + video hardening (3–5 days).**
Write a small build script that, given `{iiif.identifier, region, size}`, fetches the crop, writes a WebP into `assets/images/`, computes width/height + thumbhash, and stamps the manifest. Serve via jsDelivr/Netlify CDN. Backfill high-value cards. Upgrade YouTube to the click-to-load facade; update privacy disclosures (YouTube + PostHog).

**Phase 3 — Community submissions (3–5 days).**
Extend `suggest-edit.ts` with the image branch: structured `TermImage`, server-side TASL + license validation (reject NC/ND, flag unknown rights statements), append to `images[]`, route by `idPrefix`, and optionally fetch+commit the IIIF derivative. Keep human PR review as the licensing backstop. Consider unifying the duplicated `DATA_SETS` registry with `src/config/dataRegistry.ts` to reduce drift.

---

*Prepared for the Fechtonomicon repo owner. All refuted or oversimplified research claims have been replaced with the verified corrected statements: U.S. PD cutoff is "1930 or earlier" (95-year ceiling, not universal); Bridgeman/Goldman/Nicklen are persuasive district-court rulings amid a live circuit split (Hunley reaffirmed the server test in the 9th Cir.); DSM Art. 14 is a directive needing national transposition and doesn't bind the UK; THJ v Sheridan concerned software charts, not reproductions; Wiktenauer original text is CC BY-SA 4.0 with per-article variance and scans are not uniformly PD; the BSB Meyer scan is NoC-NC (non-commercial) and the Getty Fiore is NoC-US, not CC0; Apple's indemnity lives in the DPLA, not Guideline 5.2; and expo-image's recyclingKey is a web no-op with thumbhash preferred over blurhash on web.*
