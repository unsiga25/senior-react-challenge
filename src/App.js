"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
var react_query_1 = require("@tanstack/react-query");
var UsersList_1 = require("./components/UsersList");
/**
 * React Query client configuration
 */
var queryClient = new react_query_1.QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh
            refetchOnWindowFocus: false, // Don't refetch when window regains focus
        },
    },
});
/**
 * Root App Component
 * Sets up React Query provider and renders the main UsersList component
 */
function App() {
    return (<react_query_1.QueryClientProvider client={queryClient}>
      <UsersList_1.UsersList />
    </react_query_1.QueryClientProvider>);
}
