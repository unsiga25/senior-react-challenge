import { User, UsersResponse } from '../types/user';

const BASE_URL = 'https://dummyjson.com';

/**
 * Fetch paginated list of users with optional gender filter
 * @param page - Current page number (0-indexed)
 * @param limit - Number of users per page
 * @param gender - Optional gender filter ('male' | 'female')
 */
export const fetchUsers = async (
  page: number,
  limit: number,
  gender?: 'male' | 'female',
): Promise<UsersResponse> => {
  // First fetch total count to know how many pages
  const resTotal = await fetch(`${BASE_URL}/users?limit=0`);
  if (!resTotal.ok) throw new Error('Failed to fetch users');
  const { total: totalUsers } = await resTotal.json();

  // Fetch all users in chunks of 100
  const chunkSize = 100;
  let allUsers: User[] = [];
  for (let skip = 0; skip < totalUsers; skip += chunkSize) {
    const res = await fetch(`${BASE_URL}/users?limit=${chunkSize}&skip=${skip}`);
    if (!res.ok) throw new Error('Failed to fetch users');
    const data: UsersResponse = await res.json();
    allUsers = allUsers.concat(data.users);
  }

  // Apply gender filter if specified
  const filteredUsers = gender ? allUsers.filter((u) => u.gender === gender) : allUsers;

  // Apply pagination
  const skip = page * limit;
  const paginatedUsers = filteredUsers.slice(skip, skip + limit);

  return {
    users: paginatedUsers,
    total: filteredUsers.length,
    skip,
    limit,
  };
};

/**
 * Search users by query term (name or email) with optional gender filter
 * @param query - Search term
 * @param page - Current page number (0-indexed)
 * @param limit - Number of users per page
 * @param gender - Optional gender filter ('male' | 'female')
 */
export const searchUsers = async (
  query: string,
  page: number,
  limit: number,
  gender?: 'male' | 'female',
): Promise<UsersResponse> => {
  // Fetch all users to perform search
  const allUsersRes = await fetchUsers(0, 1000); // fetch enough users to cover the search
  const matchedUsers = allUsersRes.users.filter(
    (u) =>
      (u.firstName + ' ' + u.lastName).toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase()),
  );

  // Apply gender filter
  const filtered = gender ? matchedUsers.filter((u) => u.gender === gender) : matchedUsers;

  // Pagination
  const skip = page * limit;
  const paginated = filtered.slice(skip, skip + limit);

  return {
    users: paginated,
    total: filtered.length,
    skip,
    limit,
  };
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
