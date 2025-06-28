import keycloak from "../config/keycloak";

class KeycloakService {
  constructor() {
    this.keycloakInstance = keycloak;
  }

  async initKeycloak() {
    try {
      const authenticated = await this.keycloakInstance.init({
        onLoad: "check-sso",
        silentCheckSsoRedirectUri:
          window.location.origin + "/silent-check-sso.html",
        pkceMethod: "S256",
      });

      return authenticated;
    } catch (error) {
      console.error("Keycloak initialization failed:", error);
      throw error;
    }
  }

  login() {
    return this.keycloakInstance.login({
      redirectUri: window.location.origin,
    });
  }

  logout() {
    return this.keycloakInstance.logout({
      redirectUri: window.location.origin,
    });
  }

  getToken() {
    return this.keycloakInstance.token;
  }

  isAuthenticated() {
    return this.keycloakInstance.authenticated;
  }

  getUserInfo() {
    return this.keycloakInstance.tokenParsed;
  }

  getRoles() {
    return this.keycloakInstance.realmAccess?.roles || [];
  }

  updateToken(minValidity = 30) {
    return this.keycloakInstance.updateToken(minValidity);
  }

  // Setup token refresh
  setupTokenRefresh(dispatch, refreshTokenAction) {
    this.keycloakInstance.onTokenExpired = () => {
      dispatch(refreshTokenAction());
    };
  }
}

export default new KeycloakService();
