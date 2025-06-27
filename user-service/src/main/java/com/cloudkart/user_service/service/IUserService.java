package com.cloudkart.user_service.service;

import java.util.UUID;
import org.springframework.data.domain.Pageable;
import com.cloudkart.user_service.dto.PagedResDto;
import com.cloudkart.user_service.dto.UpdateUserDto;
import com.cloudkart.user_service.dto.UserDto;
import com.cloudkart.user_service.dto.UserSearchCriteria;
import com.cloudkart.user_service.entity.User;

public interface IUserService {

  /**
   * Gets a user profile by Keycloak ID.
   *
   * @param keycloakId the Keycloak ID of the user
   * @return the UserDto containing user profile information
   */
  UserDto getUserProfile(String keycloakId);


  PagedResDto<UserDto> fetchAllUsers(String keycloakId, UserSearchCriteria criteria,
      Pageable pageable);

  /**
   * Updates the user profile with the provided update data.
   *
   * @param keycloakId the Keycloak ID of the user to update
   * @param updateUserDto the UpdateUserDto containing updated user information
   * @return the updated UserDto
   */
  UserDto updateUserProfile(String keycloakId, UpdateUserDto updateUserDto);

  /**
   * Retrieves a user by their UUID.
   *
   * @param userId the UUID of the user
   * @return the User object corresponding to the provided UUID
   */
  User getUserById(UUID userId);

  /**
   * Deletes a user by their UUID.
   *
   * @param userId the UUID of the user to delete
   */
  void deleteUserById(String userId);
}
