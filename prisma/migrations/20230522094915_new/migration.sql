/*
  Warnings:

  - Added the required column `paymentAmount` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN "paymentAmount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN "plan" TEXT NOT NULL DEFAULT 'basic';