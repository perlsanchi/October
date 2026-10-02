import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface GreetingResponse {
  success: boolean;
  data: { name: string } | null;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class GreetingService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getGreeting(): Observable<GreetingResponse> {
  return this.http.get<GreetingResponse>(`${this.baseUrl}/greeting/`);
  }
}