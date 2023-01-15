-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('INCOMPLETE', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('BROKEN', 'POOR', 'GOOD', 'MINT');

-- CreateEnum
CREATE TYPE "PowerType" AS ENUM ('GAS', 'DIESEL', 'HYBRID', 'ELECTRIC');

-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('GAS', 'DIESEL');

-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('TRACTOR', 'SPRAYER', 'COMBINE', 'TRUCK', 'ATV', 'UTV', 'SEMITRUCK', 'OTHER');

-- CreateEnum
CREATE TYPE "ImplementType" AS ENUM ('SPRAYER', 'HARROW', 'DRILL', 'MOWER', 'CULTIVATOR', 'CHISEL', 'RODWEEDER', 'TRAILER', 'OTHER');

-- CreateEnum
CREATE TYPE "FuelStorageType" AS ENUM ('TANK', 'CAN', 'OTHER');

-- CreateEnum
CREATE TYPE "FuelEventType" AS ENUM ('FILL', 'DRAIN');

-- CreateTable
CREATE TABLE "FuelEvent" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gallons" INTEGER DEFAULT 0,
    "type" "FuelEventType" NOT NULL DEFAULT 'DRAIN',
    "notes" TEXT,
    "fuelStorageLocationId" TEXT,

    CONSTRAINT "FuelEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FuelStorageLocation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL DEFAULT 'gallons',
    "quantity" INTEGER DEFAULT 0,
    "capacity" INTEGER DEFAULT 0,
    "storageType" "FuelStorageType" NOT NULL DEFAULT 'TANK',
    "fuelType" "FuelType" DEFAULT 'DIESEL',

    CONSTRAINT "FuelStorageLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehiclePart" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "condition" "Condition",
    "hours" INTEGER,
    "notes" TEXT,

    CONSTRAINT "VehiclePart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tool" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "condition" "Condition" DEFAULT 'GOOD',

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaintenanceGuide" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "manual" TEXT,
    "vehicleId" TEXT,

    CONSTRAINT "MaintenanceGuide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaintenanceTask" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'INCOMPLETE',
    "dueDate" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "machineHours" INTEGER,
    "guideId" TEXT NOT NULL,
    "assigneeId" TEXT,
    "vehicleId" TEXT NOT NULL,

    CONSTRAINT "MaintenanceTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vin" TEXT,
    "condition" "Condition" DEFAULT 'GOOD',
    "year" INTEGER,
    "vehicleType" "VehicleType" NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "machineHours" INTEGER,
    "link" TEXT,
    "power" "PowerType" DEFAULT 'DIESEL',

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "owned" BOOLEAN NOT NULL DEFAULT false,
    "condition" "Condition" DEFAULT 'GOOD',

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Implement" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "owned" BOOLEAN NOT NULL DEFAULT false,
    "condition" "Condition" DEFAULT 'GOOD',
    "type" "ImplementType",

    CONSTRAINT "Implement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MaintenanceTaskToTool" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_VehicleToVehiclePart" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AttachmentToImplement" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AttachmentToVehicle" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ImplementToVehicle" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_name_key" ON "Vehicle"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_vin_key" ON "Vehicle"("vin");

-- CreateIndex
CREATE UNIQUE INDEX "_MaintenanceTaskToTool_AB_unique" ON "_MaintenanceTaskToTool"("A", "B");

-- CreateIndex
CREATE INDEX "_MaintenanceTaskToTool_B_index" ON "_MaintenanceTaskToTool"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_VehicleToVehiclePart_AB_unique" ON "_VehicleToVehiclePart"("A", "B");

-- CreateIndex
CREATE INDEX "_VehicleToVehiclePart_B_index" ON "_VehicleToVehiclePart"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AttachmentToImplement_AB_unique" ON "_AttachmentToImplement"("A", "B");

-- CreateIndex
CREATE INDEX "_AttachmentToImplement_B_index" ON "_AttachmentToImplement"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AttachmentToVehicle_AB_unique" ON "_AttachmentToVehicle"("A", "B");

-- CreateIndex
CREATE INDEX "_AttachmentToVehicle_B_index" ON "_AttachmentToVehicle"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ImplementToVehicle_AB_unique" ON "_ImplementToVehicle"("A", "B");

-- CreateIndex
CREATE INDEX "_ImplementToVehicle_B_index" ON "_ImplementToVehicle"("B");

-- AddForeignKey
ALTER TABLE "FuelEvent" ADD CONSTRAINT "FuelEvent_fuelStorageLocationId_fkey" FOREIGN KEY ("fuelStorageLocationId") REFERENCES "FuelStorageLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceGuide" ADD CONSTRAINT "MaintenanceGuide_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceTask" ADD CONSTRAINT "MaintenanceTask_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "MaintenanceGuide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceTask" ADD CONSTRAINT "MaintenanceTask_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceTask" ADD CONSTRAINT "MaintenanceTask_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MaintenanceTaskToTool" ADD CONSTRAINT "_MaintenanceTaskToTool_A_fkey" FOREIGN KEY ("A") REFERENCES "MaintenanceTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MaintenanceTaskToTool" ADD CONSTRAINT "_MaintenanceTaskToTool_B_fkey" FOREIGN KEY ("B") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VehicleToVehiclePart" ADD CONSTRAINT "_VehicleToVehiclePart_A_fkey" FOREIGN KEY ("A") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VehicleToVehiclePart" ADD CONSTRAINT "_VehicleToVehiclePart_B_fkey" FOREIGN KEY ("B") REFERENCES "VehiclePart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttachmentToImplement" ADD CONSTRAINT "_AttachmentToImplement_A_fkey" FOREIGN KEY ("A") REFERENCES "Attachment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttachmentToImplement" ADD CONSTRAINT "_AttachmentToImplement_B_fkey" FOREIGN KEY ("B") REFERENCES "Implement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttachmentToVehicle" ADD CONSTRAINT "_AttachmentToVehicle_A_fkey" FOREIGN KEY ("A") REFERENCES "Attachment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttachmentToVehicle" ADD CONSTRAINT "_AttachmentToVehicle_B_fkey" FOREIGN KEY ("B") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImplementToVehicle" ADD CONSTRAINT "_ImplementToVehicle_A_fkey" FOREIGN KEY ("A") REFERENCES "Implement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImplementToVehicle" ADD CONSTRAINT "_ImplementToVehicle_B_fkey" FOREIGN KEY ("B") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
