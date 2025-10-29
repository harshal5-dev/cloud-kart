package com.cloudkart.user_auth_service.service.impl;


import com.cloudkart.user_auth_service.entity.User;
import com.cloudkart.user_auth_service.exception.ResourceNotFoundException;
import com.cloudkart.user_auth_service.repository.UserRepository;
import com.cloudkart.user_auth_service.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {

  private final UserRepository userRepository;

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
}
