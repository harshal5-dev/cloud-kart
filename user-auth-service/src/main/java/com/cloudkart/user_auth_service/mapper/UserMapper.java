package com.cloudkart.user_auth_service.mapper;

import java.util.UUID;
import java.util.stream.Collectors;
import com.cloudkart.user_auth_service.dto.UserRequest;
import com.cloudkart.user_auth_service.dto.UserResponse;
import com.cloudkart.user_auth_service.entity.Status;
import com.cloudkart.user_auth_service.entity.User;
import com.cloudkart.user_auth_service.entity.UserRole;

public final class UserMapper {

  private UserMapper() {
    // Private constructor to prevent instantiation
  }

  public static UserResponse toUserResponse(User user) {
    UserResponse userResponse = new UserResponse();

    userResponse.setId(user.getId());
    userResponse.setUserIdentifier(user.getUserIdentifier());
    userResponse.setUsername(user.getUsername());
    userResponse.setEmail(user.getEmail());
    userResponse.setFirstName(user.getFirstName());
    userResponse.setLastName(user.getLastName());
    userResponse.setPhoneNumber(user.getPhoneNumber());
    userResponse
        .setRoles(user.getUserRoles().stream().map(Enum::toString).collect(Collectors.toSet()));
    userResponse.setProfilePictureUrl(user.getProfilePictureUrl());
    userResponse.setStatus(user.getStatus().toString());

    return userResponse;
  }


  // public static void toUser(User user, RegisterUserDto registerUserDto, String keycloakId) {

  // user.setUsername(registerUserDto.getUsername());
  // user.setKeycloakId(keycloakId);
  // user.setEmail(registerUserDto.getEmail());
  // user.setFirstName(registerUserDto.getFirstName());
  // user.setLastName(registerUserDto.getLastName());
  // user.setPhoneNumber(registerUserDto.getPhoneNumber());
  // user.setProfilePictureUrl(registerUserDto.getProfilePictureUrl());
  // user.setStatus(Status.valueOf(registerUserDto.getStatus().toUpperCase()));
  // user.setUserRoles(
  // registerUserDto.getRoles().stream().map(UserRole::valueOf).collect(Collectors.toSet()));

  // }

  public static void toUser(User user, UserRequest userRequest) {

    user.setUsername(userRequest.getUsername());
    user.setEmail(userRequest.getEmail());
    user.setFirstName(userRequest.getFirstName());
    user.setLastName(userRequest.getLastName());
    user.setPhoneNumber(userRequest.getPhoneNumber());
    user.setUserRoles(
        userRequest.getRoles().stream().map(UserRole::valueOf).collect(Collectors.toSet()));
    user.setProfilePictureUrl(userRequest.getProfilePictureUrl());
    user.setStatus(Status.valueOf(userRequest.getStatus().toUpperCase()));
    user.setUserIdentifier(UUID.randomUUID());

  }

}
