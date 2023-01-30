import { faker } from '@faker-js/faker';
import { MaintenanceGuide } from '../../src/guides/entities/guide.entity';

export const shouldReturnGuideById: MaintenanceGuide = {
  id: faker.datatype.uuid(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.past(),
  name: faker.lorem.words(3),
  content: faker.lorem.lines(10),
} satisfies MaintenanceGuide;

export const shouldListGuides: MaintenanceGuide[] = [
  {
    id: faker.datatype.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    name: faker.lorem.words(3),
    content: faker.lorem.lines(10),
  },
  {
    id: faker.datatype.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    name: faker.lorem.words(3),
    content: faker.lorem.lines(10),
  },
];
