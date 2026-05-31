package com.Backend.BackendProjet.Dtos.TacheDtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class DtoCommentSave {
    private Long auteurId;
    private Long tacheId;
    private String content;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date date;
}
