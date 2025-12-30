package com.example.chat_api.controllers;

import com.example.chat_api.models.AppUser;
import com.example.chat_api.models.ChatMessage;
import com.example.chat_api.repositories.MessageRepository;
import com.example.chat_api.repositories.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@CrossOrigin(origins = "*")
public class ChatController {

    private final UserRepository userRepository;
    private final MessageRepository messageRepository;

    public ChatController(UserRepository userRepository, MessageRepository messageRepository) {
        this.userRepository = userRepository;
        this.messageRepository = messageRepository;
    }

    // WebSocket logic moved to ChatWebSocketHandler

    @GetMapping("/api/messages")
    @ResponseBody
    public List<ChatMessage> getMessages() {
        String email = "client@example.com";
        AppUser user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return messageRepository.findByUserIdOrderBySentAtAsc(user.getId()).stream()
                .map(msg -> new ChatMessage(
                        msg.getId(),
                        msg.getContent(),
                        msg.getIsFromUser() ? "User" : "Support",
                        msg.getIsFromUser()
                ))
                .collect(Collectors.toList());
    }
}
