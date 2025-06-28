import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  initializeKeycloak,
  loginWithKeycloak,
  logoutFromKeycloak,
  refreshToken,
} from "../features/auth/authSlice";
import keycloakService from "../services/keycloakService";

export const useKeycloak = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    // Initialize Keycloak when the hook is first used
    dispatch(initializeKeycloak());

    // Setup token refresh
    keycloakService.setupTokenRefresh(dispatch, refreshToken);
  }, [dispatch]);

  const login = () => {
    dispatch(loginWithKeycloak());
  };

  const logout = () => {
    dispatch(logoutFromKeycloak());
  };

  return {
    ...authState,
    login,
    logout,
    keycloak: keycloakService.keycloakInstance,
  };
};
