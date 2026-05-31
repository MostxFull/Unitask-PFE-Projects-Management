package com.Backend.BackendProjet.Dtos.UsersDtos;

import lombok.Data;

@Data
public class DTOInfosEtuChat {
    private long userId;
    private long groupId;
    private String firstName;
    private String lastName;
    private  String email;


}
