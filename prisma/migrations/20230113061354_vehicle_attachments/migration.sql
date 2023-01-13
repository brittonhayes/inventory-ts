/*
  Warnings:

  - The values [HARVESTER,TRAILER] on the enum `VehicleType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `vehicleId` on the `VehiclePart` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ImplementType" AS ENUM ('SPRAYER', 'HARROW', 'DRILL', 'MOWER', 'CULTIVATOR', 'CHISEL', 'RODWEEDER', 'TRAILER', 'OTHER');

-- AlterEnum
BEGIN;
CREATE TYPE "VehicleType_new" AS ENUM ('TRACTOR', 'SPRAYER', 'COMBINE', 'TRUCK', 'ATV', 'UTV', 'SEMITRUCK', 'OTHER');
ALTER TABLE "Vehicle" ALTER COLUMN "vehicleType" TYPE "VehicleType_new" USING ("vehicleType"::text::"VehicleType_new");
ALTER TYPE "VehicleType" RENAME TO "VehicleType_old";
ALTER TYPE "VehicleType_new" RENAME TO "VehicleType";
DROP TYPE "VehicleType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "VehiclePart" DROP CONSTRAINT "VehiclePart_vehicleId_fkey";

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "implementId" TEXT;

-- AlterTable
ALTER TABLE "VehiclePart" DROP COLUMN "vehicleId";

-- CreateTable
CREATE TABLE "Attachment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "implementId" TEXT,
    "vehicleId" TEXT,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Implement" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Implement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_VehicleToVehiclePart" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_VehicleToVehiclePart_AB_unique" ON "_VehicleToVehiclePart"("A", "B");

-- CreateIndex
CREATE INDEX "_VehicleToVehiclePart_B_index" ON "_VehicleToVehiclePart"("B");

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_implementId_fkey" FOREIGN KEY ("implementId") REFERENCES "Implement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_implementId_fkey" FOREIGN KEY ("implementId") REFERENCES "Implement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VehicleToVehiclePart" ADD CONSTRAINT "_VehicleToVehiclePart_A_fkey" FOREIGN KEY ("A") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VehicleToVehiclePart" ADD CONSTRAINT "_VehicleToVehiclePart_B_fkey" FOREIGN KEY ("B") REFERENCES "VehiclePart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
