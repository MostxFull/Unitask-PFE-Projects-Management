package com.Backend.BackendProjet.Repository.UserRepository;

import com.Backend.BackendProjet.Entity.UserEntity.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface EtudientRepository extends JpaRepository<Etudiant, Long> {
    Etudiant findByEmail(String email);
    Boolean existsByEmail(String email);

}
