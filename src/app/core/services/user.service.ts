import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  get fullName(): string {
    return this.authService.currentUser?.fullname ?? 'User';
  }

  get email(): string {
    return this.authService.currentUser?.email ?? 'example@email.com';
  }

  constructor(private authService: AuthService) {
  }

}
