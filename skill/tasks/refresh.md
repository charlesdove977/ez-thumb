# Task: Refresh

Rebuild the competitor corpus. Keeps the channel profile intact.

**Load:** `frameworks/data-sources.md`, `frameworks/corpus-method.md`, `frameworks/self-update.md`.

---

## When to run it

- The stored corpus is over 90 days old, and the skill has said so
- The user's competitive set has genuinely changed
- The user pivoted niche or format
- Something in the niche visibly shifted and the stored patterns feel wrong

Do **not** run it just because time passed under 60 days. A pull costs credits and a corpus under two months old is still current.

---

## What refresh does not do

It does not re-interview. `context/channel-profile.md` is protected. The operator already answered those questions and their channel did not change because their competitors did.

The one exception: offer to append new lines to the "What has worked" section, since they will have shipped videos since onboarding. Append with dates, never overwrite.

---

## Steps

1. **Show the current state.** Roster, corpus date, age in days. Ask whether the roster still stands.

2. **Amend the roster if needed.** Add, drop, or replace channels. If vidIQ is available and the user wants fresh discovery, re-run `vidiq_similar_channels`; otherwise the user edits the list directly. Same 0.3x to 10x size band applies.

3. **Pull.** Same Apify contract as onboarding, from `frameworks/data-sources.md`. State the credit estimate, get a yes.

4. **Read every image.** Same vision pass, same CSV schema, same two filters: flag bought views on like rate, rank on breakout.

5. **Write a NEW dated folder.** `reference/<today>-<niche-slug>/`. **Do not delete the old one.**

   This is the part that makes a second refresh worth more than the first. Two dated corpora in the same niche show which patterns are rising and which are burning out, and that comparison is not available from any single pull.

6. **Compare, and report the delta.** This is the actual deliverable of a refresh. Against the previous corpus:
   - Which concept carriers gained, which faded
   - Did the faceless versus face split move, and by how much
   - Which pattern became the new cliche
   - Which pattern collapsed. Name it, with both numbers and both dates

7. **Self update.** Per `frameworks/self-update.md`: append a new dated Niche findings section to `frameworks/faceless-vs-face.md`, keep every older section, and update `last_pull` plus `corpus_folder` in `context/data-source.md`.

---

## Close

Lead with the delta, not the raw corpus. The user already knew what their niche looked like three months ago. What they are paying attention for is what changed.
