# Role-Based Access Control (RBAC) System

This system provides comprehensive role-based access control for the Cloud Kart admin application.

## Available Roles

- `canAdmin` - Full administrative access
- `canManager` - Management level access (limited admin features)

## Utilities

### 1. Role Access Utilities (`utils/roleAccess.js`)

#### `hasRouteAccess(routeAccess, userRoles)`
Checks if user has access to a route based on required roles.

#### `filterRoutesByAccess(routes, userRoles)`
Filters an array of routes based on user roles.

#### `canAccessPath(path, routes, userRoles)`
Checks if user can navigate to a specific path.

#### `hasAnyRole(requiredRoles, userRoles)`
Checks if user has any of the specified roles.

#### `hasAllRoles(requiredRoles, userRoles)`
Checks if user has all of the specified roles.

#### `isAdmin(userRoles)` / `isManager(userRoles)`
Convenience functions for role checking.

### 2. Custom Hook (`hooks/useRoleAccess.js`)

```jsx
import { useRoleAccess } from '../hooks/useRoleAccess';

const MyComponent = () => {
  const { 
    isAdmin, 
    canManageUsers, 
    hasAnyRole 
  } = useRoleAccess();

  if (isAdmin()) {
    return <AdminPanel />;
  }

  return <RegularPanel />;
};
```

### 3. Higher-Order Component (`components/hoc/withRoleAccess.jsx`)

```jsx
import withRoleAccess from '../components/hoc/withRoleAccess';

// Protect entire component
const AdminOnlyComponent = withRoleAccess(MyComponent, ['canAdmin']);

// With options
const ManagerComponent = withRoleAccess(MyComponent, ['canManager'], {
  redirectTo: '/unauthorized',
  showAccessDenied: true
});
```

### 4. Role Guard Component (`components/common/RoleGuard.jsx`)

```jsx
import RoleGuard from '../components/common/RoleGuard';

const MyComponent = () => {
  return (
    <div>
      <h1>Welcome</h1>
      
      {/* Show only to admins */}
      <RoleGuard roles={['canAdmin']}>
        <AdminControls />
      </RoleGuard>
      
      {/* Show to admins or managers */}
      <RoleGuard roles={['canAdmin', 'canManager']}>
        <ManagementPanel />
      </RoleGuard>
      
      {/* Show only if user has ALL specified roles */}
      <RoleGuard roles={['canAdmin', 'canManager']} requireAll={true}>
        <SuperAdminPanel />
      </RoleGuard>
      
      {/* Show with fallback */}
      <RoleGuard 
        roles={['canAdmin']} 
        fallback={<div>Access Denied</div>}
      >
        <AdminContent />
      </RoleGuard>
      
      {/* Inverse - show only if user DOESN'T have role */}
      <RoleGuard roles={['canAdmin']} inverse={true}>
        <NonAdminContent />
      </RoleGuard>
    </div>
  );
};
```

## Route Configuration

Routes are configured with access control in `AppLayout.jsx`:

```jsx
const route = {
  path: "/dashboard",
  routes: [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <MdDashboard />,
      access: ["canAdmin", "canManager"], // Both roles can access
    },
    {
      path: "/users",
      name: "Users",
      icon: <FaUsers />,
      access: ["canAdmin"], // Only admins can access
    },
  ],
};
```

## Usage Examples

### Protecting Routes
```jsx
// Method 1: Using HOC
const ProtectedUsers = withRoleAccess(Users, ['canAdmin']);

// Method 2: Using RoleGuard in render
const Dashboard = () => (
  <div>
    <RoleGuard roles={['canAdmin']}>
      <UserManagement />
    </RoleGuard>
  </div>
);
```

### Conditional Rendering
```jsx
const Toolbar = () => {
  const { canManageUsers, isAdmin } = useRoleAccess();
  
  return (
    <div>
      {canManageUsers() && <AddUserButton />}
      {isAdmin() && <SystemSettings />}
    </div>
  );
};
```

### Navigation Guards
The system automatically filters navigation menu items based on user roles. Users will only see menu items they have access to.

## Best Practices

1. **Use RoleGuard for UI elements** - Small sections, buttons, or content blocks
2. **Use withRoleAccess for entire pages** - Complete route protection
3. **Use useRoleAccess hook for logic** - Complex conditional logic
4. **Always provide fallbacks** - Better UX when access is denied
5. **Test with different roles** - Ensure proper access control

## Security Notes

- This is frontend-only access control for UX purposes
- Always implement proper backend authorization
- Never rely solely on frontend role checks for security
- Backend APIs should validate permissions for all operations
