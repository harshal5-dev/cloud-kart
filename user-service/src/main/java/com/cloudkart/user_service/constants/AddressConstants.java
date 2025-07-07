package com.cloudkart.user_service.constants;

public final class AddressConstants {

    public static final String MESSAGE_FETCHED = "Address fetched successfully";
    public static final String MESSAGE_CREATED = "Address created successfully";
    public static final String MESSAGE_UPDATED = "Address updated successfully";
    public static final String MESSAGE_DELETED = "Address deleted successfully";
    public static final int MAX_ADDRESS_COUNT = 5;
    public static final String MAX_ADDRESS_MSS =
            "Maximum number of addresses allowed is " + MAX_ADDRESS_COUNT;

    private AddressConstants() {
        // Prevent instantiation
    }

}
