/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Item_id_userId_key" ON "Item"("id", "userId");
