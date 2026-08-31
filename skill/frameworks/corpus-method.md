# Corpus Method

How to turn a folder of competitor thumbnails into evidence you can actually design against. Load this whenever competitor data is pulled, ranked, or cited.

Most thumbnail research fails in the same two places: it ranks on the wrong number, and it trusts views that were bought. Both are fixed here, and both are cheap to fix.

---

## 1. Rank on breakout, never on raw views

Raw view count across channels of different sizes is close to meaningless.

```
Channel A   30,000 subs   video did  20,000 views   ->  0.67x   the thumbnail worked
Channel B  900,000 subs   video did 200,000 views   ->  0.22x   the thumbnail underperformed
```

Sorted by raw views, B looks like the winner and you would copy the wrong thumbnail.

**Breakout = views / subscriber count.** Use it as the sort key everywhere. If you can get a channel's 30-day median view count, dividing by that instead is better still, because it measures the video against the channel's own baseline rather than against a subscriber number that may be years stale.

Report both columns so the user can see the difference. Only ever rank on breakout.

---

## 2. Flag bought views before you learn anything from them

Purchased views are common in AI, business, finance, and crypto niches. A thumbnail on a video with bought traffic proves nothing about clicks, because the clicks did not happen the way they appear to have happened.

The tell is the like rate.

```
like_rate = likes / views
```

| Like rate | Read |
| --- | --- |
| 2% to 5% | Healthy organic engagement |
| 1% to 2% | Normal for a broad or heavily-promoted topic |
| 0.5% to 1% | Suspicious. Check the comment count too |
| under 0.5% | **Flag it.** Treat as paid or promoted inventory |

A real example from the corpus this skill was built against: one channel's five videos averaged 111,777 views on 56 likes. That is a 0.05 percent like rate, while peers in the same window ran 1.9 to 4.0 percent. Forty to eighty times below every neighbour, and flat across five uploads on a channel where organic variance normally runs 5x. Those thumbnails were professionally made sponsor assets. Useful as composition references. Worthless as proof that a thumbnail earned a click.

**A second, blunter filter that catches promoted inventory:** anything over 200,000 views with an engagement rate under 0.6 percent goes in a separate paid table, out of the ranking entirely.

Rules once a video is flagged:

- `paid_flag: true` in the CSV
- Excluded from every aggregate, every mean, every "faceless wins by X" claim
- Still usable as a **composition reference**, and say so explicitly when you cite it
- Never cited as CTR or click evidence

Do not name-and-shame in any output the user might publish. Write the flag as a data property, not as an accusation about a person.

---

## 3. The CSV schema

One row per thumbnail. Write rows as you go, channel by channel, so a long vision-reading run cannot lose its work.

| Column | Values |
| --- | --- |
| `channel` | handle |
| `subs` | integer |
| `views` | integer |
| `published` | YYYY-MM-DD |
| `like_rate` | percent, 2 decimals |
| `paid_flag` | true / false |
| `breakout` | views / subs, 2 decimals |
| `faceless` | true / false |
| `bg_treatment` | flat / gradient / photo / blurred-scene / rendered-3d |
| `headline_words` | integer, 0 if no text |
| `text_placement` | left / right / top / bottom / center / none |
| `brand_glyph` | logo, product mark, or app icon present, and which |
| `accent_color` | dominant accent, plain name plus hex if readable |
| `concept_carrier` | the ONE element the idea rides on: face, object, screen, comparison, arrow, number |
| `curved_arrow` | true / false |
| `thumbnail_file` | filename, so any claim can be checked |

`concept_carrier` is the column that earns its keep. Group by it at the end. In most niches two or three carriers account for nearly every top performer, and that is the finding worth designing against.

---

## 4. Reading the corpus

After every row is in, answer these five questions in the corpus README. Nothing else in the analysis matters as much.

1. **Faceless or face-led, in this niche, excluding flagged videos.** Give n and mean breakout for both. If the split is close, say it is close; do not manufacture a winner.
2. **Which concept carriers win.** Group by `concept_carrier`, rank by mean breakout.
3. **What the cliche is.** The pattern that appears in almost every thumbnail regardless of performance. This is what to avoid, or to deliberately break.
4. **What the outlier did differently.** Take the single highest breakout thumbnail and describe what it does that the median one does not.
5. **Headline length and placement.** Report the numbers, but hold this loosely; word count is weakly predictive at best.

---

## 5. Corpus expiry

**Patterns rot fast, faster than anyone expects.**

Measured, in one real 15-day window in a single niche: a framing that was running at 19.55x median breakout fell to 1.79x. Fifteen days. Nothing changed except that everyone copied it and the audience stopped noticing it.

So every corpus folder carries a `generated:` date in its README, and the skill enforces it:

| Age | Behaviour |
| --- | --- |
| 0 to 60 days | Use it, cite it freely |
| 60 to 90 days | Use it, and say the age out loud in the output |
| over 90 days | **Refuse to cite it as current evidence.** Tell the user to run `/ez-thumb refresh` |

An expired corpus is still fine for composition and craft reference. Composition ages slowly. Trend claims do not.
