package com.example.chat_api.models;

public class ChatMessage {
    private Long id;
    private String content;
    private String sender;
    private Boolean isFromUser;

    public ChatMessage() {}
    
    public ChatMessage(Long id, String content, String sender, Boolean isFromUser) {
        this.id = id;
        this.content = content;
        this.sender = sender;
        this.isFromUser = isFromUser;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getSender() { return sender; }
    public void setSender(String sender) { this.sender = sender; }
    public Boolean getIsFromUser() { return isFromUser; }
    public void setIsFromUser(Boolean isFromUser) { this.isFromUser = isFromUser; }
}
