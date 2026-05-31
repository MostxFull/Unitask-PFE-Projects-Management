package com.Backend.BackendProjet.Entity.TacheEntity;

import com.Backend.BackendProjet.Entity.UserEntity.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Data
@Setter
@Table(name = "files")
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String filename;
    private String fileType;

    @Lob
    private byte[] data;

    // Association à une Tâche
    @ManyToOne
    @JoinColumn(name = "tache_id")
    @JsonBackReference
    private Tache tache;

    // Association à un Membre (User)
    @ManyToOne
    @JoinColumn(name = "membre_id")
//    @JsonManagedReference
    @JsonIgnore
    private User membre;
}
