package com.cloudkart.user_auth_service.service;

import com.cloudkart.user_auth_service.dto.AddressRequest;
import com.cloudkart.user_auth_service.dto.AddressResponse;

import java.util.List;

public interface IAddressService {

  /**
   * Retrieves a list of addresses associated with a specific user.
   *
   * @param userId the ID of the user whose addresses are to be retrieved
   * @return a list of AddressDto objects representing the user's addresses
   */
  List<AddressResponse> getAddressByUserId(Long userId);

  /**
   * Creates a new address for a user.
   *
   * @param addressReqDto the AddressReqDto containing the details of the address to be created
   * @return an AddressDto object representing the created address
   */
  AddressResponse createAddress(AddressRequest addressReqDto);

  /**
   * Updates an existing address for a user.
   *
   * @param id the ID of the address to be updated
   * @param addressReqDto the AddressReqDto containing the updated details of the address
   * @return an AddressDto object representing the updated address
   */
  AddressResponse updateAddress(Long id, AddressRequest addressReqDto);

  /**
   * Deletes an address for a user.
   *
   * @param id the ID of the address to be deleted
   * @param userId the ID of the user associated with the address
   */
  void deleteAddress(Long id, Long userId);
}
