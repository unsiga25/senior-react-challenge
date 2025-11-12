/**
 * User type definition from DummyJSON API
 */
export type User = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age: number;
  gender: "male" | "female";
  email: string;
  phone: string;
  username: string;
  image?: string;
  company?: {
    name: string;
    department: string;
    title: string;
  };
  address?: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
};

/**
 * Response type for paginated users list
 */
export type UsersResponse = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};

/**
 * Gender filter options
 */
export type GenderFilter = 'all' | 'male' | 'female';