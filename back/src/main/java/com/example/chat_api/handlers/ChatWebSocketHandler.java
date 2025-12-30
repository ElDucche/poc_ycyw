package com.example.chat_api.handlers;

import com.example.chat_api.models.AppUser;
import com.example.chat_api.models.ChatMessage;
import com.example.chat_api.models.Message;
import com.example.chat_api.repositories.MessageRepository;
import com.example.chat_api.repositories.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
public class ChatWebSocketHandler extends TextWebSocketHandler {

    private final List<WebSocketSession> sessions = Collections.synchronizedList(new ArrayList<>());
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    public ChatWebSocketHandler(MessageRepository messageRepository, UserRepository userRepository, ObjectMapper objectMapper) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage textMessage) throws Exception {
        // Parse message
        ChatMessage chatMessage = objectMapper.readValue(textMessage.getPayload(), ChatMessage.class);

        // Logic from Controller
        String email = "client@example.com";
        // In a real app, we'd identify the user from session or payload
        
        AppUser user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Message message = new Message();
        message.setUser(user);
        message.setContent(chatMessage.getContent());
        message.setIsFromUser(chatMessage.getIsFromUser());
        
        Message savedMessage = messageRepository.save(message);

        // Update DTO with ID
        chatMessage.setId(savedMessage.getId());

        // Broadcast to all
        TextMessage responseMsg = new TextMessage(objectMapper.writeValueAsString(chatMessage));
        synchronized (sessions) {
            for (WebSocketSession s : sessions) {
                if (s.isOpen()) {
                    s.sendMessage(responseMsg);
                }
            }
        }
    }
}
