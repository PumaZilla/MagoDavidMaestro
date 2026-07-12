# Contributing to magodavidmaestro.com

> This document is addressed to **every person who touches this codebase** — human
> or AI agent. Read it fully before making any change. There are no exceptions.

---

## The golden rules

These rules are non-negotiable. Violating any of them will require the
work to be redone from scratch.

### 1. You never work on `main`

`main` is the stable, deployable trunk. It is not a scratch pad.

- **Never commit directly to `main`.**
- **Never push to `main` directly.**
- **Every single change**, no matter how small — a typo fix, a one-line tweak,
  a dependency bump — goes on a dedicated branch first.

If you find yourself on `main` with uncommitted changes, stop. Stash them,
create a branch, and apply them there:

```bash
git stash
git checkout -b fix/my-accidental-change
git stash pop
```

### 2. You never merge without explicit consent

Merging into `main` is a deliberate, human-approved action. No branch is ever
merged automatically, speculatively, or "just to keep things tidy".

- **Wait for an explicit "merge this" instruction** before running any merge.
- When in doubt, ask. Do not assume.
- The only person who authorises a merge is the project lead.

When a merge is authorised, always use `--no-ff` so the branch topology is
preserved in the graph:

```bash
git checkout main
git merge --no-ff feat/my-feature -m "Merge branch 'feat/my-feature' into main"
```

### 3. Every commit and every branch must follow the naming convention

Consistency in naming makes the history readable at a glance. Deviating from
the convention makes the history noisy and harder to audit.

See the [Branch naming](#branch-naming) and [Commit messages](#commit-messages)
sections below for the full rules.

### 4. All checks must pass before any merge — no exceptions

Before even asking for a merge, **every available check must be green**.
This is not optional. A branch that does not pass all checks is not ready to
merge, period.

Run the full suite locally and fix everything before requesting the merge:

```bash
npm run build        # Astro build — must complete without errors
npm run check        # TypeScript type checking
npm test             # All tests passing (if test suite exists)
```

If **any** of these commands exits with a non-zero code, the branch is not
mergeable. Fix the issues, commit the fixes on the same branch, and re-run
until everything is clean. Do not ask for a merge with known failures, do not
ask for exceptions, and do not skip a check because it "is not related to my
change". All checks, always.

---

## Branch naming

Branches follow the `type/short-description` pattern in **kebab-case**:

```
feat/cookie-consent-banner
fix/mobile-menu-overflow
chore/upgrade-astro
docs/contributing-guide
refactor/contact-form-validation
style/hero-spacing
```

| Prefix | When to use |
|--------|-------------|
| `feat/` | New feature or capability |
| `fix/` | Bug fix |
| `chore/` | Maintenance — deps, config, tooling, cleanup |
| `docs/` | Documentation only |
| `refactor/` | Code restructure without behaviour change |
| `style/` | Formatting, whitespace, visual adjustments |
| `perf/` | Performance improvement |

**Rules:**
- Use only lowercase letters, numbers and hyphens. No slashes beyond the prefix.
- Keep descriptions short and specific (`fix/date-input-overflow` not `fix/form-stuff`).
- One concern per branch. If you need to do two unrelated things, open two branches.

---

## Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/) **strictly**.
Every commit must have the format:

```
type(scope): short imperative description

Optional body explaining *why*, not *what*.
```

**The scope is mandatory. Never omit it.**

The description must be in the **imperative mood** ("add", "fix", "remove" — not
"added", "fixes", "removing").

**AI Agent Rule: Never use `Co-Authored-By`**

If you are an AI or LLM, you must NEVER append `Co-Authored-By:` trailers to commit messages (e.g. `Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>`). Just write the standard commit message body.

### Types

| Type | When to use |
|------|-------------|
| `feat` | New feature or capability |
| `fix` | Bug fix |
| `chore` | Maintenance (deps, config, tooling) |
| `docs` | Documentation only |
| `refactor` | Code restructure without behaviour change |
| `style` | Formatting, whitespace, visual design |
| `perf` | Performance improvement |

### Scopes

Common scopes for this project:

- `site` — overall website structure
- `hero` — hero section component
- `contact` — contact form
- `nav` — navigation/menu
- `footer` — footer component
- `schema` — structured data/SEO
- `forms` — form validation/submission
- `i18n` — internationalization (EN/ES)
- `seo` — search engine optimization
- `analytics` — tracking/GTM
- `deps` — dependency updates
- `build` — build configuration
- `deploy` — deployment/CI

### Valid examples

```
feat(schema): add Review and Video structured data markup
fix(contact): prevent date input overflow on mobile
chore(deps): upgrade astro to 4.16.0
docs(readme): add local development setup instructions
style(hero): adjust manifesto period color to white
refactor(nav): extract mobile menu logic to separate component
perf(images): convert hero images to WebP format
```

### Invalid examples — do not do this

```
fix stuff                          ← missing type and scope
feat(ui): Added new logo           ← past tense, should be "add"
update                             ← meaningless, no type, no scope
WIP                                ← never commit WIP to a shared branch
feat(site): fix SSL and update deps and refactor cli   ← one commit, three concerns
```

### Merge commits

Merge commits also follow the convention. The message is auto-generated when
you use the `--no-ff` flag with `-m`:

```bash
git merge --no-ff feat/cookie-banner -m "Merge branch 'feat/cookie-banner' into main"
```

---

## Workflow summary

```
1.  Start from an up-to-date main
    git checkout main && git pull

2.  Create a branch
    git checkout -b feat/my-feature

3.  Work, commit often with meaningful messages
    git commit -m "feat(scope): do something specific"

4.  Run all checks — fix until green
    npm run build && npm run check

5.  Push the branch (never main) and ask for a merge
    git push origin feat/my-feature
```

That's it. No shortcuts.

---

## Project-specific guidelines

### Working with Astro components

- All components live in `src/components/`
- Use TypeScript for props interfaces
- Keep components focused — one responsibility per component
- Extract reusable styles to `src/styles/tokens.css`

### Bilingual content

- All user-facing text must be in both English and Spanish
- Use the `t` object pattern for translations within components
- English is default, Spanish is `/es/` route

### Images

- Original JPG sources in `public/img/`
- WebP conversions generated via `scripts/convert-images.mjs`
- Always provide both formats using `<picture>` element
- Include width/height attributes to prevent layout shift

### SEO best practices

- Every page needs unique title and meta description
- Use semantic HTML (`<section>`, `<article>`, `<nav>`)
- Include structured data (Schema.org JSON-LD)
- Test with Google's Rich Results Test

### Before pushing

1. Run `npm run build` — must complete without errors
2. Manually test in browser (both EN and ES versions)
3. Check mobile responsiveness
4. Verify forms still submit correctly
5. Check that no console errors appear

---

## Questions?

If something in this guide is unclear or you encounter a situation not covered
here, **ask before proceeding**. It's better to clarify than to guess and create
technical debt.
