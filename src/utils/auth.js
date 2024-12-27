export const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds

export function setLastActiveTimestamp() {
  localStorage.setItem("lastActiveTimestamp", Date.now().toString());
}

export function getLastActiveTimestamp() {
  return parseInt(localStorage.getItem("lastActiveTimestamp") || "0", 10);
}

export function isSessionExpired() {
  const lastActiveTimestamp = getLastActiveTimestamp();
  return Date.now() - lastActiveTimestamp > INACTIVITY_TIMEOUT;
}

export function setAuthStatus(status) {
  localStorage.setItem("isAuthenticated", status.toString());
}

export function getAuthStatus() {
  return localStorage.getItem("isAuthenticated") === "true";
}
