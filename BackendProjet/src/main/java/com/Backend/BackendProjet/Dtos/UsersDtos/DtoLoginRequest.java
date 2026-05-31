package com.Backend.BackendProjet.Dtos.UsersDtos;

import lombok.Data;

@Data
public class DtoLoginRequest {

    private String email;
    private String password;
}
