/*
  Warnings:

  - You are about to drop the column `rucText` on the `Ruc` table. All the data in the column will be lost.
  - Added the required column `text` to the `Ruc` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ruc" DROP COLUMN "rucText",
ADD COLUMN     "text" TEXT NOT NULL;
