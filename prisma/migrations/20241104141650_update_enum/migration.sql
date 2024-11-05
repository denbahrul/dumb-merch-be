/*
  Warnings:

  - The `status` column on the `transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "OrderStatusEnum" AS ENUM ('PENDING', 'DELIVER', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatusEnum" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "StatusEnum";
