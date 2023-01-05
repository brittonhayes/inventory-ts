/*
  Warnings:

  - You are about to drop the column `locationName` on the `Equipment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Equipment" DROP CONSTRAINT "Equipment_locationName_fkey";

-- AlterTable
ALTER TABLE "Equipment" DROP COLUMN "locationName",
ADD COLUMN     "locationId" TEXT DEFAULT 'Unknown';

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
