import { faker } from '@faker-js/faker'; // Import faker
function createRandomUser() {
    const roles = ['admin', 'user', 'manager'];
    const statuses = ['active', 'inactive'];
    const roleIndex = faker.datatype.number({ min: 0, max: roles.length - 1 });
    const statusIndex = faker.datatype.number({ min: 0, max: statuses.length - 1 });
  
    return {
      id: faker.datatype.uuid(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
      role: roles[roleIndex],
      status: statuses[statusIndex],
    };
  }
  
 export const users = Array.from({ length: 10 }, createRandomUser);
  