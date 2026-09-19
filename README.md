# Цифровая визитка

GraphQL API с профилем, навыками, опытом работы и проектами.
NestJS 12, Prisma 7, PostgreSQL 18, Apollo Server 5, TypeScript, Docker.

## Запуск

```bash
docker compose up --build
```

Контейнер приложения при старте применяет миграции, заполняет базу и поднимает
сервер. Apollo Sandbox: http://localhost:3000/graphql, пример запроса уже
подставлен в редактор.

## Схема

```graphql
type Query {
  profile: Profile!
}

type Profile {
  id: ID!
  name: String!
  title: String!
  description: String!
  email: String!
  links: [Link!]!
  skills: [Skill!]!
  experience: [Experience!]!
  projects: [Project!]!
}

type Link {
  id: ID!
  label: String!
  url: String!
}

type Skill {
  id: ID!
  name: String!
  category: String!
}

type Experience {
  id: ID!
  company: String!
  position: String!
  startDate: DateTime!
  endDate: DateTime
  achievements: [String!]!
}

type Project {
  id: ID!
  name: String!
  description: String!
  url: String!
}
```

Пример:

```graphql
query {
  profile {
    name
    description
    skills { name }
    experience { company position }
    projects { name }
  }
}
```

## Устройство

```
prisma/schema.prisma            модели и связи
prisma/migrations               миграции
src/prisma/prisma.service.ts    PrismaClient как провайдер Nest
src/prisma/seed.ts              заполнение базы, данные в seed-data.ts
src/profile/models              типы GraphQL
src/profile/profile.service.ts  запросы к базе
src/profile/profile.resolver.ts запрос profile и вложенные поля
```

Профиль один, `Query.profile` без аргументов. Вложенные списки резолвятся
отдельными полями через `@ResolveField`: запрос `{ profile { name } }` не
читает остальные таблицы, полный запрос даёт пять коротких выборок по индексу
`profileId`. Типы GraphQL описаны отдельно от моделей Prisma, поэтому в API
нет `profileId` и других деталей хранения.

Seed пересобирает профиль целиком в одной транзакции (`deleteMany` и `create`
с вложенными записями): после перезапусков в базе ровно то, что в
`seed-data.ts`. `endDate = null` у места работы значит текущее.

## Локальная разработка

```bash
docker compose up -d db
cp .env.example .env
npm install
npx prisma migrate dev
npx prisma db seed
npm run start:dev
```

Тесты ходят в ту же базу: `npm test`.
