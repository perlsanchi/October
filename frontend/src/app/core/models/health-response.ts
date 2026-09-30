export interface HealthData {
  database: boolean;
  cache: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
  errors?: Record<string, unknown>;
}

export type HealthResponse = ApiResponse<HealthData>;