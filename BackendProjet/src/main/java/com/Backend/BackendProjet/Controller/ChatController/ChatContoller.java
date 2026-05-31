package com.Backend.BackendProjet.Controller.ChatController;


import com.Backend.BackendProjet.Dtos.ChatDtos.DtoChat;
import com.Backend.BackendProjet.Service.ChatService.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatContoller {

    private ChatService chatService;
    @Autowired
    public ChatContoller(ChatService chatService) {
        this.chatService = chatService;
    }
    @PostMapping("/save")
    public ResponseEntity<?> saveMessageChat(@RequestBody DtoChat chat) {
        return chatService.saveChat(chat);
    }

    @GetMapping("/getMessageGroup/{id}")
    public ResponseEntity<?> getMessageGroup(@PathVariable Long id) {
        return chatService.getAllChatByGroupId(id);
    }

}
