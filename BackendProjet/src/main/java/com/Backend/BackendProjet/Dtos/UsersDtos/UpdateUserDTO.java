package com.Backend.BackendProjet.Dtos.UsersDtos;

import lombok.Data;

@Data
public class UpdateUserDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String classe;//pour etudient
    private String departement;//pour ensignment

}
