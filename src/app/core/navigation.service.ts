import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  public navigateToHome(): Promise<any> {
    return this.router.navigateByUrl('/home');
  }

  public navigateToLogin(): Promise<any> {
    return this.router.navigateByUrl('/user/login');
  }

  public navigateToRegister(): Promise<any> {
    return this.router.navigateByUrl('/user/register');
  }

  public navigateTo(path: string): Promise<any> {
    return this.router.navigateByUrl(path);
  }
}
