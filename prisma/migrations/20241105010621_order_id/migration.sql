/*
  Warnings:

  - You are about to drop the column `OrderId` on the `transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "OrderId",
ADD COLUMN     "orderId" TEXT;
