package com.cloudkart.user_service.mapper;

import com.cloudkart.user_service.dto.AddressDto;
import com.cloudkart.user_service.dto.AddressReqDto;
import com.cloudkart.user_service.entity.Address;
import com.cloudkart.user_service.entity.AddressType;
import com.cloudkart.user_service.entity.Status;
import com.cloudkart.user_service.entity.User;

public final class AddressMapper {

  public static AddressDto toAddressDto(Address address) {

    AddressDto addressDto = new AddressDto();
    addressDto.setId(address.getId());
    addressDto.setUserId(address.getUser().getId());
    addressDto.setStreetAddress(address.getStreetAddress());
    addressDto.setCity(address.getCity());
    addressDto.setState(address.getState());
    addressDto.setPostalCode(address.getPostalCode());
    addressDto.setCountry(address.getCountry());
    addressDto.setPhoneNumber(address.getPhoneNumber());
    addressDto.setAddressType(address.getAddressType());
    addressDto.setIsDefault(address.getIsDefault());
    addressDto.setStatus(address.getStatus().toString());

    return addressDto;
  }

  public static void toAddress(Address address, AddressReqDto addressReqDto, User user) {

    address.setStreetAddress(addressReqDto.getStreetAddress());
    address.setCity(addressReqDto.getCity());
    address.setState(addressReqDto.getState());
    address.setPostalCode(addressReqDto.getPostalCode());
    address.setCountry(addressReqDto.getCountry());
    address.setPhoneNumber(addressReqDto.getPhoneNumber());
    address.setAddressType(AddressType.valueOf(addressReqDto.getAddressType().toUpperCase()));
    address.setIsDefault(Boolean.TRUE.equals(addressReqDto.getIsDefault()));
    address.setStatus(Status.valueOf(addressReqDto.getStatus().toUpperCase()));
    address.setUser(user);

  }
}
