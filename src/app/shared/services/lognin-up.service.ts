import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../core/model/object-model';

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
    return this.apiService.get(this.login_url + '/user?email=' + user_name + '&password=' + password);
  }
  UserRegistration(user_detail: any) {
    return this.apiService.post(this.reg_url + '/user', user_detail);
  };
  adminLogin(user_name: any, password: any) {
    return this.apiService.get(this.login_url + '/user?email=' + user_name + '&password=' + password + '&role=admin'  );
  }
}
