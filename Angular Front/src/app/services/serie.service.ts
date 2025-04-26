import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SerieService {
  private apiUrl = 'http://127.0.0.1:5000/serie';

  constructor(private http: HttpClient) {}

  getForecast(material: string, steps: number = 12): Observable<any> {
    const params = new HttpParams()
      .set('material', material)
      .set('steps', steps.toString());

    return this.http.get(this.apiUrl, { params });
  }
 
  getMaterials(): Observable<string[]> {
    return this.http.get<any[]>('http://127.0.0.1:5000/rawmaterials').pipe(
      map(materials => materials.map(mat => mat.material_name))
    );
  }
}
