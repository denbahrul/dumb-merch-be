/*
  Warnings:

  - You are about to drop the column `paymentOrderId` on the `transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "paymentOrderId",
ADD COLUMN     "OrderId" TEXT;
