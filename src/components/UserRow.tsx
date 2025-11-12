import { User as UserIcon } from 'lucide-react';
import { User as UserType } from '../types/user';

interface UserRowProps {
  user: UserType;
  onSelect: (id: number) => void;
}

export function UserRow({ user, onSelect }: UserRowProps) {
  return (
    <tr
      onClick={() => onSelect(user.id)}
      className="hover:bg-gray-50 cursor-pointer transition-colors"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(user.id);
        }
      }}
      aria-label={`View details for ${user.firstName} ${user.lastName}`}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {user.image ? (
            <img
              src={user.image}
              alt=""
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <UserIcon className="w-5 h-5 text-gray-400" />
            </div>
          )}
          <div>
            <div className="text-sm font-medium text-gray-900">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-sm text-gray-500">@{user.username}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 capitalize">
          {user.gender}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.age}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {user.company?.name || '—'}
      </td>
    </tr>
  );
}
