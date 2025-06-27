package com.cloudkart.user_service.service.impl;

import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.cloudkart.user_service.dto.AddressDto;
import com.cloudkart.user_service.dto.AddressReqDto;
import com.cloudkart.user_service.entity.Address;
import com.cloudkart.user_service.entity.User;
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
   * @param userId the UUID of the user whose addresses are to be retrieved
   * @return a list of AddressDto objects representing the user's addresses
   */
  @Override
  public List<AddressDto> getAddressByUserId(UUID userId) {
    List<Address> addresses = addressRepository.findByUser_Id(userId);
    addresses.sort((a1, a2) -> Boolean.compare(a2.getIsDefault(), a1.getIsDefault()));
    return addresses.stream().map(AddressMapper::toAddressDto).toList();
  }

  /**
   * Retrieves the default address for a specific user.
   *
   * @param userId the UUID of the user whose default address is to be retrieved
   * @return an AddressDto object representing the user's default address
   */
  @Override
  public AddressDto getDefaultUserAddress(UUID userId) {
    return addressRepository.findDefaultAddressByUserId(userId).map(AddressMapper::toAddressDto)
        .orElse(null);
  }

  /**
   * Counts the number of addresses associated with a specific user.
   *
   * @param userId the UUID of the user whose addresses are to be counted
   * @return the count of addresses associated with the user
   */
  @Override
  public long countUserAddresses(UUID userId) {
    return addressRepository.countByUser_Id(userId);
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

    Address address = new Address();
    AddressMapper.toAddress(address, addressReqDto, user);

    Address savedAddress = addressRepository.save(address);
    return AddressMapper.toAddressDto(savedAddress);
  }

  /**
   * Updates an existing address for a user.
   *
   * @param id the UUID of the address to be updated
   * @param addressReqDto the AddressReqDto containing the updated details of the address
   * @return an AddressDto object representing the updated address
   */
  @Transactional
  @Override
  public AddressDto updateAddress(UUID id, AddressReqDto addressReqDto) {
    Address address = addressRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Address", "id", id.toString()));

    User user = userService.getUserById(addressReqDto.getUserId());

    AddressMapper.toAddress(address, addressReqDto, user);

    Address updatedAddress = addressRepository.save(address);

    if (addressReqDto.getIsDefault()) {
      List<Address> otherAddresses = addressRepository.findByUser_Id(user.getId());
      for (Address otherAddress : otherAddresses) {
        if (!otherAddress.getId().equals(id)) {
          otherAddress.setIsDefault(false);
          addressRepository.save(otherAddress);
        }
      }
    }

    return AddressMapper.toAddressDto(updatedAddress);
  }

  /**
   * Deletes an address for a user.
   *
   * @param id the UUID of the address to be deleted
   * @param userId the UUID of the user associated with the address
   */
  @Transactional
  @Override
  public void deleteAddress(UUID id, UUID userId) {
    addressRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Address", "id", id.toString()));
    addressRepository.deleteByIdAndUser_Id(id, userId);
  }
}
