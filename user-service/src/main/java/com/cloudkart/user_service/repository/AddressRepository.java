package com.cloudkart.user_service.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.cloudkart.user_service.entity.Address;
import com.cloudkart.user_service.entity.AddressType;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

  // Find all addresses for a user
  @Query("SELECT a FROM Address a WHERE a.user.id = :userId ORDER BY a.isDefault DESC, a.createdAt DESC")
  List<Address> findByUserId(@Param("userId") Long userId);

  // Find default address for a user
  @Query("SELECT a FROM Address a WHERE a.user.id = :userId AND a.isDefault = true")
  Optional<Address> findDefaultAddressByUserId(@Param("userId") Long userId);

  // Count addresses for a user
  @Query("SELECT COUNT(a) FROM Address a WHERE a.user.id = :userId")
  long countByUserId(@Param("userId") Long userId);

  // Delete address by ID and user ID (security check)
  @Modifying
  @Transactional
  @Query("DELETE FROM Address a WHERE a.id = :addressId AND a.user.id = :userId")
  void deleteByIdAndUserId(@Param("addressId") Long addressId, @Param("userId") Long userId);

  // Find addresses by user ID and default status
  @Query("SELECT a FROM Address a WHERE a.user.id = :userId AND a.isDefault = :isDefault ORDER BY a.createdAt DESC")
  List<Address> findByUserIdAndIsDefault(@Param("userId") Long userId,
      @Param("isDefault") boolean isDefault);

  // Find addresses by user ID and address type
  @Query("SELECT a FROM Address a WHERE a.user.id = :userId AND a.addressType = :addressType ORDER BY a.isDefault DESC, a.createdAt DESC")
  List<Address> findByUserIdAndAddressType(@Param("userId") Long userId,
      @Param("addressType") AddressType addressType);

  // Check if address exists for user
  @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END FROM Address a WHERE a.id = :addressId AND a.user.id = :userId")
  boolean existsByIdAndUserId(@Param("addressId") Long addressId, @Param("userId") Long userId);

  // Update default address
  @Modifying
  @Transactional
  @Query("UPDATE Address a SET a.isDefault = false WHERE a.user.id = :userId AND a.isDefault = true")
  void resetDefaultAddressForUser(@Param("userId") Long userId);

  // Set address as default
  @Modifying
  @Transactional
  @Query("UPDATE Address a SET a.isDefault = true WHERE a.id = :addressId AND a.user.id = :userId")
  void setAsDefaultAddress(@Param("addressId") Long addressId, @Param("userId") Long userId);
}
