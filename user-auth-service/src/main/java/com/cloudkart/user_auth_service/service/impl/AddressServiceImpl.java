package com.cloudkart.user_auth_service.service.impl;

import com.cloudkart.user_auth_service.constants.AddressConstants;
import com.cloudkart.user_auth_service.dto.AddressRequest;
import com.cloudkart.user_auth_service.dto.AddressResponse;
import com.cloudkart.user_auth_service.entity.Address;
import com.cloudkart.user_auth_service.entity.User;
import com.cloudkart.user_auth_service.exception.MaxAddressCountException;
import com.cloudkart.user_auth_service.exception.ResourceNotFoundException;
import com.cloudkart.user_auth_service.mapper.AddressMapper;
import com.cloudkart.user_auth_service.repository.AddressRepository;
import com.cloudkart.user_auth_service.service.IAddressService;
import com.cloudkart.user_auth_service.service.IUserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements IAddressService {
  private final AddressRepository addressRepository;
  private final IUserService userService;

  /**
   * Retrieves a list of addresses associated with a specific user.
   *
   * @param userId the ID of the user whose addresses are to be retrieved
   * @return a list of AddressDto objects representing the user's addresses
   */
  @Override
  public List<AddressResponse> getAddressByUserId(Long userId) {
    List<Address> addresses = addressRepository.findByUserId(userId);
    return addresses.stream().map(AddressMapper::toDto).toList();
  }

  /**
   * Creates a new address for a user.
   *
   * @param addressRequest the addressRequest containing the details of the address to be created
   * @return an AddressDto object representing the created address
   */
  @Transactional
  @Override
  public AddressResponse createAddress(AddressRequest addressRequest) {

    User user = userService.getUserById(addressRequest.getUserId());

    long addressCount = addressRepository.countByUserId(user.getId());
    if (addressCount > AddressConstants.MAX_ADDRESS_COUNT) {
      throw new MaxAddressCountException(AddressConstants.MAX_ADDRESS_MSS);
    }

    Address address = new Address();
    AddressMapper.toEntity(address, addressRequest, user);

    Address savedAddress = addressRepository.save(address);
    updateIsDefault(addressRequest.getIsDefault(), savedAddress.getId(), user.getId());
    return AddressMapper.toDto(savedAddress);
  }

  /**
   * Updates an existing address for a user.
   *
   * @param id the ID of the address to be updated
   * @param addressRequest the addressRequest containing the updated details of the address
   * @return an AddressDto object representing the updated address
   */
  @Transactional
  @Override
  public AddressResponse updateAddress(Long id, AddressRequest addressRequest) {
    Address address = addressRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Address", "id", id.toString()));

    User user = userService.getUserById(addressRequest.getUserId());
    AddressMapper.toEntity(address, addressRequest, user);

    Address updatedAddress = addressRepository.save(address);
    updateIsDefault(addressRequest.getIsDefault(), updatedAddress.getId(), user.getId());

    return AddressMapper.toDto(updatedAddress);
  }

  /**
   * Deletes an address for a user.
   *
   * @param id the ID of the address to be deleted
   * @param userId the ID of the user associated with the address
   */
  @Transactional
  @Override
  public void deleteAddress(Long id, Long userId) {
    addressRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Address", "id", id.toString()));
    addressRepository.deleteByIdAndUserId(id, userId);
  }

  private void updateIsDefault(boolean isDefault, Long id, Long userId) {
    if (isDefault) {
      // Reset all default addresses for the user and set the new one as default
      addressRepository.resetDefaultAddressForUser(userId);
      addressRepository.setAsDefaultAddress(id, userId);
    }
  }
}
