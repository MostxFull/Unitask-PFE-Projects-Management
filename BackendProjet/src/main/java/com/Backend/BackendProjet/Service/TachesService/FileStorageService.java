package com.Backend.BackendProjet.Service.TachesService;

import com.Backend.BackendProjet.Entity.TacheEntity.File;
import com.Backend.BackendProjet.Entity.TacheEntity.Tache;
import com.Backend.BackendProjet.Entity.UserEntity.User;
import com.Backend.BackendProjet.Repository.TacheRepository.FileRepository;
import com.Backend.BackendProjet.Repository.TacheRepository.TacheRepository;
import com.Backend.BackendProjet.Repository.UserRepository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class FileStorageService {
    private FileRepository fileRepository;
    private TacheRepository tacheRepository;
    private UserRepository userRepository;

    @Autowired
    public FileStorageService(FileRepository fileRepository, TacheRepository tacheRepository, UserRepository userRepository) {
        this.fileRepository = fileRepository;
        this.tacheRepository = tacheRepository;
        this.userRepository = userRepository;
    }

    public ResponseEntity<?> saveFile(MultipartFile file, Long tacheId, Long membreId) throws IOException {
        Optional<Tache> tache = tacheRepository.findById(tacheId);
        Optional<User> membre = userRepository.findById(membreId);

        if (tache.isEmpty() || membre.isEmpty()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        File fileEntity = new File();
        fileEntity.setFilename(file.getOriginalFilename());
        fileEntity.setFileType(file.getContentType());
        fileEntity.setData(file.getBytes());
        fileEntity.setTache(tache.get());
        fileEntity.setMembre(membre.get());

        fileRepository.save(fileEntity);
        return ResponseEntity.status(HttpStatus.CREATED).body(fileEntity);
    }

    public List<File> getFilesByTache(Long tacheId) {
        return fileRepository.findByTache_Id(tacheId);
    }

    public List<File> getFilesByMembre(Long membreId) {
        return fileRepository.findByMembre_Id(membreId);
    }

    public ResponseEntity<byte[]> downloadFile( Long fileId) {
        Optional<File> fileEntity = fileRepository.findById(fileId);

        if (fileEntity.isPresent()) {
            File file = fileEntity.get();
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"" + file.getFilename() + "\"")
                    .contentType(MediaType.valueOf(file.getFileType()))
                    .body(file.getData());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
