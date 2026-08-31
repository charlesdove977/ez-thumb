<purpose>
One time setup. Build the operator's channel profile, discover their real competitors, pull those competitors' best thumbnails, read every image, and write all of it back into the skill so every future run designs against their niche instead of against generic rules.
</purpose>

<user-story>
As a creator installing EZ Thumb, I want the skill to learn my actual niche once, so that every thumbnail it builds afterward is backed by evidence from the channels I really compete with rather than somebody else's measurements.
</user-story>

<when-to-use>
- First run after installing ez-thumb
- `context/data-source.md` still says `status: unconfigured`
- The operator wants to start over from scratch after `npx ez-thumb update --clean`
</when-to-use>

<context>
@context/data-source.md
@context/channel-profile.md
</context>

<references>
@frameworks/data-sources.md (phases 3 and 4, carries the vidIQ and Apify recipes)
@frameworks/corpus-method.md (phase 5, carries the CSV schema and both filters)
@frameworks/self-update.md (phase 6, carries the write-back contract)
@templates/corpus-readme.md (phase 5, when writing the corpus folder)
@checklists/onboard-complete.md (before flipping the configured flag)
</references>

<steps>

<step name="announce" priority="first">
State the six phases up front so the operator knows the shape of what they agreed to, and say plainly that this happens once. Then work them in order. Do not skip ahead, and do not pull any data before phase 3 is answered and approved.
</step>

<step name="preflight">
Check what is actually available in this session. Do not assume, and do not promise a capability you have not seen.

| Server | Role | If missing |
| --- | --- | --- |
| `mcp__apify__*` | **Required.** Pulls competitor videos, stats and thumbnail URLs | Stop |
| `mcp__vidiq__*` | Optional. Auto-discovers who the competitors are | Fine, phase 3 falls back to the operator naming them |
| Any image generation MCP | Optional. Generates variations | Fine, the skill still delivers concepts and prompts |

<if condition="Apify is missing">
Stop and say exactly this, then wait:

> EZ Thumb needs the Apify MCP to pull competitor thumbnails. Get a token at apify.com, add the Apify MCP to your Claude Code config, restart, then run `/ez-thumb-onboard` again.

Do not attempt a workaround. Do not scrape YouTube pages directly. Do not offer to guess at the niche without data, because a guessed corpus is worse than none, since the operator will trust it.
</if>

Record what was found. The absence of a generator gets written into `data-source.md` as `none`, not worked around silently.
</step>

<step name="channel_profile">
Interview. Use `AskUserQuestion` where the answers are a short closed set, plain questions otherwise. One group at a time, never all six at once.

1. **Channel.** Name, handle, URL, rough subscriber count.
2. **Niche.** One sentence on what the channel is about and who it is for.
3. **Format.** Longform, shorts, or both. Typical length.
4. **Face or faceless.** Does the operator appear on camera? If yes, is there a clean cutout and where does it live? If no, what carries the frame instead: product, screen recording, object, illustration?
5. **Brand assets.** Logo files, locked palette, headline font, anything that must appear. Ask for paths and record only paths. Never copy asset files into the skill.
6. **What has already worked.** Their best three thumbnails with CTR if known, and their worst. This is the highest value answer in the interview. Push for specifics, and do not accept "the ones with my face."

Write the answers into `context/channel-profile.md` using the structure already in that file. Every path absolute. Every claim dated.
</step>

<step name="choose_discovery">
Ask explicitly with `AskUserQuestion`. Two routes, the operator picks one.

**Option A: vidIQ MCP finds them.** Available only if `mcp__vidiq__*` is present.
1. Ask for two or three seed channels the operator already knows they compete with
2. Run `vidiq_similar_channels` on each seed
3. Pool and dedupe
4. Filter to a real competitive band, 0.3x to 10x the operator's own subscriber count
5. Present 10 to 15 for approval

**Option B: the operator names them.** No MCP needed. They paste handles or channel URLs.

Say plainly that B is not the lesser option. An operator who watches their niche daily usually picks a better roster than any similarity algorithm, because they know which channel they actually lose the click to.

<if condition="fewer than 6 channels are given">
Say the corpus will be too thin to see a pattern and ask for more. Do not silently proceed on four channels.
</if>

The output of this phase is one approved list. Show it back and get an explicit yes before spending a single credit.
</step>

<step name="pull">
Follow `frameworks/data-sources.md` exactly.

- Actor: `lurkapi/youtube-channel-videos-stats-scraper` through the Apify MCP
- Window: last 90 days by default. Offer 60 if the niche moves fast
- Depth: top 5 videos per channel
- `contentType: "videos"` so Shorts do not contaminate a longform corpus
- `includeVideoStats: true` is **mandatory**. Without likes there is no like rate, without a like rate there is no bought-views filter, and the whole corpus becomes untrustworthy

State the estimated credit cost before running. Get a go-ahead. Wait.

**Then download every thumbnail to disk.** This is not optional and it is not a cache. The saved images are what future `/ez-thumb` runs cite by filename, so a corpus with no images on disk is not a corpus.

    reference/<YYYY-MM-DD>-<niche-slug>/thumbnails/<channel-slug>/<9-digit-zero-padded-views>-<date>-<title-slug>.jpg

The zero-padded view count sorts each channel folder by performance, best last.
</step>

<step name="read_every_image">
The actual work. A folder of JPGs is not a corpus until something has looked at them.

Go channel by channel, not all at once, and write rows to `records.csv` as you go so a long run cannot lose its work. Open every image. Never infer a row from a title.

Record the columns defined in `frameworks/corpus-method.md`: channel, subs, views, published, like_rate, paid_flag, breakout, faceless, bg_treatment, headline_words, text_placement, brand_glyph, accent_color, concept_carrier, curved_arrow, thumbnail_file.

Then apply both filters, in this order:

1. **Flag bought views.** Compute like rate per video. Under 0.5 percent, in a set where peers run 2 to 4 percent, gets `paid_flag: true`, is demoted to composition reference only, and is excluded from every aggregate.
2. **Rank on breakout, not raw views.** Views divided by subscriber count. Raw view count across channels of different sizes hides which thumbnail actually worked.

Write `reference/<folder>/README.md` from `templates/corpus-readme.md`, with the `generated:` date stamp, the roster, the aggregate splits, all five findings, and every caveat written as a data property rather than as an accusation about a person.
</step>

<step name="self_update" priority="last">
Load `frameworks/self-update.md` and follow it.

1. Fill `context/channel-profile.md`
2. Fill `context/data-source.md`, including the exact pull recipe so `/ez-thumb refresh` can repeat it without another interview
3. Mirror `configured: true` into the `SKILL.md` frontmatter
4. Append a dated **Niche findings** section to `frameworks/faceless-vs-face.md` carrying what this corpus proved. Condition the general guidance above it, never delete it
5. Run `checklists/onboard-complete.md`
6. **Flip `status: configured` last**, only after every checklist line passes. A partial onboard stays unconfigured on purpose, so the next run resumes setup instead of quietly working off half a corpus

Close by showing the operator what they now have: roster size, thumbnails read, how many were flagged as paid inventory, the faceless versus face split in their niche, the three strongest patterns found, and the one sentence that matters most. Then tell them the only command they need from now on is `/ez-thumb`.
</step>

</steps>

<output>
- A filled `context/channel-profile.md`
- A filled `context/data-source.md` with `status: configured`
- `reference/<YYYY-MM-DD>-<niche-slug>/` containing README.md, records.csv, and every downloaded thumbnail on disk
- A dated Niche findings section appended to `frameworks/faceless-vs-face.md`
- `configured: true` in the SKILL.md frontmatter
</output>

<acceptance-criteria>
- [ ] Apify was confirmed present and working, not assumed
- [ ] vidIQ presence was checked and the discovery route chosen accordingly
- [ ] Generator absence was recorded rather than worked around
- [ ] Roster is 6 to 15 channels, inside the 0.3x to 10x subscriber band
- [ ] The operator saw and approved the roster before any credits were spent
- [ ] Credit estimate was stated before the pull ran
- [ ] `includeVideoStats: true` and `contentType: "videos"` were both set
- [ ] Every thumbnail was downloaded to disk under `reference/<folder>/thumbnails/<channel>/`
- [ ] Filenames carry the zero-padded view count so folders sort by performance
- [ ] Every image was opened and read. No row inferred from a title
- [ ] Like rate computed for every video, everything under 0.5 percent flagged and excluded from aggregates
- [ ] Every ranking uses breakout, not raw views
- [ ] Corpus README written with the `generated:` date stamp and all five findings
- [ ] Caveats written as data properties, never as accusations about a person
- [ ] Dated Niche findings appended to faceless-vs-face.md, conditioning rather than deleting
- [ ] `status: configured` was flipped LAST, after the full checklist passed
- [ ] Operator was shown the summary and told the next command is `/ez-thumb`
</acceptance-criteria>
