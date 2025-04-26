import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private apiUrl = 'http://127.0.0.1:5000/predictShop';

  constructor(private http: HttpClient) {}

  getPrediction(shopname: string, date: string): Observable<number> {
    return this.http.post<any>(this.apiUrl, { shopname, date }).pipe(
      map(response => response.total_amount) // 👈 Important !
    );
  }
}
