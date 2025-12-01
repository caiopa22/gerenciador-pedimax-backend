import { PrismaClient } from '@prisma/client';

// Garante uma única instância global do Prisma Client
let prisma;

if (!global.prisma) {
    global.prisma = new PrismaClient({
        log: ['query', 'error', 'warn'], // habilita logs úteis para debug
    });
}

prisma = global.prisma;

export default prisma;