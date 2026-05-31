package com.Backend.BackendProjet.Controller.TachesController;

import com.Backend.BackendProjet.Dtos.TacheDtos.DtoCommentSave;
import com.Backend.BackendProjet.Service.TachesService.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comment")
@CrossOrigin(origins = "http://localhost:5173")

public class CommentController {
    private CommentService commentService;
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }
    @PostMapping("/add")
    public ResponseEntity<?> addComment(@RequestBody DtoCommentSave dtoCommentSave){
        return commentService.saveComment(dtoCommentSave);
    }

    @GetMapping("/auteur/{id}")
    public ResponseEntity<?> getCommentByAuteur(@PathVariable Long id){
        return commentService.getCommentByAuteur(id);
    }
    @GetMapping("/tache/{id}")
    public ResponseEntity<?> getCommentByTache(@PathVariable Long id){
        return commentService.getAllCommentsByTache(id);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable Long id){
        return commentService.deleteComment(id);
    }
}
