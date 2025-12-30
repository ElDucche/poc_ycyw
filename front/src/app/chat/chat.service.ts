import { Injectable, inject, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { ChatMessage } from './chat-message.model';
import { tap } from 'rxjs/operators';

export type UserMode = 'USER' | 'SUPPORT';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private http = inject(HttpClient);
  private socket$: WebSocketSubject<ChatMessage>;
  private readonly messagesSignal: WritableSignal<ChatMessage[]> = signal([]);
  public readonly messages = this.messagesSignal;

  public readonly userMode = signal<UserMode>('USER');

  constructor() {
    this.loadHistory();
    
    // Use relative path for production (proxied by Nginx) or localhost:8080 for dev
    // But since we are running in docker behind Nginx on port 80, we should use the same host.
    // However, during local `ng serve`, window.location.host is localhost:4200.
    // If we want to support both, we need environment variables or a check.
    // For this POC running in Docker on port 80:
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host; // 'localhost' or 'localhost:80'
    
    this.socket$ = webSocket<ChatMessage>(`${protocol}//${host}/chat`);

    this.socket$.subscribe({
      next: (message) => this.messagesSignal.update((current) => [...current, message]),
      error: (err) => console.error('WebSocket error:', err),
      complete: () => console.warn('WebSocket connection closed'),
    });
  }

  private loadHistory() {
    this.http.get<ChatMessage[]>('/api/messages')
      .subscribe({
        next: (msgs) => this.messagesSignal.set(msgs),
        error: (err) => console.error('Failed to load history', err)
      });
  }

  sendMessage(content: string): void {
    const isUser = this.userMode() === 'USER';
    const message: ChatMessage = {
      content,
      sender: isUser ? 'User' : 'Support',
      isFromUser: isUser
    };
    
    this.socket$.next(message);
  }

  toggleMode(): void {
    this.userMode.update(mode => mode === 'USER' ? 'SUPPORT' : 'USER');
  }

  closeConnection(): void {
    this.socket$.complete();
  }
}
