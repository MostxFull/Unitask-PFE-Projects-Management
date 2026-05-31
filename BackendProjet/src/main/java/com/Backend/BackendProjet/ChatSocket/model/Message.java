package com.Backend.BackendProjet.ChatSocket.model;

import com.Backend.BackendProjet.ChatSocket.Status.Status;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Message {
   private String senderName;
   private String message;
   private String date;
   private Status status;
}