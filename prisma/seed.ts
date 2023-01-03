import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');

  await prisma.tag.createMany({
    data: [
      { name: 'Seeding' },
      { name: 'Plowing' },
      { name: 'Harvesting' },
      { name: 'Fertilizing' },
      { name: 'Planting' },
      { name: 'Irrigation' },
      { name: 'Weeding' },
      { name: 'Pesticides' },
      { name: 'Tilling' },
      { name: 'Mulching' },
      { name: 'Composting' },
      { name: 'Watering' },
    ],
  });

  await prisma.location.create({
    data: { name: 'Unknown' },
  });

  await prisma.vehicle.create({
    data: { name: 'Big Red', make: 'John Deere', model: 'Tractor', year: 2010 },
  });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
