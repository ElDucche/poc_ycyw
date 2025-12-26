package com.example.chat_api.controllers;

import com.example.chat_api.models.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat.sendMessage") // L'URL que le client appelle
    @SendTo("/topic/public") // L'URL où le message est rediffusé
    public ChatMessage sendMessage(ChatMessage chatMessage) {
        return chatMessage;
    }
}