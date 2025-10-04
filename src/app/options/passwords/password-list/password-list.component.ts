import {ChangeDetectionStrategy, Component, Injector, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {LucideIconComponent} from "../../../shared/lucide-icon/lucide-icon.component";
import {PasswordItemComponent} from "./password-item/password-item.component";
import {RegularButtonComponent} from "../../../shared/buttons/regular-button/regular-button.component";
import {SharedModule} from "../../../shared/shared.module";
import {BehaviorSubject, firstValueFrom, map} from "rxjs";
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

  public passwords$: BehaviorSubject<Password[] | undefined> = new BehaviorSubject<Password[] | undefined>([]);

  public passwords: Password[] | undefined = [];
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
    this.subscribe(this.passwords$.asObservable(),
      (passwords) => this.passwords = passwords
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

  private async loadPasswords(): Promise<void> {
    if (this.currentSection$?.getValue()) {
      const passwords = await firstValueFrom(
        this.passwordService.getPasswordsBySection(this.currentSection$.getValue()!)
      );
      this.passwords$.next(passwords);
    }
  }

  public onCreatePassword(): void {
    if (this.passwordValid()) {
      const currentPassword = this.passwordForm.getValue();
      const newPassword = {
        ...currentPassword,
        section: this.currentSection$.getValue()!.title,
        email: this.currentSection$.getValue()?.user
      }
      firstValueFrom(
        this.passwordService.addOne(newPassword)).then(
        () => {
          this.passwords ? this.passwords.push(newPassword) : this.passwords = [];
          this._resetPasswordForm();
        }
      ).catch(err => this._resetPasswordForm());
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
    this.passwords$.next(undefined);
    const passwords = this.passwords$.getValue()?.filter(p => p._id !== password._id) ?? [];
    this.passwords$.next([...passwords]);
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
      username: '',
      title: '',
    });
  }
}
