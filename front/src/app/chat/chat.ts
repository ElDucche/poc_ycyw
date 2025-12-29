import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from './chat.service';
import { ChatMessage } from './chat-message.model';

@Component({
  selector: 'app-chat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  template: `
    <div class="bg-slate-800 text-slate-200 p-4 rounded-lg w-96 h-96 flex flex-col justify-between">
      <div>
        <!-- Chat header -->
      </div>
      <div class="overflow-y-auto h-72 mb-4 relative">
        <!-- Chat messages -->
        @for (message of messages(); track $index) {
          <div class="mb-2 flex flex-col relative pt-2">
            <h6 class="absolute text-xs right-0 -top-2">{{ message.sender }}</h6>
            <p class="p-2 bg-blue-600 text-slate-100 rounded w-2/3 self-end">{{ message.content }}</p>
          </div>
        } @empty {
          <div>No messages yet.</div>
        }
      </div>
      <div>
        <!-- Chat UI elements go here -->
        <input class="w-full p-2 rounded bg-slate-700 text-slate-200 mb-2" [ngModel]="newMessage()" (ngModelChange)="newMessage.set($event)" (keydown.enter)="sendMessage()" type="text" placeholder="Type your message..." />
        <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" (click)="sendMessage()">Send</button>
      </div>
    </div>
  `,
  styles: ``,
})
export class Chat {
  private readonly chatService = inject(ChatService);
  readonly messages = this.chatService.messages;
  readonly newMessage = signal('');

  sendMessage(): void {
    if (this.newMessage().trim()) {
      const message: ChatMessage = {
        id: crypto.randomUUID(),
        sender: 'User', // Remplacez par une logique pour identifier l'utilisateur
        content: this.newMessage(),
        timestamp: new Date().toISOString(),
      };
      this.chatService.sendMessage(message);
      this.newMessage.set('');
    }
  }
}
