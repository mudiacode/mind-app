// Define the inactivity timeout period (15 minutes in milliseconds)
export const INACTIVITY_TIMEOUT = 15 * 60 * 1000;

// Function to set the timestamp of the last user activity
export function setLastActiveTimestamp() {
  localStorage.setItem("lastActiveTimestamp", Date.now().toString());
}

// Function to get the timestamp of the last user activity
export function getLastActiveTimestamp() {
  // Retrieve the timestamp from localStorage, parse it as an integer
  // If no timestamp is found, return 0
  return parseInt(localStorage.getItem("lastActiveTimestamp") || "0", 10);
}

// Function to check if the user session has expired due to inactivity
export function isSessionExpired() {
  const lastActiveTimestamp = getLastActiveTimestamp();
  // Compare the time elapsed since last activity with the inactivity timeout
  return Date.now() - lastActiveTimestamp > INACTIVITY_TIMEOUT;
}

// Function to set the authentication status in localStorage
export function setAuthStatus(status) {
  localStorage.setItem("isAuthenticated", status.toString());
}

// Function to get the current authentication status from localStorage
export function getAuthStatus() {
  // Return true if the stored value is the string "true", false otherwise
  return localStorage.getItem("isAuthenticated") === "true";
}
