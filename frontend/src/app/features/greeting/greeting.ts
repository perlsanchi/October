import { Component, OnInit, inject, signal } from '@angular/core';
import { GreetingService } from '../../core/services/greeting';

@Component({
  selector: 'app-greeting',
  standalone: true,
  imports: [],
  templateUrl: './greeting.html',
  styleUrl: './greeting.css',
})
export class Greeting implements OnInit {
  private greetingService = inject(GreetingService);
  message = signal('Loading…');

  ngOnInit(): void {
    this.greetingService.getGreeting().subscribe({
      next: (res) => this.message.set(res.message),
      error: (err) => {
        console.error('Greeting failed', err);
        this.message.set('Failed to reach backend');
      },
    });
  }
}