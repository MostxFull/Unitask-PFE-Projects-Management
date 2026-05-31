package com.Backend.BackendProjet.Dtos.GroupDtos;

import com.Backend.BackendProjet.Dtos.TacheDtos.TacheDTO;
import com.Backend.BackendProjet.Dtos.UsersDtos.EtudiantDTO;
import com.Backend.BackendProjet.Entity.GroupEntity.Group;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class GroupDTO {
//    private Long id;
//    private String name;
//    private Long superviseurId;
//    private List<EtudiantDTO> members;
//    private List<TacheDTO> taches;
//
//    public GroupDTO(Group group, boolean includeDetails) {
//        this.id = group.getId();
//        this.name = group.getName();
//        this.superviseurId = (group.getSuperviseur() != null) ? group.getSuperviseur().getId() : null;
//
//        if (includeDetails) {
//            this.members = (group.getMembers() != null) ? group.getMembers().stream()
//                    .map(EtudiantDTO::new)
//                    .collect(Collectors.toList()) : null;
//            this.taches = (group.getTaches() != null) ? group.getTaches().stream()
//                    .map(TacheDTO::new)
//                    .collect(Collectors.toList()) : null;
//        }
//    }
}
