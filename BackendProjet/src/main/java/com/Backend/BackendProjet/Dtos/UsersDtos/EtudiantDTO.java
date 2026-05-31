package com.Backend.BackendProjet.Dtos.UsersDtos;

import com.Backend.BackendProjet.Dtos.GroupDtos.GroupDTO;
import com.Backend.BackendProjet.Dtos.TacheDtos.TacheDTO;
import com.Backend.BackendProjet.Entity.UserEntity.Etudiant;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class EtudiantDTO {
//    private Long id;
//    private String firstName;
//    private String lastName;
//    private String email;
//    private String classe;
//    private String isAdmin;
//    private GroupDTO group;
//    private List<TacheDTO> taches;
//
//    public EtudiantDTO(Etudiant etudiant) {
//        this.id = etudiant.getId();
//        this.firstName = etudiant.getFirstName();
//        this.lastName = etudiant.getLastName();
//        this.email = etudiant.getEmail();
//        this.classe = etudiant.getClasse();
//        this.isAdmin = etudiant.getIsAdmin().toString();
//        this.group = (etudiant.getGroup() != null) ? new GroupDTO(etudiant.getGroup(), false) : null;
//        this.taches = (etudiant.getTaches() != null) ? etudiant.getTaches().stream() // Utilisez getTaches() et non getTache()
//                .map(TacheDTO::new)
//                .collect(Collectors.toList()) : null;
//    }
}
