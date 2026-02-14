# Repository Guidelines

## Project Structure & Module Organization
- `backend/apis/` contains AWS Lambda handlers: `downloadThisUrl.py`, `downloadAudioForThisUrl.py`, and `getVideoEntities.py`.
- `test_suite/` contains script-style backend checks and sample payloads.
- `frontend/` is an Angular 10 app (`src/app` for components/services, `src/assets` for static files, `e2e/` for end-to-end tests).
- `serverless.yml` defines API routes, Lambda handlers, S3 resources, and frontend deployment settings.
- Root `requirements.txt` manages Python dependencies; root `package.json` manages Serverless plugins.

## Build, Test, and Development Commands
- `npm install` (repo root): install Serverless plugins.
- `pip install -r requirements.txt`: install backend Python dependencies.
- `cd frontend && npm install`: install frontend dependencies.
- `cd frontend && npm start`: run Angular dev server at `http://localhost:4200`.
- `cd frontend && npm run build`: create production build in `frontend/dist/frontend`.
- `cd frontend && npm test`, `npm run lint`, `npm run e2e`: run unit tests, lint checks, and E2E tests.
- `export PYTHONPATH="$PWD" && python test_suite/getAllResolution_test.py`: run backend test script locally.
- `serverless deploy` / `serverless deploy function -f downloadThisUrl`: deploy full stack or a single function.

## Coding Style & Naming Conventions
- Python: use 4-space indentation, clear error handling, and readable variable names.
- Preserve existing handler module/function names because `serverless.yml` references exact paths (for example, `backend/apis/downloadThisUrl.downloadThisUrl`).
- Angular/TypeScript: follow `frontend/tslint.json` rules (spaces, single quotes, semicolons, `app-` selector prefix).
- Frontend file naming: kebab-case for file names (`video-card.component.ts`), PascalCase for classes.

## Testing Guidelines
- Frontend unit tests are colocated as `*.spec.ts` and run via Karma (`npm test`).
- Frontend E2E tests are under `frontend/e2e/`.
- Backend tests are executable scripts in `test_suite/`; add new tests as `*_test.py`.
- No coverage gate is defined; include tests for every behavioral change.

## Commit & Pull Request Guidelines
- Existing history favors short, action-focused commit messages (`Fixed`, `Updated ...`, `[RELEASE] ...`).
- Prefer concise messages with area context, for example: `backend: fix audio stream fallback`.
- PRs should include a clear change summary, test evidence (commands run), linked issue/task, and screenshots for frontend UI updates.
