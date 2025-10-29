package com.cloudkart.user_auth_service.service.impl;


import java.util.UUID;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.cloudkart.user_auth_service.dto.PagedResponse;
import com.cloudkart.user_auth_service.dto.UserRequest;
import com.cloudkart.user_auth_service.dto.UserResponse;
import com.cloudkart.user_auth_service.dto.UserSearchCriteria;
import com.cloudkart.user_auth_service.entity.User;
import com.cloudkart.user_auth_service.exception.ResourceNotFoundException;
import com.cloudkart.user_auth_service.mapper.UserMapper;
import com.cloudkart.user_auth_service.repository.UserRepository;
import com.cloudkart.user_auth_service.service.IUserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  /**
   * Retrieves a user by their UUID.
   *
   * @param userId the UUID of the user
   * @return the User object corresponding to the provided UUID
   */
  @Override
  public User getUserById(Long userId) {
    return userRepository.findById(userId)
        .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId.toString()));
  }

  @Override
  public UserResponse getUserProfile(UUID userIdentifier) {
    User user = userRepository.findByUserIdentifier(userIdentifier).orElseThrow(
        () -> new ResourceNotFoundException("User", "userIdentifier", userIdentifier.toString()));
    return UserMapper.toUserResponse(user);
  }

  @Override
  public UserResponse createUser(UserRequest userRequest) {
    User user = new User();
    UserMapper.toUser(user, userRequest);
    user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
    User createdUser = userRepository.save(user);
    return UserMapper.toUserResponse(createdUser);
  }

  @Override
  public PagedResponse<UserResponse> fetchAllUsers(UserSearchCriteria criteria, Pageable pageable) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'fetchAllUsers'");
  }

  @Override
  public UserResponse updateUser(UUID userIdentifier, UserRequest userRequest) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'updateUser'");
  }

  @Override
  public void deleteUserById(UUID userIdentifier) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'deleteUserById'");
  }
}
