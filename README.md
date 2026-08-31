<p align="center">
  <img src="docs/hero-ez-thumb-corpus-wall.png" alt="EZ Thumb - YouTube thumbnail and title packaging for Claude Code" width="900">
</p>

# EZ Thumb

> **YouTube thumbnail and title packaging** for [Claude Code](https://claude.ai/code). Onboard once against your real competitors. Package every video after that against evidence from your actual niche, instead of the same twelve thumbnail rules everyone else already has.

<p>
  <a href="https://www.charlieautomates.com/"><img src="https://img.shields.io/badge/Work_with_Charlie-Find_Your_Bottleneck-7c3aed?style=for-the-badge&logo=anthropic&logoColor=white" alt="Work with Charlie"></a>
  <a href="https://www.npmjs.com/package/ez-thumb"><img src="https://img.shields.io/npm/v/ez-thumb?color=blue&label=npm" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/ez-thumb"><img src="https://img.shields.io/npm/dt/ez-thumb?color=blue&label=downloads" alt="npm downloads"></a>
  <a href="https://www.npmjs.com/package/ez-thumb"><img src="https://img.shields.io/npm/dm/ez-thumb?color=blue&label=downloads%2Fmonth" alt="npm downloads per month"></a>
  <a href="LICENSE"><img src="https://img.shields.io/npm/l/ez-thumb?color=green" alt="MIT license"></a>
  <a href="https://github.com/charlesdove977/ez-thumb/stargazers"><img src="https://img.shields.io/github/stars/charlesdove977/ez-thumb?style=flat" alt="stars"></a>
</p>

---

## Install

```bash
npx ez-thumb install --with-commands
```

Restart Claude Code, then:

```
/ez-thumb-onboard     once
/ez-thumb             every video after that
```

That is the whole setup.

---

## The problem

Every thumbnail guide gives you the same rules. Rule of thirds. Bright colors. Big face. Keep the text short.

Those rules were measured on somebody else's audience, in somebody else's niche, at some point in the past. They are not wrong exactly. They are just not about you.

Here is how fast it moves. In one real 15-day window in a single niche, a framing running at **19.55x** median breakout fell to **1.79x**. Nothing changed except that everyone copied it and the audience stopped seeing it. Any static rule you were handed is a photograph of a moving thing.

And it gets worse, because most thumbnail research is built on numbers that were never real. Bought views are common in AI, business, finance and crypto niches. One channel in a corpus this skill was built against averaged **111,777 views on 56 likes**. That is a 0.05 percent like rate while its neighbours ran 2 to 4 percent. Its thumbnails looked incredible. They proved nothing, because the clicks did not happen the way they appeared to.

Copy that thumbnail and you have copied an advertisement.

## What EZ Thumb does instead

It builds you a corpus of your own, once, and then designs against it.

```
/ez-thumb-onboard   ONE TIME
  1  profiles your channel, assets, and what has already worked
  2  finds your competitors      vidIQ MCP, or you name them
  3  pulls their best thumbnails Apify MCP, last 90 days, top 5 each
  4  reads every single image    vision, one row per thumbnail
  5  flags the bought views      like rate under 0.5 percent
  6  writes all of it back into itself

/ez-thumb           EVERY VIDEO AFTER
  reads what it already learned, packages your video against it
```

The corpus is a one-time build. It does not re-pull, it does not re-interview, and it does not ask you to set anything up twice. `/ez-thumb refresh` rebuilds it when your competitors change or when it goes stale.

---

## The part that makes it different

**It writes what it learns back into itself.**

Most skills are a form you fill in every session. This one is a tool that remembers. After onboarding, the installed skill directory holds your channel profile, your chosen data source, your competitor corpus, and a dated findings section appended to its own frameworks.

Two consequences worth knowing:

- **The whole configured skill is one folder.** Copy it to another machine and it is still onboarded. There is no hidden state file to lose.
- **`npx ez-thumb update` preserves it.** A version bump never costs you your onboarding.

And when new evidence contradicts something already written in a framework, it **conditions** the old rule rather than deleting it. The old finding keeps its date and its scope; the new one sits beside it. Six months later you can still tell whether the guidance changed because of measurement or because somebody had an opinion.

---

## Two rules it enforces that most research skips

**Rank on breakout, never raw views.**

```
Channel A   30,000 subs   20,000 views   ->  0.67x   the thumbnail worked
Channel B  900,000 subs  200,000 views   ->  0.22x   the thumbnail underperformed
```

Sorted by raw views, B looks like the winner and you copy the wrong thumbnail. Almost every thumbnail teardown on the internet makes this exact mistake.

**Flag bought views before learning anything from them.**

Like rate under 0.5 percent, in a set where peers run 2 to 4 percent, gets marked as paid inventory. Excluded from every aggregate. Still usable as a composition reference, never as proof that a thumbnail earned a click.

---

## What you get from a run

Three genuinely different concepts, not three phrasings of one. Each carries a title, the concept object, one named curiosity lever, an ascii composition sketch with the bottom right kept clear for YouTube's timestamp, and the corpus evidence backing it or the niche cliche it deliberately breaks.

Pick one, and it writes five image prompts as five different visual bets: angle, moment, contrast, distance, emotional beat.

Then it scores everything on the Four Cs and **takes the lowest, not the average.** A frame that is 10 on composition and 4 on curiosity is a 4, because nobody clicks it. The pass bar is 8, and anything under it comes back with one specific fix, never "make it pop."

---

## Requirements

| | | |
| --- | --- | --- |
| **Required** | Apify MCP | Pulls competitor videos, stats and thumbnails. A free token gets you started |
| Optional | vidIQ MCP | Auto-discovers your competitors. Without it you name them yourself, which is often the better list |
| Optional | Any image generation MCP | Generates the variations |

**Without an image generator you still get everything that matters:** the concepts, the compositions, the corpus evidence, the scoring, and five copy-paste prompts for whatever generator you already use. Generation is the last mile, not the product.

Check what you have:

```bash
npx ez-thumb doctor
npx ez-thumb status      # install state, onboarding state, corpus age
```

---

## Commands

| Command | What |
| --- | --- |
| `/ez-thumb-onboard` | One time. Profile, competitors, corpus, self-write |
| `/ez-thumb` | Package a video into titles plus thumbnail concepts |
| `/ez-thumb score` | Score an existing thumbnail against the Four Cs |
| `/ez-thumb refresh` | Rebuild the corpus, keep the profile, report what changed |

```bash
npx ez-thumb install --with-commands   # install, plus slash command stubs
npx ez-thumb update                    # upgrade, keeping your onboarding
npx ez-thumb update --clean            # upgrade and start fresh
npx ez-thumb uninstall --force         # remove an onboarded install
npx ez-thumb install --project         # into ./.claude/ instead of ~/.claude/
```

---

## A note on the corpus and other people's work

The thumbnails EZ Thumb pulls belong to the creators who made them. They are downloaded to your machine for your own analysis, the same way you would open a competitor's channel and look at it.

The package **gitignores the corpus by default**, and ships with none. Do not commit competitor thumbnails to a public repository, and do not redistribute a corpus. If you fork this, leave that gitignore rule alone.

The skill also writes its flags as data properties rather than as accusations about people. "0.05 percent like rate, composition reference only" is a measurement. Anything stronger than that is a claim you do not need to make.

---

## Credit

The **Four Cs** structure comes from the Thumbnail MasterClass by david, dill and ant. Worth buying.

The consensus framework cross-checks public teardowns by **Isaac**, **Website Learners**, **DecodingYT**, **TubeBuddy**, and **Devesh Sharma**. Where they contradict each other, EZ Thumb says so rather than picking a side quietly. Go watch all five.

Everything measured, the breakout ranking, the bought-view filter, the pattern decay numbers, came out of production runs.

---

## License

MIT. Do what you want with it.

Built by [Charles J Dove](https://www.charlieautomates.com/) at Charlie Automates.
More free Claude Code skills and plugins: **[charlieautomates.com/free-resources](https://www.charlieautomates.com/free-resources)**
