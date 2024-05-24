/*
  Warnings:

  - The primary key for the `UserConversations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `conversationId` on the `UserConversations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "UserConversations_userId_key";

-- AlterTable
ALTER TABLE "UserConversations" DROP CONSTRAINT "UserConversations_pkey",
DROP COLUMN "conversationId",
ADD COLUMN     "conversationId" UUID NOT NULL,
ADD CONSTRAINT "UserConversations_pkey" PRIMARY KEY ("userId", "conversationId");

-- CreateIndex
CREATE INDEX "idx_user_conversations_conversation_id" ON "UserConversations"("conversationId");
