# Modernization Plan for **donatale‑app**

Below is a phased, actionable roadmap that brings the codebase up‑to‑date with current best‑practices, improves developer experience, and delivers a smoother, more reliable user experience.  
Each phase contains concrete tasks, the rationale behind them, and suggested implementation details.

---

### 📦 Phase 0 – Foundations (1 day)

| ✅ Task                                                 | Why                                                                     | How                                                                                                                                         |
| ------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Add a CI pipeline** (GitHub Actions)                  | Guarantees lint, type‑check, and tests run on every PR.                 | - `npm run lint` (Prettier) <br> - `npm run typecheck` (`tsc --noEmit`) <br> - `npm test` (add a placeholder test suite now, expand later). |
| **Upgrade dependencies**                                | Keeps the project secure and compatible with newer Node/ASTRO versions. | Run `npm outdated`, then `npm install <pkg>@latest` for each. Commit lock‑file changes.                                                     |
| **Add a `.github` folder with contribution guidelines** | Improves onboarding for future contributors.                            | Include `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, and a PR template.                                                                         |
| **Create a `.env.example` with comments**               | Makes local setup clearer.                                              | Add description for each variable (e.g., "CDA token for published content").                                                                |

---

### 🛠️ Phase 1 – Code Organization & Type Safety (2‑3 days)

| ✅ Task                                                                                                                | Why                                                                           | How                                                                                                                                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Extract client‑side script** from `src/pages/index.astro` into a dedicated module (`src/scripts/donation-modal.ts`). | Keeps the Astro component clean, enables unit testing, and improves bundling. | - Move all DOM‑related code (event listeners, helpers) to the new file. <br> - Export a `initDonationModal()` function that the page calls via `<script type="module" src="/src/scripts/donation-modal.ts"></script>`. |
| **Replace `any` casts** in API route (`src/pages/api/donate.ts`).                                                      | Full TypeScript safety, prevents runtime errors.                              | - Import DatoCMS types (`Item`, `ItemType`). <br> - Define a `DonationItem` interface matching the schema. <br> - Use generics on `client.items.find<Item>()`.                                                         |
| **Add proper type guards** for GraphQL data (`src/pages/index.astro`).                                                 | Guarantees that `allDonationItems` really matches `DonationItem[]`.           | `ts\nfunction isDonationItemArray(v: unknown): v is DonationItem[] {\n  return Array.isArray(v) && v.every(item => typeof (item as any).id === 'string');\n}\n`                                                        |
| **Create a reusable `Modal` component** (`src/components/Modal/Component.astro`).                                      | Centralises modal markup, ARIA handling, and focus management.                | - Accept `title`, `onClose`, and slot content. <br> - Implement `role="dialog"` and focus trap (use `focus-trap` or a tiny custom script).                                                                             |
| **Move inline styles to Tailwind utilities** (if any custom CSS exists).                                               | Keeps styling consistent and leverages Tailwind's purge.                      | Replace custom class definitions with Tailwind equivalents; delete unused CSS files.                                                                                                                                   |

---

### 🎨 Phase 2 – UX / UI Enhancements (2 days)

| ✅ Task                                                                                                                    | Why                                             | How                                                                                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Add loading & disabled states** on the donation form.                                                                    | Prevents double submissions and gives feedback. | - Show a spinner on the submit button while awaiting the API response. <br> - Disable the button during the request.                                |
| **Replace `alert()` with toast notifications** (e.g., `react-hot-toast` or a lightweight Astro‑compatible toast).          | Non‑intrusive, better UX.                       | - Install `react-hot-toast` (works with Astro's React integration) or a vanilla toast library. <br> - Show success/error toasts after the API call. |
| **Implement optimistic UI updates** after a successful donation (e.g., mark the card as donated without full page reload). | Faster perceived performance.                   | - After API success, update the local `typedAllDonationItems` array to set `donation` field, re‑render the card list.                               |
| **Add focus management** when the modal opens/closes (focus first input, return focus to the triggering button).           | Improves accessibility.                         | Use the `Modal` component from Phase 1 to handle focus automatically.                                                                               |
| **Add ARIA labels** to interactive elements (`button[data-item-id]`, close button).                                        | WCAG compliance.                                | Example: `aria-label="Open donation modal for ${item.title}"`.                                                                                      |

---

### 🔐 Phase 3 – Security & Validation (1‑2 days)

| ✅ Task                                                                                                 | Why                                               | How                                                                                                                           |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Strengthen request validation** in `src/pages/api/donate.ts`.                                         | Prevent malformed payloads and injection attacks. | - Use a schema validator (e.g., `zod`). <br> - Validate email format, string lengths, and allowed characters for `donatedBy`. |
| **Add rate‑limiting** on the donation endpoint (e.g., `express-rate-limit`‑style middleware for Astro). | Thwarts abuse / spam.                             | - Create a tiny middleware that tracks IPs and limits to X requests per minute.                                               |
| **Enable CSP headers** via Astro's `headers` config.                                                    | Mitigates XSS.                                    | Add `Content‑Security‑Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;` etc.           |
| **Audit secret exposure** – ensure no secret env vars are accidentally sent to the client.              | Prevent leakage.                                  | Run a grep for `process.env` in client‑side code; move any that belong on the server to `astro:env/server`.                   |

---

### 📈 Phase 4 – Performance & SEO (2 days)

| ✅ Task                                                                                            | Why                                                  | How                                                                                |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------- |
| **Enable DatoCMS image transformations** (`?fit=crop&h=400&w=600`).                                | Faster load, smaller payload.                        | Update `DonationCard` image `src` to include transformation query parameters.      |
| **Add `astro:prefetch` for critical data** (`AllDonationItemsQuery`).                              | Reduces time‑to‑first‑byte for the homepage.         | Use `prefetch` attribute on the `<script>` that runs the query.                    |
| **Implement server‑side caching** for GraphQL queries (e.g., in‑memory LRU cache for 60 s).        | Reduces load on DatoCMS and speeds up repeat visits. | Wrap `executeQuery` with a simple cache key based on query string.                 |
| **Add structured data (JSON‑LD)** for each donation item (schema.org `Product` or `Offer`).        | Improves SEO and rich results.                       | Insert a `<script type="application/ld+json">` block inside each card.             |
| **Audit Lighthouse scores** and address any remaining issues (e.g., unused JavaScript, large CLS). | Guarantees a performant PWA.                         | Run `npm run build && npx lighthouse http://localhost:4321 --quiet --output=json`. |

---

### 🧪 Phase 5 – Testing & Quality Assurance (3‑4 days)

| ✅ Task                                                                                        | Why                                                          | How                                                                                                                                                             |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Add unit tests** for core utilities (`src/lib/email.ts`, `src/lib/datocms/executeQuery.ts`). | Guarantees correctness after refactors.                      | Use Vitest (`npm i -D vitest`). Write tests that mock `fetch` and DatoCMS client.                                                                               |
| **Add integration tests** for the donation flow (Playwright).                                  | Validates end‑to‑end behavior (modal, form submission, API). | - Spin up a dev server (`npm run dev`). <br> - Write a Playwright script that opens the homepage, clicks a card, fills the form, and asserts the success toast. |
| **Add type‑checking script** to CI (`npm run typecheck`).                                      | Prevents type regressions.                                   |
| **Add linting script** to CI (`npm run lint`).                                                 | Enforces code style.                                         |
| **Add a visual regression test** (optional) using `@storybook/addon-visual-tests`.             | Catches UI regressions.                                      |

---

### 📦 Phase 6 – Documentation & Release (1 day)

| ✅ Task                                                                                                                                                       | Why                                              | How |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | --- |
| **Update README** with: <br>• Project overview <br>• Setup steps (including required env vars) <br>• How to run tests <br>• Deployment instructions (Netlify) | Improves onboarding and reduces support tickets. |
| **Add API documentation** (OpenAPI spec or simple markdown) for `/api/donate`.                                                                                | Makes the backend contract explicit.             |
| **Create a release checklist** (run CI, bump version, tag, deploy).                                                                                           | Ensures consistent releases.                     |
| **Tag a new version** (`v1.0.0` or appropriate semver) and push to GitHub.                                                                                    | Marks the modernized baseline.                   |

---

## 📅 Suggested Timeline

| Day   | Focus                                                          |
| ----- | -------------------------------------------------------------- |
| 0     | CI, dependency upgrade, env docs                               |
| 1‑3   | Code organization, type safety, modal component                |
| 4‑5   | UX improvements (loading, toasts, accessibility)               |
| 6‑7   | Security hardening (validation, rate‑limit, CSP)               |
| 8‑9   | Performance & SEO (image transforms, caching, structured data) |
| 10‑13 | Testing (unit, integration, CI integration)                    |
| 14    | Documentation, release, final QA                               |

---

## 🎯 Success Criteria

- **CI passes** on every PR (lint, type‑check, tests).
- **No `any`** left in the codebase; full TypeScript coverage.
- **All UI interactions** are accessible (ARIA, focus trap) and have loading/toast feedback.
- **Page load** < 2 s on a typical 3G connection (Lighthouse ≥ 90 score).
- **Automated tests** cover ≥ 80 % of core logic, including the donation flow.
- **No secret** is exposed to the client bundle.
- **Documentation** enables a new developer to get the app running in ≤ 15 minutes.

---

### Next Steps

1. **Create the CI workflow** and push the initial commit.
2. **Open a branch** (e.g., `modernize/phase-1`) and start with the client‑side script extraction.
3. **Iterate** through the phases, committing after each completed task and letting CI validate the changes.

Feel free to adjust the timeline or priorities based on your team's capacity. Good luck modernizing Donatale! 🚀
