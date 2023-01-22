import { faker } from '@faker-js/faker';
import { Implement } from '../../src/vehicles/dto/implements.dto';

export const shouldReturnImplementById = {
  id: faker.datatype.uuid(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.past(),
  make: 'Challenger',
  model: 'MT 845C',
  name: 'Challenger MT 845C',
} satisfies Implement;

export const shouldListImplements = [
  {
    id: faker.datatype.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    make: 'Challenger',
    model: 'MT 845C',
    name: 'Challenger MT 845C',
  } satisfies Implement,
  {
    id: faker.datatype.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    make: 'Challenger',
    model: 'MT 845C',
    name: 'Challenger MT 845C',
  } satisfies Implement,
  {
    id: faker.datatype.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    make: 'Challenger',
    model: 'MT 845C',
    name: 'Challenger MT 845C',
  } satisfies Implement,
];
