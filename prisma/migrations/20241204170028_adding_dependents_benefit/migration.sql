/*
  Warnings:

  - A unique constraint covering the columns `[dependentBenefitId]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dependentBenefitId` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "dependentBenefitId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "DependentsBenefit" (
    "id" SERIAL NOT NULL,
    "text" INTEGER NOT NULL,
    "state" BOOLEAN NOT NULL,

    CONSTRAINT "DependentsBenefit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_dependentBenefitId_key" ON "Organization"("dependentBenefitId");

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_dependentBenefitId_fkey" FOREIGN KEY ("dependentBenefitId") REFERENCES "DependentsBenefit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
