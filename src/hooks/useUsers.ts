import { useQuery } from '@tanstack/react-query';
import { fetchUsers, searchUsers } from '../services/api';

const LIMIT = 10;

export function useUsers(page: number, searchTerm: string) {
  return useQuery({
    queryKey: ['users', page, searchTerm],
    queryFn: () =>
      searchTerm ? searchUsers(searchTerm, page, LIMIT) : fetchUsers(page, LIMIT),
    placeholderData: (prevData) => prevData,
  });
}

export const USERS_PER_PAGE = LIMIT;
