package com.Backend.BackendProjet.Dtos.TacheDtos;

import com.Backend.BackendProjet.Entity.GroupEntity.Group;
import com.Backend.BackendProjet.Enum.StatusTask;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

import java.util.Date;

@Data
public class DtoTacheSave {
    @JsonProperty("Idresponsable")
    private Long Idresponsable;
    @JsonProperty("Idassigne")
    private Long Idassigne;
//    @JsonProperty("Idgroup")
//    private Long Idgroup;
    @JsonProperty("titre")
    private String titre;
    @JsonProperty("description")
    private String description;
    @JsonProperty("dateFin")
    private Date dateFin;
    @JsonProperty("Status")
//    @Enumerated(EnumType.STRING)
    private String Status;
}
