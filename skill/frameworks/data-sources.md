<data_sources>

# Data Sources

## Purpose
How competitor data gets into this skill.

How competitor data gets into this skill. Two decisions, and they are separate: **who** the competitors are, and **how** their thumbnails get pulled.

```
DISCOVERY  (who)                    PULL  (what)
-----------------                   ------------
vidIQ MCP        ----\
                      >----------->  Apify MCP  ---> thumbnails + stats
you name them    ----/
```

Discovery is a choice. The pull is always Apify. Do not mix a third path in.

---

## Discovery, option A: vidIQ MCP

Available only when `mcp__vidiq__*` is present in the session.

```
vidiq_similar_channels   seed channel -> a ranked list of adjacent channels
vidiq_channel_stats      subscriber count, for the size band filter
```

Recipe:

1. Ask the user for two or three seed channels they already know they compete with.
2. Run `vidiq_similar_channels` on each seed.
3. Pool and dedupe the results.
4. **Filter to a real competitive band: 0.3x to 10x the user's own subscriber count.** A 2,000-subscriber channel learns nothing useful from MrBeast, whose thumbnails are made by a paid team against an audience of a hundred million. Cut the giants out.
5. Present 10 to 15 for approval. The user edits the list. The user always sees it before anything gets pulled.

Two things vidIQ is good at that are worth using while it is open: `vidiq_outliers` surfaces videos that overperformed their own channel baseline, which is a shortcut to the same breakout math this skill does by hand.

## Discovery, option B: the user names them

No MCP needed. The user pastes handles or channel URLs.

This is often the better list. An operator who watches their niche every day knows which channels actually compete for their viewer, and a similarity algorithm does not. Do not treat this as the downgrade path.

Guidance to give them:
- 10 to 15 channels. Below 6 the corpus is too thin to see a pattern, say so.
- Same size band applies: roughly 0.3x to 10x their own subscriber count.
- Direct competitors, not aspirational ones. The channel they lose a click to, not the channel they want to become.
- A couple of adjacent-niche channels is healthy. Research in-niche to find the cliche, take visual inspiration out-of-niche.

---

## The pull: Apify MCP

One actor does the whole job.

**Actor:** `lurkapi/youtube-channel-videos-stats-scraper`

**Input:**

```json
{
  "channels": ["@handle1", "@handle2"],
  "maxVideosPerChannel": 5,
  "contentType": "videos",
  "sortBy": "popular",
  "publishedAfter": "YYYY-MM-DD",
  "includeVideoStats": true
}
```

Notes that matter:

- **`includeVideoStats: true` is not optional.** It returns views, likes, and comments. Without likes there is no like rate, without a like rate there is no bought-views filter, and without that filter the corpus will quietly rank purchased traffic at the top. See `frameworks/corpus-method.md`.
- **`contentType: "videos"`** drops Shorts. Shorts thumbnails are a different craft with different rules; mixing them into a longform corpus poisons both. Run a separate corpus if the user wants Shorts.
- **`publishedAfter`** is today minus 90 days by default. Offer 60 for fast-moving niches. Going past 90 pulls in patterns that have already burned out.
- **`maxVideosPerChannel: 5`** by default. Fifteen channels times five is 75 thumbnails, which is enough to see a pattern and small enough to actually read.

**Getting the images.** The actor returns thumbnail URLs. Download the highest resolution available for each video to:

```
reference/<YYYY-MM-DD>-<niche-slug>/thumbnails/<channel-slug>/<9-digit-zero-padded-views>-<date>-<title-slug>.jpg
```

The zero-padded view count sorts each channel folder by performance, best last. Cite thumbnails by this filename whenever a framework claims a pattern, so any claim can be checked against the actual image.

**Cost.** Tell the user the estimate before running. A 15-channel, 5-video pull is one actor run over 15 channels. State it, get a yes, then run.

---

## What is deliberately not here

- **No YouTube Data API path.** It is free, but it costs the user a Google Cloud project, an API key, and a quota conversation before they see a single thumbnail. Apify is one token. If you already have a Data API key wired up, using it instead is fine; the corpus method downstream is identical.
- **No page scraping.** Fragile, gets blocked, and returns no like counts.
- **No corpus shipped in this package.** Every thumbnail in a corpus belongs to the creator who made it. This skill builds a local research set for the operator's own analysis and gitignores it. Never commit a corpus to a public repository, and never redistribute one.


---

## Anti-Patterns

| Pattern | Why it fails |
| --- | --- |
| Pulling before the operator approved the roster | Spends their credits on channels they did not choose |
| Omitting `includeVideoStats` | No likes means no like rate means no bought-views filter. The corpus becomes untrustworthy |
| Leaving Shorts in a longform pull | Two different crafts averaged together, both conclusions wrong |
| A window longer than 90 days | Pulls in patterns that have already burned out |
| Scraping YouTube pages when Apify is unavailable | Fragile, gets blocked, returns no like counts |
| Shipping a corpus inside the package | Those thumbnails belong to the creators who made them |

## Sources
Apify actor contract and the `search.list` avoidance verified in production runs. vidIQ discovery tooling per the vidIQ MCP.

</data_sources>
