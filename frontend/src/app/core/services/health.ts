import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HealthResponse } from '../models/health-response';

@Injectable({ providedIn: 'root' })
export class HealthService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getHealth(): Observable<HealthResponse> {
    return this.http.get<HealthResponse>(`${this.baseUrl}/health/`);
  }
}