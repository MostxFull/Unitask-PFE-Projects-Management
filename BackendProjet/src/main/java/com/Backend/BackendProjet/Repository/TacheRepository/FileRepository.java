package com.Backend.BackendProjet.Repository.TacheRepository;

import com.Backend.BackendProjet.Entity.TacheEntity.File;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FileRepository extends JpaRepository<File, Long> {
    List<File> findByTache_Id(Long tacheId);
    List<File> findByMembre_Id(Long membreId);
}
