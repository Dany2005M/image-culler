import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CullerResponse {
  filename: string;
  sharpnessScore: number;
  keeper: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class Culler {
  private gatewayUrl = 'http://localhost:8080/api/culler/evaluate-batch';
  private http = inject(HttpClient);

  evaluateBatch(files: File[]): Observable<CullerResponse> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    })

    return this.http.post<CullerResponse>(this.gatewayUrl, formData)
  }

}
