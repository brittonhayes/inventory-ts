/*
  Warnings:

  - You are about to drop the `Fuel` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "FuelStorageType" AS ENUM ('TANK', 'CAN', 'OTHER');

-- AlterTable
ALTER TABLE "MaintenanceGuide" ADD COLUMN     "manual" TEXT;

-- DropTable
DROP TABLE "Fuel";

-- CreateTable
CREATE TABLE "FuelEvent" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "gallons" INTEGER DEFAULT 0,
    "category" "FuelType" DEFAULT 'DIESEL',

    CONSTRAINT "FuelEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FuelStorage" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "gallons" INTEGER DEFAULT 0,
    "storageType" "FuelStorageType" NOT NULL DEFAULT 'TANK',
    "category" "FuelType" DEFAULT 'DIESEL',

    CONSTRAINT "FuelStorage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MaintenanceGuideToVehiclePart" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MaintenanceGuideToVehiclePart_AB_unique" ON "_MaintenanceGuideToVehiclePart"("A", "B");

-- CreateIndex
CREATE INDEX "_MaintenanceGuideToVehiclePart_B_index" ON "_MaintenanceGuideToVehiclePart"("B");

-- AddForeignKey
ALTER TABLE "_MaintenanceGuideToVehiclePart" ADD CONSTRAINT "_MaintenanceGuideToVehiclePart_A_fkey" FOREIGN KEY ("A") REFERENCES "MaintenanceGuide"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MaintenanceGuideToVehiclePart" ADD CONSTRAINT "_MaintenanceGuideToVehiclePart_B_fkey" FOREIGN KEY ("B") REFERENCES "VehiclePart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
