package com.cloudkart.user_service.service.impl;

import com.cloudkart.user_service.dto.AddressReqDto;
import com.cloudkart.user_service.dto.CreateUserDataDto;
import com.cloudkart.user_service.dto.RegisterUserDto;
import com.cloudkart.user_service.dto.UserDto;
import com.cloudkart.user_service.service.IAddressService;
import com.cloudkart.user_service.service.IAuthService;
import com.cloudkart.user_service.service.ICreateUserData;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CreateDataService implements ICreateUserData {

  @Value("${app.master.key}")
  private String masterKey;

  private final IAuthService authService;
  private final IAddressService addressService;

  /**
   * Creates user data by registering users and adding their addresses.
   *
   * @param createUserDataDto the DTO containing user registration details and addresses
   */
  @Transactional
  @Override
  public void  createUserData(CreateUserDataDto createUserDataDto) {

    if (!masterKey.equals(createUserDataDto.getMasterKey())) {
      throw new RuntimeException("You are not authorized to create user data with this master key.");
    }

    List <RegisterUserDto> users = createUserDataDto.getUsers();

    for (RegisterUserDto user : users) {
      // Register user
      UserDto createdUser = authService.registerUser(user);

      for (AddressReqDto addressReqDto: user.getAddresses()) {
        // Add address for the user
        addressReqDto.setUserId(createdUser.getId());
        addressService.createAddress(addressReqDto);
      }
    }
  }

}
