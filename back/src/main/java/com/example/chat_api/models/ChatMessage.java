package com.example.chat_api.models;

public class ChatMessage {
    private String content;
    private String sender;

    // Constructeurs, Getters et Setters
    public ChatMessage() {}
    
    public ChatMessage(String content, String sender) {
        this.content = content;
        this.sender = sender;
    }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getSender() { return sender; }
    public void setSender(String sender) { this.sender = sender; }
}