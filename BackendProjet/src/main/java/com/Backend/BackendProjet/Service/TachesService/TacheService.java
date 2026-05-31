package com.Backend.BackendProjet.Service.TachesService;

import com.Backend.BackendProjet.Dtos.TacheDtos.DtoTacheSave;
import com.Backend.BackendProjet.Dtos.TacheDtos.UpdateTaheDTO;
import com.Backend.BackendProjet.Entity.GroupEntity.Group;
import com.Backend.BackendProjet.Entity.TacheEntity.Tache;
import com.Backend.BackendProjet.Entity.UserEntity.Etudiant;
import com.Backend.BackendProjet.Repository.GroupRepository.GroupRepository;
import com.Backend.BackendProjet.Repository.TacheRepository.CommentTacheRepository;
import com.Backend.BackendProjet.Repository.TacheRepository.TacheRepository;
import com.Backend.BackendProjet.Repository.UserRepository.EnsiegnementRepository;
import com.Backend.BackendProjet.Repository.UserRepository.EtudientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

@Service
public class TacheService {


    private TacheRepository tacheRepository;
    private CommentTacheRepository commentTacheRepository;
    private EtudientRepository etudientRepository;
    private EnsiegnementRepository ensiegnementRepository;
    private GroupRepository groupRepository;

    @Autowired
    public TacheService(TacheRepository tacheRepository, CommentTacheRepository commentTacheRepository, EtudientRepository etudientRepository, EnsiegnementRepository ensiegnementRepository, GroupRepository groupRepository) {
        this.tacheRepository = tacheRepository;
        this.commentTacheRepository = commentTacheRepository;
        this.etudientRepository = etudientRepository;
        this.ensiegnementRepository = ensiegnementRepository;
        this.groupRepository = groupRepository;
    }


    public ResponseEntity<?> SaveTache(DtoTacheSave dtoTache){
        if (dtoTache.getIdassigne() == null || dtoTache.getIdresponsable() == null){
            return ResponseEntity.badRequest().body("Missing fields");
        }
        Optional<Etudiant> etudiant = etudientRepository.findById(dtoTache.getIdassigne());
        Optional<Etudiant> responsable = etudientRepository.findById(dtoTache.getIdresponsable());

        if (etudiant.isEmpty() || responsable.isEmpty() ){
            return ResponseEntity.badRequest().body("Etudiant not found");
        }
        long IdGroup = etudiant.get().getGroup().getId();
        Optional<Group> group = groupRepository.findById(IdGroup);
        if (group.isEmpty()){
            return ResponseEntity.badRequest().body("Group not found");
        }
        Tache tache = new Tache();
        tache.setAssigne(etudiant.get());
        tache.setResponsable(responsable.get());
        tache.setGroup(group.get());
        tache.setTitre(dtoTache.getTitre());
        tache.setDescription(dtoTache.getDescription());
        tache.setDateFin(dtoTache.getDateFin());
        tache.setStatus(dtoTache.getStatus());
        tache.setValidate("EN_COURS");
        tacheRepository.save(tache);
        return ResponseEntity.ok(tache);

    }
    public ResponseEntity<?> getAllTaches(){
        Optional<Iterable<Tache>> taches = Optional.of(tacheRepository.findAll());
        if (taches.isEmpty()){
            return ResponseEntity.badRequest().body("No taches found");
        }

        return ResponseEntity.ok(taches.get());
    }
    public ResponseEntity<?> getTacheById(Long id){
        Optional<Tache> tache = tacheRepository.findById(id);
        if (tache.isEmpty()){
            return ResponseEntity.badRequest().body("Tache not found");
        }
        return ResponseEntity.ok(tache.get());
    }
    public ResponseEntity<?> deleteTache(Long id) {
        Optional<Tache> tache = tacheRepository.findById(id);

        if (tache.isEmpty()) {
            return ResponseEntity.badRequest().body("Tâche non trouvée");
        }

        tacheRepository.delete(tache.get());
        return ResponseEntity.ok("Tâche supprimée avec succès");
    }

    public ResponseEntity<?> getTachesByAssigned(Long idAssigned){
        Optional<Iterable<Tache>> taches = Optional.of(tacheRepository.findByIdAssigned(idAssigned)) ;
        if (taches.isEmpty()){
            return ResponseEntity.badRequest().body("No taches found");
        }
        return ResponseEntity.ok(taches.get());
    }
    public ResponseEntity<?> getTachesByGroup(Long idGroup){
        Optional<Iterable<Tache>> taches = Optional.of(tacheRepository.findByIdGroup(idGroup));
        if (taches.isEmpty()){
            return ResponseEntity.badRequest().body("No taches found");
        }
        return ResponseEntity.ok(taches.get());
    }

    public ResponseEntity<?> getTachesByResponsable(Long idResponsable){
        Optional<Iterable<Tache>> taches = Optional.of(tacheRepository.findByIdResponsable(idResponsable));
        if (taches.isEmpty()){
            return ResponseEntity.badRequest().body("No taches found");
        }
        return ResponseEntity.ok(taches.get());
    }

    public ResponseEntity<?> ModifieStatus(long id, String newStatus){
        Tache tache = tacheRepository.findById(id).orElse(null);
        if (tache==null){
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        tache.setStatus(newStatus);
        tacheRepository.save(tache);
        return ResponseEntity.status(HttpStatus.OK).build();


    }

    public ResponseEntity<?> getTacheGroupByIdUser(Long id){
        Etudiant etudiant = etudientRepository.findById(id).orElse(null);
        if(etudiant==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Long IdGroup = etudiant.getGroup().getId();
        return getTachesByGroup(IdGroup);
    }

    public ResponseEntity<?> updateTache(Long id , UpdateTaheDTO dtoTache){
        Tache tache = tacheRepository.findById(id).orElse(null);
        if (tache==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        tache.setTitre(dtoTache.getTitle());
        tache.setDescription(dtoTache.getDescreption());
        tache.setDateFin(dtoTache.getDeadline());
        tache.setStatus(dtoTache.getStatus());
        tacheRepository.save(tache);
        return ResponseEntity.status(HttpStatus.OK).body("tache update avec succes");
    }

//    public ResponseEntity<?> updateValidateTache(long id ,String validate){
//        Tache tache = tacheRepository.findById(id).orElse(null);
//        if (tache==null){
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//        }
//        tache.setValidate(validate);
//        tacheRepository.save(tache);
//        return ResponseEntity.status(HttpStatus.OK).body("tache update avec succes");
//    }

    public ResponseEntity<?> updateValidateTache(long id, String validate) {
        Tache tache = tacheRepository.findById(id).orElse(null);

        if (tache == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        tache.setValidate(validate);
        tacheRepository.save(tache);
        return ResponseEntity.status(HttpStatus.OK).body("tache update avec succes");
    }

//    public ResponseEntity<?> updateValidateTache(long id, String validate) {
//        Tache tache = tacheRepository.findById(id).orElse(null);
//
//        // Validation basique
//        if(!Arrays.asList("VALIDEE", "EN_COURS", "REJETEE").contains(validate)) {
//            return ResponseEntity.badRequest().body("Statut invalide");
//        }
//
//        tache.setValidate(validate);
//        tacheRepository.save(tache);
//        return ResponseEntity.ok("Statut mis à jour");
//    }

    public ResponseEntity<?> updateTacheDesc(long id, String desc) {
        Tache tache = tacheRepository.findById(id).orElse(null);

        if (tache == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        tache.setDescription(desc);
        tacheRepository.save(tache);
        return ResponseEntity.status(HttpStatus.OK).body("tache update avec succes");
    }
}
