package com.Backend.BackendProjet.Entity.UserEntity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data

@Table(name = "admines")
@DiscriminatorValue("Admine")
public class Admine extends User {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private long id;
}
