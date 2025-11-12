import { User, UsersResponse } from '../types/user';

const BASE_URL = 'https://dummyjson.com';

/**
 * Fetch paginated list of users
 * @param page - Current page number (0-indexed)
 * @param limit - Number of users per page
 */
export const fetchUsers = async (page: number, limit: number): Promise<UsersResponse> => {
  const skip = page * limit;
  const res = await fetch(`${BASE_URL}/users?limit=${limit}&skip=${skip}`);
  
  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }
  
  return res.json();
};

/**
 * Search users by query term (name or email)
 * @param query - Search term
 * @param page - Current page number (0-indexed)
 * @param limit - Number of users per page
 */
export const searchUsers = async (
  query: string,
  page: number,
  limit: number
): Promise<UsersResponse> => {
  const skip = page * limit;
  const res = await fetch(
    `${BASE_URL}/users/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`
  );
  
  if (!res.ok) {
    throw new Error('Failed to search users');
  }
  
  return res.json();
};

/**
 * Fetch single user by ID
 * @param id - User ID
 */
export const fetchUserById = async (id: number): Promise<User> => {
  const res = await fetch(`${BASE_URL}/users/${id}`);
  
  if (!res.ok) {
    throw new Error('Failed to fetch user details');
  }
  
  return res.json();
};