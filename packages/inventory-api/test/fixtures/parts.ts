import { faker } from '@faker-js/faker';
import { VehiclePart } from '../../src/vehicles/dto/parts.dto';

export const shouldListVehicleParts: VehiclePart[] = [
  {
    id: faker.datatype.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    name: 'Engine',
  },
];

export const shouldReturnVehiclePartById: VehiclePart = {
  id: faker.datatype.uuid(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.past(),
  name: 'Engine',
};
