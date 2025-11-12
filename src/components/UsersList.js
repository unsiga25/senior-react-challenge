"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersList = UsersList;
var react_1 = require("react");
var react_query_1 = require("@tanstack/react-query");
var lucide_react_1 = require("lucide-react");
var api_1 = require("../services/api");
var useDebounce_1 = require("../hooks/useDebounce");
var UserDetailsModal_1 = require("./UserDetailsModal");
/**
 * Main component that displays the users table
 * Features:
 * - Server-side pagination (10 users per page)
 * - Debounced search (400ms delay)
 * - Gender filter (client-side)
 * - User details modal
 * - Loading, error, and empty states
 */
function UsersList() {
    // State management
    var _a = (0, react_1.useState)(0), page = _a[0], setPage = _a[1];
    var _b = (0, react_1.useState)(''), searchTerm = _b[0], setSearchTerm = _b[1];
    var _c = (0, react_1.useState)('all'), genderFilter = _c[0], setGenderFilter = _c[1];
    var _d = (0, react_1.useState)(null), selectedUserId = _d[0], setSelectedUserId = _d[1];
    var debouncedSearch = (0, useDebounce_1.useDebounce)(searchTerm, 400);
    var limit = 10;
    // Fetch users with React Query
    var _e = (0, react_query_1.useQuery)({
        queryKey: ['users', page, debouncedSearch],
        queryFn: function () {
            return debouncedSearch
                ? (0, api_1.searchUsers)(debouncedSearch, page, limit)
                : (0, api_1.fetchUsers)(page, limit);
        },
        keepPreviousData: true,
    }), data = _e.data, isLoading = _e.isLoading, error = _e.error, refetch = _e.refetch, isFetching = _e.isFetching;
    // Client-side gender filtering
    var filteredUsers = (data === null || data === void 0 ? void 0 : data.users.filter(function (user) {
        return genderFilter === 'all' || user.gender === genderFilter;
    })) || [];
    var totalPages = Math.ceil(((data === null || data === void 0 ? void 0 : data.total) || 0) / limit);
    // Event handlers
    var handleSearchChange = function (value) {
        setSearchTerm(value);
        setPage(0); // Reset to first page on new search
    };
    var handleClearSearch = function () {
        setSearchTerm('');
        setPage(0);
    };
    var handleGenderFilterChange = function (value) {
        setGenderFilter(value);
        setPage(0); // Reset to first page on filter change
    };
    var handleClearAllFilters = function () {
        setSearchTerm('');
        setGenderFilter('all');
        setPage(0);
    };
    return (<div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Users Admin</h1>
          <p className="text-gray-600">Manage and view user information</p>
        </div>

        {/* Search and Filters Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <label htmlFor="search" className="sr-only">
                Search users
              </label>
              <lucide_react_1.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
              <input id="search" type="text" value={searchTerm} onChange={function (e) { return handleSearchChange(e.target.value); }} placeholder="Search by name or email..." className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" aria-label="Search users by name or email"/>
              {searchTerm && (<button onClick={handleClearSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600" aria-label="Clear search">
                  <lucide_react_1.X className="w-5 h-5"/>
                </button>)}
            </div>

            {/* Gender Filter Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="gender-filter" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                Gender:
              </label>
              <select id="gender-filter" value={genderFilter} onChange={function (e) { return handleGenderFilterChange(e.target.value); }} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" aria-label="Filter users by gender">
                <option value="all">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          {/* Active Filters Indicator */}
          {(searchTerm || genderFilter !== 'all') && (<div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
              <span>Active filters:</span>
              {searchTerm && (<span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Search: "{searchTerm}"
                </span>)}
              {genderFilter !== 'all' && (<span className="bg-blue-100 text-blue-800 px-2 py-1 rounded capitalize">
                  Gender: {genderFilter}
                </span>)}
            </div>)}
        </div>

        {/* Loading State */}
        {isLoading && (<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
            <div className="flex flex-col items-center justify-center gap-3">
              <lucide_react_1.Loader2 className="w-10 h-10 animate-spin text-blue-600"/>
              <p className="text-gray-600">Loading users...</p>
            </div>
          </div>)}

        {/* Error State */}
        {error && (<div className="bg-white rounded-lg shadow-sm border border-red-200 p-8">
            <div className="flex flex-col items-center justify-center gap-4">
              <lucide_react_1.AlertCircle className="w-12 h-12 text-red-600"/>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Failed to load users
                </h3>
                <p className="text-gray-600 mb-4">
                  {error instanceof Error ? error.message : 'An error occurred'}
                </p>
                <button onClick={function () { return refetch(); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Retry
                </button>
              </div>
            </div>
          </div>)}

        {/* Empty State */}
        {!isLoading && !error && filteredUsers.length === 0 && (<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
            <div className="flex flex-col items-center justify-center gap-3">
              <lucide_react_1.User className="w-12 h-12 text-gray-400"/>
              <p className="text-gray-600">No users found</p>
              {(searchTerm || genderFilter !== 'all') && (<button onClick={handleClearAllFilters} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Clear filters
                </button>)}
            </div>
          </div>)}

        {/* Users Table Section */}
        {!isLoading && !error && filteredUsers.length > 0 && (<>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Background Refetch Indicator */}
              {isFetching && !isLoading && (<div className="bg-blue-50 border-b border-blue-100 px-4 py-2 flex items-center gap-2 text-blue-700 text-sm">
                  <lucide_react_1.Loader2 className="w-4 h-4 animate-spin"/>
                  <span>Updating...</span>
                </div>)}

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gender
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Age
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map(function (user) {
                var _a;
                return (<tr key={user.id} onClick={function () { return setSelectedUserId(user.id); }} className="hover:bg-gray-50 cursor-pointer transition-colors" role="button" tabIndex={0} onKeyDown={function (e) {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedUserId(user.id);
                        }
                    }} aria-label={"View details for ".concat(user.firstName, " ").concat(user.lastName)}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {user.image ? (<img src={user.image} alt="" className="w-10 h-10 rounded-full object-cover mr-3"/>) : (<div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                <lucide_react_1.User className="w-5 h-5 text-gray-400"/>
                              </div>)}
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {user.firstName} {user.lastName}
                              </div>
                              <div className="text-sm text-gray-500">@{user.username}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 capitalize">
                            {user.gender}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.age}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {((_a = user.company) === null || _a === void 0 ? void 0 : _a.name) || '—'}
                        </td>
                      </tr>);
            })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{page * limit + 1}</span>
                {' '}-{' '}
                <span className="font-medium">
                  {Math.min((page + 1) * limit, (data === null || data === void 0 ? void 0 : data.total) || 0)}
                </span>
                {' '}of <span className="font-medium">{(data === null || data === void 0 ? void 0 : data.total) || 0}</span> results
              </div>

              <div className="flex items-center gap-2">
                <button onClick={function () { return setPage(function (p) { return Math.max(0, p - 1); }); }} disabled={page === 0} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2" aria-label="Previous page">
                  <lucide_react_1.ChevronLeft className="w-4 h-4"/>
                  Previous
                </button>
                <span className="px-4 py-2 text-sm text-gray-700">
                  Page <span className="font-medium">{page + 1}</span> of{' '}
                  <span className="font-medium">{totalPages}</span>
                </span>
                <button onClick={function () { return setPage(function (p) { return p + 1; }); }} disabled={page >= totalPages - 1} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2" aria-label="Next page">
                  Next
                  <lucide_react_1.ChevronRight className="w-4 h-4"/>
                </button>
              </div>
            </div>
          </>)}
      </div>

      {/* Render User Details Modal when user is selected */}
      {selectedUserId && (<UserDetailsModal_1.UserDetailsModal userId={selectedUserId} onClose={function () { return setSelectedUserId(null); }}/>)}
    </div>);
}
