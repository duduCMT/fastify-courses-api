## Technologies

- NodeJS
- Typescript
- Docker
- Fastify (API)
- PostgreSQL (Data Base)
- Drizzle (ORM)

## Support Tools

- REST Cliente (Extensão VS Code)

## Notes

### Initializing Typescrpt

```bash
npm install typescript @types/node -D
npx tsc --init
```

Using the [tsconfig/bases repository](https://github.com/tsconfig/bases), find the NodeJS version that corresponds to the projecto. In this case, [tsconfig Node 22](https://github.com/tsconfig/bases/blob/main/bases/node22.json).

## Run Docker with Postgres

To run with the terminal open

```bash
docker compose up 
```

To run with the terminal close

```bash
docker compose up -d
```

To see which Docker containers are running, simply use the command:

```bash
docker ps
```

To generete database files from drizzle, run:

```bash
npx drizzle-kit generate
```

To migrate database files, run:

```bash
npx drizzle-kit migrate
```

To use drizzle studio interface to manege database, run:

```bash
npx drizzle-kit studio
```