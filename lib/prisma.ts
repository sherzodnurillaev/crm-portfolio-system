import { PrismaClient } from "@/app/generated/prisma";

const globalForPrisma = global as typeof globalThis & {
    prisma?: PrismaClient
}

export const prisma = globalForPrisma.prisma ?? 
    new PrismaClient({
        log: ["query"]
    })

if ( process.env.NODE_ENV !== "production" ) globalForPrisma.prisma = prisma
