import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { ChatService } from "./chat/chat.service";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <!-- Top Toggle / Navigation -->
    <div class="fixed top-4 left-0 right-0 flex justify-center z-50 pointer-events-none">
       <button (click)="toggleUserMode()" 
               class="px-6 py-2 rounded-full font-bold shadow-lg transition-all pointer-events-auto border-2 border-white/20"
               [class.bg-blue-600]="chatService.userMode() === 'USER'"
               [class.bg-green-600]="chatService.userMode() === 'SUPPORT'"
               [class.text-white]="true">
          Mode: {{ chatService.userMode() }} (Switch View)
       </button>
    </div>

    <router-outlet />
  `,
})
export class App {
  protected readonly chatService = inject(ChatService);
  private readonly router = inject(Router);

  toggleUserMode(): void {
    this.chatService.toggleMode();
    const mode = this.chatService.userMode();
    if (mode === 'SUPPORT') {
      this.router.navigate(['/support']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
