/*
  Warnings:

  - You are about to drop the column `maintenanceGuideId` on the `MaintenanceTask` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MaintenanceTask" DROP CONSTRAINT "MaintenanceTask_maintenanceGuideId_fkey";

-- AlterTable
ALTER TABLE "MaintenanceTask" DROP COLUMN "maintenanceGuideId",
ADD COLUMN     "guideId" TEXT,
ALTER COLUMN "dueDate" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "MaintenanceTask" ADD CONSTRAINT "MaintenanceTask_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "MaintenanceGuide"("id") ON DELETE SET NULL ON UPDATE CASCADE;
