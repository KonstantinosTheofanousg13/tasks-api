# tasks-api

A small REST API for managing tasks, built with NestJS and TypeScript.

I built this while moving from Java/Spring backend development to the Node.js ecosystem. It is intentionally simple (in-memory storage) so the focus stays on NestJS fundamentals: modules, controllers, services, dependency injection and request validation.

## Tech stack

- NestJS 11
- TypeScript
- class-validator + class-transformer for input validation

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run start:dev
```

The API runs on `http://localhost:3000` (override with the `PORT` environment variable).

## Endpoints

- `GET /tasks` — list all tasks
- `GET /tasks/:id` — get one task (404 if it does not exist)
- `POST /tasks` — create a task
- `PATCH /tasks/:id` — update a task's `done` status
- `DELETE /tasks/:id` — delete a task (204 No Content)

Example request:

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn NestJS", "description": "Build a CRUD API"}'
```

```json
{
  "id": "dc3460dd-3adc-418b-8ad1-1ef93de5ee41",
  "title": "Learn NestJS",
  "description": "Build a CRUD API",
  "done": false
}
```

## Validation

Request bodies are validated with DTO classes and a global `ValidationPipe` (`whitelist` + `forbidNonWhitelisted`). Invalid or unexpected input is rejected with `400 Bad Request` before it reaches the service layer.

Missing title:

```json
// POST /tasks  {}
{
  "message": ["title must be a string", "title should not be empty"],
  "error": "Bad Request",
  "statusCode": 400
}
```

Unknown field:

```json
// POST /tasks  {"title": "Buy milk", "isAdmin": true}
{
  "message": ["property isAdmin should not exist"],
  "error": "Bad Request",
  "statusCode": 400
}
```

## Roadmap

- [x] In-memory CRUD
- [x] DTO validation for task creation
- [ ] DTO validation for updates (PATCH)
- [ ] Unit tests with Jest
- [ ] GitHub Actions CI
- [ ] Docker
- [ ] PostgreSQL persistence with Prisma
