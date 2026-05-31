package com.Backend.BackendProjet.Dtos.TacheDtos;

import lombok.Data;

import java.util.Date;

@Data
public class UpdateTaheDTO {
    private String title;
    private String descreption;
    private Date deadline;
    private String status;

}
