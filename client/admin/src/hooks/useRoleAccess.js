import { useKeycloak } from "./useKeycloak";
import {
  hasRouteAccess,
  hasAnyRole,
  hasAllRoles,
  isAdmin,
  isManager,
  hasManagementAccess,
  getHighestPrivilegeLevel,
} from "../utils/roleAccess";

/**
 * Custom hook for role-based access control
 * Provides convenient methods to check user permissions in components
 */
export const useRoleAccess = () => {
  const { roles = [] } = useKeycloak();

  return {
    // User roles
    roles,

    // Role checking functions
    hasRouteAccess: (routeAccess) => hasRouteAccess(routeAccess, roles),
    hasAnyRole: (requiredRoles) => hasAnyRole(requiredRoles, roles),
    hasAllRoles: (requiredRoles) => hasAllRoles(requiredRoles, roles),

    // Convenience role checks
    isAdmin: () => isAdmin(roles),
    isManager: () => isManager(roles),
    hasManagementAccess: () => hasManagementAccess(roles),

    // Utility functions
    getPrivilegeLevel: () => getHighestPrivilegeLevel(roles),

    // Specific permission checks
    canManageUsers: () => hasAnyRole(["ADMIN"], roles),
    canManageProducts: () => hasAnyRole(["ADMIN", "MANAGER"], roles),
    canManageCategories: () => hasAnyRole(["ADMIN", "MANAGER"], roles),
    canViewDashboard: () => hasAnyRole(["ADMIN", "MANAGER"], roles),
  };
};

export default useRoleAccess;
