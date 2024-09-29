import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {LucideIconComponent} from "../../../shared/lucide-icon/lucide-icon.component";
import {PasswordItemComponent} from "./password-item/password-item.component";
import {RegularButtonComponent} from "../../../shared/buttons/regular-button/regular-button.component";
import {SharedModule} from "../../../shared/shared.module";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Password, Section} from "../../../interfaces/password.interface";
import {SubscribeHelperComponent} from "../../../utils/subscribe-helper/subscribe-helper.component";
import {PasswordService} from "../../../core/services/password/password.service";
import {ShowPasswordButtonComponent} from "../../../shared/buttons/show-password-button/show-password-button.component";

@Component({
  selector: 'app-password-list',
  standalone: true,
  imports: [
    CommonModule,
    LucideIconComponent,
    PasswordItemComponent,
    RegularButtonComponent,
    SharedModule,
    ShowPasswordButtonComponent
  ],
  templateUrl: './password-list.component.html',
  styleUrl: './password-list.component.scss'
})
export class PasswordListComponent extends SubscribeHelperComponent implements OnInit {
  @Input() public currentSection$: BehaviorSubject<Section | null> = new BehaviorSubject<Section | null>(null);

  public passwords$: Observable<Password[]> = new Observable<Password[]>();

  public passwords: Password[] = [];
  public newPasswordVisible: boolean = false;
  public isCreatingPassword: boolean = false;
  public passwordForm: Password = {
    password: '',
    title: '',
    username: '',
    user: '',
    email: '',
    section: ''
  };

  constructor(private passwordService: PasswordService) {
    super();
  }

  public ngOnInit(): void {
    this.subscribe(this.currentSection$.asObservable(),
      () => this.loadPasswords()
    )
  }

  public toggleCreate(): void {
    this.isCreatingPassword = !this.isCreatingPassword;
  }

  public toggleNewPasswordVisibility(): void {
    this.newPasswordVisible = !this.newPasswordVisible;
  }

  private loadPasswords(): void {
    if (this.currentSection$?.getValue()) {
      this.passwords$ = this.passwordService
        .getPasswordsBySection(this.currentSection$.getValue()!.title)
        .pipe(
          map(passwords => this.passwords = [...passwords]),
        )
    }
  }

  public onCreatePassword(): void {
    if (this.formValid()) {
      const newPassword = {
        section: this.currentSection$.getValue()!.title,
        password: this.passwordForm.password,
        title: this.passwordForm.title,
        email: this.passwordForm.email,
        username: this.passwordForm.username
      }
      this.subscribe(
        this.passwordService.addPassword(newPassword),
        () => {
          this.loadPasswords();
        },
        () => {
          this.toggleCreate();
          this._resetPasswordForm();
        }
      );
    }
  }

  public passwordDeleted(): void {
    this.loadPasswords();
  }

  private formValid(): boolean {
    return this.passwordForm.password !== '' && this.passwordForm.title !== '';
  }

  private _resetPasswordForm(): void {
    this.passwordForm._id = '';
    this.passwordForm.password = '';
    this.passwordForm.section = '';
    this.passwordForm.user = '';
    this.passwordForm.username = '';
    this.passwordForm.title = '';
  }
}
