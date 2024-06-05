/*
  Warnings:

  - A unique constraint covering the columns `[progressId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "progressId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_progressId_key" ON "User"("progressId");
