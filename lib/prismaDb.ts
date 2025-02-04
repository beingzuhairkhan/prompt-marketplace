import { PrismaClient } from "@prisma/client";

// Initialize PrismaClient with logging enabled
const prisma = new PrismaClient();

// Ensure a single instance in development to avoid too many connections
if (process.env.NODE_ENV === "production") {
  global.prismadb = prisma;
} else {
  global.prismadb = global.prismadb || prisma;
}

export default prisma;
