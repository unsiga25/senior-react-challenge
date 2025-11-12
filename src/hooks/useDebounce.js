"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDebounce = useDebounce;
var react_1 = require("react");
/**
 * Custom hook that debounces a value
 * Delays updating the value until after the specified delay
 *
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds
 * @returns The debounced value
 *
 * @example
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearch = useDebounce(searchTerm, 400);
 */
function useDebounce(value, delay) {
    var _a = (0, react_1.useState)(value), debouncedValue = _a[0], setDebouncedValue = _a[1];
    (0, react_1.useEffect)(function () {
        // Set up a timer to update the debounced value after the delay
        var handler = setTimeout(function () {
            setDebouncedValue(value);
        }, delay);
        // Clean up the timer if value changes before delay expires
        return function () {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}
