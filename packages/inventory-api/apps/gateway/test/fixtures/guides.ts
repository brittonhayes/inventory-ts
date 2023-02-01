import { faker } from '@faker-js/faker';
import { Guide } from 'apps/guides/src/entities/guide.entity';

export const shouldReturnGuideById: Guide = {
  id: faker.datatype.uuid(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.past(),
  name: faker.lorem.words(3),
  content: faker.lorem.lines(10),
} satisfies Guide;

export const shouldListGuides: Guide[] = [
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
