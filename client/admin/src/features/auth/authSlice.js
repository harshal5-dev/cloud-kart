import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import keycloak from "../../config/keycloak";

export const initializeKeycloak = createAsyncThunk(
  "auth/initializeKeycloak",
  async (_, { rejectWithValue }) => {
    try {
      const authenticated = await keycloak.init({
        onLoad: "check-sso",
        silentCheckSsoRedirectUri:
          window.location.origin + "/silent-check-sso.html",
        pkceMethod: "S256",
        flow: "standard",
      });

      if (authenticated) {
        return {
          isAuthenticated: true,
          token: keycloak.token,
          refreshToken: keycloak.refreshToken,
          userInfo: keycloak.tokenParsed,
          roles: keycloak.realmAccess?.roles || [],
        };
      }

      return {
        isAuthenticated: false,
        token: null,
        refreshToken: null,
        userInfo: null,
        roles: [],
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for login
export const loginWithKeycloak = createAsyncThunk(
  "auth/loginWithKeycloak",
  async (_, { rejectWithValue }) => {
    try {
      await keycloak.login({
        redirectUri: window.location.origin,
      });

      return {
        isAuthenticated: true,
        token: keycloak.token,
        refreshToken: keycloak.refreshToken,
        userInfo: keycloak.tokenParsed,
        roles: keycloak.realmAccess?.roles || [],
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for logout
export const logoutFromKeycloak = createAsyncThunk(
  "auth/logoutFromKeycloak",
  async (_, { rejectWithValue }) => {
    try {
      await keycloak.logout({
        redirectUri: window.location.origin,
      });

      return {
        isAuthenticated: false,
        token: null,
        refreshToken: null,
        userInfo: null,
        roles: [],
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for token refresh
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const refreshed = await keycloak.updateToken(30);

      if (refreshed) {
        return {
          token: keycloak.token,
          refreshToken: keycloak.refreshToken,
          userInfo: keycloak.tokenParsed,
        };
      }

      return { token: keycloak.token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isLoading: false,
    token: null,
    refreshToken: null,
    userInfo: null,
    roles: [],
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.userInfo = action.payload.userInfo;
      state.roles = action.payload.roles;
    },
  },
  extraReducers: (builder) => {
    builder
      // Initialize Keycloak
      .addCase(initializeKeycloak.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initializeKeycloak.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.userInfo = action.payload.userInfo;
        state.roles = action.payload.roles;
      })
      .addCase(initializeKeycloak.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginWithKeycloak.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithKeycloak.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.userInfo = action.payload.userInfo;
        state.roles = action.payload.roles;
      })
      .addCase(loginWithKeycloak.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutFromKeycloak.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.userInfo = action.payload.userInfo;
        state.roles = action.payload.roles;
      })

      // Refresh Token
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        if (action.payload.refreshToken) {
          state.refreshToken = action.payload.refreshToken;
        }
        if (action.payload.userInfo) {
          state.userInfo = action.payload.userInfo;
        }
      });
  },
});

export const { clearError, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
