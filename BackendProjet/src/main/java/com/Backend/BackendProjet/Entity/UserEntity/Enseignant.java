package com.Backend.BackendProjet.Entity.UserEntity;

import com.Backend.BackendProjet.Entity.GroupEntity.Group;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "enseignant")
@DiscriminatorValue("enseignant")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

public class Enseignant extends User {

    private String departement;

    @OneToMany(mappedBy = "superviseur" ,fetch = FetchType.EAGER)
    @JsonManagedReference("group-superviseur")
    private List<Group> groups;

}
