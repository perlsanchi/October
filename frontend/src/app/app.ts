import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthService } from './core/services/health';
import { HealthResponse } from './core/models/health-response';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private healthService = inject(HealthService);
  health = signal<HealthResponse | null>(null);

  ngOnInit(): void {
    this.healthService.getHealth().subscribe({
      next: (res: HealthResponse) => this.health.set(res),
      error: (err: unknown) => console.error('Health check failed', err),
    });
  }
}