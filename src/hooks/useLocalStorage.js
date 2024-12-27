import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  // Initialize state with a function to avoid unnecessary computations
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Attempt to retrieve the item from localStorage
      const item = window.localStorage.getItem(key);
      // If the item exists, parse and return it; otherwise, return the initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If there's an error (e.g., parsing error), log it and return the initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Effect to update localStorage whenever the key or storedValue changes
  useEffect(() => {
    try {
      // Stringify the storedValue and save it to localStorage
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      // Log any errors that occur during saving to localStorage
      console.log(error);
    }
  }, [key, storedValue]); // Dependencies array ensures effect runs when key or storedValue changes

  // Return the current value and a function to update it
  return [storedValue, setStoredValue];
}

export default useLocalStorage;
