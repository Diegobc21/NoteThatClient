import {ChangeDetectionStrategy, Component, Injector, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {LucideIconComponent} from "../../../shared/lucide-icon/lucide-icon.component";
import {PasswordItemComponent} from "./password-item/password-item.component";
import {RegularButtonComponent} from "../../../shared/buttons/regular-button/regular-button.component";
import {SharedModule} from "../../../shared/shared.module";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Password, Section} from "../../../interfaces/password.interface";
import {SharedHelperComponent} from "../../../utils/shared-helper/shared-helper.component";
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
  styleUrl: './password-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordListComponent extends SharedHelperComponent implements OnInit {
  @ViewChild('createModal') createModal!: TemplateRef<any>;

  @Input() public currentSection$: BehaviorSubject<Section | null> = new BehaviorSubject<Section | null>(null);

  public passwords$: Observable<Password[]> = new Observable<Password[]>();

  public passwords: Password[] = [];
  public newPasswordVisible: boolean = false;
  public passwordForm: BehaviorSubject<Password> = new BehaviorSubject({
    password: '',
    title: ''
  });

  constructor(
    injector: Injector,
    private passwordService: PasswordService
  ) {
    super(injector);
  }

  public ngOnInit(): void {
    this.subscribe(this.currentSection$.asObservable(),
      () => this.loadPasswords()
    )
  }

  public openCreate(): void {
    this.showOverlay({
      template: this.createModal,
      onAccept: () => this.onCreatePassword(),
      disableAcceptButton: this.passwordForm.asObservable().pipe(map(
        p => !this.passwordValid(p)
      )),
      useCancelButton: false
    });
  }

  public toggleNewPasswordVisibility(): void {
    this.newPasswordVisible = !this.newPasswordVisible;
  }

  private loadPasswords(): void {
    if (this.currentSection$?.getValue()) {
      this.passwords$ = this.passwordService
        .getPasswordsBySection(this.currentSection$.getValue()!.title)
        .pipe(map(passwords => this.passwords = [...passwords]));
    }
  }

  public onCreatePassword(): void {
    if (this.passwordValid()) {
      const currentPassword = this.passwordForm.getValue();
      const newPassword = {
        section: this.currentSection$.getValue()!.title,
        password: currentPassword?.password,
        title: currentPassword?.title,
        email: currentPassword?.email,
        username: currentPassword?.username
      }
      this.subscribe(
        this.passwordService.addPassword(newPassword),
        () => this.passwords.push(newPassword),
        () =>this._resetPasswordForm()
      );
    }
  }

  public onUpdatePasswordForm(input: string, key: string): void {
    this.passwordForm.next({
      ...this.passwordForm.getValue(),
      [key]: input
    })
  }

  public passwordDeleted(password: Password): void {
    if (!password) return;
    this.loadPasswords();
  }

  private passwordValid(password?: Password): boolean {
    const currentPassword = password ?? this.passwordForm.getValue();
    return !!currentPassword && currentPassword.password?.length > 0 && currentPassword.title?.length > 0;
  }

  private _resetPasswordForm(): void {
    this.passwordForm.next({
      _id: '',
      password: '',
      section: '',
      user: '',
      username: '',
      title: '',
    });
  }
}
