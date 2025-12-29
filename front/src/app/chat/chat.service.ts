import { Injectable } from '@angular/core';
import { WritableSignal, signal } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { ChatMessage } from './chat-message.model';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private socket$: WebSocketSubject<ChatMessage>;
  private readonly messagesSignal: WritableSignal<ChatMessage[]> = signal([]);
  public readonly messages = this.messagesSignal;

  constructor() {
    this.socket$ = webSocket<ChatMessage>('ws://vigilant-couscous-597p4vx7wgpf7wqp-8080.app.github.dev/chat');

    this.socket$.subscribe({
      next: (message) => this.messagesSignal.update((current) => [...current, message]),
      error: (err) => console.error('WebSocket error:', err),
      complete: () => console.warn('WebSocket connection closed'),
    });
  }

  sendMessage(message: ChatMessage): void {
    // Ajouter le message immédiatement à la liste locale (optimistic update)
    this.messagesSignal.update((current) => [...current, message]);
    // Envoyer le message au serveur
    this.socket$.next(message);
  }

  closeConnection(): void {
    this.socket$.complete();
  }
}