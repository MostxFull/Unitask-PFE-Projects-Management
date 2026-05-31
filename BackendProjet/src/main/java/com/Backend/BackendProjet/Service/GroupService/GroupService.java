package com.Backend.BackendProjet.Service.GroupService;

import com.Backend.BackendProjet.Dtos.GroupDtos.GroupDTO;
import com.Backend.BackendProjet.Entity.GroupEntity.Group;
import com.Backend.BackendProjet.Entity.UserEntity.Enseignant;
import com.Backend.BackendProjet.Entity.UserEntity.Etudiant;
import com.Backend.BackendProjet.Enum.IsAdmin;
import com.Backend.BackendProjet.Repository.GroupRepository.GroupRepository;
import com.Backend.BackendProjet.Repository.UserRepository.EnsiegnementRepository;
import com.Backend.BackendProjet.Repository.UserRepository.EtudientRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class GroupService {
    private final GroupRepository groupRepository;
    private final EtudientRepository etudientRepository;
    private final EnsiegnementRepository ensiegnementRepository;
    public GroupService(GroupRepository groupRepository, EtudientRepository etudientRepository, EnsiegnementRepository ensiegnementRepository) {
        this.groupRepository = groupRepository;
        this.etudientRepository = etudientRepository;
        this.ensiegnementRepository = ensiegnementRepository;
    }



    @Transactional
    public ResponseEntity<?> saveGroup(String name, Long idSuperviseur, List<Long> idsMembers, Long IdAdmin) {
        Map<String, String> response = new HashMap<>();

        // Vérification des IDs null
        if (idSuperviseur == null || IdAdmin == null || idsMembers == null || idsMembers.isEmpty()) {
            response.put("error", "ID superviseur, ID admin ou liste des membres ne doit pas être null");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        // Vérification du superviseur
        Optional<Enseignant> superviseurOpt = ensiegnementRepository.findById(idSuperviseur);
        if (superviseurOpt.isEmpty()) {
            response.put("error", "Superviseur non trouvé");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        Enseignant superviseur = superviseurOpt.get();

        // Vérification de l'admin étudiant
        Optional<Etudiant> etudiantAdmin = etudientRepository.findById(IdAdmin);
        if (etudiantAdmin.isEmpty()) {
            response.put("error", "L'administrateur n'existe pas");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        Etudiant admin = etudiantAdmin.get();
        admin.setIsAdmin(IsAdmin.Oui);
        etudientRepository.save(admin);

        List<Etudiant> members = etudientRepository.findAllById(idsMembers);
        if (members.isEmpty()) {
            response.put("error", "Aucun étudiant trouvé avec les IDs fournis");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        // Création du groupe
        Group group = new Group();
        group.setName(name);
        group.setSuperviseur(superviseur);

        Group savedGroup = groupRepository.save(group);

        for (Etudiant etudiant : members) {
            etudiant.setGroup(savedGroup);
        }

        etudientRepository.saveAll(members); // Mise à jour des étudiants avec le groupe

        return ResponseEntity.status(HttpStatus.CREATED).body(savedGroup);
    }

    public ResponseEntity<?> getAllGroups(){
        Optional<List<Group>> groups = Optional.of(groupRepository.findAll());
        if (groups.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(groups.get());
    }
    public ResponseEntity<?> getGroupById(Long id){
        Optional<Group> Optionalgroup = groupRepository.findById(id);
        if (Optionalgroup.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        Group group =Optionalgroup.get();
//        GroupDTO groupDTO = new GroupDTO(group);

        return ResponseEntity.status(HttpStatus.OK).body(group);
    }

    public ResponseEntity deleteGroup(Long id){
        Optional<Group> group = groupRepository.findById(id);
        if (group.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Group not found");

        }
        groupRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Group deleted successfully");
    }

    public ResponseEntity<?> getGroupByIdUser(Long id){
        Etudiant etudiant = etudientRepository.findById(id).orElse(null);
        if(etudiant==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        long groupId = etudiant.getGroup().getId();
        return getGroupById(groupId);
    }



}
