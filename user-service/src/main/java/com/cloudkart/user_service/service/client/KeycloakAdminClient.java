package com.cloudkart.user_service.service.client;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.RoleResource;
import org.keycloak.admin.client.resource.RolesResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.cloudkart.user_service.dto.CreateUserDto;
import com.cloudkart.user_service.dto.RegisterUserDto;
import com.cloudkart.user_service.dto.UpdateUserDto;
import com.cloudkart.user_service.exception.KeycloakPasswordResetException;
import com.cloudkart.user_service.exception.UserRegistrationException;
import jakarta.ws.rs.ClientErrorException;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class KeycloakAdminClient {

  @Value("${keycloak.realm}")
  private String realm;

  private final Keycloak keycloak;


  private String createUser(UserRepresentation userRepresentation, Set<String> roles,
      String password, boolean isTemporaryPassword) {
    UsersResource users = keycloak.realm(realm).users();

    userRepresentation.setEnabled(true);
    userRepresentation.setEmailVerified(true);

    try (Response response = users.create(userRepresentation)) {
      if (response.getStatus() == 201) {
        String userId = getCreatedId(response);
        assignRolesToUser(userId, roles);
        setUserPassword(userId, password, isTemporaryPassword);
        if (isTemporaryPassword) {
          sendPasswordResetEmail(userId);
        }
        return userId;
      } else if (response.getStatus() == 409) {
        throw new UserRegistrationException("User already exists");
      } else {
        throw new UserRegistrationException(
            "Failed to create user: " + response.getStatusInfo().getReasonPhrase());
      }
    } catch (KeycloakPasswordResetException e) {
      throw new UserRegistrationException("Failed to send password reset email: " + e.getMessage());
    }

  }

  public String createKeycloakUser(CreateUserDto createUserDto, String password) {

    UserRepresentation keycloakUser = new UserRepresentation();
    keycloakUser.setUsername(createUserDto.getUsername());
    keycloakUser.setEmail(createUserDto.getEmail());
    keycloakUser.setFirstName(createUserDto.getFirstName());
    keycloakUser.setLastName(createUserDto.getLastName());

    return createUser(keycloakUser, createUserDto.getRoles(), password, true);
  }

  public String createKeycloakUser(RegisterUserDto registerUserDto) {

    UserRepresentation keycloakUser = new UserRepresentation();
    keycloakUser.setUsername(registerUserDto.getUsername());
    keycloakUser.setEmail(registerUserDto.getEmail());
    keycloakUser.setFirstName(registerUserDto.getFirstName());
    keycloakUser.setLastName(registerUserDto.getLastName());
    return createUser(keycloakUser, registerUserDto.getRoles(), registerUserDto.getPassword(),
        false);
  }

  private void setUserPassword(String userId, String password, boolean temporary) {
    if (userId == null || userId.isEmpty()) {
      throw new IllegalArgumentException("User ID cannot be null or empty");
    }
    if (password == null || password.isEmpty()) {
      throw new IllegalArgumentException("Password cannot be null or empty");
    }

    CredentialRepresentation cred = new CredentialRepresentation();
    cred.setType(CredentialRepresentation.PASSWORD);
    cred.setValue(password);
    cred.setTemporary(temporary);

    UserResource userResource = keycloak.realm(realm).users().get(userId);

    try {
      userResource.resetPassword(cred);
      userResource.toRepresentation();
    } catch (NotFoundException e) {
      throw new UserRegistrationException("User not found with ID: " + userId);
    } catch (ClientErrorException e) {
      Response response = e.getResponse();
      throw new UserRegistrationException(
          "Failed to set password: " + response.getStatusInfo().getReasonPhrase());
    } catch (RuntimeException e) {
      throw new UserRegistrationException("Error setting password");
    }
  }

  private void assignRolesToUser(String userId, Set<String> roleNames) {
    try {
      RealmResource realmResource = keycloak.realm(realm);
      UserResource userResource = realmResource.users().get(userId);
      RolesResource rolesResource = realmResource.roles();

      try {
        userResource.toRepresentation();
      } catch (NotFoundException e) {
        throw new RuntimeException("User not found with ID: " + userId, e);
      }

      List<RoleRepresentation> rolesToAssign = new ArrayList<>();
      for (String roleName : roleNames) {
        try {
          RoleResource roleResource = rolesResource.get(roleName);
          rolesToAssign.add(roleResource.toRepresentation());
        } catch (NotFoundException e) {
          throw new RuntimeException("Role not found: " + roleName, e);
        }
      }

      if (!rolesToAssign.isEmpty()) {
        userResource.roles().realmLevel().add(rolesToAssign);
      }
    } catch (ClientErrorException e) {
      if (e.getResponse().getStatus() == 403) {
        throw new RuntimeException("Insufficient permissions to assign roles", e);
      }
      throw new RuntimeException("Failed to assign roles", e);
    }
  }

  private String getCreatedId(Response response) {
    URI location = response.getLocation();
    if (location == null) {
      throw new RuntimeException("No Location header in response");
    }
    String path = location.getPath();
    return path.substring(path.lastIndexOf('/') + 1);
  }

  public void updateKeycloakUser(String userId, UpdateUserDto updateUserDto) {
    RealmResource realmResource = keycloak.realm(realm);
    UserResource userResource = realmResource.users().get(userId);
    UserRepresentation keycloakUser = userResource.toRepresentation();

    keycloakUser.setFirstName(updateUserDto.getFirstName());
    keycloakUser.setLastName(updateUserDto.getLastName());
    boolean isEnabled = updateUserDto.getStatus().equals("ACTIVE");
    keycloakUser.setEnabled(isEnabled);

    userResource.update(keycloakUser);
  }

  private void sendPasswordResetEmail(String userId) throws KeycloakPasswordResetException {

    UserResource userResource = keycloak.realm(realm).users().get(userId);

    try {
      List<String> actions = List.of("UPDATE_PASSWORD");

      userResource.executeActionsEmail(actions);

    } catch (WebApplicationException e) {
      throw new KeycloakPasswordResetException(
          "Failed to send password reset email: " + e.getMessage(), e.getResponse().getStatus());
    } catch (Exception e) {
      throw new KeycloakPasswordResetException(
          "Error sending password reset email: " + e.getMessage(), 500);
    }
  }

  public void deleteKeycloakUser(String userId) {
    try {
      keycloak.realm(realm).users().delete(userId);
    } catch (NotFoundException e) {
      throw new RuntimeException("User not found with ID: " + userId, e);
    } catch (ClientErrorException e) {
      if (e.getResponse().getStatus() == 403) {
        throw new RuntimeException("Insufficient permissions to delete user", e);
      }
      throw new RuntimeException("Failed to delete user", e);
    }
  }
}
