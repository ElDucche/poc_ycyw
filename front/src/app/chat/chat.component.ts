import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { ChatService } from '../chat.service';
import { form, required } from '@angular/forms/signals';

interface ChatMessageForm {
  message: string;
}

@Component({
  selector: 'app-chat',
  imports: [Field],
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent {
  // Injection moderne sans constructeur
  protected chatService = inject(ChatService);

  // Signal local pour le formulaire
  protected chatMessageModel = signal<ChatMessageForm>({
    message: ''
  });

  protected chatMessageForm = form(this.chatMessageModel, (schemaPath) => {
    required(schemaPath.message, { message: 'Message is required' });
  });

  private username = signal('Client-' + Math.floor(Math.random() * 1000));

  constructor() {
    // On lance la connexion à l'instanciation
    this.chatService.connect();
  }

  sendMessage() {
    const msg = this.chatMessageForm.message().value();
    if (msg.trim()) {
      this.chatService.sendMessage(msg, this.username());
      this.chatMessageForm.message().value.set(''); // Reset du champ input
    }
  }
}
