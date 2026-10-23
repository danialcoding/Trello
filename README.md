# Trello

Trello is a Kanban application for signing in, organizing workspaces (boards), and moving tasks across columns. The browser client is a React single-page app. The API is a Go service that stores users, workspaces, membership roles, and tasks in PostgreSQL and issues JSON Web Tokens for authenticated routes.

## Architecture

The client calls the API over HTTP with JSON. Public routes handle registration and login. Other routes expect an `Authorization: Bearer <token>` header. Handlers depend on repository interfaces; the GORM implementations in `back/repository/gorm` perform the queries. On startup the API waits three seconds, opens PostgreSQL, and runs schema migration for users, workspace roles, workspaces, and tasks.

```mermaid
flowchart LR
  Browser["React 18 client"] -->|JSON over HTTP| Echo["Echo API :8080"]
  Echo --> JWT["JWT middleware"]
  Echo --> Handlers
  Handlers --> Repos["Repository interfaces"]
  Repos --> GORM["GORM repositories"]
  GORM --> PG[("PostgreSQL")]
```

Request logging, permissive CORS, Prometheus metrics, and Jaeger tracing are installed on the Echo instance. `GET /metrics` exposes the Prometheus handler. `GET /healthz` returns `204`. `GET /` returns the text `Hello, World!`.

## Frontend

The client lives in `front/` and is a Create React App project (`react-scripts` 5) on React 18. Routing is declared with React Router 6 in `front/src/pages/dashboard/routes.jsx`.

| Path | Screen |
| --- | --- |
| `/`, `/sign-in` | Sign-in form |
| `/sign-up` | Registration form |
| `/boards` | Board list |
| `/board/createboard` | Create a board |
| `/board/:boardId` | Board columns and task detail |
| `/board/team/:boardId` | Team table for a board |
| `/dashboard`, `/dashboard/profile` | Profile |
| `/dashboard/cards` | Card table |

Sign-in and sign-up are rendered without the shared header. Other routes render the header.

**Authentication.** The sign-up form posts `Username`, `Email`, and `Password` to `POST /auth/signup`. The sign-in form posts `username` and `password` to `POST /auth/login` and stores the returned token and the username in `localStorage`. The profile screen loads `GET /users/:username` and saves email and password changes with `PUT /users/:username`, sending the stored bearer token. Logout clears the stored token and returns to sign-in. `front/src/components/auth/getToken.js` reads the token from `localStorage`.

**Workspaces and boards.** The create-board screen loads `GET /users/` and posts `{ name, description }` to `POST /workspaces/`. The boards screen requests `GET /workspaces` and also renders a local sample list of boards. Opening a board navigates to `/board/:boardId`. The team screen renders a local sample member table with role labels and admin actions.

**Board columns and drag-and-drop.** A board has three columns: To Do, Doing, and Done. Cards move between columns with the browser drag-and-drop events (`dataTransfer`). Adding a card appends it to the selected column in component state. `react-beautiful-dnd` is declared in `front/package.json`. After column state changes, the board page posts `{ toDo, doing, done }` to `/api/updateBoard` with Axios.

**Task details.** Opening a card shows the edit dialog in `front/src/components/edittask/`. That dialog holds a title, description, due date, estimate, assignees, comments, an image, and a subtask checklist. Due date, estimate, assignee, comment, image upload, and subtask controls are separate components under `front/src/components/`. Those fields stay in component state.

**UI libraries.** The header uses React-Bootstrap (`Navbar`, `Nav`, `NavDropdown`, `Offcanvas`, `Container`) together with Bootstrap’s CSS and bundle. Material UI supplies the boards page menu (`Button`, `Menu`, `MenuItem`), icons on the boards and create-board screens, and the header icon button. Icons also come from `react-icons`. Tooltips use Tippy. The API base used by `fetch` calls is `http://localhost:8080`.

Available client scripts, from `front/`:

| Script | Effect |
| --- | --- |
| `npm start` | Development server on port 3000 |
| `npm test` | Jest through Create React App |
| `npm run build` | Production bundle in `front/build` |

## Backend

The API module is `github.com/raeinsoltani/gorello/back` (Go 1.22.2). It uses Echo v4, GORM with the Postgres driver, `golang.org/x/crypto/bcrypt` for passwords, and `github.com/golang-jwt/jwt` for tokens. `back/Dockerfile` builds a `golang:1.22.2` image, compiles the binary to `/gorello`, exposes port 8080, and runs that binary.

Passwords are hashed with bcrypt cost 14. Login compares the hash and, on success, returns a token signed with HMAC-SHA256. The token claim `username` is the account name and `exp` is 24 hours after issue. The signing key is the `JWT_SECRET` environment variable. Protected groups run `JWTAuthentication`, which requires `Authorization: Bearer <token>`, rejects an unexpected signing method, and stores the username on the request context.

Workspace membership is a `UserWorkspaceRole` row (`user_id`, `workspace_id`, `role`). Creating a workspace also stores role `1` for the caller. Listing and reading workspaces return only workspaces linked to the caller. Deleting a workspace checks that some role row for that workspace has role `1`.

`models.SubTask` defines a subtask record. Startup migration covers `User`, `UserWorkspaceRole`, `Workspace`, and `Task`.

### HTTP API

All routes except `/`, `/healthz`, `/metrics`, `/auth/signup`, and `/auth/login` require a bearer token.

| Method | Path | Behavior |
| --- | --- | --- |
| `POST` | `/auth/signup` | Register. Body: `username` (alphanumeric, 3–25), `email`, `password` (at least 8). `201` with the stored user, or `400` if the username is taken. |
| `POST` | `/auth/login` | Body: `username`, `password`. `200` with `{ "token": "<jwt>" }`, or `401` for a mismatch. |
| `GET` | `/users/` | Usernames and emails of every user. |
| `GET` | `/users/search?keyword=` | Users matching `keyword` in username or email. |
| `GET` | `/users/:username` | The user record when the token subject is that username. |
| `PUT` | `/users/:username` | Body: `email`, optional `password`. Updates the signed-in user. |
| `DELETE` | `/users/:username` | Deletes the signed-in user. `204` on success. |
| `GET` | `/workspaces/` | Workspaces linked to the caller. |
| `POST` | `/workspaces/` | Body: `name`, `description`. Creates the workspace and a role row. `201`. |
| `GET` | `/workspaces/:workspaceId` | Workspace when the caller is a member. |
| `PUT` | `/workspaces/:workspaceId` | Body: `name`, `description`. Updates non-empty fields. |
| `DELETE` | `/workspaces/:workspaceId` | Deletes the workspace when a role `1` membership exists. |
| `GET` | `/workspaces/:workspaceId/tasks/` | Tasks for that workspace. |
| `POST` | `/workspaces/:workspaceId/tasks/` | Creates a task. JSON fields: `name`, `description`, `status`, `estimated_time`, `actual_time`, `due_date`, `priority`, `assignee_id`, `workspace_id`, `image_url`. `workspace_id` is taken from the path. |
| `GET` | `/workspaces/:workspaceId/tasks/:taskId` | One task by id. |
| `PUT` | `/workspaces/:workspaceId/tasks/:taskId` | Updates title, description, status, estimated time, actual time, priority, and image URL from the same JSON shape. |
| `DELETE` | `/workspaces/:workspaceId/tasks/:taskId` | Deletes the task. |

Task `name` is stored as `Title`. Status and priority are integers. Estimated time, actual time, and due date are strings.

## Configuration

The API reads configuration from the process environment. Copy `.env.example` to `.env` for local values. `.env` is gitignored. The process needs the variables in its environment (`set -a && source .env && set +a` in bash works). An empty value or a missing variable stops the process: `JWT_SECRET` is required when the auth package loads, and `DATABASE_URL` is required when the database initializes.

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL URL passed to GORM, for example `postgres://postgres:password@127.0.0.1:5432/test`. Percent-encode reserved characters in the user or password (`@` is `%40`). |
| `JWT_SECRET` | Yes | HMAC-SHA256 key for signing and verifying login tokens. |

The previous local URL used user `postgres`, host `127.0.0.1`, port `5432`, and database name `test`. Supply that shape in `DATABASE_URL`, with the password for that database, to keep the same connection target. The Docker image does not embed these values; pass them at runtime. Inside a container, `127.0.0.1` is the container itself, so point `DATABASE_URL` at a host the container can reach.

The client has no environment configuration. Its `fetch` calls use `http://localhost:8080`.

## Setup

### Prerequisites

- Go 1.22.2
- Node.js and npm
- PostgreSQL, with a database the `DATABASE_URL` user can migrate

### API

From the repository root:

```bash
cp .env.example .env
# Set DATABASE_URL and JWT_SECRET in .env

set -a
source .env
set +a

cd back
go run .
```

The process listens on `:8080`. The same variables are required for `go test` runs that load `back/utils`.

Container image, built with `back/` as the context:

```bash
docker build -t gorello ./back
docker run --rm -p 8080:8080 \
  -e DATABASE_URL="postgres://postgres:password@host:5432/test" \
  -e JWT_SECRET="change-me" \
  gorello
```

### Client

```bash
cd front
npm install
npm start
```

The development server is at `http://localhost:3000`. Start the API first so sign-in, profile, user listing, and workspace creation can reach port 8080.

## Project structure

```
.
├── .env.example          Environment template (no real secrets)
├── .gitignore
├── README.md
├── back/
│   ├── Dockerfile        API image, binary /gorello, port 8080
│   ├── main.go           Echo routes, middleware, startup
│   ├── go.mod
│   ├── db/               PostgreSQL connection and AutoMigrate
│   ├── handlers/         User, workspace, and task HTTP handlers
│   ├── middleware/       Bearer JWT authentication
│   ├── models/           User, Workspace, Task, UserWorkspaceRole, SubTask
│   ├── repository/       Repository interfaces
│   │   └── gorm/         GORM implementations
│   └── utils/            Password hashing and JWT sign/parse
└── front/
    ├── package.json
    ├── public/
    └── src/
        ├── App.js
        ├── components/   Header, task editor, due date, estimate, assignee,
        │                 comments, image upload, subtasks, auth token helper
        └── pages/        Sign-in, sign-up, boards, board, team, create board,
                          dashboard, profile, cards
```
