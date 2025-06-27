package com.cloudkart.user_service.mapper;

import java.util.stream.Collectors;
import com.cloudkart.user_service.dto.CreateUserDto;
import com.cloudkart.user_service.dto.RegisterUserDto;
import com.cloudkart.user_service.dto.UpdateUserDto;
import com.cloudkart.user_service.dto.UserDto;
import com.cloudkart.user_service.entity.User;
import com.cloudkart.user_service.entity.UserRole;


public final class UserMapper {

  public static UserDto toUserDto(User user) {
    UserDto userDto = new UserDto();

    userDto.setId(user.getId());
    userDto.setKeycloakId(user.getKeycloakId());
    userDto.setUsername(user.getUsername());
    userDto.setEmail(user.getEmail());
    userDto.setFirstName(user.getFirstName());
    userDto.setLastName(user.getLastName());
    userDto.setPhoneNumber(user.getPhoneNumber());
    userDto.setRoles(user.getUserRoles().stream().map(Enum::toString).collect(Collectors.toSet()));

    return userDto;
  }

  public static void toUser(User user, UpdateUserDto updateUserDto) {

    user.setFirstName(updateUserDto.getFirstName());
    user.setLastName(updateUserDto.getLastName());
    user.setPhoneNumber(updateUserDto.getPhoneNumber());

  }


  public static void toUser(User user, RegisterUserDto registerUserDto, String keycloakId) {

    user.setUsername(registerUserDto.getUsername());
    user.setKeycloakId(keycloakId);
    user.setEmail(registerUserDto.getEmail());
    user.setFirstName(registerUserDto.getFirstName());
    user.setLastName(registerUserDto.getLastName());
    user.setPhoneNumber(registerUserDto.getPhoneNumber());
    user.setUserRoles(
        registerUserDto.getRoles().stream().map(UserRole::valueOf).collect(Collectors.toSet()));

  }

  public static void toUser(User user, CreateUserDto createUserDto, String keycloakId) {

    user.setUsername(createUserDto.getUsername());
    user.setKeycloakId(keycloakId);
    user.setEmail(createUserDto.getEmail());
    user.setFirstName(createUserDto.getFirstName());
    user.setLastName(createUserDto.getLastName());
    user.setPhoneNumber(createUserDto.getPhoneNumber());
    user.setUserRoles(
        createUserDto.getRoles().stream().map(UserRole::valueOf).collect(Collectors.toSet()));

  }
}
