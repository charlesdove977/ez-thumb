<purpose>
Turn a finished or scripted video into a title plus thumbnail package: real evidence in, three distinct packaging concepts cited against the operator's own competitor corpus, one chosen concept, five generated variations, and a strict score on each.
</purpose>

<user-story>
As a YouTube creator, I want thumbnail concepts built from what my video actually shows and from what actually wins in my niche, so that the package I upload earns the click and holds the watch time instead of guessing at both.
</user-story>

<when-to-use>
- A video is edited or scripted and has no title plus thumbnail yet
- An existing package underperformed and needs a rebuild from evidence
- The creator wants faceless options with no person in frame
- A packaging idea exists on paper and needs generated variations to judge it
</when-to-use>

<context>
@context/data-source.md (read FIRST, every run, before anything else)
@context/channel-profile.md (skip any intake question it already answers)
</context>

<references>
@frameworks/faceless-vs-face.md (at intake, before the mode question is asked)
@frameworks/four-cs.md (before writing concepts)
@frameworks/curiosity-gap.md (when choosing each concept's lever)
@frameworks/format-library.md (when choosing which formats to combine)
@frameworks/audience-calibration.md (after the audience answer)
@frameworks/five-step-process.md (at the prompt writing step)
@frameworks/prompt-patterns.md (at the prompt writing step)
@frameworks/corpus-method.md (whenever the corpus is read or cited)
@frameworks/creator-consensus.md (when a rule needs backing beyond this skill)
@frameworks/testing-and-metrics.md (at the verdict step)
@checklists/thumbnail-quality.md (before declaring any variation post ready)
</references>

<steps>

<step name="gate" priority="first">
Read `context/data-source.md` before anything else.

<if condition="status is unconfigured">
Stop. Do not package anything. Say:

> EZ Thumb has not been onboarded yet, so it has no competitor corpus and no idea what wins in your niche. Packaging without it is exactly the generic guessing this skill exists to replace. Run `/ez-thumb-onboard` first, it is a one time setup.

Route to tasks/onboard.md. Do not offer a workaround.
</if>

<if condition="status is configured">
Open the corpus folder named in `corpus_folder` and state what you are working from:

> Packaging for {channel}, {niche}. Corpus: {n} thumbnails across {k} channels, pulled {date}, {age} days old.
</if>

<if condition="corpus age is over 90 days">
Say the corpus is stale and offer `/ez-thumb refresh` before continuing. If the user declines, proceed, but do not cite any corpus percentage as current evidence for the rest of the run.
</if>
</step>

<step name="intake">
Ask for these in one block, then wait. Skip anything `channel-profile.md` already answers, and say what was carried over.

1. **Transcript.** Paste it or give a file path. Required. Without it there is no hook and no payoff to package.
2. **Is the actual video available?** A URL, a local file path, or "transcript only".
3. **Mode.** `faceless` or `with-face`. Ask it as a real question and state this channel's own evidence when you ask, pulled from the corpus, never from a generic claim:

   > Faceless or with-face? In your corpus, {faceless n} faceless thumbnails average {x}x breakout against {face n} face-led at {y}x. {One sentence verdict.} With-face is the right call when the face does something the object cannot: a real reaction, an authority signal, or human scale.

   <if condition="the corpus split is close">
   Say it is close and that the mode is a genuine choice here, rather than manufacturing a winner.
   </if>

   <if condition="user chooses with-face and the corpus favours faceless">
   Ask what work the face is doing. If the answer is "it is my channel" or "people know me", say plainly what the corpus shows and offer faceless concepts alongside. Do not refuse, and do not silently override the choice.
   </if>
4. **Audience age.** Load `frameworks/audience-calibration.md` on the answer. Kids and younger skew bold, exaggerated, high energy. 18 to 25 and older skew realistic, subtle, credible.
5. **Existing assets.** Photos, product shots, screenshots, screen recordings, b-roll stills. Include absolute paths.

Do not proceed on partial answers. Ask again for what is missing.
</step>

<step name="watch_the_video">
<if condition="a video URL or local file was given AND the watchvideo skill is installed">
Invoke the `watchvideo` skill on it. Default to `condensed`. Use `forensic` when the video is under ten minutes or the creator wants frame level detail.

Pull from the run:
- the actual spoken hook in the first 20 seconds, verbatim
- the payoff moment and its timestamp
- the strongest visual frames, the ones with a real subject, a real reaction, or a real object
- any on screen text the creator already uses
- what physical assets genuinely exist on camera, which is the honest answer to "what assets do I have"

Never design off a summary when the frames are available.
</if>

<if condition="a video exists but watchvideo is not installed">
Say so once, and point at `npx watchvideo install`. Then continue from the transcript rather than blocking.
</if>

<if condition="transcript only">
Say plainly: working from transcript, no frames, so asset claims come from the user and not from evidence. Pull the hook, the payoff, and the concrete nouns the video promises.
</if>
</step>

<step name="read_the_corpus">
This is the step that separates EZ Thumb from generic thumbnail advice. Do it in the open, where the user can see the evidence.

Open `reference/<corpus_folder>/README.md` and `records.csv`. Answer three questions out loud:

1. **What is the current cliche?** The pattern appearing in most thumbnails in this niche regardless of performance. Name it. Every concept then either avoids it or breaks it deliberately.
2. **Which concept carriers win?** Group `concept_carrier` by mean breakout. Design toward the top two, or knowingly against them.
3. **Which specific thumbnails are the outliers?** Open the top three files by breakout and describe what they do that the median one does not.

Honour the flags. Any row with `paid_flag: true` is a composition reference only. Never cite it as proof a thumbnail earned a click, and say "composition reference only" out loud whenever you cite one.
</step>

<step name="build_three_concepts">
Load `frameworks/four-cs.md`, `frameworks/curiosity-gap.md`, `frameworks/format-library.md`, and the chosen mode's playbook in `frameworks/faceless-vs-face.md`.

**Every concept MUST cite a real thumbnail from the operator's corpus by filename**, so every pattern claim points at an image the user can open and check. A concept with no citation is a guess, and this skill does not ship guesses.

Format is: cite the filename, name the pattern it proves, then state whether this concept rides that pattern or breaks it.

    Evidence: thumbnails/<channel>/000212554-2026-07-10-<slug>.jpg
    Pattern:  glyph-head avatar carrying the frame, top breakout in the set
    This concept: rides it, substituting the operator's own product mark

Combine two or three formats from `frameworks/format-library.md`. One format repeated is a template; two or three combined is a concept.

Write three genuinely distinct concepts, not three coats of paint on one idea. Distinct means different curiosity levers and different visual strategies. The spread that works:
- **one safe concept**, the familiar framing the niche already rewards
- **one contrast or progression concept**, before against after, or scale against expectation
- **one counterintuitive concept**, negative framing, or the claim that contradicts the niche

Render each with `templates/packaging-concept.md`. Hard limits per concept:
- title under 60 characters, count shown
- one subject plus one object plus one context, maximum
- thumbnail text two to four words, adding information the title does not carry, never repeating it, or no text at all
- subject on a rule of thirds line
- bottom right stays clear, because YouTube stamps the duration there
- before goes left, after goes right, always

<if condition="mode is faceless">
Climb the device ladder: mark as hero subject, marks in conflict, glyph-head avatar, anthropomorphised mark, or a before and after pair. Never the corner badge rung.
</if>

<if condition="mode is with-face">
The cut out presenter at one edge over a flat brand colour with the concept object holding the rest is the working shape. The locked template with a pointing finger and no concept object is forbidden.
</if>

Present all three, then ask which one to build. Wait.
</step>

<step name="write_prompts">
Load `frameworks/five-step-process.md` and `frameworks/prompt-patterns.md`. Work the chosen concept through steps 1 to 3 in the open:

1. **Needs.** List what the frame MUST contain for the idea to land. One line each. This is step one, not "have an idea", because a need you cannot name is a need the generator will drop.
2. **Sketch.** Describe the layout as a text diagram: what sits on which third, where the eye enters, where leading lines point, what occupies the clear bottom right, which side holds negative space for text.
3. **Prompt it.** Five prompts. Five different visual bets on the same idea, not five rewordings. Vary angle, moment, contrast strategy, distance, emotional beat.

Every prompt carries all five clauses from `frameworks/prompt-patterns.md` and keeps the bottom right clear. No craft language inside any prompt; it gets typeset into the image.

Show the five prompts in code blocks. Ask for a go before spending any credits. Wait.
</step>

<step name="generate_variations">
<if condition="an image generation MCP is available in this session">
Generate all five at 16 by 9. Prefer a batch call plus a wait plus one display call over five separate calls.

When the creator supplied real assets, pass them as reference images so the frame uses the real subject rather than inventing one.

Download each result and rename it with Bash `mv` to a descriptive `{purpose}-{detail}.png`, for example `thumbnail-faceless-cracked-notion-cube.png`. Numbered filenames are not acceptable.
</if>

<if condition="no image generation MCP is available">
Deliver the five prompts as copy-paste blocks with a one line note on where each works. Say plainly that generation is not wired up in this session. This is a normal outcome, not a failure; the concepts, the corpus evidence, and the prompts are the valuable part.
Skip to the score step and score the concepts rather than images.
</if>
</step>

<step name="score_and_verdict">
Load `checklists/thumbnail-quality.md` and `frameworks/testing-and-metrics.md`.

**Read every generated image back with the Read tool** and score each with `templates/thumbnail-review.md`. Scoring from the prompt instead of the image is not scoring.

Two mandatory checks on every image:
- read the headline back character by character, models misspell confidently
- treat every number, chart, and dashboard in frame as fabricated

Score all four Cs, take the lowest, not the average.

- 8 or above: POST READY, note the optional polish
- Below 8: name the failing C, give one specific fix, then offer to regenerate that variation only

Close with a ranked shortlist, best first, the one you would ship and why, and the title paired with it. Then state the testing position from `frameworks/testing-and-metrics.md`: pair the title and thumbnail as one unit when testing, and a bad CTR later is a prompt to swap the frame, not a lost video.
</step>

<step name="capture_profile" priority="last">
Write what the run learned into `context/channel-profile.md`: audience, mode preference, recurring assets, what scored well and what failed, model quirks observed. Append with today's date. Never overwrite an earlier dated line.
</step>

</steps>

<output>
- Three packaging concepts rendered from `templates/packaging-concept.md`, each citing a corpus thumbnail by filename
- Five prompts in code blocks
- Five generated images renamed to `{purpose}-{detail}.png`, when a generator is available
- Five scores rendered from `templates/thumbnail-review.md`, plus a ranked shortlist
- An updated `context/channel-profile.md`
</output>

<acceptance-criteria>
- [ ] `context/data-source.md` was read before anything else and the configured gate was honoured
- [ ] Corpus age was stated, and staleness was surfaced if over 90 days
- [ ] Transcript was obtained before any concept was written
- [ ] Video availability was asked, and watchvideo was run whenever a video existed and the skill was installed
- [ ] Mode was chosen explicitly, with THIS channel's corpus numbers stated, not a generic claim
- [ ] The corpus was read in the open: cliche named, carriers ranked, outliers opened
- [ ] Every concept cites a corpus thumbnail by filename
- [ ] Every `paid_flag` citation was labelled composition reference only
- [ ] Each concept combines two or three formats rather than repeating one
- [ ] Three concepts were distinct in lever and visual strategy
- [ ] Every title is under 60 characters with the count shown
- [ ] Every concept holds one subject plus one object plus one context
- [ ] Bottom right is clear of subject and text in every concept
- [ ] Before is on the left and after is on the right wherever a pair is used
- [ ] Five prompts were approved by the user before generation spent credits
- [ ] No craft instruction appears inside any prompt
- [ ] Every image was read back and scored from the image, not from its prompt
- [ ] Every headline was spell checked character by character
- [ ] Score used the lowest C, not the average
- [ ] `channel-profile.md` was updated with a dated entry
</acceptance-criteria>
