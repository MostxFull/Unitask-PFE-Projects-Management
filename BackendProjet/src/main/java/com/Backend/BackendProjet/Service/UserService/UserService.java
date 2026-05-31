package com.Backend.BackendProjet.Service.UserService;

import com.Backend.BackendProjet.Dtos.UsersDtos.*;
import com.Backend.BackendProjet.Entity.GroupEntity.Group;
import com.Backend.BackendProjet.Entity.UserEntity.Admine;
import com.Backend.BackendProjet.Entity.UserEntity.Enseignant;
import com.Backend.BackendProjet.Entity.UserEntity.Etudiant;
import com.Backend.BackendProjet.Entity.UserEntity.User;
import com.Backend.BackendProjet.Enum.IsAdmin;
import com.Backend.BackendProjet.Repository.GroupRepository.GroupRepository;
import com.Backend.BackendProjet.Repository.UserRepository.AdmineRepository;
import com.Backend.BackendProjet.Repository.UserRepository.EnsiegnementRepository;
import com.Backend.BackendProjet.Repository.UserRepository.EtudientRepository;
import com.Backend.BackendProjet.Repository.UserRepository.UserRepository;
import jakarta.transaction.Transactional;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional

public class UserService {

    private UserRepository userRepository;
    private EtudientRepository etudientRepository;
    private EnsiegnementRepository ensiegnementRepository;
    private AdmineRepository admineRepository;
    private GroupRepository groupRepository;
    private PasswordEncoder passwordEncoder;
    @Autowired
    public UserService(UserRepository userRepository, EtudientRepository etudientRepository, EnsiegnementRepository ensiegnementRepository,GroupRepository groupRepository ,PasswordEncoder passwordEncoder,AdmineRepository admineRepository) {

        this.userRepository = userRepository;
        this.etudientRepository = etudientRepository;
        this.ensiegnementRepository = ensiegnementRepository;
        this.groupRepository = groupRepository;
        this.admineRepository=admineRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public ResponseEntity<?> SaveEtudiant(DTOEtudinetSave etudiantDTO) {
        Map<String, String> response = new HashMap<>();

        // Vérification de l'email
        if (etudientRepository.existsByEmail(etudiantDTO.getEmail())) {
            response.put("error", "Email déjà utilisé");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        // Création de l'étudiant
        Etudiant etudiant = new Etudiant();
        etudiant.setFirstName(etudiantDTO.getFirstName());
        etudiant.setLastName(etudiantDTO.getLastName());
        etudiant.setEmail(etudiantDTO.getEmail());
        etudiant.setPassword(passwordEncoder.encode(etudiantDTO.getPassword()));
        etudiant.setClasse(etudiantDTO.getClasse());

        // Gestion de isAdmin (optionnel)
        etudiant.setIsAdmin(etudiantDTO.getIsAdmin() != null ? etudiantDTO.getIsAdmin() : IsAdmin.Non);

        // Liaison avec le groupe (optionnel)
        if (etudiantDTO.getGroupId() != null) {
            Group group = groupRepository.findById(etudiantDTO.getGroupId())
                    .orElseThrow(() -> new RuntimeException("Groupe non trouvé"));
            etudiant.setGroup(group);
        }

        etudientRepository.save(etudiant);
        response.put("success", "Étudiant créé avec succès");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Transactional
    public ResponseEntity<?> saveEnseignant(EnsSaveDTO enseignantDTO) {
        Map<String, String> response = new HashMap<>();

        // Vérification de l'email
        if (ensiegnementRepository.existsByEmail(enseignantDTO.getEmail())) {
            response.put("error", "Email déjà utilisé");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        // Création de l'enseignant
        Enseignant enseignant = new Enseignant();
        enseignant.setFirstName(enseignantDTO.getFirstName());
        enseignant.setLastName(enseignantDTO.getLastName());
        enseignant.setEmail(enseignantDTO.getEmail());
        enseignant.setPassword(passwordEncoder.encode(enseignantDTO.getPassword()));
        enseignant.setDepartement(enseignantDTO.getDepartement());

        // Sauvegarder l'enseignant pour générer l'ID
        enseignant = ensiegnementRepository.save(enseignant);

        // Liaison avec les groupes (optionnel)
        if (enseignantDTO.getGroupIds() != null && !enseignantDTO.getGroupIds().isEmpty()) {
            for (Long groupId : enseignantDTO.getGroupIds()) {
                Group group = groupRepository.findById(groupId)
                        .orElseThrow(() -> new RuntimeException("Groupe non trouvé avec l'ID: " + groupId));
                group.setSuperviseur(enseignant); // Bidirectionnel: met à jour la référence
                // enseignant.getGroups().add(group); // Optionnel (pour cohérence en mémoire)
            }
        }

        response.put("success", "Enseignant créé avec succès");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    @Transactional
    public ResponseEntity<?> SaveEtudiant(Etudiant etudiant){
        Map<String,String> response = new HashMap<>();
        if(etudientRepository.existsByEmail(etudiant.getEmail())){
            response.put("Error","Email already exists");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

//        etudiant.setPassword(passwordEncoder.encode(etudiant.getPassword()));
//        etudiant.setIsAdmin(IsAdmin.Non);

        etudientRepository.save(etudiant);
        response.put("Success","User created successfully");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Transactional
    public ResponseEntity<?> SaveEnseignant(Enseignant enseignant){
        Map<String,String> response = new HashMap<>();
        if(ensiegnementRepository.existsByEmail(enseignant.getEmail())){
            response.put("Error","Email already exists");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
        enseignant.setPassword(passwordEncoder.encode(enseignant.getPassword()));

        response.put("Success","User created successfully");
        ensiegnementRepository.save(enseignant);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }

    public ResponseEntity<Iterable<Etudiant>> getAllEtudiants() {
        Iterable<Etudiant> etudiants = etudientRepository.findAll();

        if (!etudiants.iterator().hasNext()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(etudiants);
    }


    public ResponseEntity<Iterable<Enseignant>> getAllEnsieg() {
        Iterable<Enseignant> enseignants = ensiegnementRepository.findAll();

        if (!enseignants.iterator().hasNext()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(enseignants);
    }


    public ResponseEntity<?> logIn(String email, String password){

        User user = userRepository.findByEmail(email).orElse(null);
        Map<String,String> response = new HashMap<>();
        if(user==null){
            response.put("Error","User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        if(!passwordEncoder.matches(password, user.getPassword())) {
            response.put("Error", "Wrong password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        response.put("Success","User logged in successfully");
        response.put("id", user.getId().toString());
        //recuprer le role de User
        response.put("role",user.getClass().getSimpleName());
        //on peut aussi ecrire
//        if (user instanceof Etudiant) {
//            response.put("role1", "etudiant");
//        } else if (user instanceof Enseignant) {
//            response.put("role1", "enseignant");
//        }

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @Transactional
    public ResponseEntity<?> deleteUser(Long id) {
        Optional<User> user = userRepository.findById(id);

        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        userRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body("User deleted successfully");
    }

    public ResponseEntity<?> findAllGroupEncadreParEnsignemnt(Long id) {
        Optional<Enseignant> enseignant = ensiegnementRepository.findById(id);
        if (enseignant.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("L'enseignant n'existe pas");
        }

        return ResponseEntity.ok(enseignant);

    }

    public ResponseEntity<?> getEtudinet(Long id){
        Optional<Etudiant> OptionalEtud= etudientRepository.findById(id);
        if (OptionalEtud.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Etudiant etudiant = OptionalEtud.get();
        return ResponseEntity.ok(etudiant);
    }

    public ResponseEntity<?> getUser(Long id){
        Optional<User> OptionalUser= userRepository.findById(id);
        if (OptionalUser.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        User user = OptionalUser.get();
        return ResponseEntity.ok(user);
    }

    public ResponseEntity<?> changePassword(long id , DtoChangePassword dtoChangePassword){
        Optional<User> OptionelUser = userRepository.findById(id);
        if(OptionelUser.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        User user = OptionelUser.get();
        if(! passwordEncoder.matches(dtoChangePassword.getOldPassword(), user.getPassword())){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("la Password nest pas correct ");
        }
        if (passwordEncoder.matches(dtoChangePassword.getNewPassword(), user.getPassword())){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("le password deja exist");
        }
        user.setPassword(passwordEncoder.encode(dtoChangePassword.getNewPassword()));
        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.OK).body("Mot de Passe est Modifier");
    }

    @Transactional
    public ResponseEntity<?> getAllUserInformation(Long id) {
        Etudiant etudiant = etudientRepository.findById(id).orElse(null);
        if (etudiant == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        // Vérifie si l'étudiant a un groupe
        Group group = null;
        if (etudiant.getGroup() != null) {
            group = groupRepository.findById(etudiant.getGroup().getId()).orElse(null);
        }
        String nameEncadremnt = group.getSuperviseur().getFirstName()+" "+group.getSuperviseur().getLastName();

        // Crée un objet contenant les deux informations
        Map<String, Object> response = new HashMap<>();
        response.put("etudiant", etudiant);
        response.put("TacheGroup", group.getTaches());
        response.put("MembreGroup",group.getMembers());
        response.put("Encadrement",nameEncadremnt);

        return ResponseEntity.ok(response);
    }
    @Transactional
    public ResponseEntity<?> getAllInformationEncadremnt(Long id) {

        // Vérifie si l'étudiant a un groupe
        Group group = groupRepository.findById(id).orElse(null);
        if (group == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        // Crée un objet contenant les deux informations
        Map<String, Object> response = new HashMap<>();
        response.put("TacheGroup", group.getTaches());
        response.put("MembreGroup",group.getMembers());

        return ResponseEntity.ok(response);
    }



    @Transactional
    public ResponseEntity<?> getMemberProjet(Long id) {
        Map<String, Object> response = new HashMap<>();

        Etudiant etudiant = etudientRepository.findById(id).orElse(null);
        if (etudiant == null || etudiant.getGroup() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Group group = groupRepository.findById(etudiant.getGroup().getId()).orElse(null);
        if (group == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        response.put("MembresGroup", group.getMembers());

        if (group.getSuperviseur() != null) {
            Map<String, Object> encadrement = new HashMap<>();
            encadrement.put("id", group.getSuperviseur().getId());
            encadrement.put("email", group.getSuperviseur().getEmail());
            encadrement.put("firstName", group.getSuperviseur().getFirstName());
            encadrement.put("lastName", group.getSuperviseur().getLastName());
            response.put("Encadrement", encadrement);
        } else {
            response.put("Encadrement", "Aucun superviseur assigné");
        }

        return ResponseEntity.ok(response);
    }


    public ResponseEntity<?> getGroupInfo(long id) {
        Etudiant etudiant = etudientRepository.findById(id).orElse(null);

        if (etudiant == null || etudiant.getGroup() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        GroupInfoDTO groupInfoDTO = new GroupInfoDTO(
                etudiant.getGroup().getId(),
                etudiant.getGroup().getName()
        );

        return ResponseEntity.ok(groupInfoDTO);
    }


    public ResponseEntity<?> getUserInfoChat(Long id){
        DTOInfosEtuChat dtoInfosEtuChat = new DTOInfosEtuChat();
        Etudiant etudiant = etudientRepository.getById(id);
        dtoInfosEtuChat.setUserId(etudiant.getId());
        dtoInfosEtuChat.setGroupId(etudiant.getGroup().getId());
        dtoInfosEtuChat.setFirstName(etudiant.getFirstName());
        dtoInfosEtuChat.setLastName(etudiant.getLastName());
        dtoInfosEtuChat.setEmail(etudiant.getEmail());

        return ResponseEntity.ok(dtoInfosEtuChat);


    }

    public ResponseEntity<?> addAdmin(AdmineSaveDTO admineSaveDTO) {
        Map<String,String> response = new HashMap<>();
        if (etudientRepository.existsByEmail(admineSaveDTO.getEmail())) {
            response.put("error", "Email déjà utilisé");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        Admine admine = new Admine();
        admine.setEmail(admineSaveDTO.getEmail());
        admine.setFirstName(admineSaveDTO.getFirstName());
        admine.setLastName(admineSaveDTO.getLastName());
        admine.setPassword(passwordEncoder.encode(admineSaveDTO.getPassword()));
        admineRepository.save(admine);
        response.put("success", "Étudiant créé avec succès");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }

    public ResponseEntity<?> UpdateEtu(long id, UpdateUserDTO updateUserDTO) {
        Etudiant etudiant = etudientRepository.findById(id).orElse(null);
        if (etudiant == null ) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        etudiant.setClasse(updateUserDTO.getClasse());
        etudiant.setEmail(updateUserDTO.getEmail());
        etudiant.setFirstName(updateUserDTO.getFirstName());
        etudiant.setLastName(updateUserDTO.getLastName());
        etudientRepository.save(etudiant);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
    public ResponseEntity<?> UpdateEnsg(long id, UpdateUserDTO updateUserDTO) {
        Enseignant enseignant = ensiegnementRepository.findById(id).orElse(null);
        if (enseignant == null ) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        enseignant.setDepartement(updateUserDTO.getDepartement());
        enseignant.setEmail(updateUserDTO.getEmail());
        enseignant.setFirstName(updateUserDTO.getFirstName());
        enseignant.setLastName(updateUserDTO.getLastName());
        ensiegnementRepository.save(enseignant);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    public ResponseEntity<?> userRole(long id){
        User user = userRepository.findById(id).orElse(null);
        Map<String,String> response = new HashMap<>();
        if(user==null){
            response.put("Error","User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        response.put("role",user.getClass().getSimpleName());
        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    public ResponseEntity<?> isAdmin(long id){
        Etudiant etudiant = etudientRepository.findById(id).orElse(null);
        User user = userRepository.findById(id).orElse(null);
        Map<String,Boolean> response = new HashMap<>();
        if(etudiant==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        if(etudiant.getIsAdmin()==IsAdmin.Oui ){
            response.put("isAdmin",true);
        }else {
            response.put("isAdmin",false);
        }
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }








}
