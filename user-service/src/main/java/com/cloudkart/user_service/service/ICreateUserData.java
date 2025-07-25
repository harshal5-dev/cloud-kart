package com.cloudkart.user_service.service;

import com.cloudkart.user_service.dto.CreateUserDataDto;

public interface ICreateUserData {

  /**
   * Creates user data including registration and address creation.
   *
   * @param createUserDataDto the data required to create users and their addresses
   */
  void  createUserData(CreateUserDataDto createUserDataDto);
}
