---
name: corpus-readme
description: Structure for the README written into every reference/<date>-<niche>/ corpus folder, including the expiry stamp and the five findings.
---

# Template: Corpus README

Written to `reference/<YYYY-MM-DD>-<niche-slug>/README.md` at the end of onboard and refresh.

---

# Reference Corpus: {niche}, {YYYY-MM-DD}

```
generated: {YYYY-MM-DD}
thumbnails: {n}
channels: {k}
window: {start} to {end} ({days} days)
flagged as paid inventory: {p}
discovery: {vidiq | manual}
```

**Expiry.** Trend claims from this corpus are current for 60 days, usable with a stated caveat to 90, and must not be cited as current evidence after that. Composition and craft observations age slowly and stay useful. Run `/ez-thumb refresh` when this passes 90 days.

Every image was opened and read. Nothing here is inferred from a title.

## Roster

| Channel | Subs | Top breakout in window | Flagged |
| --- | --- | --- | --- |
| | | | |

## How to read the filenames

`thumbnails/<channel>/<9-digit-zero-padded-views>-<date>-<slug>.jpg`

The zero-padded view count sorts each channel folder by performance, best last. Cite thumbnails by filename whenever a claim is made, so the claim can be checked against the image.

`records.csv` carries one row per thumbnail. Schema in `frameworks/corpus-method.md`.

## Caveats

*Every channel with flagged videos gets a line here, written as a data property and never as an accusation about a person.*

**{channel}.** {n} of {k} videos flagged: {views} views on {likes} likes, a {rate} percent like rate against a roster median of {median} percent. Composition reference only. Never cited as click evidence.

## The five findings

**1. Faceless or face-led in this niche** *(flagged videos excluded)*

| Split | n | Mean breakout |
| --- | --- | --- |
| Faceless | | |
| Face-led | | |

{One sentence verdict. If the split is close, say it is close.}

**2. Which concept carriers win**

| Carrier | n | Mean breakout |
| --- | --- | --- |
| | | |

**3. The cliche.** {The pattern in almost every thumbnail regardless of performance. What to avoid or deliberately break.}

**4. What the outlier did.** {Top breakout thumbnail by filename, and what it does that the median one does not.}

**5. Headline length and placement.** {Numbers, held loosely. Word count is weakly predictive at best.}

## Delta from the previous corpus

*Refresh only. The actual deliverable of a refresh run.*

| Pattern | Then ({date}) | Now | Direction |
| --- | --- | --- | --- |
| | | | |

{Which pattern collapsed, which is rising, what the new cliche is.}
