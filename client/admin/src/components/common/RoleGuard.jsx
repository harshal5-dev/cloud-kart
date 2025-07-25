import React from "react";
import PropTypes from "prop-types";
import { useRoleAccess } from "../../hooks/useRoleAccess";

/**
 * Component for conditional rendering based on user roles
 * Only renders children if user has the required roles
 */
const RoleGuard = ({
  roles = [],
  requireAll = false,
  children,
  fallback = null,
  inverse = false,
}) => {
  const { hasAnyRole, hasAllRoles } = useRoleAccess();

  let hasAccess;

  // Determine access based on requirements
  if (requireAll) {
    hasAccess = hasAllRoles(roles);
  } else {
    hasAccess = hasAnyRole(roles);
  }

  // If inverse is true, invert the access check
  if (inverse) {
    hasAccess = !hasAccess;
  }

  // Render children if user has access, otherwise render fallback
  return hasAccess ? children : fallback;
};

RoleGuard.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string),
  requireAll: PropTypes.bool,
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
  inverse: PropTypes.bool,
};

export default RoleGuard;
