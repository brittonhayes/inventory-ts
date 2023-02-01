/*
  Warnings:

  - You are about to drop the column `guideId` on the `MaintenanceTask` table. All the data in the column will be lost.
  - You are about to drop the `MaintenanceGuide` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MaintenanceGuide" DROP CONSTRAINT "MaintenanceGuide_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "MaintenanceTask" DROP CONSTRAINT "MaintenanceTask_guideId_fkey";

-- AlterTable
ALTER TABLE "MaintenanceTask" DROP COLUMN "guideId";

-- DropTable
DROP TABLE "MaintenanceGuide";

-- CreateTable
CREATE TABLE "Guide" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Guide_pkey" PRIMARY KEY ("id")
);
