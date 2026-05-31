package com.Backend.BackendProjet.Dtos.ChatDtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DtoChat {
    private String content;
    private LocalDateTime date;
    private Long senderId;
    private Long groupId;
}
