import { PrismaClient } from '@prisma/client';

// Singleton do Prisma Client
let prisma;

if (!global.prisma) {
    global.prisma = new PrismaClient({
        log: ['query', 'error', 'warn'],
    });
}
prisma = global.prisma;

export default prisma;