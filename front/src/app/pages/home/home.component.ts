import { Component, signal, inject } from '@angular/core';
import { Chat } from '../../chat/chat';

@Component({
  selector: 'app-home',
  imports: [Chat],
  template: `
    <div class="h-screen w-screen grid align-content-center place-items-center bg-slate-100">
      <div class="bg-slate-900 text-slate-50 h-4/5 w-4/5 drop-shadow-xl relative p-2">
        <h2 class="text-2xl font-black">Your car Your way</h2>
        
        <p class="mt-4 text-slate-300">Welcome to our car rental service. Book your premium vehicle today.</p>

        <!-- Floating Chat Widget -->
        <div aria-description="chat" class="absolute bottom-1 right-1 border border-slate-50/20 p-4 flex flex-col items-end gap-2 bg-slate-800/90 rounded-lg backdrop-blur-sm">

          <button (click)="toggleChat()" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors shadow-lg">
            {{ showChat() ? 'Fermer ❌' : 'Support 💬' }}
          </button>

          @if (showChat()) {
            <!-- Fixed size container for widget mode -->
            <div class="w-96 h-96">
              <app-chat />
            </div>
          }

        </div>
      </div>
    </div>
  `
})
export class Home {
  protected readonly showChat = signal(false);

  toggleChat(): void {
    this.showChat.update(isOpen => !isOpen);
  }
}
