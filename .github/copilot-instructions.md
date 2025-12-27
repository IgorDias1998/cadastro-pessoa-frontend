Purpose
-------
This file gives actionable, repository-specific guidance for AI coding agents working on this Angular (v21) application with SSR.

Big picture
-----------
- Framework: Angular 21 with standalone components (no NgModule). See `src/main.ts` where the app is bootstrapped with `bootstrapApplication(App, appConfig)`.
- SSR: Uses `@angular/ssr` and an Express server. Browser output and server are produced by the Angular build (see `angular.json`). The Node server entry is `src/server.ts` and runtime script is `serve:ssr:cadastro-pessoa-frontend` in `package.json`.
- App layout: `src/app` contains the application logic. There are server-aware variants: `app.config.server.ts` and `app.routes.server.ts` for server-only providers and prerendering routes.

How to run (developer workflows)
--------------------------------
- Dev server (hot-reload): `npm start` -> runs `ng serve` (dev config). Port: `4200` by default.
- Build (browser + server/SSR): `npm run build` -> produces `dist/` artifacts. SSR server file to run is `dist/cadastro-pessoa-frontend/server/server.mjs` (script: `serve:ssr:cadastro-pessoa-frontend`).
- Serve SSR locally after build: `npm run serve:ssr:cadastro-pessoa-frontend` (node the server.mjs) or run `node dist/.../server.mjs` directly.
- Tests: `npm test` -> uses Angular CLI integration with Vitest (see `devDependencies`).

Key project-specific patterns & conventions
-----------------------------------------
- Standalone components: components are written as standalone Angular components. Example: `src/app/app.ts` uses `@Component({ imports: [RouterOutlet] })`.
- Router: Routes are defined in `src/app/app.routes.ts` (client) and `src/app/app.routes.server.ts` (server prerender rules). The server uses `withRoutes(serverRoutes)` in `app.config.server.ts`.
- App config split: `src/app/app.config.ts` (common providers) and `app.config.server.ts` (merges server-only providers via `mergeApplicationConfig`).
- SSR request handling: `src/server.ts` creates an Express app and delegates rendering to `AngularNodeAppEngine().handle(req)`; static browser files are served from the `browser` dist folder.
- Styles & 3rd-party UI: PrimeNG + PrimeIcons are included via `angular.json` `styles` array. Theme files are pulled from `node_modules` (e.g., `primeng/resources/themes/lara-light-blue/theme.css`).

Integration points & external dependencies
-----------------------------------------
- `@angular/ssr` — server rendering, server routes, and server providers.
- `express` — lightweight Node server in `src/server.ts` for SSR and static assets.
- `primeng` / `primeicons` — UI library; included in `angular.json` styles and imported from `node_modules`.
- Build system: Angular CLI / `@angular/build` configured in `angular.json` (browser entry `src/main.ts`, server `src/main.server.ts`).

Places to look for changes
--------------------------
- Bootstrap & app config: `src/main.ts`, `src/app/app.config.ts`, `src/app/app.config.server.ts`.
- Routes: `src/app/app.routes.ts`, `src/app/app.routes.server.ts`.
- Server entry & runtime: `src/server.ts`, `package.json` (`serve:ssr:cadastro-pessoa-frontend`).
- Angular build config & styles: `angular.json` (styles, assets, server/ssr sections).

Example snippets (for quick orientation)
---------------------------------------
- Bootstrapping (client):

  ```ts
  // src/main.ts
  bootstrapApplication(App, appConfig)
  ```

- Server route prerendering (server):

  ```ts
  // src/app/app.routes.server.ts
  export const serverRoutes: ServerRoute[] = [ { path: '**', renderMode: RenderMode.Prerender } ];
  ```

Notes & agent behavior
----------------------
- Preserve standalone-component style — do not convert to NgModule.
- When modifying routes, update both client (`app.routes.ts`) and server (`app.routes.server.ts`) if rendering behavior must change.
- Prefer `app.config.server.ts` for server-only providers (prerender hooks, server rendering providers), and merge with `app.config.ts` as shown.
- Keep `angular.json` styles order when updating themes (third-party CSS must remain before `src/styles.css`).

If anything is missing
----------------------
If you need conventions not discoverable from code (branching, commit message format, CI steps, or deploy targets), ask the repo owner. I can then merge those conventions into this file.

Next steps
----------
- I created this file. Tell me if you want additional examples (components, routing examples, or CI steps) to include.
