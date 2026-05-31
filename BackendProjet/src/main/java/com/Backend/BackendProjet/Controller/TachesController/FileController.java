package com.Backend.BackendProjet.Controller.TachesController;

import com.Backend.BackendProjet.Entity.TacheEntity.File;
import com.Backend.BackendProjet.Service.TachesService.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/file")
public class FileController {

    private FileStorageService fileStorageService;

    @Autowired
    public FileController(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("tacheId") Long tacheId,
            @RequestParam("membreId") Long membreId
    ) throws IOException {
        return fileStorageService.saveFile(file, tacheId, membreId);
    }

    @GetMapping("/tache/{tacheId}")
    public List<File> getFilesByTache(@PathVariable Long tacheId) {
        return fileStorageService.getFilesByTache(tacheId);
    }

    @GetMapping("/membre/{membreId}")
    public List<File> getFilesByMembre(@PathVariable Long membreId) {
        return fileStorageService.getFilesByMembre(membreId);
    }
    @GetMapping("/{fileId}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable Long fileId){
        return fileStorageService.downloadFile(fileId);

    }

}
