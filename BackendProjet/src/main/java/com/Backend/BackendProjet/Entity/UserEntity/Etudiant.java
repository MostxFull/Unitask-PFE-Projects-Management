package com.Backend.BackendProjet.Entity.UserEntity;

import com.Backend.BackendProjet.Entity.GroupEntity.Group;
import com.Backend.BackendProjet.Entity.TacheEntity.Tache;
import com.Backend.BackendProjet.Enum.IsAdmin;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.web.bind.annotation.Mapping;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "etudiant")
@DiscriminatorValue("etudiant")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"

)
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

public class Etudiant extends User {

    @ManyToOne( cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinColumn(name = "group_id" )
    @JsonBackReference("etudiant-group")
    private Group group;

    @OneToMany(mappedBy = "assigne")
    @JsonManagedReference("etudiant-taches-assigne")
    private List<Tache> tache;

    private String classe;

    @Enumerated(EnumType.STRING)
    private IsAdmin isAdmin;





}
