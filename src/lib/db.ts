import { PrismaClient } from "@prisma/client";
import { withOptimize } from "@prisma/extension-optimize";

// Định nghĩa loại PrismaClient mở rộng sau khi sử dụng withOptimize
const prismaClient = new PrismaClient().$extends(
  withOptimize({
    apiKey: process.env.OPTIMIZE_API_KEY!,
  })
);

// Đảm bảo kiểu của PrismaClient mở rộng đúng
type ExtendedPrismaClient = typeof prismaClient;

// Khai báo biến toàn cục để tái sử dụng PrismaClient trong môi trường phát triển
declare global {
  // eslint-disable-next-line no-var
  var prisma: ExtendedPrismaClient | undefined;
}

// Tạo hoặc tái sử dụng PrismaClient instance
const prisma: ExtendedPrismaClient = global.prisma || prismaClient;

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
