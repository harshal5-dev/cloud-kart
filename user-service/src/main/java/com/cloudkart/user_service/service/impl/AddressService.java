package com.cloudkart.user_service.service.impl;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.cloudkart.user_service.constants.AddressConstants;
import com.cloudkart.user_service.dto.AddressDto;
import com.cloudkart.user_service.dto.AddressReqDto;
import com.cloudkart.user_service.entity.Address;
import com.cloudkart.user_service.entity.User;
import com.cloudkart.user_service.exception.MaxAddressCountException;
import com.cloudkart.user_service.exception.ResourceNotFoundException;
import com.cloudkart.user_service.mapper.AddressMapper;
import com.cloudkart.user_service.repository.AddressRepository;
import com.cloudkart.user_service.service.IAddressService;
import com.cloudkart.user_service.service.IUserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AddressService implements IAddressService {
  private final AddressRepository addressRepository;
  private final IUserService userService;

  /**
   * Retrieves a list of addresses associated with a specific user.
   *
   * @param userId the ID of the user whose addresses are to be retrieved
   * @return a list of AddressDto objects representing the user's addresses
   */
  @Override
  public List<AddressDto> getAddressByUserId(Long userId) {
    List<Address> addresses = addressRepository.findByUserId(userId);
    return addresses.stream().map(AddressMapper::toAddressDto).toList();
  }

  /**
   * Retrieves the default address for a specific user.
   *
   * @param userId the ID of the user whose default address is to be retrieved
   * @return an AddressDto object representing the user's default address
   */
  @Override
  public AddressDto getDefaultUserAddress(Long userId) {
    return addressRepository.findDefaultAddressByUserId(userId).map(AddressMapper::toAddressDto)
        .orElse(null);
  }

  /**
   * Counts the number of addresses associated with a specific user.
   *
   * @param userId the ID of the user whose addresses are to be counted
   * @return the count of addresses associated with the user
   */
  @Override
  public long countUserAddresses(Long userId) {
    return addressRepository.countByUserId(userId);
  }

  /**
   * Creates a new address for a user.
   *
   * @param addressReqDto the AddressReqDto containing the details of the address to be created
   * @return an AddressDto object representing the created address
   */
  @Transactional
  @Override
  public AddressDto createAddress(AddressReqDto addressReqDto) {

    User user = userService.getUserById(addressReqDto.getUserId());

    long addressCount = addressRepository.countByUserId(user.getId());
    if (addressCount > AddressConstants.MAX_ADDRESS_COUNT) {
      throw new MaxAddressCountException(AddressConstants.MAX_ADDRESS_MSS);
    }

    Address address = new Address();
    AddressMapper.toAddress(address, addressReqDto, user);

    Address savedAddress = addressRepository.save(address);
    updateIsDefault(addressReqDto.getIsDefault(), savedAddress.getId(), user.getId());
    return AddressMapper.toAddressDto(savedAddress);
  }

  /**
   * Updates an existing address for a user.
   *
   * @param id the ID of the address to be updated
   * @param addressReqDto the AddressReqDto containing the updated details of the address
   * @return an AddressDto object representing the updated address
   */
  @Transactional
  @Override
  public AddressDto updateAddress(Long id, AddressReqDto addressReqDto) {
    Address address = addressRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Address", "id", id.toString()));

    User user = userService.getUserById(addressReqDto.getUserId());
    AddressMapper.toAddress(address, addressReqDto, user);

    Address updatedAddress = addressRepository.save(address);
    updateIsDefault(addressReqDto.getIsDefault(), updatedAddress.getId(), user.getId());

    return AddressMapper.toAddressDto(updatedAddress);
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
