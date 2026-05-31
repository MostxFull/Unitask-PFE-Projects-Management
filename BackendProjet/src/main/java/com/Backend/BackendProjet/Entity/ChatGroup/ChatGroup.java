package com.Backend.BackendProjet.Entity.ChatGroup;

import com.Backend.BackendProjet.Entity.GroupEntity.Group;
import com.Backend.BackendProjet.Entity.UserEntity.Etudiant;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "chat_group")
public class ChatGroup {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private Etudiant sender;

    @ManyToOne
    @JoinColumn(name = "group_id")
    @JsonIgnore
    private Group group;
}
