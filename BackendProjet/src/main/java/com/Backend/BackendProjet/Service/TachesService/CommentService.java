package com.Backend.BackendProjet.Service.TachesService;

import com.Backend.BackendProjet.Dtos.TacheDtos.DtoCommentSave;
import com.Backend.BackendProjet.Entity.TacheEntity.Commentaire;
import com.Backend.BackendProjet.Entity.TacheEntity.Tache;
import com.Backend.BackendProjet.Entity.UserEntity.User;
import com.Backend.BackendProjet.Repository.TacheRepository.CommentTacheRepository;
import com.Backend.BackendProjet.Repository.TacheRepository.TacheRepository;
import com.Backend.BackendProjet.Repository.UserRepository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class CommentService {
    private CommentTacheRepository commentTacheRepository;
    private TacheRepository tacheRepository;
    private UserRepository userRepository;
    @Autowired
    public CommentService(CommentTacheRepository commentTacheRepository, TacheRepository tacheRepository, UserRepository userRepository) {
        this.commentTacheRepository = commentTacheRepository;
        this.tacheRepository = tacheRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ResponseEntity<?> saveComment(DtoCommentSave dtoCommentSave){
        if (dtoCommentSave.getTacheId()==null || dtoCommentSave.getAuteurId()==null){
            return ResponseEntity.badRequest().body("Missing fields");
        }


        Tache tache = tacheRepository.findById(dtoCommentSave.getTacheId())
                .orElseThrow(() -> new RuntimeException("Tache not found"));
        User user = userRepository.findById(dtoCommentSave.getAuteurId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Commentaire commentaire = new Commentaire();
        commentaire.setContent(dtoCommentSave.getContent());
        commentaire.setAuteur(user);
        commentaire.setTache(tache);
        commentaire.setDate(dtoCommentSave.getDate() != null ? dtoCommentSave.getDate() : new Date());

        commentTacheRepository.save(commentaire);
        return ResponseEntity.ok(commentaire);

    }

    public ResponseEntity<?> getAllCommentsByTache(Long id){

        Optional<Tache> tache = tacheRepository.findById(id);
        if (tache.isEmpty()){
            return ResponseEntity.badRequest().body("Tache not found");
        }
        Optional<Iterable<Commentaire>> commentaires = Optional.ofNullable(commentTacheRepository.findByTache(id));
        if (commentaires.isEmpty()){
            return ResponseEntity.badRequest().body("No comments found");
        }
        return ResponseEntity.ok(commentaires.get());


    }

    public ResponseEntity<?> getCommentByAuteur(Long id){
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()){
            return ResponseEntity.badRequest().body("User not found");
        }
        Optional<Iterable<Commentaire>> commentaires = Optional.ofNullable(commentTacheRepository.findByAuteur(id));
        if (commentaires.isEmpty()){
            return ResponseEntity.badRequest().body("No comments found");
        }
        return ResponseEntity.ok(commentaires.get());

    }
    public ResponseEntity<?> deleteComment(Long id){
        Optional<Commentaire> commentaire = commentTacheRepository.findById(id);
        if (commentaire.isEmpty()){
            return ResponseEntity.badRequest().body("Comment not found");
        }
        commentTacheRepository.deleteById(id);
        return ResponseEntity.ok("Comment deleted successfully");
    }
}
