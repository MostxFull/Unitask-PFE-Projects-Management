package com.Backend.BackendProjet.Dtos.UsersDtos;

import com.Backend.BackendProjet.Enum.IsAdmin;
import lombok.Data;

@Data
public class DTOEtudinetSave {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String classe;
    private IsAdmin isAdmin; // Optionnel
    private Long groupId;
}
