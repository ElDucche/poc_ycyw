import { Injectable, signal, computed } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export interface ChatMessage {
  sender: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // 1. Définition de l'état avec un Signal (privé en écriture)
  private _messages = signal<ChatMessage[]>([]);

  // 2. Exposition en lecture seule pour les composants
  public messages = this._messages.asReadonly();

  private stompClient: Client | null = null;

  connect() {
    const socket = new SockJS('http://localhost:8080/ws');

    this.stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: (frame) => {
        console.log('Connecté au WebSocket');

        this.stompClient?.subscribe('/topic/public', (message: Message) => {
          if (message.body) {
            const parsedMessage: ChatMessage = JSON.parse(message.body);

            // 3. Mise à jour atomique du signal (plus besoin de .next())
            this._messages.update(oldMessages => [...oldMessages, parsedMessage]);
          }
        });
      },
      // Gestion d'erreur basique
      onStompError: (frame) => {
        console.error('Erreur Broker: ' + frame.headers['message']);
      }
    });

    this.stompClient.activate();
  }

  sendMessage(msg: string, sender: string) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify({ content: msg, sender: sender })
      });
    }
  }
}
