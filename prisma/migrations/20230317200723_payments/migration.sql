-- AlterTable
ALTER TABLE "User" ADD COLUMN     "boughtCredits" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "credits" INTEGER NOT NULL DEFAULT 5;

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "replicateId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "inputImage" TEXT NOT NULL,
    "outputImage" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_replicateId_userId_key" ON "Room"("replicateId", "userId");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
