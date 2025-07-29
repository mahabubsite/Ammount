import React, { useState, useEffect } from 'react';

// Main App component
function App() {
  // Define currency denominations and their initial counts
  const [denominations, setDenominations] = useState({
    1000: 0,
    500: 0,
    200: 0,
    100: 0,
    50: 0,
    20: 0,
    10: 0,
    5: 0,
  });

  // State for the total amount
  const [totalAmount, setTotalAmount] = useState(0);
  // State for the current theme (light or dark)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Effect to calculate total amount whenever denominations change
  useEffect(() => {
    let sum = 0;
    // Iterate over denominations to calculate the sum
    for (const [value, count] of Object.entries(denominations)) {
      // Ensure count is treated as a number, defaulting to 0 if empty or invalid
      sum += parseInt(value) * parseInt(count || 0);
    }
    setTotalAmount(sum);
  }, [denominations]);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handle input changes for each denomination
  const handleInputChange = (e, denominationValue) => {
    const value = parseInt(e.target.value);
    // Update the state for the specific denomination, ensuring non-negative values
    setDenominations(prevDenominations => ({
      ...prevDenominations,
      // If value is not a number or is negative, set to 0; otherwise, use the value
      [denominationValue]: isNaN(value) || value < 0 ? 0 : value,
    }));
  };

  // Reset all inputs to zero
  const resetInputs = () => {
    setDenominations({
      1000: 0,
      500: 0,
      200: 0,
      100: 0,
      50: 0,
      20: 0,
      10: 0,
      5: 0,
    });
  };

  return (
    // Main container with responsive height and theme-based background/text colors
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} font-inter`}>
      {/* Top Bar - App title and theme toggle */}
      <header className={`py-4 px-6 shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'} flex justify-between items-center rounded-b-lg`}>
        <h1 className="text-2xl font-bold">৳ Currency Counter</h1>
        {/* Theme Toggle Button with SVG icons for sun/moon */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full focus:outline-none transition-colors duration-200 ${
            isDarkMode ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            // Sun icon for light mode (when currently in dark mode)
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3A.75.75 0 0112 2.25zM12 19.5a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V20.25a.75.75 0 01.75-.75zM18.953 6.453a.75.75 0 01-1.061 1.061l-1.591-1.591a.75.75 0 011.061-1.061l1.591 1.591zM3.047 17.547a.75.75 0 011.061-1.061l1.591 1.591a.75.75 0 01-1.061 1.061l-1.591-1.591zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM4.5 12a.75.75 0 01-.75.75H2.25a.75.75 0 010-1.5H3.75a.75.75 0 01.75.75zM17.547 18.953a.75.75 0 01-1.061-1.061l1.591-1.591a.75.75 0 011.061 1.061l-1.591 1.591zM6.453 3.047a.75.75 0 011.061 1.061L5.923 5.699a.75.75 0 01-1.061-1.061L6.453 3.047zM12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
            </svg>
          ) : (
            // Moon icon for dark mode (when currently in light mode)
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.174.962L6.393 8.5H4.5a.75.75 0 01-.75-.75V6.75a.75.75 0 00-1.5 0v.75A2.25 2.25 0 004.5 9h1.697l3.305 6.21a.75.75 0 01-.174.962 7.5 7.5 0 119.496-10.439.75.75 0 01-.962.174l-3.305 1.762-.174.093a6 6 0 10-7.394 7.394l-.093.174-1.762 3.305a.75.75 0 01-.174.962 7.5 7.5 0 01-9.496-10.439zM12 10.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </header>

      {/* Main Content Area - Scrollable on smaller screens */}
      <main className="flex-grow p-4 overflow-y-auto">
        {/* Responsive grid for currency denomination cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.keys(denominations).map(value => (
            <div
              key={value}
              className={`p-4 rounded-xl shadow-md flex items-center justify-between ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <label htmlFor={`notes-${value}`} className="text-lg font-medium mr-2">
                ৳{value} –
              </label>
              <div className="flex flex-col items-end">
                <input
                  id={`notes-${value}`}
                  type="number"
                  inputMode="numeric" // Suggest numeric keypad on mobile
                  pattern="[0-9]*" // Further hint for numeric input
                  // Display empty string for 0 to make it cleaner for user input
                  value={denominations[value] === 0 ? '' : denominations[value]}
                  onChange={e => handleInputChange(e, value)}
                  // Responsive width for input field: full width on small screens, max-width on larger
                  className={`w-full max-w-[100px] p-2 text-right border rounded-md focus:outline-none focus:ring-2 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500'
                      : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-400'
                  }`}
                  placeholder="0"
                  min="0" // Ensure minimum value is 0
                />
                {/* Optional Breakdown Summary for each denomination */}
                <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                  {denominations[value] > 0
                    ? `৳${value} x ${denominations[value]} = ৳${parseInt(value) * denominations[value]}`
                    : ''}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Reset Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={resetInputs}
            className={`py-3 px-6 rounded-full font-semibold shadow-md transition-all duration-200 ease-in-out
              ${isDarkMode ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}
              focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75`}
          >
            Reset All
          </button>
        </div>
      </main>

      {/* Total Amount Display - Fixed at the bottom */}
      <footer className={`py-6 px-6 shadow-lg ${isDarkMode ? 'bg-blue-800' : 'bg-blue-600'} text-white text-center rounded-t-lg`}>
        <h2 className="text-2xl font-bold mb-2">Total Amount:</h2>
        {/* Formatted total amount for Bangladeshi currency */}
        <p className="text-5xl font-extrabold">৳{totalAmount.toLocaleString('en-BD')}</p>
      </footer>
    </div>
  );
}

export default App;
