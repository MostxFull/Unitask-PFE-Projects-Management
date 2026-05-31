package com.Backend.BackendProjet.Entity.TacheEntity;

import com.Backend.BackendProjet.Entity.GroupEntity.Group;
import com.Backend.BackendProjet.Entity.UserEntity.Etudiant;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "taches")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

public class Tache {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "responsable_id")
    @JsonBackReference("tache-responsable")
    private Etudiant responsable;

    @ManyToOne
    @JoinColumn(name = "assigne_id")
    @JsonBackReference("etudiant-taches-assigne")
    private Etudiant assigne;

    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "groupe_id")
    @JsonBackReference("group-taches")
    private Group group;

    private String titre;
    private String description;
    private Date dateFin;
//    @Enumerated(EnumType.STRING)
    private String Status;

    private String validate;

    @OneToMany(mappedBy = "tache")
    @JsonManagedReference("tache-commentaires")
    private List<Commentaire> commentaireList;



    // Association aux Fichiers
    @OneToMany(mappedBy = "tache", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<File> fichiers;





}
