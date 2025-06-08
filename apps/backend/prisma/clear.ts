import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearDB() {
  await prisma.comment.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.personality.deleteMany({});
  console.log('Database cleared!');
}

clearDB()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
