package com.Backend.BackendProjet.Repository.TacheRepository;

import com.Backend.BackendProjet.Entity.TacheEntity.Commentaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CommentTacheRepository extends JpaRepository<Commentaire,Long> {
  @Query("SELECT c FROM Commentaire c WHERE c.tache.id = :id")
  List<Commentaire> findByTache(@Param("id") Long id);

  @Query("SELECT c FROM Commentaire c WHERE c.auteur.id = :id")
  List<Commentaire> findByAuteur(@Param("id") Long id);
}
