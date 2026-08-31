# Prompt Patterns

The vocabulary this skill generates with. Read it at the prompt writing step.

Every pattern here exists to carry a Four Cs decision **into** the generator, rather than hoping the generator makes that decision for you. Generator-agnostic: these work in any image model that takes a text prompt.

---

## The five clauses every prompt carries

A thumbnail prompt is not a description of a scene. It is a composition brief.

1. **Subject clause.** What carries the frame, and what it is doing. One subject.
2. **Placement clause.** Which third it sits on, and what stays empty. Always names the clear bottom right.
3. **Contrast clause.** The complementary pairing separating subject from ground.
4. **Light clause.** Flat, bright, even. No moody falloff, no heavy rim light.
5. **Legibility clause.** Big shapes, no fine detail carrying meaning.

**A prompt missing the placement clause hands composition back to the generator**, which is the one thing you never want to outsource. The model has no idea YouTube stamps a timestamp in the bottom right.

Independent corroboration that this is the right shape: the popular ChatGPT-to-thumbnail templates circulating in creator communities split their fields as Character and Pose, Props, Background, Text Overlay, Style and Color Palette. Same brief, different names, arrived at separately.

---

## Two rules that cost people real money

**1. Never put craft instructions in the prompt.**

Text-rendering models typeset your instructions into the image. Verbatim. A production run once shipped a frame with `legible at 120 pixels` rendered in the bottom right corner in the same font as the headline.

Banned inside a prompt: "legible at 120 pixels", "high CTR", "eye-catching", "clickable", "thumbnail style", "bold and punchy", "viral". Describe the picture. Never describe the goal.

The legibility clause above is written as picture language for exactly this reason: say "large simple shapes, no fine detail" and not "must read at small size".

**2. Generated numbers are fabricated.**

Any dashboard, chart, metric or percentage a model renders is invented. If a real number matters to the concept, composite a real screenshot in at the design stage. Never let a model make up a statistic that goes out on your channel.

And read every generated headline back character by character. Models misspell confidently. One real run produced "35 MIILION TOKENS", doubled I, and it was not caught until it was live.

---

## Variation is a different bet, not a different wording

Five variations means five different **visual bets** on one idea. Vary one axis per variation:

- **Angle.** Eye level, low hero angle, top down
- **Moment.** The instant before, the instant after
- **Contrast strategy.** Warm subject on cool ground, or cool on warm
- **Distance.** Macro detail, or full scene
- **Emotional beat.** Tension, aftermath, absurdity

Five rewordings of one bet teach you nothing when the scores come back.

---

## Faceless Patterns

No people, no hands as subject, no implied portrait. The object, screen, scene, or symbol carries the frame.

### Hero Object
```
A single {object}, oversized and hero lit, placed on the left third of a 16:9 frame,
flat bright even lighting with no harsh shadows, deep {complementary color} seamless
background, strong color separation between object and ground, right two thirds and
bottom right corner left empty, photographic, high detail on the object silhouette,
large simple shapes
```

### Broken or Altered Icon
Carries Shock Factor and Unknown Knowledge with no face.
```
A {recognizable object or logo-like form} cracked and splitting apart, fragments
suspended mid-fall, sitting on the left third, saturated red background, flat bright
studio lighting, sharp clean edges, bottom right corner empty, large simple shapes
```

### Before and After Split
The strongest faceless carrier. Object and promise are the same thing.
```
Split 16:9 composition, hard vertical divide at center, left half {state A} in cool
blue tones, right half {state B} in warm orange tones, identical camera angle and
framing on both halves, flat bright lighting throughout, no text, bottom right corner
clear, high contrast between halves
```

### Scale Absurdity
```
An enormous {object A} towering over a tiny {object B} on a clean {complementary}
background, extreme scale contrast, low camera angle looking up to exaggerate the size
difference, flat bright lighting, wide empty space on the right, bottom right corner
clear, simple bold silhouettes
```

### Aftermath Scene
Cliffhanger without a person.
```
{Scene} immediately after {event}, still settling, no people in frame, evidence of what
just happened clearly visible, flat bright lighting, one dominant focal point on the
right third, cool background against warm foreground, bottom right corner empty,
photographic realism
```

### Screen as Subject
For software, tools, and workflow topics.
```
A single glowing {screen or interface} floating on a dark {complementary} gradient
ground, angled slightly, one element on screen visibly highlighted, everything else
simplified into large blocks with no readable fine text, flat bright key light, sitting
on the left third, bottom right corner clear
```

### Glyph-Head Avatar
The device that buys a face-led composition without a face.
```
A hooded figure seen from behind and slightly to the side, seated at a desk with a
laptop, a large glowing {brand mark or icon} where the head would be, flat bright
lighting, saturated {color} background, figure on the left third, right side open,
bottom right corner clear, clean bold silhouette
```

---

## With-Face Patterns

A person carries the frame and the expression is the hook. Face size is what most creators get wrong: at thumbnail scale the eyes and mouth must still read, which means bigger than feels right at full size.

### Reaction on a Third
```
{Person description} with a genuine {emotion} expression, head and shoulders occupying
the left third of a 16:9 frame, looking toward the right side of the frame, flat bright
even key light on the face, deep {complementary color} background, {object} visible on
the right third, bottom right corner empty, sharp focus on the eyes
```

### Face Plus Concept Object
The working with-face composition. Face is an accent, object is the subject.
```
{Person description} cut out cleanly at the right edge of a 16:9 frame, {emotion}
expression, gaze directed at {object} which dominates the left two thirds, flat
saturated {color} background behind both, flat bright lighting, no drop shadow, bottom
right corner clear
```

### Human Scale Against Something Large
When the face exists to show size.
```
{Person description} standing small in the lower left of the frame, dwarfed by an
enormous {object} filling the upper right, low camera angle, flat bright lighting,
strong silhouette separation between figure and object, cool ground against warm
subject, bottom right corner empty
```

---

## Anti-Patterns

| Pattern | Why it fails |
| --- | --- |
| Craft words inside the prompt | They get typeset into the image |
| No placement clause | Composition gets decided by the model |
| Asking for text in the generated image | Small text comes back mangled. Set it at the design stage |
| Five rewordings of one bet | No spread, nothing to learn from the scores |
| Shipping the generation | Generated faces and invented UI read as fake |
| Trusting a rendered number | It is fabricated. Composite the real screenshot |
