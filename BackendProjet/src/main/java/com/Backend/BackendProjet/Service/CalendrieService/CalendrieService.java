package com.Backend.BackendProjet.Service.CalendrieService;

import com.Backend.BackendProjet.Dtos.CalendrieDtos.DtoCalendrieSave;
import com.Backend.BackendProjet.Entity.CalendrieEntity.Meeting;
import com.Backend.BackendProjet.Entity.GroupEntity.Group;
import com.Backend.BackendProjet.Entity.UserEntity.Enseignant;
import com.Backend.BackendProjet.Entity.UserEntity.Etudiant;
import com.Backend.BackendProjet.Entity.UserEntity.User;
import com.Backend.BackendProjet.Enum.MeetingType;
import com.Backend.BackendProjet.Repository.CalendrieRepository.CalendrieReository;
import com.Backend.BackendProjet.Repository.GroupRepository.GroupRepository;
import com.Backend.BackendProjet.Repository.UserRepository.UserRepository;
import com.Backend.BackendProjet.Service.UserService.UserService;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CalendrieService {
    private final CalendrieReository calendrieReository;
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    public CalendrieService(CalendrieReository calendrieReository, GroupRepository groupRepository ,UserRepository userRepository) {
        this.calendrieReository = calendrieReository;
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
    }

//    @Transactional
//    public ResponseEntity<?> saveMeeting(DtoCalendrieSave dtoCalendrie){
//        if (dtoCalendrie.getGroupId() == null ){
//            return ResponseEntity.badRequest().body("Missing fields");
//        }
//        Optional<Group> group = groupRepository.findById(dtoCalendrie.getGroupId());
//        if (group.isEmpty()){
//            return ResponseEntity.badRequest().body("Group not found");
//        }
//        Meeting meeting = new Meeting();
//        meeting.setGroup(group.get());
//        meeting.setTitle(dtoCalendrie.getTitle());
//        meeting.setDescription(dtoCalendrie.getDescription());
//        meeting.setDebutDate(dtoCalendrie.getDebutDate());
//        meeting.setType(dtoCalendrie.getType());
//        meeting.setFinDate(dtoCalendrie.getFinDate());
//        calendrieReository.save(meeting);
//        return ResponseEntity.ok(meeting);
//    }

    @Transactional
    public ResponseEntity<?> deleteMeeting(Long id){
        Optional<Meeting> meeting = calendrieReository.findById(id);
        if (meeting.isEmpty()){
            return ResponseEntity.badRequest().body("Meeting not found");
        }
        calendrieReository.deleteById(id);
        return ResponseEntity.ok("Meeting deleted successfully");
    }
    public ResponseEntity<?> getAllMeetings(){
        List<Meeting> meetings = calendrieReository.findAll();
        if (meetings.isEmpty()){
            return ResponseEntity.badRequest().body("No meetings found");
        }
        return ResponseEntity.ok(meetings);
    }
    public ResponseEntity<?> getMeetingById(Long id){
        Optional<Meeting> meeting = calendrieReository.findById(id);
        if (meeting.isEmpty()){
            return ResponseEntity.badRequest().body("Meeting not found");
        }
        return ResponseEntity.ok(meeting.get());
    }

    public ResponseEntity<?> getMeetingsByGroup(Long id){
        List<Meeting> meetings = calendrieReository.findByIdGroup(id);
        if (meetings.isEmpty()){
            return ResponseEntity.badRequest().body("No meetings found");
        }

        return ResponseEntity.ok(meetings);

    }

    public ResponseEntity<?> updateMeeting(long id ,DtoCalendrieSave dtoCalendrie) {
        Meeting meeting = calendrieReository.findById(id)
                .orElse(null);
        if (meeting == null) {
            return ResponseEntity.badRequest().body("Meeting not found");
        }

        if (dtoCalendrie.getTitle() != null) meeting.setTitle(dtoCalendrie.getTitle());
        if (dtoCalendrie.getDescription() != null) meeting.setDescription(dtoCalendrie.getDescription());
        if (dtoCalendrie.getDebutDate() != null) meeting.setDebutDate(dtoCalendrie.getDebutDate());
        if (dtoCalendrie.getFinDate() != null) meeting.setFinDate(dtoCalendrie.getFinDate());

        calendrieReository.save(meeting);
        return ResponseEntity.ok(meeting);
    }

    public ResponseEntity<?> getMeetingByType(Long groupId, MeetingType type) {
        Group group = groupRepository.findById(groupId).orElse(null);
        if (group == null) {
            return ResponseEntity.badRequest().body("Group not found");
        }

        List<Meeting> meetings = calendrieReository.findByTypeAndGroup(type, groupId);
        if (meetings.isEmpty()) {
            return ResponseEntity.badRequest().body("No meetings found");
        }

        return ResponseEntity.ok(meetings);
    }



        public ResponseEntity<?> getMeetingByUser(long id) {
            User userOpt = userRepository.findById(id).orElse(null);
            if (userOpt == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            if (userOpt instanceof Etudiant) {
                Etudiant etudiant = (Etudiant) userOpt;
                Group group = etudiant.getGroup();
                if (group == null) {
                    return ResponseEntity.ok(Collections.emptyList());
                }
                List<Meeting> meetings = calendrieReository.findByGroup_Id(group.getId());
                return ResponseEntity.ok(meetings);
            } else if (userOpt instanceof Enseignant) {
                Enseignant enseignant = (Enseignant) userOpt;
                List<Group> groups = enseignant.getGroups();
                if (groups == null || groups.isEmpty()) {
                    return ResponseEntity.ok(Collections.emptyList());
                }
                List<Long> groupIds = groups.stream()
                        .map(Group::getId)
                        .collect(Collectors.toList());
                List<Meeting> meetings = calendrieReository.findByGroup_IdInAndType(
                        groupIds,
                        MeetingType.TEACHER_MEETING // Assurez-vous que l'enum correspond
                );
                return ResponseEntity.ok(meetings);
            }

            return ResponseEntity.ok(Collections.emptyList());
        }

    public ResponseEntity<?> saveMeeting(Long idUser, DtoCalendrieSave dtoCalendrie) {
        User user = userRepository.findById(idUser)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        Group group = null;
        MeetingType type = null;

        if (user instanceof Etudiant) {
            Etudiant etudiant = (Etudiant) user;
            group = etudiant.getGroup();
            type = MeetingType.STUDENT_MEETING;

            if (group == null) {
                return ResponseEntity.badRequest().body("L'étudiant n'appartient à aucun groupe");
            }
        } else if (user instanceof Enseignant) {
            Enseignant enseignant = (Enseignant) user;

            if (dtoCalendrie.getGroupId() == null) {
                return ResponseEntity.badRequest().body("L'ID du groupe est requis pour les enseignants");
            }

            group = groupRepository.findById(dtoCalendrie.getGroupId())
                    .orElseThrow(() -> new RuntimeException("Groupe non trouvé"));

            if (!enseignant.getGroups().contains(group)) {
                return ResponseEntity.badRequest().body("L'enseignant ne supervise pas ce groupe");
            }

            type = MeetingType.TEACHER_MEETING;
        } else {
            return ResponseEntity.badRequest().body("Type d'utilisateur non supporté");
        }

        Meeting meeting = new Meeting();
        meeting.setTitle(dtoCalendrie.getTitle());
        meeting.setDescription(dtoCalendrie.getDescription());
        meeting.setDebutDate(dtoCalendrie.getDebutDate());
        meeting.setFinDate(dtoCalendrie.getFinDate()); // Correction ici
        meeting.setGroup(group);
        meeting.setType(type);

        Meeting savedMeeting = calendrieReository.save(meeting);
        return ResponseEntity.ok(savedMeeting);
    }
}









