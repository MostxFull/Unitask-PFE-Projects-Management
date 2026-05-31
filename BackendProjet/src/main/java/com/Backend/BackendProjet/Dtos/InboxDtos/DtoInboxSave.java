package com.Backend.BackendProjet.Dtos.InboxDtos;

import lombok.Data;

@Data
public class DtoInboxSave {
    private String subject;
    private String content;
    private Long receiverId;
    private Long senderId;

}
