package com.cloudkart.user_service.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import com.cloudkart.user_service.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

  Optional<User> findByKeycloakId(String keycloakId);

  boolean existsByUsernameOrEmailOrPhoneNumber(String username, String email, String phoneNumber);

  boolean existsByPhoneNumberAndKeycloakIdNot(String phoneNumber, String keycloakId);
}
