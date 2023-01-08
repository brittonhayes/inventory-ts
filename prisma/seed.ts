import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Resetting...');
  await prisma.vehicle.deleteMany();
  await prisma.maintenanceGuide.deleteMany();
  await prisma.maintenanceTask.deleteMany();
  await prisma.employee.deleteMany();

  console.log('Seeding...');
  await prisma.vehicle.createMany({
    data: Array.from({ length: 15 }).map(() => {
      return {
        name: faker.random.words(2),
        make: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        machineHours: faker.datatype.number({ min: 0, max: 1000 }),
        link: faker.internet.url(),
        vin: faker.vehicle.vin(),
      } satisfies Prisma.VehicleCreateInput;
    }),
  });

  await prisma.maintenanceGuide.createMany({
    data: Array.from({ length: 10 }).map(() => {
      return {
        name: faker.random.words(2),
        content: faker.lorem.paragraphs(3),
      } satisfies Prisma.MaintenanceGuideCreateInput;
    }),
  });

  await prisma.maintenanceTask.create({
    data: {
      name: faker.random.words(2),
      dueDate: faker.date.future(),
      assignee: {
        create: {
          name: faker.name.fullName(),
        },
      },
      guide: {
        create: {
          name: faker.random.words(2),
          content: faker.lorem.paragraphs(3),
        },
      },
      vehicle: {
        create: {
          name: faker.random.words(2),
          make: faker.vehicle.manufacturer(),
          model: faker.vehicle.model(),
          machineHours: faker.datatype.number({ min: 0, max: 1000 }),
          link: faker.internet.url(),
          vin: faker.vehicle.vin(),
        },
      },
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
