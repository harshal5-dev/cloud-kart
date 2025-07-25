/**
 * Role-based access control utilities
 * These functions help manage user permissions and route access based on user roles
 */

/**
 * Check if user has access to a route based on roles
 * @param {string[]} routeAccess - Array of required roles for the route
 * @param {string[]} userRoles - Array of user's current roles
 * @returns {boolean} - True if user has access, false otherwise
 */
export const hasRouteAccess = (routeAccess, userRoles) => {
  // If no access control defined, allow access
  if (!routeAccess || routeAccess.length === 0) {
    return true;
  }

  // If user has no roles, deny access to protected routes
  if (!userRoles || userRoles.length === 0) {
    return false;
  }

  // Check if user has any of the required roles
  return routeAccess.some((requiredRole) => userRoles.includes(requiredRole));
};

/**
 * Filter routes based on user roles
 * @param {Object[]} routes - Array of route objects
 * @param {string[]} userRoles - Array of user's current roles
 * @returns {Object[]} - Filtered array of routes user can access
 */
export const filterRoutesByAccess = (routes, userRoles) => {
  return routes.filter((route) => {
    // Always show disabled routes (like section headers)
    if (route.disabled) {
      return true;
    }

    // Check access for regular routes
    return hasRouteAccess(route.access, userRoles);
  });
};

/**
 * Check if user can navigate to a specific path
 * @param {string} path - The path to check access for
 * @param {Object[]} routes - Array of route objects
 * @param {string[]} userRoles - Array of user's current roles
 * @returns {boolean} - True if user can access the path, false otherwise
 */
export const canAccessPath = (path, routes, userRoles) => {
  const targetRoute = routes.find((route) => route.path === path);
  if (!targetRoute) {
    return false; // Route not found
  }
  return hasRouteAccess(targetRoute.access, userRoles);
};

/**
 * Check if user has any of the specified roles
 * @param {string[]} requiredRoles - Array of required roles
 * @param {string[]} userRoles - Array of user's current roles
 * @returns {boolean} - True if user has any of the required roles
 */
export const hasAnyRole = (requiredRoles, userRoles) => {
  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  if (!userRoles || userRoles.length === 0) {
    return false;
  }

  return requiredRoles.some((role) => userRoles.includes(role));
};

/**
 * Check if user has all of the specified roles
 * @param {string[]} requiredRoles - Array of required roles
 * @param {string[]} userRoles - Array of user's current roles
 * @returns {boolean} - True if user has all of the required roles
 */
export const hasAllRoles = (requiredRoles, userRoles) => {
  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  if (!userRoles || userRoles.length === 0) {
    return false;
  }

  return requiredRoles.every((role) => userRoles.includes(role));
};

/**
 * Check if user is an admin
 * @param {string[]} userRoles - Array of user's current roles
 * @returns {boolean} - True if user has admin role
 */
export const isAdmin = (userRoles) => {
  return hasAnyRole(["ADMIN"], userRoles);
};

/**
 * Check if user is a manager
 * @param {string[]} userRoles - Array of user's current roles
 * @returns {boolean} - True if user has manager role
 */
export const isManager = (userRoles) => {
  return hasAnyRole(["MANAGER"], userRoles);
};

/**
 * Check if user has admin or manager privileges
 * @param {string[]} userRoles - Array of user's current roles
 * @returns {boolean} - True if user has admin or manager role
 */
export const hasManagementAccess = (userRoles) => {
  return hasAnyRole(["ADMIN", "MANAGER"], userRoles);
};

/**
 * Get the highest privilege level of a user
 * @param {string[]} userRoles - Array of user's current roles
 * @returns {string} - The highest privilege level (admin, manager, user)
 */
export const getHighestPrivilegeLevel = (userRoles) => {
  if (isAdmin(userRoles)) {
    return "admin";
  }
  if (isManager(userRoles)) {
    return "manager";
  }
  return "user";
};
