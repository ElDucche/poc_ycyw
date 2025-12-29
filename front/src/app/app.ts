import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Chat } from "./chat/chat";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Chat],
  template: `
  <router-outlet>
    <main class="h-screen w-screen grid align-content-center place-items-center">
      <div class="bg-slate-900 text-slate-50 h-4/5 w-4/5 drop-shadow-xl relative p-2">
        <h2 class="text-2xl font-black">Your car Your way</h2>
        <div aria-description="chat" class="absolute bottom-1 right-1 border p-4">
          Chat System
          <app-chat></app-chat>
        </div> 
      </div>
    </main>
  </router-outlet>`, 
})

export class App {
  protected readonly title = signal('front');
}
