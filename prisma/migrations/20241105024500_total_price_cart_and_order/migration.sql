-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "totalPrice" DECIMAL(65,30) NOT NULL DEFAULT 0.0;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "totalPrice" DECIMAL(65,30) NOT NULL DEFAULT 0.0;

-- AlterTable
ALTER TABLE "cart" ADD COLUMN     "totalPrice" DECIMAL(65,30) NOT NULL DEFAULT 0.0;
