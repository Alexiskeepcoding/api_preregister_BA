-- CreateEnum
CREATE TYPE "stateRegistration" AS ENUM ('PENDING', 'REVIEW', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "stateRegistration" "stateRegistration" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NameOrganization" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,
    "nameOrganizationId" INTEGER NOT NULL,

    CONSTRAINT "NameOrganization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ruc" (
    "id" SERIAL NOT NULL,
    "rucText" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "Ruc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phone" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "Phone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Email" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purpose" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "Purpose_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Motive" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "Motive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NumPreRegister" (
    "id" SERIAL NOT NULL,
    "text" INTEGER NOT NULL,
    "state" BOOLEAN NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "NumPreRegister_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Street" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "Street_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Neighborhood" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "Neighborhood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Province" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coordinates" (
    "id" SERIAL NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "Coordinates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Representative" (
    "id" SERIAL NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "Representative_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Name" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "Name_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NumDoc" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "NumDoc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailRepresentative" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "EmailRepresentative_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhoneRepresentative" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "PhoneRepresentative_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NameOrganization_nameOrganizationId_key" ON "NameOrganization"("nameOrganizationId");

-- CreateIndex
CREATE UNIQUE INDEX "NameOrganization_id_nameOrganizationId_key" ON "NameOrganization"("id", "nameOrganizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Ruc_organizationId_key" ON "Ruc"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Ruc_id_organizationId_key" ON "Ruc"("id", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Phone_organizationId_key" ON "Phone"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Phone_id_organizationId_key" ON "Phone"("id", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Email_organizationId_key" ON "Email"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Email_id_organizationId_key" ON "Email"("id", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Purpose_organizationId_key" ON "Purpose"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Purpose_id_organizationId_key" ON "Purpose"("id", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Motive_organizationId_key" ON "Motive"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Motive_id_organizationId_key" ON "Motive"("id", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "NumPreRegister_organizationId_key" ON "NumPreRegister"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "NumPreRegister_id_organizationId_key" ON "NumPreRegister"("id", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_organizationId_key" ON "Address"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_id_organizationId_key" ON "Address"("id", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Street_organizationId_key" ON "Street"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Street_id_organizationId_key" ON "Street"("id", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "City_organizationId_key" ON "City"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "City_id_organizationId_key" ON "City"("id", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Neighborhood_organizationId_key" ON "Neighborhood"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Neighborhood_id_organizationId_key" ON "Neighborhood"("id", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Province_organizationId_key" ON "Province"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Province_id_organizationId_key" ON "Province"("id", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Country_organizationId_key" ON "Country"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Country_id_organizationId_key" ON "Country"("id", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Coordinates_organizationId_key" ON "Coordinates"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Coordinates_id_organizationId_key" ON "Coordinates"("id", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Representative_organizationId_key" ON "Representative"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Representative_id_organizationId_key" ON "Representative"("id", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Name_organizationId_key" ON "Name"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Name_id_organizationId_key" ON "Name"("id", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "NumDoc_organizationId_key" ON "NumDoc"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "NumDoc_id_organizationId_key" ON "NumDoc"("id", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_organizationId_key" ON "Role"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_id_organizationId_key" ON "Role"("id", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "EmailRepresentative_organizationId_key" ON "EmailRepresentative"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "EmailRepresentative_id_organizationId_key" ON "EmailRepresentative"("id", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "PhoneRepresentative_organizationId_key" ON "PhoneRepresentative"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "PhoneRepresentative_id_organizationId_key" ON "PhoneRepresentative"("id", "organizationId");

-- AddForeignKey
ALTER TABLE "NameOrganization" ADD CONSTRAINT "NameOrganization_nameOrganizationId_fkey" FOREIGN KEY ("nameOrganizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ruc" ADD CONSTRAINT "Ruc_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purpose" ADD CONSTRAINT "Purpose_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motive" ADD CONSTRAINT "Motive_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NumPreRegister" ADD CONSTRAINT "NumPreRegister_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Street" ADD CONSTRAINT "Street_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Neighborhood" ADD CONSTRAINT "Neighborhood_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Province" ADD CONSTRAINT "Province_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Country" ADD CONSTRAINT "Country_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coordinates" ADD CONSTRAINT "Coordinates_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Representative" ADD CONSTRAINT "Representative_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Name" ADD CONSTRAINT "Name_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Representative"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NumDoc" ADD CONSTRAINT "NumDoc_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Representative"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Representative"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailRepresentative" ADD CONSTRAINT "EmailRepresentative_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Representative"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhoneRepresentative" ADD CONSTRAINT "PhoneRepresentative_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Representative"("id") ON DELETE CASCADE ON UPDATE CASCADE;
