<purpose>
Judge a finished thumbnail against the Four Cs and against the operator's own niche corpus, then either clear it to ship or return exactly one specific fix.
</purpose>

<user-story>
As a creator with a thumbnail already made, I want a strict honest verdict before I publish, so that I find the failing part myself instead of learning it from a low CTR a week later.
</user-story>

<when-to-use>
- A thumbnail is finished and about to go live
- CTR is soft on a published video and the creator wants a diagnosis
- The creator wants a second opinion on a frame they are unsure about
</when-to-use>

<context>
@context/data-source.md
@context/channel-profile.md
</context>

<references>
@frameworks/four-cs.md (before assigning any number)
@frameworks/curiosity-gap.md (when judging the Curiosity score)
@frameworks/audience-calibration.md (when judging intensity against the audience)
@frameworks/testing-and-metrics.md (when CTR or retention numbers are supplied)
@frameworks/corpus-method.md (when placing the thumbnail against the niche)
@templates/thumbnail-review.md (for the output)
</references>

<steps>

<step name="gather" priority="first">
Ask for the image file or URL **and the title it ships with. Both.**

Scoring a thumbnail without its title is scoring half the package, and most failures live in the seam between them.

Also ask for CTR and average view duration if the video is already published. Say why: a thumbnail with high CTR and low retention has the opposite problem from one nobody clicks, and the fix is different in each case.
</step>

<step name="look_twice">
**Small first.** View the image at roughly thumbnail scale before anything else. This is where the impression actually happens, and most failures are visible here and invisible at full size.

Record what reads, what disappears, and what the eye lands on first.

**Then full size.** Craft, edge quality, lighting, compositing, and spelling live here. Read every word back character by character.

Skipping the small view is the single most common reason a bad thumbnail ships.

<if condition="the design uses a light or white ground">
Check it in dark mode. A thumbnail built on a white screenshot dies the moment the viewer is in dark mode, because the contrast carrying it was contrast against the page rather than inside the frame.
</if>
</step>

<step name="score_the_four">
Score each C out of 10 with a one line reason, then **take the lowest, not the average.**

| C | Ask |
| --- | --- |
| Composition | Subject on a third? Bottom right clear? One focal point? Survives at 120 pixels? Is the canvas balanced, or is there dead space reading as amateur? |
| Color | Do subject and ground separate? Does the colour match the promise? Flat and bright, or moody and muddy? Checked in both modes? |
| Clean Assets | Real, sharp, cleanly cut? Or a timeline still, a soft cutout, a generated approximation? |
| Curiosity | Which lever? What question does it open? Does the thumbnail text repeat the title? |

A frame at 10 composition and 4 curiosity is a 4, because nobody clicks it.
</step>

<step name="place_against_the_niche">
<if condition="a corpus exists">
Open the corpus and place the thumbnail in it:
- Is it running the current niche cliche? Being interchangeable with competitors is a failure even when the craft is good
- Which `concept_carrier` is it using, and how does that carrier rank here?
- State the corpus date. Over 90 days, say so and soften every claim accordingly
</if>

<if condition="no corpus exists">
Say plainly that this score is from principle only, with no niche evidence behind it, and that `/ez-thumb-onboard` would make the next one sharper.
</if>
</step>

<step name="verdict" priority="last">
Render with `templates/thumbnail-review.md`. Pass bar is 8.

**At or above 8:** say ship it, and name the one thing you would still change if there were time.

**Below 8:** name the failing C, give **one** specific fix, and sketch the corrected composition in ascii. One fix, not a list. A list of five changes gets none of them done.

<if condition="CTR is healthy and retention is poor">
Say the honest thing: the thumbnail is working and the video is not delivering on it. That is a content problem wearing a packaging costume, and no redesign fixes it. See the diagnosis table in `frameworks/testing-and-metrics.md`.
</if>

<if condition="the video is already published and underperforming">
Remind the operator that a published thumbnail is not final. A bad CTR is a prompt to swap the frame, not a lost video.
</if>
</step>

</steps>

<output>
- One review rendered from `templates/thumbnail-review.md`, carrying both viewing passes, four scores, the niche placement, and a single specific fix
</output>

<acceptance-criteria>
- [ ] Both the image and its title were obtained before scoring
- [ ] The image was viewed at thumbnail scale FIRST, before full size
- [ ] Dark mode was checked on any light-ground design
- [ ] Every word was read back character by character
- [ ] All four Cs scored with a reason each
- [ ] The score is the lowest C, not the average
- [ ] The thumbnail was placed against the corpus, or the absence of a corpus was stated
- [ ] Corpus age was stated and claims softened if over 90 days
- [ ] Exactly one fix was given, not a list
- [ ] A CTR-good retention-poor result was called a content problem, not a thumbnail problem
</acceptance-criteria>
