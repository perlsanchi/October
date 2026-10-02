import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { HealthService } from './core/services/health';
import { HealthResponse } from './core/models/health-response';
import { AuthService } from './core/services/auth';
import { Greeting } from './features/greeting/greeting';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, Greeting],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private healthService = inject(HealthService);
  auth = inject(AuthService);
  private router = inject(Router);

  health = signal<HealthResponse | null>(null);

  ngOnInit(): void {
    this.healthService.getHealth().subscribe({
      next: (res: HealthResponse) => this.health.set(res),
      error: (err: unknown) => console.error('Health check failed', err),
    });
  }

  onLogout(): void {
    this.auth.logout();
  }
}