package com.cloudkart.user_service.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.cloudkart.user_service.entity.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

  List<Address> findByUser_Id(Long userId);

  @Query("SELECT a FROM Address a WHERE a.user.id = :userId AND a.isDefault = true")
  Optional<Address> findDefaultAddressByUserId(@Param("userId") Long userId);

  long countByUser_Id(Long userId);

  void deleteByIdAndUser_Id(Long id, Long userId);

  List<Address> findByUser_IdAndIsDefault(Long userId, boolean isDefault);
}
