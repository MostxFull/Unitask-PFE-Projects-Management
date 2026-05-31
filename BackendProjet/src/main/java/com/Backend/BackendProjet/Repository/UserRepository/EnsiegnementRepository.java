package com.Backend.BackendProjet.Repository.UserRepository;

import com.Backend.BackendProjet.Entity.UserEntity.Enseignant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnsiegnementRepository extends JpaRepository<Enseignant,Long> {
    Boolean existsByEmail(String email);

}
