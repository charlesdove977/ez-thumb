<five_step_process>

# The Five Step Process

## Purpose
How a chosen concept becomes something you can actually generate.

Idea, Sketch, Prompt, Mockup, Design. Read it when moving from a chosen concept to something you can actually generate.

The order is the point. Every step that gets skipped shows up later as a thumbnail that looks fine and does not work.

```
1. IDEA      one sentence of curiosity           no tools open
2. SKETCH    boxes and arrows, 30 seconds        paper or ascii
3. PROMPT    the sketch written as words         no craft-speak
4. MOCKUP    AI generates variations             cheap and disposable
5. DESIGN    real assets replace generated ones  the actual deliverable
```

---

## 1. Idea

One sentence. What is the unanswered question, and which lever from `frameworks/curiosity-gap.md` carries it.

If you cannot write that sentence, stop. Nothing downstream fixes a missing idea.

**Write the thumbnail before the video where you can.** Deciding the package first tells you what the video has to deliver, and it stops you finishing a video that turns out to be unpackageable.

---

### Generate packaging concepts, not one idea

Before step 2, spread the idea across distinct angles. The four that reliably produce genuinely different frames:

| Angle | What it does |
| --- | --- |
| **Safe** | The familiar framing the niche already rewards. Data backed, recognizable |
| **Emotion** | The feeling at the peak moment. Thrill, fear, relief |
| **Contrast / Progression** | Before against after, or scale against expectation |
| **Leverage** | Borrow recognition. A known face, a known mark, a known interface |

Title angles pair with these: **Safe** (data backed, familiar), **Live** (rare, happening now), **Counterintuitive** (negative framing, the claim that contradicts the niche).

**Package the pair, not the parts.** A title and a thumbnail are designed together as one unit, and tested together as one unit. One great idea beats three forgettable ones, so if two of your three concepts are filler you are testing one idea against noise.

---

## 2. Sketch

Boxes and arrows. Thirty seconds. No detail, no color, no typography.

What you are deciding here is only this: where the subject sits, where the supporting element sits, where the text goes if there is any, and what the eye does first, second, third.

Every element on the sketch must be one of three things:

- **the main character**, the one thing attention is meant to land on
- **a supporting element**, giving the main character context
- **an attention director**, an arrow, a gaze line, a gesture, pointing at the main character

Anything that is none of those three gets deleted. Not moved, not shrunk. Deleted. More elements always equals less focus, which is the mechanism behind the KISS rule in `frameworks/four-cs.md`.

---

## 3. Prompt

Turn the sketch into words. See `frameworks/prompt-patterns.md` for the recipes.

**The one rule that costs people real money:** never put craft instructions into a prompt for a text-rendering image model. Words like "legible at 120 pixels", "high CTR", "bold and punchy", "eye-catching" get **typeset into the image** as literal text. This is not hypothetical. A production run once produced a thumbnail with "legible at 120 pixels" rendered in the bottom right corner in the same font as the headline.

Describe the picture. Never describe the goal.

---

## 4. Mockup

Generate variations. Five is the working number: enough to see a spread, few enough to actually compare.

Mockups are disposable. Their job is to tell you whether the composition survives, not to be the final image.

Two mandatory checks on anything a model generates:

1. **Read the headline back, character by character.** Text-rendering models misspell confidently. A real run shipped "35 MIILION TOKENS" with a doubled I and nobody caught it until it was live.
2. **Treat every number in a generated UI as fabricated.** Generated dashboards, charts, metrics and percentages are invented. If a real number matters, composite a real screenshot in. Never let a model make up a statistic that appears on your channel.

---

## 5. Design

Real assets replace generated ones. This is the step that separates a thumbnail from a picture of a thumbnail.

- Your real face, cut out cleanly, not a generated approximation of you
- Your real product, real UI, real screenshot
- Your locked brand palette and headline font
- The generated frame demoted to background, or thrown away entirely once it has done its job of proving the composition

Then run `checklists/thumbnail-quality.md` before anything goes live.

---

## Anti-Patterns

| Pattern | Why it fails |
| --- | --- |
| Opening a generator before step 1 exists | You will fall in love with a pretty frame that sells nothing |
| Skipping the sketch | Composition gets decided by whatever the model felt like doing |
| Shipping the mockup | Generated faces and invented UI read as fake, and the audience does clock it |
| Craft words inside the prompt | They get typeset into the image |
| One generation instead of five | No spread means no comparison means no judgment |


---

## Sources
The five steps, and the packaging-concepts-before-design rule, come from the Thumbnail MasterClass by david, dill and ant. The paper-sketch step is independently taught by Devesh Sharma. The element hierarchy applied at the sketch stage is DecodingYT's. The two generator failure modes at step 4 are from production runs. Links in `frameworks/creator-consensus.md`.

</five_step_process>
