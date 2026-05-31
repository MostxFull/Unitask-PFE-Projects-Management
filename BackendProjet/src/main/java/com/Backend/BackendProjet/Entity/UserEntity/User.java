package com.Backend.BackendProjet.Entity.UserEntity;

import com.Backend.BackendProjet.Entity.TacheEntity.Commentaire;
import com.Backend.BackendProjet.Entity.TacheEntity.File;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "users")
@DiscriminatorColumn(name = "user_type")
public abstract class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "first_name")
    private String firstName;
    private String lastName;
    private String email;

    private String password;

    @OneToMany(mappedBy = "auteur")
    @JsonIgnore
    private List<Commentaire> commentaireList;
    // Fichiers uploadés par le membre
    @OneToMany(mappedBy = "membre", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<File> fichiers;




}
