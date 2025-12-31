import { Component } from '@angular/core';
import { Chat } from '../../chat/chat';

@Component({
  selector: 'app-support',
  imports: [Chat],
  template: `
    <div class="h-screen w-screen flex bg-slate-200">
      <!-- Sidebar -->
      <aside class="w-64 bg-slate-900 text-slate-50 flex flex-col p-4">
        <h2 class="text-xl font-bold mb-6 text-blue-400">Support Admin</h2>
        
        <nav class="flex-1">
          <ul class="space-y-2">
            <li class="bg-slate-800 p-3 rounded cursor-pointer border-l-4 border-blue-500">
              <div class="font-medium">Client #123</div>
              <div class="text-xs text-slate-400">Last message: just now</div>
            </li>
            <li class="p-3 rounded hover:bg-slate-800 cursor-pointer opacity-50">
              <div class="font-medium">Client #456 (Offline)</div>
            </li>
          </ul>
        </nav>
        
        <div class="mt-auto pt-4 border-t border-slate-700 text-xs text-slate-500">
          Logged in as Support Agent
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 flex flex-col">
        <!-- Header -->
        <header class="bg-white shadow p-4 flex justify-between items-center">
          <h3 class="font-semibold text-slate-700">Conversation with Client #123</h3>
          <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Active</span>
        </header>

        <!-- Chat Area - Full Fill -->
        <div class="flex-1 p-6 overflow-hidden">
          <div class="h-full bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
            <app-chat />
          </div>
        </div>
      </main>
    </div>
  `
})
export class Support {
}
