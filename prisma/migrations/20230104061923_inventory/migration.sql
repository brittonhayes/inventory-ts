/*
  Warnings:

  - You are about to drop the column `locationName` on the `Implement` table. All the data in the column will be lost.
  - The primary key for the `Location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `locationName` on the `Tool` table. All the data in the column will be lost.
  - You are about to drop the column `locationName` on the `Vehicle` table. All the data in the column will be lost.
  - The required column `id` was added to the `Location` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Equipment" DROP CONSTRAINT "Equipment_locationName_fkey";

-- DropForeignKey
ALTER TABLE "Implement" DROP CONSTRAINT "Implement_locationName_fkey";

-- DropForeignKey
ALTER TABLE "Tool" DROP CONSTRAINT "Tool_locationName_fkey";

-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_locationName_fkey";

-- AlterTable
ALTER TABLE "Implement" DROP COLUMN "locationName",
ADD COLUMN     "locationId" TEXT;

-- AlterTable
ALTER TABLE "Location" DROP CONSTRAINT "Location_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Location_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Tool" DROP COLUMN "locationName",
ADD COLUMN     "locationId" TEXT;

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "locationName",
ADD COLUMN     "locationId" TEXT;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_locationName_fkey" FOREIGN KEY ("locationName") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Implement" ADD CONSTRAINT "Implement_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
