package com.Backend.BackendProjet.Dtos.UsersDtos;

import lombok.Data;

@Data
public class DtoChangePassword {
    private String oldPassword;
    private String newPassword;
}
