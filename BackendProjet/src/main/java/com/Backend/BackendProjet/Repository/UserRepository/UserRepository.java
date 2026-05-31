package com.Backend.BackendProjet.Repository.UserRepository;

import com.Backend.BackendProjet.Entity.UserEntity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {


    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
}
