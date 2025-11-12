import { useQuery } from '@tanstack/react-query';
import { fetchUsers, searchUsers } from '../services/api';
import { GenderFilter } from '../types/user';

const LIMIT = 10;

export function useUsers(page: number, searchTerm: string, genderFilter: GenderFilter) {
  const gender = genderFilter !== 'all' ? genderFilter : undefined;
  return useQuery({
    queryKey: ['users', page, searchTerm, gender],
    queryFn: () => {
      return searchTerm
        ? searchUsers(searchTerm, page, LIMIT, gender)
        : fetchUsers(page, LIMIT, gender);
    },
    placeholderData: (prevData) => prevData,
  });
}

export const USERS_PER_PAGE = LIMIT;
