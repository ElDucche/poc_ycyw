package com.example.chat_api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    // Point d'entrée pour la connexion WebSocket
    registry.addEndpoint("/ws")
        .setAllowedOriginPatterns("*") // Autorise Angular (CORS)
        .withSockJS(); // Fallback si WebSocket n'est pas dispo
  }

  @Override
  public void configureMessageBroker(MessageBrokerRegistry registry) {
    // Préfixe pour les messages envoyés DU serveur VERS le client
    registry.enableSimpleBroker("/topic");
    // Préfixe pour les messages envoyés DU client VERS le serveur
    registry.setApplicationDestinationPrefixes("/app");
  }
}
