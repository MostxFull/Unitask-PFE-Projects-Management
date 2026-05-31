package com.Backend.BackendProjet.Dtos.UsersDtos;

import lombok.Data;

@Data
public class GroupInfoDTO {
    private long idGroup;
    private String name;

    public GroupInfoDTO(long idGroup, String name){
        this.idGroup=idGroup;
        this.name=name;
    }
}
