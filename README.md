# squid-be

A GraphQL gateway in front of a [Squidex](https://squidex.io) headless CMS. It authenticates against Squidex with client credentials, stitches the CMS GraphQL schema into a single endpoint, and proxies CMS assets, so the frontend only needs to talk to this service.

## Tech stack

Node.js 20+, TypeScript, Express 5, GraphQL Yoga, GraphQL Tools (schema stitching), TypeGraphQL, Axios, http-proxy-middleware, ESLint and Prettier.

## Getting started

Requirements: Node.js 20 or later and a Squidex instance with an app, a client and at least one published schema.

```bash
npm install
cp .env.example .env   # then fill in the values below
npm run dev
```

The server listens on port 3333 by default and serves GraphQL at `/graphql`. It exits at startup if it cannot fetch a remote schema, which happens when the Squidex app has no published schema.

## Configuration

Set these variables in `.env`:

| Variable | Description |
|---|---|
| `PORT` | Port the gateway listens on (3333 in the examples) |
| `FRONTEND_ORIGIN` | Origin allowed by CORS, normally the frontend URL |
| `CMS_URL` | Base URL of the Squidex host, without the `/squidex` suffix (the code appends it) |
| `CLIENT_ID` | Squidex client id in the form `app:client` |
| `CLIENT_SECRET` | Secret of that Squidex client |
| `APP_NAME` | Squidex app name |
| `API_KEY` | Optional API key |
| `NODE_TLS_REJECT_UNAUTHORIZED` | Set to `0` only to accept a self-signed Squidex certificate in internal environments |

Never commit real secrets. `.env` is for local and server configuration only.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Run with hot reload (tsx) |
| `npm run build` | Compile TypeScript and resolve path aliases |
| `npm start` | Run the compiled server from `build/` |

## Docker

The repository includes a `Dockerfile` and a `docker-compose.yml`. The compose file bind-mounts `./access.log`, so create that file before the first start, otherwise Docker creates a directory with that name and the app fails with `EISDIR`:

```bash
touch access.log
docker compose up -d
```

## Project structure

| Path | Purpose |
|---|---|
| `src/server.ts`, `src/app.ts` | Server bootstrap and Express app |
| `src/infrastructure/cms/` | Squidex authentication and remote schema stitching |
| `src/interfaces/` | GraphQL interfaces |
| `src/middleware/`, `src/lib/`, `src/utils/` | Middleware, shared libraries and helpers |
| `docs/Installation-guide.md` | Full guide for Squidex, nginx and squid-be on a new server (in Portuguese) |

## License

MIT
