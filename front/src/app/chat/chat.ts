import { ChangeDetectionStrategy, Component, inject, signal, viewChild, ElementRef, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from './chat.service';
import { ChatMessage } from './chat-message.model';

@Component({
  selector: 'app-chat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  template: `
    <div class="bg-slate-800 text-slate-200 p-4 rounded-lg w-96 h-96 flex flex-col justify-between border border-slate-50/20">
      <div>
        <h3 class="text-sm font-bold mb-2 text-slate-400">
          Mode: {{ chatService.userMode() }}
        </h3>
      </div>

      <div #scrollContainer class="overflow-y-auto h-72 mb-4 relative scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">

        @for (message of messages(); track message.id || $index) {
          
          @if (isMessageMine(message)) {
            <div class="mb-2 flex flex-col relative pt-2 first:mt-4">
              <h6 class="absolute text-xs right-0 -top-2">{{ message.sender }}</h6>
              <p class="p-2 bg-blue-600 text-slate-100 rounded w-2/3 self-end">{{ message.content }}</p>
            </div>
          } @else {
            <div class="mb-2 flex flex-col relative pt-2">
              <h6 class="absolute text-xs left-0 -top-2">{{ message.sender }}</h6>
              <p class="p-2 bg-slate-200 text-slate-900 rounded w-2/3 self-start">{{ message.content }}</p>
            </div>
          }
        } @empty {
          <div>No messages yet.</div>
        }
      </div>
       <div class="flex gap-2">
         <input class="w-full p-2 rounded bg-slate-700 text-slate-200" [ngModel]="newMessage()" (ngModelChange)="newMessage.set($event)" (keydown.enter)="sendMessage()" type="text" placeholder="Type your message..." />
         <button class="bg-blue-500 text-sm hover:bg-blue-600 text-white px-4 py-2 rounded" (click)="sendMessage()">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
             <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
           </svg>
         </button>
       </div>
    </div>
  `,
  styles: ``,
})
export class Chat {
  public readonly chatService = inject(ChatService);

  // 1. Récupération de l'élément du DOM via Signal
  private readonly scrollContainer = viewChild.required<ElementRef>('scrollContainer');

  readonly messages = this.chatService.messages;
  readonly newMessage = signal('');

  constructor() {
    // 2. Création de l'effet
    effect(() => {
      // On déclare la dépendance : cet effet se relancera si messages() change
      const msgs = this.messages();

      // On utilise un setTimeout pour laisser le temps au DOM de se mettre à jour (peindre le nouveau message)
      // avant de scroller.
      setTimeout(() => {
        this.scrollToBottom();
      });
    });
  }

  private scrollToBottom(): void {
    const el = this.scrollContainer().nativeElement;
    // Scroll au maximum de la hauteur
    el.scrollTop = el.scrollHeight;
  }

  sendMessage(): void {
    if (this.newMessage().trim()) {
      this.chatService.sendMessage(this.newMessage());
      this.newMessage.set('');
    }
  }

  isMessageMine(message: ChatMessage): boolean {
    return (this.chatService.userMode() === 'USER' && message.isFromUser) || 
           (this.chatService.userMode() === 'SUPPORT' && !message.isFromUser);
  }
}
