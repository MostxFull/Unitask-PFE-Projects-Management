package com.Backend.BackendProjet.Dtos.CalendrieDtos;

import com.Backend.BackendProjet.Enum.MeetingType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DtoCalendrieSave {
//    private Long id;
    private String title;
    private String description;
    private LocalDateTime debutDate;
    private LocalDateTime finDate;
    private Long groupId;
//    @Enumerated(EnumType.STRING)
//    private MeetingType type;
//    private Long groupId;
}
