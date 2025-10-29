package com.cloudkart.user_auth_service.service;

import java.util.UUID;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import com.cloudkart.user_auth_service.dto.PagedResponse;
import com.cloudkart.user_auth_service.dto.UserRequest;
import com.cloudkart.user_auth_service.dto.UserResponse;
import com.cloudkart.user_auth_service.dto.UserSearchCriteria;
import com.cloudkart.user_auth_service.entity.User;

public interface IUserService {

  /**
   * Gets a user profile by Keycloak ID.
   *
   * @param userIdentifier the UUID of the user
   * @return the UserDto containing user profile information
   */
  UserResponse getUserProfile(UUID userIdentifier);


  /**
   * Fetches all users based on search criteria and pagination details.
   *
   * @param criteria the UserSearchCriteria containing search filters
   * @param pageable the Pageable object containing pagination details
   * @return a PagedResponse containing a list of UserDto objects
   */
  PagedResponse<UserResponse> fetchAllUsers(UserSearchCriteria criteria, Pageable pageable);


  /**
   * Creates a new user with the provided user data.
   *
   * @param userRequest the UserRequest containing user information
   * @return the created UserResponse object
   */
  UserResponse createUser(UserRequest userRequest);

  /**
   * Updates the user profile with the provided update data.
   *
   * @param userIdentifier the UUID of the user to update
   * @param userRequest the UserRequest containing updated user information
   * @return the updated UserResponse object
   */
  UserResponse updateUser(UUID userIdentifier, UserRequest userRequest);


  /**
   * Retrieves a user by their ID.
   *
   * @param userId the ID of the user
   * @return the User object corresponding to the provided ID
   */
  User getUserById(Long userId);

  /**
   * Deletes a user by their ID.
   *
   * @param userId the ID of the user to delete
   */
  void deleteUserById(UUID userIdentifier);
}
