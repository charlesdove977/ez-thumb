# Task: Package

The main run. A video goes in, a title plus thumbnail package comes out, scored.

**Gate:** read `context/data-source.md` first. If it says `status: unconfigured`, stop and route to `tasks/onboard.md`. Never package against an empty corpus.

**Load:** `frameworks/four-cs.md`, `frameworks/curiosity-gap.md`, `frameworks/faceless-vs-face.md`, plus `context/channel-profile.md`.

---

## 1. Intake

Open by stating what you already know, so the user is not asked twice:

> Packaging for {channel}, {niche}. Using the {date} corpus, {n} thumbnails across {k} channels, {age} days old. Default mode for this channel is {faceless or with-face}.

Then ask only what is missing:

1. **The video.** Transcript, script, or outline. If a video file or URL exists and the `watchvideo` skill is installed, offer to watch it, because concepts built off real frames beat concepts built off a summary every time.
2. **The promise.** What does the viewer get. One sentence.
3. **Mode**, only if it differs from the channel default.

If the corpus is over 90 days old, say so plainly and offer `/ez-thumb refresh` before continuing. If the user declines, proceed but do not cite corpus percentages as current.

---

## 2. Check the corpus before designing

Open `reference/<folder>/README.md` and the CSV. Two questions, answered out loud:

1. **What is the cliche right now?** The pattern appearing in most thumbnails in this niche regardless of performance. Name it, then avoid it or deliberately break it.
2. **Which concept carriers are winning?** Group by `concept_carrier`, ranked on breakout. Design toward the top two, or knowingly against them.

This is the step that separates this skill from generic thumbnail advice. Do not skip it, and do not summarize it silently; the user should see the evidence you are designing against.

---

## 3. Concepts

Produce **three** concepts. Not five, not one. Three forces genuine alternatives without diluting them.

Each one uses `templates/packaging-concept.md` and carries:

- **Title.** Under 60 characters. Front-load the interesting half
- **Thumbnail text**, if any. Under five words, and it must not repeat the title
- **The concept object.** The one thing carrying the idea
- **Curiosity lever.** One, named, from `frameworks/curiosity-gap.md`
- **Composition sketch.** Ascii boxes. Where the subject sits, where the object sits, what stays empty
- **Corpus evidence.** Which pattern in the corpus backs this, or an explicit statement that this one deliberately breaks the niche cliche
- **Self-score** on the Four Cs, lowest C wins

Make the three genuinely different bets, not three phrasings of one. Different carrier, different lever, different composition.

Then stop and let the user pick. Do not generate before a concept is chosen.

---

## 4. Prompts

Load `frameworks/five-step-process.md` and `frameworks/prompt-patterns.md`.

Write five prompts off the chosen concept. Five different visual bets, varying one axis each: angle, moment, contrast strategy, distance, emotional beat.

Every prompt carries all five clauses. Every prompt keeps the bottom right clear. No craft language inside any prompt.

---

## 5. Generate, if you can

Check for an image generation MCP in this session.

**If one is available:** generate all five. Then, mandatory, for every returned image:

- Read the headline back character by character. Models misspell confidently
- Treat every number, chart, and dashboard in the frame as fabricated
- View it small before you judge it. If the concept dies at thumbnail scale, the concept died

**If none is available:** deliver the five prompts as copy-paste blocks with a one-line note on where they work, and say plainly that generation is not wired up in this session. This is a normal outcome, not a failure. The concepts and prompts are the valuable part.

---

## 6. Score and hand off

Score every variation against `frameworks/four-cs.md`. Lowest C wins, pass bar is 8.

Anything below 8 gets one specific fix, never a vague note. "Move the headline out of the bottom right, the timestamp will land on the M" is a fix. "Make it pop more" is not.

Run `checklists/thumbnail-quality.md` before declaring anything post ready.

Close with: the recommended pick, the runner-up and what would have to change for it to win, and the title paired with it. A title without its thumbnail is half a deliverable.
