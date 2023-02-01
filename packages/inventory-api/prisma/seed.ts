import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');

  await prisma.vehicle.createMany({
    data: [
      {
        name: 'Case Steiger 620',
        machineHours: 3868,
        make: 'Case IH (CNH)',
        model: 'Steiger 620 Quad',
        power: 'DIESEL',
        vehicleType: 'TRACTOR',
        year: 2016,
        link: faker.internet.url(),
      },
      {
        name: 'Challenger MT 855B',
        machineHours: 700,
        make: 'Challenger (AGCO)',
        model: 'MT 855B',
        power: 'DIESEL',
        vehicleType: 'TRACTOR',
        year: 2008,
        link: faker.internet.url(),
      },
      {
        name: 'Challenger MT 845C',
        machineHours: 10000,
        make: 'Challenger (AGCO)',
        model: 'MT 845C',
        power: 'DIESEL',
        vehicleType: 'TRACTOR',
        year: 2009,
        link: faker.internet.url(),
      },
    ],
  });

  await prisma.fuelStorageLocation.createMany({
    data: [
      { name: 'On-Road Stand Tank', quantity: 600, capacity: 1000, storageType: 'TANK' },
      { name: 'Line Tank', quantity: 3850, capacity: 1000, storageType: 'TANK' },
      { name: 'Heater Tank', quantity: 150, capacity: 1000, storageType: 'TANK' },
      { name: 'Stand-Tank', quantity: 380, capacity: 1000, storageType: 'TANK' },
      { name: 'Fuel Truck (Ford)', quantity: 0, capacity: 500, storageType: 'TANK' },
      { name: 'White 550 Tank', quantity: 0, capacity: 250, storageType: 'TANK' },
      { name: 'Blue 550 Tank', quantity: 0, capacity: 250, storageType: 'TANK' },
      { name: 'Hart Rig Tank', quantity: 0, capacity: 250, storageType: 'TANK' },
    ],
  });

  await prisma.guide.create({
    data: {
      name: '1000 Hour Service',
      content: `
        <p>${faker.lorem.paragraph(5)}</p>
        
      `,
    },
  });

  await prisma.guide.create({
    data: {
      name: '5000 Hour Service',
      content: faker.lorem.paragraphs(3).replace(/\n/gi, '\n\n'),
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
