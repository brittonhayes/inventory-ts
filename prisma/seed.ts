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

  await prisma.location.createMany({
    data: [
      { name: 'Unknown' },
      { name: 'Field 1' },
      { name: 'Field 2' },
      { name: 'Workshop' },
      { name: 'Garage' },
      { name: 'Barn' },
      { name: 'Greenhouse' },
      { name: 'Toolshed' },
    ],
  });

  await prisma.vehicle.createMany({
    data: [
      { name: 'Big Green', make: 'John Deere', model: 'Tractor', year: 2010 },
      { name: 'Little Red', make: 'John Deere', model: 'Tractor', year: 2012 },
      { name: 'Big Red', make: 'John Deere', model: 'Tractor', year: 2014 },
      { name: 'Big Blue', make: 'John Deere', model: 'Tractor', year: 2016 },
      { name: 'Little Blue', make: 'John Deere', model: 'Tractor', year: 2018 },
      { name: 'Big Yellow', make: 'John Deere', model: 'Tractor', year: 2020 },
      { name: 'Little Yellow', make: 'John Deere', model: 'Tractor', year: 2022 },
      { name: 'Big White', make: 'John Deere', model: 'Tractor', year: 2024 },
      { name: 'Little White', make: 'John Deere', model: 'Tractor', year: 2026 },
      { name: 'Big Black', make: 'John Deere', model: 'Tractor', year: 2028 },
      { name: 'Little Black', make: 'John Deere', model: 'Tractor', year: 2030 },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
