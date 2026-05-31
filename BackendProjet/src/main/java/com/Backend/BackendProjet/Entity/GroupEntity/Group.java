package com.Backend.BackendProjet.Entity.GroupEntity;

import com.Backend.BackendProjet.Entity.TacheEntity.Tache;
import com.Backend.BackendProjet.Entity.UserEntity.Enseignant;
import com.Backend.BackendProjet.Entity.UserEntity.Etudiant;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "groupes")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "superviseur_id")
    @JsonBackReference("group-superviseur")
    private Enseignant superviseur;

    @OneToMany(mappedBy = "group",fetch = FetchType.EAGER)
    @JsonManagedReference("group-etudiants")
    private List<Etudiant> members;

    @OneToMany(mappedBy = "group")
    @JsonManagedReference("group-taches")
    private List<Tache> taches;
}
