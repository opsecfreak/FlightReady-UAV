## FlightLogger Development Guide

This Next.js application tracks UAV equipment and flight activity. The scaffold has been customised from the default `create-next-app` template to include authentication context wiring and baseline quality checks.

### Prerequisites

- Node.js 18.18 or newer
- npm 9+

Install dependencies before running any commands:

```bash
npm install
```

### Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the local development server on [http://localhost:3000](http://localhost:3000). |
| `npm run build` | Generates a production build. |
| `npm run start` | Runs the production build. |
| `npm run lint` | Executes ESLint using the Next.js Core Web Vitals ruleset. |
| `npm run typecheck` | Runs TypeScript in `--noEmit` mode to surface type errors. |
| `npm run check` | Convenience command that runs `lint` followed by `typecheck`. |

### Fixing Lint Failures

1. Run `npm run lint` to inspect the codebase. ESLint will report rule violations along with the file and line numbers that need attention.
2. For simple formatting problems, run `npx eslint --fix <file>` or manually edit the highlighted lines.
3. If new dependencies or configurations are required, update the relevant config (for example `.eslintrc.json`) and re-run the command until it passes.

If the linter reports issues originating from generated code or external data, add an inline disable comment with a clear justification so future maintainers understand the exception.

### TypeScript Checks

Use `npm run typecheck` during development to ensure component contracts and API interactions remain type-safe. The command relies on the project `tsconfig.json` and will exit with a non-zero code if any type errors are encountered.

### Authentication Context

The application shell wraps all routes in `AuthProvider` from `src/lib/auth/AuthContext`. Use the exported `useAuth` hook inside client components to read the current user, invoke `login`, or trigger `logout` without duplicating state.
