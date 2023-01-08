/*
  Warnings:

  - You are about to drop the column `maintenanceGuideId` on the `MaintenanceTask` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MaintenanceTask" DROP CONSTRAINT "MaintenanceTask_assigneeId_fkey";

-- DropForeignKey
ALTER TABLE "MaintenanceTask" DROP CONSTRAINT "MaintenanceTask_maintenanceGuideId_fkey";

-- DropForeignKey
ALTER TABLE "MaintenanceTask" DROP CONSTRAINT "MaintenanceTask_vehicleId_fkey";

-- AlterTable
ALTER TABLE "MaintenanceTask" DROP COLUMN "maintenanceGuideId",
ADD COLUMN     "guideId" TEXT,
ALTER COLUMN "assigneeId" DROP NOT NULL,
ALTER COLUMN "vehicleId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "MaintenanceTask" ADD CONSTRAINT "MaintenanceTask_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceTask" ADD CONSTRAINT "MaintenanceTask_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceTask" ADD CONSTRAINT "MaintenanceTask_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "MaintenanceGuide"("id") ON DELETE SET NULL ON UPDATE CASCADE;
