/*
  Warnings:

  - The values [VEHICLE,IMPLEMENT] on the enum `VehicleType` will be removed. If these variants are still used in the database, this will fail.
  - The `power` column on the `Vehicle` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PowerType" AS ENUM ('GAS', 'DIESEL', 'ELECTRIC', 'HYBRID');

-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('DIESEL', 'GAS');

-- AlterEnum
BEGIN;
CREATE TYPE "VehicleType_new" AS ENUM ('TRACTOR', 'SPRAYER', 'HARVESTER', 'COMBINE', 'TRUCK', 'TRAILER', 'OTHER');
ALTER TABLE "Vehicle" ALTER COLUMN "vehicleType" DROP DEFAULT;
ALTER TABLE "Vehicle" ALTER COLUMN "vehicleType" TYPE "VehicleType_new" USING ("vehicleType"::text::"VehicleType_new");
ALTER TYPE "VehicleType" RENAME TO "VehicleType_old";
ALTER TYPE "VehicleType_new" RENAME TO "VehicleType";
DROP TYPE "VehicleType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "VehiclePart" DROP CONSTRAINT "VehiclePart_vehicleId_fkey";

-- AlterTable
ALTER TABLE "Vehicle" ALTER COLUMN "vehicleType" DROP DEFAULT,
DROP COLUMN "power",
ADD COLUMN     "power" "PowerType" DEFAULT 'GAS';

-- AlterTable
ALTER TABLE "VehiclePart" ALTER COLUMN "vehicleId" DROP NOT NULL;

-- DropEnum
DROP TYPE "Power";

-- CreateTable
CREATE TABLE "Fuel" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "storage" TEXT,
    "gallons" INTEGER DEFAULT 0,
    "category" "FuelType" DEFAULT 'DIESEL',

    CONSTRAINT "Fuel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VehiclePart" ADD CONSTRAINT "VehiclePart_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
