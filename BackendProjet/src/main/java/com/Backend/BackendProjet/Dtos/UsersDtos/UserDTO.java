package com.Backend.BackendProjet.Dtos.UsersDtos;

import com.Backend.BackendProjet.Entity.TacheEntity.Tache;
import com.Backend.BackendProjet.Entity.UserEntity.Enseignant;
import com.Backend.BackendProjet.Entity.UserEntity.Etudiant;
import com.Backend.BackendProjet.Entity.UserEntity.User;

import java.util.List;

public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String userType;
    private String classe;        // Seulement pour les étudiants
    private String departement;   // Seulement pour les enseignants

    public UserDTO(User user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();

        if (user instanceof Etudiant) {
            this.userType = "etudiant";
            this.classe = ((Etudiant) user).getClasse();
        } else if (user instanceof Enseignant) {
            this.userType = "enseignant";
            this.departement = ((Enseignant) user).getDepartement();
        }


    }
}
