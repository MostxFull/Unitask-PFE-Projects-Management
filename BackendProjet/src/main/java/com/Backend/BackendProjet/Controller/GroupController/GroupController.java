package com.Backend.BackendProjet.Controller.GroupController;

import com.Backend.BackendProjet.Dtos.GroupDtos.DtoSaveGroup;
import com.Backend.BackendProjet.Entity.GroupEntity.Group;
import com.Backend.BackendProjet.Service.GroupService.GroupService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/group")
@CrossOrigin(origins = "http://localhost:5173")

public class GroupController {
    private GroupService groupService;
    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createGroup(@RequestBody DtoSaveGroup dtoSaveGroup) {
        return groupService.saveGroup(dtoSaveGroup.getName(), dtoSaveGroup.getSuperviseur(), dtoSaveGroup.getMembers(),dtoSaveGroup.getAdmin());
    }
    @GetMapping("/all")
    public ResponseEntity<?> getAllGroups(){
        return groupService.getAllGroups();
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getGroupById(@PathVariable Long id){
        return groupService.getGroupById(id);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteGroup(@PathVariable Long id){
        return groupService.deleteGroup(id);
    }

    @GetMapping("/groupUser/{id}")
    public ResponseEntity<?> getGroupByIdUser(@PathVariable long id){
        return groupService.getGroupByIdUser(id);
    }


}
