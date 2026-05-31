package com.Backend.BackendProjet.Entity.CalendrieEntity;

import com.Backend.BackendProjet.Entity.GroupEntity.Group;
import com.Backend.BackendProjet.Enum.MeetingType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "meeting")
@Data
public class Meeting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private LocalDateTime debutDate;
    private LocalDateTime finDate;

    @ManyToOne
    @JoinColumn(name = "group_id")
    @JsonIgnore
    private Group group;

    @Enumerated(EnumType.STRING)
    private MeetingType type;
}
