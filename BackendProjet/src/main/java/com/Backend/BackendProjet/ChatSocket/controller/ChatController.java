package com.Backend.BackendProjet.ChatSocket.controller;


import com.Backend.BackendProjet.ChatSocket.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/message/{group_id}")
    @SendTo("/chatroom/{group_id}") // Diffusion dynamique
    public Message handleMessage(
            @Payload Message message,
            @DestinationVariable String group_id // Récupération du group_id
    ) {
        return message;
    }
}