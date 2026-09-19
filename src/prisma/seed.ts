import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';
import { profile } from './seed-data.js';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

// Данные визитки статичны и живут в seed-data.ts, поэтому база при каждом
// запуске пересобирается целиком, а не дописывается: так в ней не остаётся
// ничего, чего нет в файле.
try {
  await prisma.$transaction([
    prisma.profile.deleteMany(),
    prisma.profile.create({ data: profile }),
  ]);
} finally {
  await prisma.$disconnect();
}
