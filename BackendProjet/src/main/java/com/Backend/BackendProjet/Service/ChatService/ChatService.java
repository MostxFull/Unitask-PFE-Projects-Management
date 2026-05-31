package com.Backend.BackendProjet.Service.ChatService;

import com.Backend.BackendProjet.Dtos.ChatDtos.DtoChat;
import com.Backend.BackendProjet.Entity.ChatGroup.ChatGroup;
import com.Backend.BackendProjet.Entity.GroupEntity.Group;
import com.Backend.BackendProjet.Entity.UserEntity.Etudiant;
import com.Backend.BackendProjet.Entity.UserEntity.User;
import com.Backend.BackendProjet.Repository.ChatRepository.ChatRepository;
import com.Backend.BackendProjet.Repository.GroupRepository.GroupRepository;
import com.Backend.BackendProjet.Repository.UserRepository.UserRepository;
import com.Backend.BackendProjet.Service.ChiffrementService.AesEncryptionService;
import com.Backend.BackendProjet.Service.GroupService.GroupService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {
    private final ChatRepository chatRepository;
    private final UserRepository userRepository;
    private final GroupRepository groupRepository;
    private final AesEncryptionService aesEncryptionService;
    public ChatService(ChatRepository chatRepository, UserRepository userRepository, GroupRepository groupRepository,AesEncryptionService aesEncryptionService ) {
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
        this.groupRepository = groupRepository;
        this.aesEncryptionService = aesEncryptionService;
    }

    //  Sauvegarder un message (avec chiffrement)
    public ResponseEntity<?> saveChat(DtoChat dtoChat) {
        if (dtoChat.getGroupId() == null || dtoChat.getSenderId() == null) {
            return ResponseEntity.badRequest().body("Missing fields");
        }

        User sender = userRepository.findById(dtoChat.getSenderId()).orElse(null);
        Group group = groupRepository.findById(dtoChat.getGroupId()).orElse(null);
        if (sender == null || group == null) {
            return ResponseEntity.badRequest().body("User or group not found");
        }

        ChatGroup chatGroup = new ChatGroup();
        chatGroup.setContent(aesEncryptionService.encrypt(dtoChat.getContent())); // 🔐 Chiffrement
        chatGroup.setDate(dtoChat.getDate());
        chatGroup.setGroup(group);
        chatGroup.setSender((Etudiant) sender);

        return ResponseEntity.ok(chatRepository.save(chatGroup));
    }

    //  Récupérer tous les messages d’un groupe (avec déchiffrement)
    public ResponseEntity<?> getAllChatByGroupId(Long id) {
        Group group = groupRepository.findById(id).orElse(null);
        if (group == null) {
            return ResponseEntity.badRequest().body("Group not found");
        }

        List<ChatGroup> chatGroups = chatRepository.findByIdGroup(id);
        if (chatGroups.isEmpty()) {
            return ResponseEntity.badRequest().body("No chat found");
        }

        //  Déchiffrer chaque message avant de le retourner
        List<ChatGroup> decryptedChats = chatGroups.stream().map(chat -> {
            chat.setContent(aesEncryptionService.decrypt(chat.getContent()));
            return chat;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(decryptedChats);
    }

    public ResponseEntity<?> deleteChat(Long id){
        ChatGroup chatGroup = chatRepository.findById(id).orElse(null);
        if (chatGroup == null){
            return ResponseEntity.badRequest().body("Chat not found");
        }
        chatRepository.deleteById(id);
        return ResponseEntity.ok("Chat deleted successfully");
    }
}
