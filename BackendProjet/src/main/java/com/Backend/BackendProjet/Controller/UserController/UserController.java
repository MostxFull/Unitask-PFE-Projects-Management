package com.Backend.BackendProjet.Controller.UserController;

import com.Backend.BackendProjet.Dtos.UsersDtos.*;
import com.Backend.BackendProjet.Entity.UserEntity.Enseignant;
import com.Backend.BackendProjet.Entity.UserEntity.Etudiant;
import com.Backend.BackendProjet.Service.UserService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private UserService userService;
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/saveEtu")
        public ResponseEntity<?> saveEtu(@RequestBody DTOEtudinetSave etudiantDTO) {
        return userService.SaveEtudiant(etudiantDTO);
        }
    @PostMapping("/addEtudient")
    public ResponseEntity<?> addEtudiant(@RequestBody Etudiant etudiant){
        return userService.SaveEtudiant(etudiant);
    }

    @PostMapping("/addEnseignant")
    public ResponseEntity<?> AddEnsiegnement(@RequestBody EnsSaveDTO ensSaveDTO){
        return userService.saveEnseignant(ensSaveDTO);
    }
    @PostMapping("/addAdmine")
    public ResponseEntity<?> AddAdmine(@RequestBody AdmineSaveDTO admineDTO){
        return userService.addAdmin(admineDTO);
    }
    @GetMapping("/etudient/{id}")
    public ResponseEntity<?> getEtudinet(@PathVariable long id){
        return userService.getEtudinet(id);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable long id){
        return userService.getUser(id);
    }


    @GetMapping("/findAllGroupEncadre/{id}")
    public ResponseEntity<?> findAllGroupEncadre(@PathVariable Long id){
        return userService.findAllGroupEncadreParEnsignemnt(id);
    }
    @GetMapping("/getAllEtudiants")
    public ResponseEntity<Iterable<Etudiant>> getAllEtudiants(){
        return userService.getAllEtudiants();
    }

    @GetMapping("/getAllEnsieg")
    public ResponseEntity<Iterable<Enseignant>> getAllEnsieg(){
        return userService.getAllEnsieg();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody DtoLoginRequest dtoLoginRequest){
        return userService.logIn(dtoLoginRequest.getEmail(),dtoLoginRequest.getPassword());
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id){
        return userService.deleteUser(id);
    }

    @PutMapping("/changePassword/{id}")
    public ResponseEntity<?> changePassword(@PathVariable long id ,@RequestBody
    DtoChangePassword dtoChangePassword){
        return userService.changePassword(id ,dtoChangePassword);
    }

    @GetMapping("/Overview/{id}")
    public ResponseEntity<?> getAllinformation(@PathVariable long id){
        return userService.getAllUserInformation(id);
    }

    @GetMapping("/overviewEnd/{id}")
    public ResponseEntity<?> getAllInformationEncadremnt(@PathVariable long id){
        return  userService.getAllInformationEncadremnt(id);
    }

    @GetMapping("/MembresGroup/{id}")
    public ResponseEntity<?> getMemberGroup(@PathVariable long id){
        return userService.getMemberProjet(id);
    }

    @GetMapping("/groupInfo/{id}")
    public ResponseEntity<?> getGroupInfo(@PathVariable long id) {
        return userService.getGroupInfo(id);
    }


    @GetMapping("/UserChatInfo/{id}")
    public ResponseEntity<?> getUserChatInfo(@PathVariable long id) {
        return  userService.getUserInfoChat(id);
    }

    @PutMapping("/updateEtu/{id}")
    public ResponseEntity<?> updateEtu(@PathVariable long id,@RequestBody UpdateUserDTO updateUserDTO){
        return userService.UpdateEtu(id, updateUserDTO);
    }

    @PutMapping("/updateEnsg/{id}")
    public ResponseEntity<?> updateEnsg(@PathVariable long id,@RequestBody UpdateUserDTO updateUserDTO){
        return userService.UpdateEnsg(id, updateUserDTO);
    }

    @GetMapping("/role/{id}")
    public ResponseEntity<?> getRole(@PathVariable long id){
        return userService.userRole(id);
    }
    @GetMapping("/isAdmin/{id}")
    public ResponseEntity<?> IsAdmin(@PathVariable long id){
        return userService.isAdmin(id);
    }





}
