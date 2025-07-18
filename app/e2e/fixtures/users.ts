export const testUsers = {
  admin: {
    email: 'test-admin@test.com',
    name: 'Test Admin',
    password: 'TestAdmin123!',
  },
  // Demo users from seed script
  demoAdmin: {
    email: 'demo-admin@nuxtstarterkit.com',
    name: 'Demo Admin',
    password: 'demoAdminNuxtStarterKit0815#',
  },
  demoUser: {
    email: 'demo-user@nuxtstarterkit.com',
    name: 'Demo User',
    password: 'demoUserNuxtStarterKit',
  },
  newUser: {
    email: 'new-user@test.com',
    name: 'New User',
    password: 'NewUser123!',
  },
  regular: {
    email: 'test-user@test.com',
    name: 'Test User',
    password: 'TestUser123!',
  },
}

export const invalidUsers = {
  invalidEmail: {
    email: 'notanemail',
    name: 'Invalid Email',
    password: 'ValidPassword123!',
  },
  shortPassword: {
    email: 'invalid@test.com',
    name: 'Invalid User',
    password: '123',
  },
}
