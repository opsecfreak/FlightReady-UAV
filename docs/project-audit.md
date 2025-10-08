# FlightLogger Initial Project Audit

## Summary
- Reviewed the freshly scaffolded Next.js application for architectural gaps, security concerns, and developer-experience blockers.
- Identified critical bugs that would prevent authentication flows from working in both the root and `/signin` routes.
- Catalogued missing quality gates (tests, linting) and security placeholders that require follow-up before feature implementation.

## High Priority Issues

| Area | Issue | Impact | Recommendation |
| --- | --- | --- | --- |
| Authentication | `AuthProvider` was never mounted in the root layout, so every call to `useAuth` throws at runtime. | 🔴 Blocks all pages that rely on authentication state. | Wrap the app in `AuthProvider` (fixed in this PR). |
| Sign-in Route | `/signin` page used React hooks without marking the component as a client component and wrote credentials to `localStorage`. | 🔴 Hard runtime error plus insecure storage pattern. | Convert the route to a client component and delegate to the shared auth context (fixed in this PR). |
| Tooling | `npm run lint` fails because no lint script is defined. | 🟠 Developers cannot run static analysis locally/CI. | Add ESLint configuration and wire `lint` & `typecheck` scripts. |
| Security | `src/lib/betterAuth.ts` is a stub with empty JWT helpers. | 🟠 No token verification; future code might rely on non-existent security. | Either implement JWT handling or remove until ready. |
| Data Modeling | Components store `Date` instances in client state and assume `toLocaleDateString` exists. | 🟡 Serialising through APIs will turn dates into strings, breaking UI. | Store ISO strings in state and normalise formatting utilities. |

## Recommended Follow-up PRs
1. **Tooling Hardening** – Add ESLint/Prettier configs, `lint` and `typecheck` scripts, and run them in CI.
2. **Auth Infrastructure** – Replace the temporary context implementation with a real authentication provider (e.g., BetterAuth or NextAuth) and secure storage.
3. **Data Contracts** – Introduce Zod schemas/TypeScript types shared between client and server; adjust equipment & flight forms to persist via API routes.
4. **API & Database Layer** – Flesh out Prisma schema, migrations, and API route handlers for equipment, flights, and authentication workflows.
5. **UX Enhancements** – Connect `Navbar`/`Sidebar` components to routing guards, add loading and error states, and ensure responsive layout with integration tests.

## Additional Notes
- Create GitHub issue templates (bug report, feature request) to structure future contributions.
- Add end-to-end smoke tests (Playwright/Cypress) once the primary flows are implemented.
- Document environment variables and secrets handling before introducing real auth or storage services.
