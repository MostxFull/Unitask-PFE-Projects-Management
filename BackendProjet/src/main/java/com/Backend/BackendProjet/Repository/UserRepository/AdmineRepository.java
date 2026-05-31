package com.Backend.BackendProjet.Repository.UserRepository;

import com.Backend.BackendProjet.Entity.UserEntity.Admine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdmineRepository extends JpaRepository<Admine, Long> {
}
