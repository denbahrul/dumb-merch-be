-- DropIndex
DROP INDEX "transaction_userId_key";

-- AlterTable
ALTER TABLE "transaction" ALTER COLUMN "status" SET DEFAULT 'PENDING';
