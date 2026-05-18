# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Docker

This project includes Docker setup for the React/Vite frontend plus the separate
Spring Boot backend repo and Postgres database.

Expected folder layout:

```text
Desktop/
  trip-planner-frontend/
  planner-backend/
```

Run the full app stack from this frontend repo:

```bash
docker compose up --build
```

Then open:

```text
http://localhost:3000
```

Services:

- Frontend: http://localhost:3000
- Backend: http://localhost:8080
- Postgres: localhost:5432

The backend repo is mounted from `../planner-backend` and started with Maven
using Java 17. The Maven dependency cache is stored in a Docker volume so future
starts are faster.

Postgres uses a persistent Docker volume named `postgres-data`. The database
settings match the backend app except that Docker uses the service name `db`
instead of `localhost`:

```properties
spring.datasource.url=jdbc:postgresql://db:5432/trip_planner
spring.datasource.username=mengwensu
spring.datasource.password=trip_planner_password
```

Stop the stack:

```bash
docker compose down
```

Stop the stack and delete persisted database data:

```bash
docker compose down -v
```

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
