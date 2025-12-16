import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';

const AUTH = 'auth/login';
const SAVE = 'user/new';

@Injectable({
  providedIn: 'root'
})
export class UserService  {

  env: any;

  constructor(private httpClient: HttpClient) {
    this.env = (environment as any);
  }

  public async signIn(data: any) {
    return await lastValueFrom(this.httpClient.post<any>(this.env.api_url + AUTH, data));
  }

   public async getById(userId: any) {
    return await lastValueFrom(this.httpClient.get<any>(this.env.api_url + 'user/' + userId));
  }

  public async save(data: any) {
    return await lastValueFrom(this.httpClient.post<any>(this.env.api_url + SAVE, data));
  }

  public async update(userId: string, data: any) {
    return await lastValueFrom(this.httpClient.put<any>(this.env.api_url + 'user/' + userId, data));
  }

  public async removeAccount(userId: string) {
    return await lastValueFrom(this.httpClient.delete<any>(this.env.api_url + 'user/' + userId));
  }

  getAuthorizationToken(){
    const token = localStorage.getItem('authToken');
    return token ? token : '';
  }

  decodeJwt(token: string) {
    const base64Url = token.split('.')[1]; // Get payload part
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Base64URL → Base64
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

}