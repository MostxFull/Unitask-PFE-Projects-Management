package com.Backend.BackendProjet.Repository.InboxRepository;

import com.Backend.BackendProjet.Entity.InboxEntity.Inbox;
import com.Backend.BackendProjet.Entity.UserEntity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InboxRepository extends JpaRepository<Inbox,Long> {
    @Query("SELECT i FROM Inbox i WHERE i.receiver.id = :id")
    List<Inbox> findByIdReceive(@Param("id") Long idReceive);


    @Query("SELECT i FROM Inbox i WHERE i.sender.id = :id")
    List<Inbox> findByIdSender(@Param("id") Long idSend);
}
