package com.Backend.BackendProjet.Controller.TachesController;

import com.Backend.BackendProjet.Dtos.TacheDtos.DTOtacheupdateDesc;
import com.Backend.BackendProjet.Dtos.TacheDtos.DtoTacheSave;
import com.Backend.BackendProjet.Dtos.TacheDtos.UpdateTaheDTO;
import com.Backend.BackendProjet.Dtos.TacheDtos.ValidationDTO;
import com.Backend.BackendProjet.Enum.StatusTask;
import com.Backend.BackendProjet.Service.TachesService.TacheService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tache")
@CrossOrigin(origins = "http://localhost:5173")

public class TacheController {
    private TacheService tacheService;
    public TacheController(TacheService tacheService) {
        this.tacheService = tacheService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addTache(@RequestBody DtoTacheSave dtoTache){
        return tacheService.SaveTache(dtoTache);

    }
    @DeleteMapping ("/delete/{id}")
    public ResponseEntity<?> deleteTache(@PathVariable Long id){
        return tacheService.deleteTache(id);
    }
    @GetMapping("/all")
    public ResponseEntity<?> getAllTaches(){
        return tacheService.getAllTaches();
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getTacheById(@PathVariable Long id){
        return tacheService.getTacheById(id);
    }
    @GetMapping("/Assigned/{id}")
    public ResponseEntity<?> getTachesByAssigned(@PathVariable Long id){
        return tacheService.getTachesByAssigned(id);
    }
    @GetMapping("/Group/{id}")
    public ResponseEntity<?> getTachesByGroup(@PathVariable Long id){
        return tacheService.getTachesByGroup(id);
    }
    @GetMapping("/Responsable/{id}")
    public ResponseEntity<?> getTachesByResponsable(@PathVariable Long id){
        return tacheService.getTachesByResponsable(id);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> ModifyStatus(@PathVariable long id , @RequestBody String newStatus){
        return tacheService.ModifieStatus(id ,newStatus);
    }

    @GetMapping("/groupUser/{id}")
    public ResponseEntity<?> getTacheGroupByIdUser(@PathVariable long id){
        return tacheService.getTacheGroupByIdUser(id);
    }

    @PutMapping("/update/{id}")
    public  ResponseEntity<?> updateTache(@PathVariable Long id, @RequestBody UpdateTaheDTO dtoTache){
        return tacheService.updateTache(id ,dtoTache);
    }

    @PutMapping("/valide/{id}")
    public ResponseEntity<?> updateValidationTache(
            @PathVariable long id,
            @RequestBody ValidationDTO validate) {

        return tacheService.updateValidateTache(id, validate.getValidateStatus());
    }

    @PutMapping("/{id}/description")
    public ResponseEntity<?> updateDescriptionTache(@PathVariable long id, @RequestBody DTOtacheupdateDesc dtoTache){
        return tacheService.updateTacheDesc(id, dtoTache.getDescreption());
    }


}
