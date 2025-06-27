package com.cloudkart.user_service.service;

import com.cloudkart.user_service.dto.CreateUserDto;
import com.cloudkart.user_service.dto.RegisterUserDto;
import com.cloudkart.user_service.dto.UserDto;
import com.cloudkart.user_service.exception.UserAlreadyExistsException;

public interface IAuthService {

  /**
   * Registers a new user with the provided registration data.
   *
   * @param registerUserDto the RegisterUserDto containing user registration information
   * @return the registered UserDto
   * @throws UserAlreadyExistsException if a user with the same username, email, or phone number
   *         already exists
   */
  UserDto registerUser(RegisterUserDto registerUserDto);


  /**
   * Creates a new user with the provided user creation data.
   *
   * @param createUserDto the CreateUserDto containing user creation information
   * @return the created UserDto
   */
  // Note: This method is used for creating users by admin or other services, not for
  UserDto createUser(CreateUserDto createUserDto);
}
