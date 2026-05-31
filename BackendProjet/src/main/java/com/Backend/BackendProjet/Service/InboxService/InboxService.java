package com.Backend.BackendProjet.Service.InboxService;

import com.Backend.BackendProjet.Dtos.InboxDtos.DtoInboxSave;
import com.Backend.BackendProjet.Dtos.InboxDtos.InboxSummaryDTO;
import com.Backend.BackendProjet.Entity.InboxEntity.Inbox;
import com.Backend.BackendProjet.Entity.UserEntity.User;
import com.Backend.BackendProjet.Repository.InboxRepository.InboxRepository;
import com.Backend.BackendProjet.Repository.UserRepository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InboxService {
    private final InboxRepository inboxRepository;
    private final UserRepository userRepository;
    public InboxService(InboxRepository inboxRepository, UserRepository userRepository) {
        this.inboxRepository = inboxRepository;
        this.userRepository = userRepository;
    }

    public ResponseEntity<?> saveInbox(DtoInboxSave dtoInboxSave){
        if (dtoInboxSave.getSenderId()==null || dtoInboxSave.getReceiverId()==null){
            return ResponseEntity.badRequest().body("Missing fields");
        }
        Optional<User> sender = userRepository.findById(dtoInboxSave.getSenderId());
        Optional<User> receive = userRepository.findById(dtoInboxSave.getReceiverId());
        if (sender.isEmpty() || receive.isEmpty()){
            return ResponseEntity.badRequest().body("User not found");
        }
        Inbox inbox = new Inbox();
        inbox.setContent(dtoInboxSave.getContent());
        inbox.setSubject(dtoInboxSave.getSubject());
        inbox.setSender(sender.get());
        inbox.setReceiver(receive.get());
        inboxRepository.save(inbox);
        return ResponseEntity.ok(inbox);
    }

    public ResponseEntity<?> getAllInboxByReceiver(Long id) {
        Optional<User> receiverOpt = userRepository.findById(id);
        if (receiverOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        List<Inbox> inboxesReceive = inboxRepository.findByIdReceive(id);
        if (inboxesReceive == null || inboxesReceive.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No inbox found");
        }

        // Transformation des inboxes en DTOs
        List<InboxSummaryDTO> inboxDTOs = inboxesReceive.stream()
                .map(inbox -> {
                    Long senderId = (inbox.getSender() != null) ? inbox.getSender().getId() : null;
                    Long receiverId = (inbox.getReceiver() != null) ? inbox.getReceiver().getId() : null;
                    String senderName = (inbox.getSender() != null) ? inbox.getSender().getLastName()+" "+inbox.getSender().getFirstName() : "Unknown Sender";
                    String receiverName = (inbox.getReceiver() != null) ? inbox.getReceiver().getLastName()+ " "+inbox.getReceiver().getFirstName()  : "Unknown Receiver";

                    return new InboxSummaryDTO(
                            inbox.getId(),
                            senderId,
                            receiverId,
                            senderName,
                            receiverName,
                            inbox.getSubject(),
                            inbox.getContent()
                    );
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(inboxDTOs);
    }


    public ResponseEntity<?> getAllInboxBySender(Long id) {
        Optional<User> senderOpt = userRepository.findById(id);
        if (senderOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        List<Inbox> inboxesSend = inboxRepository.findByIdSender(id);
        if (inboxesSend == null || inboxesSend.isEmpty()) {
            return ResponseEntity.badRequest().body("No inbox found");
        }

        // Transformation des inboxes en DTOs
        List<InboxSummaryDTO> inboxDTOs = inboxesSend.stream()
                .map(inbox -> {
                    Long senderId = (inbox.getSender() != null) ? inbox.getSender().getId() : null;
                    Long receiverId = (inbox.getReceiver() != null) ? inbox.getReceiver().getId() : null;
                    String senderName = (inbox.getSender() != null) ? inbox.getSender().getFirstName()+" "+inbox.getSender().getLastName(): "Unknown Sender";
                    String receiverName = (inbox.getReceiver() != null) ? inbox.getReceiver().getFirstName()+" "+inbox.getReceiver().getLastName() : "Unknown Receiver";

                    return new InboxSummaryDTO(
                            inbox.getId(),
                            senderId,
                            receiverId,
                            senderName,
                            receiverName,
                            inbox.getSubject(),
                            inbox.getContent()
                    );
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(inboxDTOs);
    }
}
