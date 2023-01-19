/*
  Warnings:

  - You are about to drop the column `owned` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `FuelEvent` table. All the data in the column will be lost.
  - You are about to drop the column `owned` on the `Implement` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Implement` table. All the data in the column will be lost.
  - You are about to drop the column `guideId` on the `MaintenanceTask` table. All the data in the column will be lost.
  - You are about to drop the column `machineHours` on the `MaintenanceTask` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleId` on the `MaintenanceTask` table. All the data in the column will be lost.
  - You are about to drop the column `condition` on the `Tool` table. All the data in the column will be lost.
  - You are about to drop the column `vin` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `condition` on the `VehiclePart` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `VehiclePart` table. All the data in the column will be lost.
  - You are about to drop the column `hours` on the `VehiclePart` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `VehiclePart` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `VehiclePart` table. All the data in the column will be lost.
  - Added the required column `make` to the `Implement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Implement` table without a default value. This is not possible if the table is not empty.
  - Made the column `vehicleId` on table `MaintenanceGuide` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updated_at` to the `VehiclePart` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FuelEventAction" AS ENUM ('FILL', 'DRAIN');

-- DropForeignKey
ALTER TABLE "MaintenanceGuide" DROP CONSTRAINT "MaintenanceGuide_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "MaintenanceTask" DROP CONSTRAINT "MaintenanceTask_guideId_fkey";

-- DropForeignKey
ALTER TABLE "MaintenanceTask" DROP CONSTRAINT "MaintenanceTask_vehicleId_fkey";

-- DropIndex
DROP INDEX "Vehicle_vin_key";

-- AlterTable
ALTER TABLE "Attachment" DROP COLUMN "owned",
ADD COLUMN     "isOwned" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "FuelEvent" DROP COLUMN "type",
ADD COLUMN     "action" "FuelEventAction" NOT NULL DEFAULT 'FILL';

-- AlterTable
ALTER TABLE "Implement" DROP COLUMN "owned",
DROP COLUMN "type",
ADD COLUMN     "implementType" "ImplementType",
ADD COLUMN     "isOwned" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "make" TEXT NOT NULL,
ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "year" INTEGER;

-- AlterTable
ALTER TABLE "MaintenanceGuide" ADD COLUMN     "machineHours" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "vehicleId" SET NOT NULL;

-- AlterTable
ALTER TABLE "MaintenanceTask" DROP COLUMN "guideId",
DROP COLUMN "machineHours",
DROP COLUMN "vehicleId",
ADD COLUMN     "maintenanceGuideId" TEXT;

-- AlterTable
ALTER TABLE "Tool" DROP COLUMN "condition";

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "vin",
ADD COLUMN     "isOwned" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "vehicleType" DROP NOT NULL;

-- AlterTable
ALTER TABLE "VehiclePart" DROP COLUMN "condition",
DROP COLUMN "createdAt",
DROP COLUMN "hours",
DROP COLUMN "notes",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropEnum
DROP TYPE "FuelEventType";

-- AddForeignKey
ALTER TABLE "MaintenanceGuide" ADD CONSTRAINT "MaintenanceGuide_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceTask" ADD CONSTRAINT "MaintenanceTask_maintenanceGuideId_fkey" FOREIGN KEY ("maintenanceGuideId") REFERENCES "MaintenanceGuide"("id") ON DELETE SET NULL ON UPDATE CASCADE;
