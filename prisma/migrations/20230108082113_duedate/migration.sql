/*
  Warnings:

  - You are about to drop the column `date` on the `MaintenanceTask` table. All the data in the column will be lost.
  - You are about to drop the column `enabled` on the `MaintenanceTask` table. All the data in the column will be lost.
  - Added the required column `dueDate` to the `MaintenanceTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MaintenanceTask" DROP COLUMN "date",
DROP COLUMN "enabled",
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "VehiclePart" ALTER COLUMN "condition" DROP NOT NULL;
