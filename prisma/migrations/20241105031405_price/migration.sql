-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "totalPrice" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "totalPrice" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "cart" ALTER COLUMN "totalPrice" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "product" ALTER COLUMN "price" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "transaction" ALTER COLUMN "totalPrice" SET DEFAULT 0;
