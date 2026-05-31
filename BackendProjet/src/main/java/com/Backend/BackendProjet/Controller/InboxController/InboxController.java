package com.Backend.BackendProjet.Controller.InboxController;

import com.Backend.BackendProjet.Dtos.InboxDtos.DtoInboxSave;
import com.Backend.BackendProjet.Service.InboxService.InboxService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/inbox")
@CrossOrigin(origins = "http://localhost:5173")

public class InboxController {
    private InboxService inboxService;
    public InboxController(InboxService inboxService) {
        this.inboxService = inboxService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addInbox(@RequestBody DtoInboxSave dtoInboxSave){
        return inboxService.saveInbox(dtoInboxSave);
    }
    @GetMapping("/receive/{id}")
    public ResponseEntity<?> getInboxReceive(@PathVariable Long id){
        return inboxService.getAllInboxByReceiver(id);
    }
    @GetMapping("/send/{id}")
    public ResponseEntity<?> getInboxSend(@PathVariable Long id){
        return inboxService.getAllInboxBySender(id);
    }
}
