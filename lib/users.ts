// Simple in-memory user store (will move to database later)
export const users: Array<{
  id: string;
  email: string;
  password: string;
  isPremium: boolean;
  createdAt: string;
}> = [];

export function findUserByEmail(email: string) {
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

export function addUser(user: {
  id: string;
  email: string;
  password: string;
  isPremium: boolean;
  createdAt: string;
}) {
  users.push(user);
  return user;
}

export function updateUserPremium(email: string, isPremium: boolean) {
  const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  if (userIndex !== -1) {
    users[userIndex].isPremium = isPremium;
    return users[userIndex];
  }
  return null;
}
