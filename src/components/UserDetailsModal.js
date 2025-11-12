"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDetailsModal = UserDetailsModal;
var react_1 = require("react");
var react_query_1 = require("@tanstack/react-query");
var lucide_react_1 = require("lucide-react");
var api_1 = require("../services/api");
/**
 * Modal component that displays detailed information for a single user
 * Features:
 * - Fetches user data by ID
 * - Closes on ESC key press
 * - Closes on overlay click
 * - Prevents body scroll when open
 * - Shows loading and error states
 */
function UserDetailsModal(_a) {
    var userId = _a.userId, onClose = _a.onClose;
    // Fetch user details
    var _b = (0, react_query_1.useQuery)({
        queryKey: ['user', userId],
        queryFn: function () { return (0, api_1.fetchUserById)(userId); },
    }), user = _b.data, isLoading = _b.isLoading, error = _b.error;
    // Handle ESC key to close modal
    (0, react_1.useEffect)(function () {
        var handleEscape = function (e) {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return function () { return document.removeEventListener('keydown', handleEscape); };
    }, [onClose]);
    // Prevent body scroll when modal is open
    (0, react_1.useEffect)(function () {
        document.body.style.overflow = 'hidden';
        return function () {
            document.body.style.overflow = 'unset';
        };
    }, []);
    return (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="user-details-title">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={function (e) { return e.stopPropagation(); }}>
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 id="user-details-title" className="text-xl font-semibold text-gray-900">
            User Details
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close modal">
            <lucide_react_1.X className="w-5 h-5"/>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Loading State */}
          {isLoading && (<div className="flex items-center justify-center py-12">
              <lucide_react_1.Loader2 className="w-8 h-8 animate-spin text-blue-600"/>
            </div>)}

          {/* Error State */}
          {error && (<div className="flex items-center gap-2 text-red-600 py-8">
              <lucide_react_1.AlertCircle className="w-5 h-5"/>
              <span>Failed to load user details</span>
            </div>)}

          {/* User Data */}
          {user && (<div className="space-y-6">
              {/* User Profile Header */}
              <div className="flex items-center gap-4">
                {user.image ? (<img src={user.image} alt={"".concat(user.firstName, " ").concat(user.lastName)} className="w-20 h-20 rounded-full object-cover"/>) : (<div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                    <lucide_react_1.User className="w-10 h-10 text-gray-400"/>
                  </div>)}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {user.firstName} {user.lastName}
                  </h3>
                  {user.maidenName && (<p className="text-sm text-gray-500">née {user.maidenName}</p>)}
                  <p className="text-sm text-gray-600">@{user.username}</p>
                </div>
              </div>

              {/* Basic Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Email
                  </label>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Phone
                  </label>
                  <p className="text-gray-900">{user.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Age
                  </label>
                  <p className="text-gray-900">{user.age} years</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Gender
                  </label>
                  <p className="text-gray-900 capitalize">{user.gender}</p>
                </div>
              </div>

              {/* Company Information */}
              {user.company && (<div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Company</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Company Name
                      </label>
                      <p className="text-gray-900">{user.company.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Department
                      </label>
                      <p className="text-gray-900">{user.company.department}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Title
                      </label>
                      <p className="text-gray-900">{user.company.title}</p>
                    </div>
                  </div>
                </div>)}

              {/* Address Information */}
              {user.address && (<div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Address</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-900">{user.address.address}</p>
                    <p className="text-gray-900">
                      {user.address.city}, {user.address.state} {user.address.postalCode}
                    </p>
                  </div>
                </div>)}
            </div>)}
        </div>
      </div>
    </div>);
}
