# Task: Onboard

One time. Everything this skill knows about the user's niche gets built here and written back into the skill directory. Do it properly once and every future run is cheap.

**Load first:** `frameworks/data-sources.md`, `frameworks/corpus-method.md`.
**Load at the end:** `frameworks/self-update.md`, `checklists/onboard-complete.md`.

Announce the six phases up front so the user knows what they signed up for, then work through them in order. Do not skip ahead, and do not start pulling data before Phase 3 is answered.

---

## Phase 1: Preflight

Check what is actually available in this session before promising anything.

| Server | Role | If missing |
| --- | --- | --- |
| `mcp__apify__*` | **Required.** Pulls competitor videos, stats, and thumbnail URLs | Stop. Give the setup line below and wait |
| `mcp__vidiq__*` | Optional. Auto-discovers who the competitors are | Fine. Phase 3 falls back to the user naming them |
| Any image generation MCP | Optional. Generates thumbnail variations | Fine. The skill still delivers concepts, layouts, and copy-paste prompts |

If Apify is missing, say exactly this and stop:

> EZ Thumb needs the Apify MCP to pull competitor thumbnails. Get a free token at apify.com, then add the Apify MCP to your Claude Code config and restart. Run `/ez-thumb-onboard` again after that.

Do not attempt a workaround. Do not scrape YouTube pages directly. Do not offer to guess at the niche without data; a guessed corpus is worse than none because the user will trust it.

---

## Phase 2: Channel profile

Interview. Use `AskUserQuestion` where the answers are a short closed set, plain questions otherwise. One group at a time, do not dump all six at once.

1. **Channel.** Name, handle, URL, rough subscriber count.
2. **Niche.** One sentence on what the channel is about, and who it is for.
3. **Format.** Longform, shorts, or both. Typical length.
4. **Face or faceless.** Does the operator appear on camera? If yes, do they have a clean cutout image, and where does it live? If no, what carries the frame instead: product, screen recording, object, illustration?
5. **Brand assets.** Logo files, a locked palette, a headline font, anything that must appear. Ask for paths, and record only the paths, never copy the files.
6. **What has already worked.** Their best three thumbnails and, if they know it, the CTR. Also their worst. This is the highest value answer in the whole interview, push for specifics.

Write the answers to `context/channel-profile.md` using the structure already in that file. Keep every path absolute.

---

## Phase 3: How do we find your competitors?

Ask this explicitly with `AskUserQuestion`. Two routes, and the user picks one.

**Option A: vidIQ MCP finds them.**
Available only if `mcp__vidiq__*` is present. Ask for two or three seed channels the user already knows they compete with, then run `vidiq_similar_channels` on each. Pool the results, drop anything outside 0.3x to 10x of the user's own subscriber count, and present a ranked shortlist of 10 to 15 for the user to approve or edit. Never pull a roster the user has not seen and approved.

**Option B: the user names them.**
The user pastes handles or channel URLs. This is not the lesser option; an operator who watches their niche daily usually picks a better roster than any similarity algorithm. Aim for 10 to 15 channels. If they give fewer than 6, say plainly that the corpus will be thin and ask for more.

Either way the output of this phase is one approved list of channel handles. Show it back and get a yes before spending a single Apify credit.

---

## Phase 4: Pull

Follow `frameworks/data-sources.md` exactly. Summary of the contract:

- Actor: `lurkapi/youtube-channel-videos-stats-scraper` through the Apify MCP
- Window: last 90 days by default. Offer 60 if the niche moves fast
- Depth: top 5 videos per channel by view count
- `includeVideoStats: true` is mandatory. Without likes you cannot run the bought-views filter and the whole corpus becomes untrustworthy
- Thumbnails download to `reference/<YYYY-MM-DD>-<niche-slug>/thumbnails/<channel>/`

State the estimated credit cost before running, and get a go-ahead.

---

## Phase 5: Read every image

This is the actual work. A folder of JPGs is not a corpus until something has looked at them.

Go channel by channel, not all at once, and write rows to the CSV as you go so a long run cannot lose its work. For each thumbnail record the columns defined in `frameworks/corpus-method.md`: channel, subs, views, published, like_rate, paid_flag, breakout, faceless, bg_treatment, headline_words, text_placement, brand_glyph, accent_color, concept_carrier, curved_arrow, thumbnail_file.

Then apply the two rules from `frameworks/corpus-method.md` that make the difference between a corpus and a pile of pictures:

1. **Flag bought views.** Compute like rate per video. Anything under 0.5 percent, in a set where peers run 2 to 4 percent, gets marked `paid_flag: true` and demoted to composition reference only. Never cite it as click evidence.
2. **Rank on breakout, not raw views.** Views divided by subscriber count. A 20,000-view video on a 30,000-subscriber channel beat a 200,000-view video on a 900,000-subscriber channel, and raw view count hides that completely.

Write `reference/<folder>/README.md` from `templates/corpus-readme.md`, including the date stamp, the roster, the aggregate splits, and every caveat you found.

---

## Phase 6: Write it back into the skill

Load `frameworks/self-update.md` and follow it. In short:

1. Fill `context/channel-profile.md`.
2. Fill `context/data-source.md`, including flipping `status: unconfigured` to `status: configured` and recording the exact pull recipe so `/ez-thumb refresh` can repeat it without another interview.
3. Set `configured: true` in the `SKILL.md` frontmatter.
4. Append a **Niche findings** section to `frameworks/faceless-vs-face.md` carrying what this specific corpus proved, conditioned to this niche and dated. Condition the general guidance, never delete it.

Run `checklists/onboard-complete.md`. Do not declare onboarding finished until every line passes.

Close by showing the user what they now have: roster size, thumbnails read, the faceless versus face split in their niche, the three strongest patterns found, and the one sentence that matters most. Then tell them the only command they need from now on is `/ez-thumb`.
