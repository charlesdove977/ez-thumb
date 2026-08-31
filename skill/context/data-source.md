---
status: unconfigured
discovery_method:
pull_method: apify
corpus_folder:
last_pull:
roster_size:
niche_slug:
---

# Data Source

**This file is the switch.** Read it before anything else, on every run.

`status: unconfigured` means `/ez-thumb-onboard` has not completed. Stop and route there. Do not package a video, do not guess at a niche, do not offer a workaround.

`status: configured` means everything below is filled in and `/ez-thumb` can go straight to work.

Onboard flips this line **last**, only after `checklists/onboard-complete.md` fully passes. A half-finished onboard stays unconfigured on purpose so the next run resumes setup instead of quietly working off half a corpus.

---

## Filled in by /ez-thumb-onboard

### Discovery
*How the competitor roster was found: `vidiq` or `manual`. If vidiq, record the seed channels used.*

### Roster
*The approved channel handles, one per line. This is what `/ez-thumb refresh` re-pulls without asking again.*

### Pull recipe
*The exact Apify actor and input used, so a refresh repeats it identically. Actor, window in days, videos per channel.*

### Corpus
*Folder path under `reference/`, thumbnail count, channel count, and how many videos were flagged as paid inventory.*

### Generation
*Which image MCP was available at onboard time, if any. `none` is a valid and normal value; the skill still delivers concepts and prompts without one.*

---

## Notes

- Everything here lives inside the skill directory, so the whole configured skill copies to another machine as one folder. There is no external state file to lose.
- `npx ez-thumb update` preserves this file. `npx ez-thumb update --clean` wipes it.
- `npx ez-thumb status` reads this file to report onboarding state and corpus age.
