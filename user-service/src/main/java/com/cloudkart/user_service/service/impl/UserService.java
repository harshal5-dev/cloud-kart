package com.cloudkart.user_service.service.impl;

import java.util.UUID;
import java.util.stream.Collectors;

import com.cloudkart.user_service.entity.Status;
import com.cloudkart.user_service.entity.UserRole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.cloudkart.user_service.dto.PagedResDto;
import com.cloudkart.user_service.dto.UpdateUserDto;
import com.cloudkart.user_service.dto.UserDto;
import com.cloudkart.user_service.dto.UserSearchCriteria;
import com.cloudkart.user_service.entity.User;
import com.cloudkart.user_service.exception.ResourceNotFoundException;
import com.cloudkart.user_service.exception.UserAlreadyExistsException;
import com.cloudkart.user_service.mapper.CommonMapper;
import com.cloudkart.user_service.mapper.UserMapper;
import com.cloudkart.user_service.repository.UserRepository;
import com.cloudkart.user_service.service.IUserService;
import com.cloudkart.user_service.service.client.KeycloakAdminClient;
import com.cloudkart.user_service.specification.UserSpecifications;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

  private final UserRepository userRepository;
  private final KeycloakAdminClient keycloakAdminClient;

  /**
   * Fetches all users except the one with the specified Keycloak ID.
   *
   * @param keycloakId the Keycloak ID of the user to exclude from the results
   * @param criteria the search criteria containing optional search terms
   * @param pageable pagination information
   * @return a paginated response containing UserDto objects
   */
  @Override
  public PagedResDto<UserDto> fetchAllUsers(String keycloakId, UserSearchCriteria criteria,
      Pageable pageable) {

    Specification<User> spec = UserSpecifications.keycloakIdNotEqual(keycloakId)
        .and(UserSpecifications.containsTextInNameOrEmail(criteria.getSearchTerm()));

    Page<User> users = userRepository.findAll(spec, pageable);
    Page<UserDto> userDtoPage = users.map(UserMapper::toUserDto);
    return CommonMapper.mapToPagedResDto(userDtoPage);
  }

  /**
   * Retrieves the user profile by Keycloak ID.
   *
   * @param keycloakId the Keycloak ID of the user
   * @return UserDto containing user profile information
   */
  @Override
  public UserDto getUserProfile(String keycloakId) {
    User user = userRepository.findByKeycloakId(keycloakId)
        .orElseThrow(() -> new ResourceNotFoundException("User", "id", keycloakId));
    return UserMapper.toUserDto(user);
  }


  /**
   * Updates the user profile with the provided update data.
   *
   * @param keycloakId the Keycloak ID of the user to update
   * @param updateUserDto the UpdateUserDto containing updated user information
   * @return the updated UserDto
   */
  @Transactional
  @Override
  public UserDto updateUserProfile(String keycloakId, UpdateUserDto updateUserDto) {
    User user = userRepository.findByKeycloakId(keycloakId)
        .orElseThrow(() -> new ResourceNotFoundException("User", "id", keycloakId));

    if (userRepository.existsByPhoneNumberAndKeycloakIdNot(updateUserDto.getPhoneNumber(),
        keycloakId)) {
      throw new UserAlreadyExistsException("User with the same phone number already exists.");
    }

    keycloakAdminClient.updateKeycloakUser(keycloakId, updateUserDto);

    UserMapper.toUser(user, updateUserDto);
    User updatedUser = userRepository.save(user);

    return UserMapper.toUserDto(updatedUser);
  }


  /**
   * Updates a user by their Keycloak ID.
   *
   * @param keycloakId the Keycloak ID of the user to update
   * @param updateUserDto the UpdateUserDto containing updated user information
   * @return the updated UserDto
   */
  @Transactional
  @Override
  public UserDto updateUser(String keycloakId, UpdateUserDto updateUserDto) {
    User user = userRepository.findByKeycloakId(keycloakId)
            .orElseThrow(() -> new ResourceNotFoundException("User", "id", keycloakId));

    if (userRepository.existsByPhoneNumberAndKeycloakIdNot(updateUserDto.getPhoneNumber(),
            keycloakId)) {
      throw new UserAlreadyExistsException("User with the same phone number already exists.");
    }

    keycloakAdminClient.updateKeycloakUser(keycloakId, updateUserDto);

    UserMapper.toUser(user, updateUserDto);
    user.setUserRoles(
            updateUserDto.getRoles().stream().map(UserRole::valueOf).collect(Collectors.toSet()));
    user.setStatus(Status.valueOf(updateUserDto.getStatus().toUpperCase()));

    User updatedUser = userRepository.save(user);

    return UserMapper.toUserDto(updatedUser);
  }

  /**
   * Retrieves a user by their UUID.
   *
   * @param userId the UUID of the user
   * @return the User object corresponding to the provided UUID
   */
  @Override
  public User getUserById(UUID userId) {
    return userRepository.findById(userId)
        .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId.toString()));
  }

  /**
   * Deletes a user by their UUID.
   *
   * @param userId the UUID of the user to delete
   */
  @Override
  public void deleteUserById(String userId) {
    User user = userRepository.findByKeycloakId(userId)
        .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
    keycloakAdminClient.deleteKeycloakUser(user.getKeycloakId());
    userRepository.delete(user);
  }
}
