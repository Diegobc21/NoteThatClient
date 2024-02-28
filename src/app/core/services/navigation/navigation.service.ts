import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {OptionType} from "../../../pages/option/option-type.enum";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private router: Router
  ) {
  }

  public navigateByUrl(path: string): Promise<any> {
    return this.router.navigateByUrl(path);
  }

  public navigateToHome(): Promise<any> {
    return this.navigateByUrl('/home');
  }

  public navigateToLogin(): Promise<any> {
    return this.navigateByUrl('/user/login');
  }

  public navigateToRegister(): Promise<any> {
    return this.navigateByUrl('/user/register');
  }

  public navigateToProfile(): Promise<any> {
    return this.navigateByUrl('/user/profile');
  }

  public navigateToOption(option: OptionType): Promise<any> {
    return this.navigateByUrl(`/option/${option.toString()}`);
  }

  public navigateToFriends(): Promise<any> {
    return this.navigateByUrl('/option/friends');
  }

  public navigateToFriendsSearch(): Promise<any> {
    return this.navigateByUrl('/option/friends/search');
  }

}
