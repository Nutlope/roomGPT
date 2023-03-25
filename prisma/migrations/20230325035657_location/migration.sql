/*
  Warnings:

  - You are about to drop the column `boughtCredits` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "boughtCredits",
ADD COLUMN     "location" TEXT;
