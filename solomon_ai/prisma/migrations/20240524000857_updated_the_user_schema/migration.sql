/*
  Warnings:

  - You are about to drop the column `birthday` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `lifePathNumber` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `religion` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `zodiacSign` on the `Conversation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "birthday",
DROP COLUMN "lifePathNumber",
DROP COLUMN "religion",
DROP COLUMN "zodiacSign";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birthday" TIMESTAMP(3),
ADD COLUMN     "lifePathNumber" INTEGER,
ADD COLUMN     "religion" TEXT,
ADD COLUMN     "zodiacSign" TEXT;
