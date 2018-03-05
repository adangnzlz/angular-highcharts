import { Injectable, Inject, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ConfigurableService {

  API_URL: string;

  constructor(private http: HttpClient) {
    this.API_URL = environment.api.base;
  }

  get(endpoint, param = ''): Observable<any> {
    return this.http.get(`${this.API_URL}${endpoint}/${param}`);
  }


  post(endpoint, body): Observable<any> {
    return this.http.post(`${this.API_URL}${endpoint}`, body);
  }

  put(endpoint, param = '', body: any): Observable<any> {
    return this.http.put(`${this.API_URL}${endpoint}/${param}`, JSON.stringify(body));

  }
  delete(endpoint, param = '') {
    return this.http.delete(`${this.API_URL}${endpoint}/${param}`);
  }

}
