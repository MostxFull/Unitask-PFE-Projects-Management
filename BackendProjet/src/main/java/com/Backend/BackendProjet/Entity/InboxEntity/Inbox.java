package com.Backend.BackendProjet.Entity.InboxEntity;

import com.Backend.BackendProjet.Entity.UserEntity.User;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "inboxMessage")
@Data
public class Inbox {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String subject;
    private String content;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private User receiver;
}
