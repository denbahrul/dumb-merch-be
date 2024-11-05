-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "paymentOrderId" TEXT,
ALTER COLUMN "transactionToken" DROP NOT NULL;
