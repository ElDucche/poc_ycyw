import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Chat } from "./chat/chat";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Chat],
  template: `
    <router-outlet />

    <main class="h-screen w-screen grid align-content-center place-items-center">
      <div class="bg-slate-900 text-slate-50 h-4/5 w-4/5 drop-shadow-xl relative p-2">
        <h2 class="text-2xl font-black">Your car Your way</h2>

        <div aria-description="chat" class="absolute bottom-1 right-1 border border-slate-50/20 p-4 flex flex-col items-end gap-2">

          <button (click)="toggleChat()" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
            {{ showChat() ? 'Fermer ❌' : 'Support 💬' }}
          </button>

          @if (showChat()) {
            <app-chat />
          }

        </div>
      </div>
    </main>
  `,
})
export class App {
  protected readonly title = signal('front');

  // 1. Initialisation du signal à false (fermé par défaut)
  protected readonly showChat = signal(false);

  // 2. Méthode pour inverser la valeur
  toggleChat(): void {
    this.showChat.update(isOpen => !isOpen);
  }
}
