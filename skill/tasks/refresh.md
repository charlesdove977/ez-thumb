<purpose>
Rebuild the competitor corpus without re-interviewing the operator, then report what changed in the niche since the last pull. The delta is the deliverable.
</purpose>

<user-story>
As a creator who onboarded months ago, I want the skill to re-learn my niche and tell me which patterns rose and which burned out, so that I am designing against what works now rather than against what worked when I installed it.
</user-story>

<when-to-use>
- The stored corpus is over 90 days old and the skill has said so
- The operator's competitive set has genuinely changed
- The operator pivoted niche or format
- Something in the niche visibly shifted and the stored patterns feel wrong
</when-to-use>

<context>
@context/data-source.md
@context/channel-profile.md
</context>

<references>
@frameworks/data-sources.md (the pull contract, unchanged from onboarding)
@frameworks/corpus-method.md (the CSV schema and both filters)
@frameworks/self-update.md (the write-back contract, and what refresh must protect)
@templates/corpus-readme.md (when writing the new corpus folder)
</references>

<steps>

<step name="show_current_state" priority="first">
Read `context/data-source.md` and state the roster, the corpus date, and its age in days.

<if condition="the corpus is under 60 days old">
Say so and ask whether the operator still wants to spend the credits. A pull costs money and a corpus under two months old is still current. Do not talk them out of it, but do not let them spend blindly either.
</if>

Ask whether the roster still stands.
</step>

<step name="amend_roster">
Add, drop, or replace channels as the operator wants.

<if condition="vidIQ is available and the operator wants fresh discovery">
Re-run `vidiq_similar_channels` on the seeds. Same 0.3x to 10x subscriber band applies.
</if>

<if condition="the operator edits the list directly">
Take it as given. Same band guidance, same 6 to 15 range.
</if>

Show the final roster back and get a yes before pulling.
</step>

<step name="pull">
Same Apify contract as onboarding, from `frameworks/data-sources.md`. Same actor, same mandatory `includeVideoStats: true` and `contentType: "videos"`.

State the credit estimate. Get a go-ahead.

Download every thumbnail to disk under a **new dated folder**:

    reference/<today>-<niche-slug>/thumbnails/<channel-slug>/...

**Do not delete the old folder.** This is the part that makes a second refresh worth more than the first. Two dated corpora in the same niche show which patterns are rising and which are burning out, and that comparison is not available from any single pull.
</step>

<step name="read_every_image">
Same vision pass as onboarding. Open every image, one row per thumbnail, write rows as you go.

Same two filters: flag bought views on like rate under 0.5 percent, rank on breakout rather than raw views.

Write the new `README.md` from `templates/corpus-readme.md` with today's `generated:` stamp.
</step>

<step name="report_the_delta">
**This is the actual deliverable of a refresh.** The operator already knows what their niche looked like last time. What they are paying attention for is what changed.

Against the previous corpus, report:

- Which concept carriers gained and which faded, with both numbers and both dates
- Whether the faceless versus face split moved, and by how much
- Which pattern became the new cliche
- **Which pattern collapsed.** Name it explicitly with the before and after figures. Patterns burn out fast; one measured framing fell from 19.55x to 1.79x median breakout across fifteen days purely from saturation
- Anything that is newly flagged as paid inventory that was not before

Lead the closing summary with the delta, not with the raw corpus.
</step>

<step name="self_update" priority="last">
Per `frameworks/self-update.md`:

- Append a **new dated** Niche findings section to `frameworks/faceless-vs-face.md`. Keep every older section
- Update `last_pull`, `corpus_folder`, and the roster in `context/data-source.md`
- Leave `SKILL.md` untouched

**`context/channel-profile.md` is protected.** Refresh does not re-interview. The one exception: offer to append new dated lines to the "What has worked" section, since the operator will have shipped videos since onboarding. Append only, never overwrite.
</step>

</steps>

<output>
- A new `reference/<today>-<niche-slug>/` folder with README.md, records.csv, and every downloaded thumbnail
- The previous corpus folder, untouched
- A delta report naming what rose, what faded, what the new cliche is, and what collapsed
- A new dated Niche findings section in `frameworks/faceless-vs-face.md`
- Updated `last_pull` and `corpus_folder` in `context/data-source.md`
</output>

<acceptance-criteria>
- [ ] Current roster, corpus date and age were shown before anything was spent
- [ ] A corpus under 60 days old prompted a confirmation rather than an automatic pull
- [ ] The operator approved the final roster before the pull
- [ ] Credit estimate was stated
- [ ] A NEW dated folder was created and the previous corpus was NOT deleted
- [ ] Every thumbnail was downloaded to disk and every image was opened and read
- [ ] Both filters applied: paid flag on like rate, ranking on breakout
- [ ] The delta was reported with before and after figures and both dates
- [ ] A collapsed pattern, if any, was named explicitly
- [ ] A new dated Niche findings section was appended, older sections kept
- [ ] `channel-profile.md` was not overwritten; only dated appends to "What has worked"
- [ ] The closing summary led with the delta, not the raw corpus
</acceptance-criteria>
