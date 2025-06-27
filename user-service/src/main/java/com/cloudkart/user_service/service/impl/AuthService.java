package com.cloudkart.user_service.service.impl;

import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.cloudkart.user_service.dto.CreateUserDto;
import com.cloudkart.user_service.dto.RegisterUserDto;
import com.cloudkart.user_service.dto.UserDto;
import com.cloudkart.user_service.entity.User;
import com.cloudkart.user_service.entity.UserRole;
import com.cloudkart.user_service.exception.UserAlreadyExistsException;
import com.cloudkart.user_service.mapper.UserMapper;
import com.cloudkart.user_service.repository.UserRepository;
import com.cloudkart.user_service.service.IAuthService;
import com.cloudkart.user_service.service.client.KeycloakAdminClient;
import com.cloudkart.user_service.util.ICommonUtil;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {

  @Value("${app.master.key}")
  private String masterKey;

  private final UserRepository userRepository;
  private final KeycloakAdminClient keycloakAdminClient;
  private final ICommonUtil commonUtil;

  /**
   * Registers a new user in the system.
   *
   * @param registerUserDto the DTO containing user registration details
   * @return UserDto containing the registered user's information
   * @throws UserAlreadyExistsException if a user with the same username, email, or phone number
   *         already exists
   */
  @Transactional
  @Override
  public UserDto registerUser(RegisterUserDto registerUserDto) {

    if (userRepository.existsByUsernameOrEmailOrPhoneNumber(registerUserDto.getUsername(),
        registerUserDto.getEmail(), registerUserDto.getPhoneNumber())) {
      throw new UserAlreadyExistsException(
          "User with the same username, email, or phone number already exists.");
    }

    Set<String> userRoles = registerUserDto.getRoles().stream().filter(role -> {
      if (role.equals(UserRole.ADMIN.toString())
          && !masterKey.equals(registerUserDto.getMasterKey())) {
        throw new RuntimeException(
            "You are not authorize to create admin user please try with different role.");
      } else if (role.equals(UserRole.ADMIN.toString())) {
        return true;
      }
      return role.equals(UserRole.USER.toString());
    }).collect(Collectors.toSet());

    registerUserDto.setRoles(userRoles);

    String keycloakUserId = keycloakAdminClient.createKeycloakUser(registerUserDto);

    User user = new User();
    UserMapper.toUser(user, registerUserDto, keycloakUserId);
    user = userRepository.save(user);

    return UserMapper.toUserDto(user);
  }

  /**
   * Creates a new user in the system.
   *
   * @param createUserDto the DTO containing user creation details
   * @return UserDto containing the created user's information
   * @throws UserAlreadyExistsException if a user with the same username, email, or phone number
   *         already exists
   */
  @Transactional
  @Override
  public UserDto createUser(CreateUserDto createUserDto) {
    if (userRepository.existsByUsernameOrEmailOrPhoneNumber(createUserDto.getUsername(),
        createUserDto.getEmail(), createUserDto.getPhoneNumber())) {
      throw new UserAlreadyExistsException(
          "User with the same username, email, or phone number already exists.");
    }

    createUserDto.setRoles(createUserDto.getRoles());

    String password = commonUtil.generatePassword(10);
    String keycloakUserId = keycloakAdminClient.createKeycloakUser(createUserDto, password);

    User user = new User();
    UserMapper.toUser(user, createUserDto, keycloakUserId);
    user = userRepository.save(user);

    return UserMapper.toUserDto(user);
  }

}
