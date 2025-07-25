package com.cloudkart.user_service.service;


import java.util.List;
import java.util.UUID;
import com.cloudkart.user_service.dto.AddressDto;
import com.cloudkart.user_service.dto.AddressReqDto;

public interface IAddressService {

  /**
   * Retrieves a list of addresses associated with a specific user.
   *
   * @param userId the UUID of the user whose addresses are to be retrieved
   * @return a list of AddressDto objects representing the user's addresses
   */
  List<AddressDto> getAddressByUserId(UUID userId);

  /**
   * Retrieves the default address for a specific user.
   *
   * @param userId the UUID of the user whose default address is to be retrieved
   * @return an AddressDto object representing the user's default address
   */
  AddressDto getDefaultUserAddress(UUID userId);

  /**
   * Counts the number of addresses associated with a specific user.
   *
   * @param userId the UUID of the user whose addresses are to be counted
   * @return the count of addresses associated with the user
   */
  long countUserAddresses(UUID userId);

  /**
   * Creates a new address for a user.
   *
   * @param addressReqDto the AddressReqDto containing the details of the address to be created
   * @return an AddressDto object representing the created address
   */
  AddressDto createAddress(AddressReqDto addressReqDto);

  /**
   * Updates an existing address for a user.
   *
   * @param id the UUID of the address to be updated
   * @param addressReqDto the AddressReqDto containing the updated details of the address
   * @return an AddressDto object representing the updated address
   */
  AddressDto updateAddress(UUID id, AddressReqDto addressReqDto);

  /**
   * Deletes an address for a user.
   *
   * @param id the UUID of the address to be deleted
   * @param userId the UUID of the user associated with the address
   */
  void deleteAddress(UUID id, UUID userId);
}
