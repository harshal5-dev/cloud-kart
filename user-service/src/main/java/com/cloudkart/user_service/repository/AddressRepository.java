package com.cloudkart.user_service.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.cloudkart.user_service.entity.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, UUID> {

  List<Address> findByUser_Id(UUID userId);

  @Query("SELECT a FROM Address a WHERE a.user.id = :userId AND a.isDefault = true")
  Optional<Address> findDefaultAddressByUserId(@Param("userId") UUID userId);

  long countByUser_Id(UUID userId);

  void deleteByIdAndUser_Id(UUID id, UUID userId);

  List<Address> findByUser_IdAndIsDefault(UUID userId, boolean isDefault);
}
