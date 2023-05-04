import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) {
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
