package com.Backend.BackendProjet.Entity.TacheEntity;

import com.Backend.BackendProjet.Entity.UserEntity.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "commentaires")
@Data
public class Commentaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private Date date;

    @ManyToOne
    @JoinColumn(name = "auteur_id")
    @JsonManagedReference
    @JsonIgnore
    private User auteur;

    @ManyToOne
    @JoinColumn(name = "tache_id")
    @JsonBackReference("tache-commentaires")
//    @JsonIgnore
    private Tache tache;
}
