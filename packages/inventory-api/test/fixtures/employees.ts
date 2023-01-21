import { faker } from '@faker-js/faker';
import { Employee } from '../../src/employees/dto/employees.dto';

export const shouldReturnEmployeeById = {
  id: faker.datatype.uuid(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.past(),
  name: 'Challenger MT 845C',
} satisfies Employee;
