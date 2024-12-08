/*
  Warnings:

  - You are about to drop the column `organizationId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `Coordinates` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `Email` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `Motive` table. All the data in the column will be lost.
  - You are about to drop the column `nameOrganizationId` on the `NameOrganization` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `NumPreRegister` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `Phone` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `Purpose` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `Representative` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `Ruc` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nameOrganizationId]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rucId]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emailId]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneId]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[motiveId]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[purposeId]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[numRegisterId]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[addressId]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[coordinatesId]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[representativeId]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `addressId` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coordinatesId` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailId` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motiveId` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameOrganizationId` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numRegisterId` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneId` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purposeId` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `representativeId` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rucId` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `stateRegistration` on the `Organization` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "StateRegistration" AS ENUM ('PENDING', 'REVIEW', 'APPROVED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Coordinates" DROP CONSTRAINT "Coordinates_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Email" DROP CONSTRAINT "Email_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Motive" DROP CONSTRAINT "Motive_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "NameOrganization" DROP CONSTRAINT "NameOrganization_nameOrganizationId_fkey";

-- DropForeignKey
ALTER TABLE "NumPreRegister" DROP CONSTRAINT "NumPreRegister_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Phone" DROP CONSTRAINT "Phone_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Purpose" DROP CONSTRAINT "Purpose_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Representative" DROP CONSTRAINT "Representative_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Ruc" DROP CONSTRAINT "Ruc_organizationId_fkey";

-- DropIndex
DROP INDEX "Address_id_organizationId_key";

-- DropIndex
DROP INDEX "Address_organizationId_key";

-- DropIndex
DROP INDEX "Coordinates_id_organizationId_key";

-- DropIndex
DROP INDEX "Coordinates_organizationId_key";

-- DropIndex
DROP INDEX "Email_id_organizationId_key";

-- DropIndex
DROP INDEX "Email_organizationId_key";

-- DropIndex
DROP INDEX "Motive_id_organizationId_key";

-- DropIndex
DROP INDEX "Motive_organizationId_key";

-- DropIndex
DROP INDEX "NameOrganization_id_nameOrganizationId_key";

-- DropIndex
DROP INDEX "NameOrganization_nameOrganizationId_key";

-- DropIndex
DROP INDEX "NumPreRegister_id_organizationId_key";

-- DropIndex
DROP INDEX "NumPreRegister_organizationId_key";

-- DropIndex
DROP INDEX "Phone_id_organizationId_key";

-- DropIndex
DROP INDEX "Phone_organizationId_key";

-- DropIndex
DROP INDEX "Purpose_id_organizationId_key";

-- DropIndex
DROP INDEX "Purpose_organizationId_key";

-- DropIndex
DROP INDEX "Representative_id_organizationId_key";

-- DropIndex
DROP INDEX "Representative_organizationId_key";

-- DropIndex
DROP INDEX "Ruc_id_organizationId_key";

-- DropIndex
DROP INDEX "Ruc_organizationId_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "organizationId";

-- AlterTable
ALTER TABLE "Coordinates" DROP COLUMN "organizationId";

-- AlterTable
ALTER TABLE "Email" DROP COLUMN "organizationId";

-- AlterTable
ALTER TABLE "Motive" DROP COLUMN "organizationId";

-- AlterTable
ALTER TABLE "NameOrganization" DROP COLUMN "nameOrganizationId";

-- AlterTable
ALTER TABLE "NumPreRegister" DROP COLUMN "organizationId";

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "addressId" INTEGER NOT NULL,
ADD COLUMN     "coordinatesId" INTEGER NOT NULL,
ADD COLUMN     "emailId" INTEGER NOT NULL,
ADD COLUMN     "motiveId" INTEGER NOT NULL,
ADD COLUMN     "nameOrganizationId" INTEGER NOT NULL,
ADD COLUMN     "numRegisterId" INTEGER NOT NULL,
ADD COLUMN     "phoneId" INTEGER NOT NULL,
ADD COLUMN     "purposeId" INTEGER NOT NULL,
ADD COLUMN     "representativeId" INTEGER NOT NULL,
ADD COLUMN     "rucId" INTEGER NOT NULL,
DROP COLUMN "stateRegistration",
ADD COLUMN     "stateRegistration" "StateRegistration" NOT NULL;

-- AlterTable
ALTER TABLE "Phone" DROP COLUMN "organizationId";

-- AlterTable
ALTER TABLE "Purpose" DROP COLUMN "organizationId";

-- AlterTable
ALTER TABLE "Representative" DROP COLUMN "organizationId";

-- AlterTable
ALTER TABLE "Ruc" DROP COLUMN "organizationId";

-- DropEnum
DROP TYPE "stateRegistration";

-- CreateIndex
CREATE UNIQUE INDEX "Organization_nameOrganizationId_key" ON "Organization"("nameOrganizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_rucId_key" ON "Organization"("rucId");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_emailId_key" ON "Organization"("emailId");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_phoneId_key" ON "Organization"("phoneId");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_motiveId_key" ON "Organization"("motiveId");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_purposeId_key" ON "Organization"("purposeId");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_numRegisterId_key" ON "Organization"("numRegisterId");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_addressId_key" ON "Organization"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_coordinatesId_key" ON "Organization"("coordinatesId");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_representativeId_key" ON "Organization"("representativeId");

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_nameOrganizationId_fkey" FOREIGN KEY ("nameOrganizationId") REFERENCES "NameOrganization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_rucId_fkey" FOREIGN KEY ("rucId") REFERENCES "Ruc"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_phoneId_fkey" FOREIGN KEY ("phoneId") REFERENCES "Phone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "Email"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_purposeId_fkey" FOREIGN KEY ("purposeId") REFERENCES "Purpose"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_motiveId_fkey" FOREIGN KEY ("motiveId") REFERENCES "Motive"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_numRegisterId_fkey" FOREIGN KEY ("numRegisterId") REFERENCES "NumPreRegister"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_coordinatesId_fkey" FOREIGN KEY ("coordinatesId") REFERENCES "Coordinates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_representativeId_fkey" FOREIGN KEY ("representativeId") REFERENCES "Representative"("id") ON DELETE CASCADE ON UPDATE CASCADE;
