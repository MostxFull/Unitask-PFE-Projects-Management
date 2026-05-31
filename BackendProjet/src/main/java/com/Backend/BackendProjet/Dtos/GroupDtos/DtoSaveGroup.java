package com.Backend.BackendProjet.Dtos.GroupDtos;

import com.Backend.BackendProjet.Entity.UserEntity.Etudiant;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.List;

@Data
public class DtoSaveGroup {
    private String name;
    @JsonProperty("superviseur")
    private Long superviseur;
    @JsonProperty("members")
    private List<Long> members;
    @JsonProperty("Admin")
    private Long Admin;
}
