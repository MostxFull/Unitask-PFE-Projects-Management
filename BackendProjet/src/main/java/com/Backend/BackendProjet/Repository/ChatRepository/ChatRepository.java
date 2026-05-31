package com.Backend.BackendProjet.Repository.ChatRepository;

import com.Backend.BackendProjet.Entity.ChatGroup.ChatGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChatRepository extends JpaRepository<ChatGroup,Long> {

    @Query("SELECT c FROM ChatGroup c WHERE c.group.id = ?1")
    List<ChatGroup> findByIdGroup(Long id);
}
