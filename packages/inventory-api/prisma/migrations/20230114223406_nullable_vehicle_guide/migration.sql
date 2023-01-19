-- DropForeignKey
ALTER TABLE "MaintenanceGuide" DROP CONSTRAINT "MaintenanceGuide_vehicleId_fkey";

-- AlterTable
ALTER TABLE "MaintenanceGuide" ALTER COLUMN "vehicleId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "MaintenanceGuide" ADD CONSTRAINT "MaintenanceGuide_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
