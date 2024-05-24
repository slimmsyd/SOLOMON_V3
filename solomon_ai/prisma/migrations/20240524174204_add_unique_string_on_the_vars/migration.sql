/*
  Warnings:

  - The primary key for the `UserConversations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[authorId]` on the table `Messages` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `UserConversations` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `authorId` on the `Messages` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `UserConversations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `UserProgress` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Messages" DROP COLUMN "authorId",
ADD COLUMN     "authorId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "UserConversations" DROP CONSTRAINT "UserConversations_pkey",
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
ADD CONSTRAINT "UserConversations_pkey" PRIMARY KEY ("userId", "conversationId");

-- AlterTable
ALTER TABLE "UserProgress" DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Messages_authorId_key" ON "Messages"("authorId");

-- CreateIndex
CREATE INDEX "idx_messages_author_id" ON "Messages"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "UserConversations_userId_key" ON "UserConversations"("userId");

-- CreateIndex
CREATE INDEX "idx_user_conversations_user_id" ON "UserConversations"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProgress_userId_key" ON "UserProgress"("userId");
