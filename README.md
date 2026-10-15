# DropWorthIt

Free, no-wallet-connection directory of crypto airdrops, checked against official project sources. **Early private build.**

**Not financial advice. Do your own research. Never share your seed phrase; only use the official links.**

## Build
`node build.js` reads `data/airdrops.json` and writes static HTML to `dist/` (home, one page per drop, `archive.html`, `submit.html`, `sitemap.xml`). `BUILD_NOW=<ISO time>` simulates another date.

## Source rules
- Each key field (deadline, claim domain, eligibility/KYC, gas) has its own source in `src`, and it must be an official project page (official site, docs, blog, or official X). With no official source, the field is `Unknown`.
- Third-party sites (news, aggregators, blogs) go in `thirdParty` and appear only as "Reported by (third-party)" links. They are never claim links or the source for a fact.
- Never invent facts. Unknown stays Unknown.

## Phishing guards
- Claim domains are plain monospace text, never links. A "verified official" tick appears only when `claimVerified` is true, meaning the domain is confirmed from the project's official site or X account.
- Every drop page shows a seed-phrase / unlimited-approval warning.

## Deadlines, archive, re-checks
- `deadlineUTC` is an exact UTC ISO time, or null. `deadlineDate` is used when the project gives a date but no time. Deadlines display in US Central time.
- Drops past their deadline move to `archive.html` automatically at build time. A date-only deadline counts as ended once that date is over everywhere. `outcome` holds official numbers only; otherwise it's `Unknown`.
- Drops whose `verified` date is more than 7 days old (or null) get a "Needs re-check" badge.

## Verdicts
`verdict` is Do it / Maybe / Skip with a one-line `verdictReason`. Badges use a symbol plus a word (✓ / ◐ / ✕), not color alone. Use Maybe when key facts are Unknown.

## Sponsored policy
See `SPONSORED_POLICY.md` (also shown on submit.html). Verification is mandatory, sponsored listings carry a distinct "Sponsored" label, and payment never changes a verdict or risk score. No pricing yet.

## Art placeholders
`assets/logo.svg`, `assets/favicon.svg` and `assets/og-image.png` (1200x630) are placeholders to be replaced with final art.

## Design note
Look: "inspector's ledger" (see the Lead Designer's redesign spec). Cream paper slips, rubber-stamp verdicts, slate navy bands, self-hosted Archivo Narrow headings (`assets/fonts/`, OFL). All styling lives in `assets/style.css`; no inline styles or scripts (CSP).

Why this isn't slop: every detail comes from one physical idea, a stamped inspection slip on paper, instead of a stock glossy crypto dashboard.
