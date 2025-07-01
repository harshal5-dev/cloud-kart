import Keycloak from "keycloak-js";

const keycloakConfig = {
  url: "http://localhost:7081",
  realm: "ecommerce",
  clientId: "ck-admin-ui-client",
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
