import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) { }

  private formateError(error: any) {
    return throwError(error.error || 'Server Error');
  }
  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get<any>(path, { params }).pipe(catchError(this.formateError));
  };

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post<any>(path, JSON.stringify(body), this.httpOptions).pipe(catchError(this.formateError));
  };

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put<any>(path, JSON.stringify(body), this.httpOptions).pipe(catchError(this.formateError));
  };
  
  delete(path: string): Observable<any> {
    return this.http.delete<any>(path, this.httpOptions).pipe(catchError(this.formateError));
  };
}
