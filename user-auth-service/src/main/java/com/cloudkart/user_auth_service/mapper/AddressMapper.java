package com.cloudkart.user_auth_service.mapper;

import com.cloudkart.user_auth_service.dto.AddressRequest;
import com.cloudkart.user_auth_service.dto.AddressResponse;
import com.cloudkart.user_auth_service.entity.Address;
import com.cloudkart.user_auth_service.entity.Status;
import com.cloudkart.user_auth_service.entity.User;

public final class AddressMapper {

  public static AddressResponse toDto(Address address) {

    AddressResponse addressResponse = new AddressResponse();
    addressResponse.setId(address.getId());
    addressResponse.setUserId(address.getUser().getId());
    addressResponse.setStreetAddress(address.getStreetAddress());
    addressResponse.setCity(address.getCity());
    addressResponse.setState(address.getState());
    addressResponse.setPostalCode(address.getPostalCode());
    addressResponse.setCountry(address.getCountry());
    addressResponse.setAddressType(address.getAddressType());
    addressResponse.setIsDefault(address.getIsDefault());
    addressResponse.setStatus(address.getStatus().toString());

    return addressResponse;
  }

  public static void toEntity(Address address, AddressRequest addressRequest, User user) {

    address.setStreetAddress(addressRequest.getStreetAddress());
    address.setCity(addressRequest.getCity());
    address.setState(addressRequest.getState());
    address.setPostalCode(addressRequest.getPostalCode());
    address.setCountry(addressRequest.getCountry());
    address.setAddressType(addressRequest.getAddressType());
    address.setIsDefault(addressRequest.getIsDefault());
    address.setPhoneNumber(addressRequest.getPhoneNumber());
    address.setStatus(Status.valueOf(addressRequest.getStatus().toUpperCase()));
    address.setUser(user);

  }
}
