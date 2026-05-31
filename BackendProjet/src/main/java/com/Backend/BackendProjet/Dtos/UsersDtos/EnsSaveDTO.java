package com.Backend.BackendProjet.Dtos.UsersDtos;

import lombok.Data;

import java.util.List;

@Data
public class EnsSaveDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String departement;
    private List<Long> groupIds;


}
