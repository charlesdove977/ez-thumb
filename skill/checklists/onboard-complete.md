# Checklist: Onboard Complete

Run before flipping `status: configured`. Every line must pass. A partial onboard stays `unconfigured` on purpose, so the next run resumes setup instead of quietly working off half a corpus.

## Preflight
- [ ] Apify MCP confirmed present and working, not assumed
- [ ] vidIQ presence checked, and the discovery route chosen accordingly
- [ ] Image generation MCP checked, and its absence recorded rather than worked around

## Profile
- [ ] Channel name, handle, URL, subscriber count captured
- [ ] Niche stated in one sentence
- [ ] Face or faceless answered, with the asset paths if a face is used
- [ ] Every asset path is absolute, and no asset files were copied into the skill
- [ ] "What has worked" has at least one specific entry, dated

## Roster
- [ ] Between 6 and 15 channels, and 10 or more where possible
- [ ] Every channel inside the 0.3x to 10x subscriber band
- [ ] The user saw the roster and approved it before any credits were spent

## Pull
- [ ] `includeVideoStats: true` was set, so likes came back
- [ ] `contentType: "videos"` was set, so Shorts did not contaminate a longform corpus
- [ ] Window is 90 days or less
- [ ] Credit estimate was stated and approved before running
- [ ] Thumbnails downloaded and named with the zero-padded view count

## Corpus
- [ ] Every thumbnail opened and read. No row inferred from a title
- [ ] One CSV row per thumbnail, all columns filled
- [ ] Like rate computed for every video
- [ ] Everything under 0.5 percent flagged `paid_flag: true` and excluded from every aggregate
- [ ] Breakout computed, and every ranking uses it rather than raw views
- [ ] README written with the `generated:` date stamp
- [ ] Caveats written as data properties, never as accusations about a person
- [ ] All five findings answered, including an honest "the split is close" where it is

## Self update
- [ ] `context/channel-profile.md` filled
- [ ] `context/data-source.md` filled, including the pull recipe a refresh can repeat
- [ ] Dated Niche findings section appended to `frameworks/faceless-vs-face.md`
- [ ] The general guidance above it was conditioned, not deleted
- [ ] `configured: true` mirrored into `SKILL.md` frontmatter
- [ ] `status: configured` flipped **last**, after everything above passed

## Handoff
- [ ] User shown: roster size, thumbnails read, the split in their niche, the three strongest patterns
- [ ] User told the only command they need from now on is `/ez-thumb`
