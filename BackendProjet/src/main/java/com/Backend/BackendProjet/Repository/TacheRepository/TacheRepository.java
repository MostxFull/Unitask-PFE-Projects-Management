package com.Backend.BackendProjet.Repository.TacheRepository;

import com.Backend.BackendProjet.Entity.TacheEntity.Tache;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TacheRepository extends JpaRepository<Tache,Long> {
    @Query("SELECT t FROM Tache t WHERE t.assigne.id= :par")
    List<Tache> findByIdAssigned(@Param("par") Long idAssigned);
    @Query("SELECT t FROM Tache t WHERE t.group.id = :par")
    List<Tache> findByIdGroup(@Param("par") Long idGroup);
    @Query("SELECT t FROM Tache t WHERE t.responsable.id =:par")
    List<Tache> findByIdResponsable(@Param("par") Long idResponsable);
}
