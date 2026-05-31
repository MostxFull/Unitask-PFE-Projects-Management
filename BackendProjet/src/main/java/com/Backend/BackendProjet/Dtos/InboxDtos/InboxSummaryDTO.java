package com.Backend.BackendProjet.Dtos.InboxDtos;

import lombok.Data;

@Data
public class InboxSummaryDTO {
    private Long inboxId;
    private Long senderId;
    private Long receiverId;
    private String senderName;
    private String receiverName;
    private String subject;
    private String content;

    public InboxSummaryDTO(Long inboxId, Long senderId, Long receiverId, String senderName, String receiverName, String subject, String content) {
        this.inboxId = inboxId;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.senderName = senderName;
        this.receiverName = receiverName;
        this.subject = subject;
        this.content = content;
    }
}
