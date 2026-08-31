# Self Update

How EZ Thumb writes what it learned back into itself, so onboarding happens once instead of every run.

This is the mechanism that makes the skill worth installing. A skill that re-interviews you every session is a form. A skill that remembers is a tool.

---

## What gets written, and where

```
skill/
  SKILL.md                      frontmatter: configured: false -> true
  context/
    data-source.md              THE FLAG. Route decision reads this first, every run
    channel-profile.md          who the operator is, what they own, what has worked
  frameworks/
    faceless-vs-face.md         gains a dated "Niche findings" section
  reference/
    <YYYY-MM-DD>-<niche>/       the corpus. Gitignored. Local to this operator
      README.md
      records.csv
      thumbnails/<channel>/*.jpg
```

Nothing is stored outside the skill directory. That is deliberate: the whole configured skill can be copied to another machine, or backed up, as one folder. There is no hidden state file to lose.

---

## The configured flag

`context/data-source.md` opens with frontmatter carrying exactly one line that decides routing:

```
status: unconfigured        ->  /ez-thumb stops and sends the user to /ez-thumb-onboard
status: configured          ->  /ez-thumb goes straight to work
```

Read it on every run, before anything else. Never infer the state from whether a corpus folder happens to exist; a half-finished onboard can leave a folder behind.

Onboard flips this line **last**, after `checklists/onboard-complete.md` fully passes. A partial onboard must stay `unconfigured` so the next run resumes setup instead of quietly packaging a video against half a corpus.

Mirror the same value into `SKILL.md` frontmatter as `configured: true`. The mirror is for humans reading the file and for `npx ez-thumb status`; `data-source.md` stays the source of truth.

---

## Conditioning, not overwriting

The important rule, and the one that is easy to get wrong.

When the corpus contradicts something already written in a framework, **do not delete the old rule.** Condition it. Mark the scope where it still holds, add the new finding beside it, and cross-reference both.

Why: a rule that was measured somewhere real is still true somewhere real. Deleting it destroys the comparison, and six months later nobody can tell whether the guidance changed because of new evidence or because someone got an opinion.

The shape to append:

```markdown
## Niche findings: <niche>, generated <YYYY-MM-DD>

Measured from `reference/<folder>/`, n = <count> after removing <k> flagged videos.

| Split | n | Mean breakout |
| --- | --- | --- |
| Faceless | | |
| Face-led | | |

**Verdict for this channel:** <one sentence>

**Conditions the general guidance above.** The general section holds where <scope>.
This section wins for this operator's niche because <evidence>. Both stay.
```

Same treatment inside `channel-profile.md` when a later run measures something that contradicts an earlier note. Date every claim. An undated claim in a file that gets appended to for a year is worse than no claim.

---

## What refresh rewrites, and what it protects

`/ez-thumb refresh` rebuilds evidence. It never re-interviews.

| File | On refresh |
| --- | --- |
| `reference/<new-date>-<niche>/` | Created fresh. The old folder stays, so patterns can be compared across time |
| `frameworks/faceless-vs-face.md` | New dated Niche findings section appended. Old sections kept |
| `context/data-source.md` | `last_pull` and `corpus_folder` updated. Roster updated if it changed |
| `context/channel-profile.md` | **Protected.** Only the "What has worked" section may gain new dated lines |
| `SKILL.md` | Untouched |

Keeping the old corpus folder is what makes the second refresh more valuable than the first. Two dated corpora in the same niche show which patterns are rising and which are burning out, and that comparison is not available from any single pull.

---

## Surviving an upgrade

`npx ez-thumb update` stashes `context/channel-profile.md`, `context/data-source.md`, and the whole `reference/` tree, replaces everything else, then restores them. A version bump never costs the operator their onboarding.

`npx ez-thumb update --clean` skips the stash and starts over. Only for an operator who wants a genuinely fresh install.

If a future version changes the shape of a context file, migrate it in place on the first run after the upgrade and say so in one line. Never silently discard an operator's data because a schema moved.
