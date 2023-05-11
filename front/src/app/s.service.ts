import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SService {

  url: string = 'http://localhost:8080/api/supervisors';
  constructor(private http: HttpClient) { }


  supervisors(){
    return this.http.get<String[]>(this.url).pipe();
  }
}

