import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../core/model/object-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogninUpService {
  static UserRegistration(user_dto: User | undefined) {
    throw new Error('Method not implemented.');
  }

  public login_url = 'http://localhost:3000';
  public reg_url = 'http://localhost:3000';

  constructor(private apiService: ApiService, private http: HttpClient) { }
  
  aurthLogin(user_name: any, password: any) {
    return this.apiService.get(this.login_url + '/users?email=' + user_name + '&password=' + password);
  }
  
  UserRegistration(userData: any) {
    return this.apiService.post(this.reg_url + '/users', userData);
  }

  autoSaveFormData(formData: FormData): Observable<any> {
    // Autosave endpoint should be different from full registration
    return this.apiService.post(this.reg_url + '/users/autosave', formData);
  }

  getSavedFormData(email: string): Observable<any> {
    return this.apiService.get(this.reg_url + '/users?email=' + email);
  }
  
  adminLogin(user_name: any, password: any) {
    return this.apiService.get(this.login_url + '/user?email=' + user_name + '&password=' + password + '&role=admin'  );
  }
}
