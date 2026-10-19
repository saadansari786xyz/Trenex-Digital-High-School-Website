# Trenex Digital High School

A responsive school portfolio website with eight informational pages and a demo enquiry form.

## Run & Operate

- Install dependencies with `pnpm install --frozen-lockfile`.
- Use the Replit Run button to start the registered project services.
- Website workflow: `artifacts/trenex-school: web` — React/Vite website at `/` (port 22051).
- API workflow: `artifacts/api-server: API Server` — Express API at `/api` (port 8080); health check: `/api/healthz`.
- Managed workflows supply `PORT` and `BASE_PATH`; do not run the website's dev script without these variables.
- The Canvas component preview service is optional and is not needed to use the website.
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- No secrets or database are required for the current website or API health endpoint.
- `DATABASE_URL` is only needed if the database library or schema-push command is used.
- The enquiry form is a demo: submissions are neither sent nor stored.

## Stack

- pnpm workspaces, Node.js 20, TypeScript 5.9
- Frontend: React 19, Vite 7, Tailwind CSS
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
