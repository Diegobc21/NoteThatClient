import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Injector, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {SharedModule} from "../../../../shared/shared.module";
import {DeleteButtonComponent} from "../../../../shared/buttons/delete-button/delete-button.component";
import {EditButtonComponent} from "../../../../shared/buttons/edit-button/edit-button.component";
import {
  ShowPasswordButtonComponent
} from "../../../../shared/buttons/show-password-button/show-password-button.component";
import {Password, PasswordUpdate} from "../../../../interfaces/password.interface";
import {SharedHelperComponent} from "../../../../utils/shared-helper/shared-helper.component";
import {PasswordService} from "../../../../core/services/password/password.service";
import {FormsModule} from "@angular/forms";
import {BehaviorSubject, firstValueFrom, map} from "rxjs";

@Component({
    selector: 'app-password-item',
    imports: [CommonModule, SharedModule, DeleteButtonComponent, EditButtonComponent, ShowPasswordButtonComponent, FormsModule],
    templateUrl: './password-item.component.html',
    styleUrl: './password-item.component.scss'
})
export class PasswordItemComponent extends SharedHelperComponent implements OnInit {
  @ViewChild('editPasswordTemplate') public editPasswordTemplate!: TemplateRef<any>;
  @ViewChild('deletePasswordTemplate') public deletePasswordTemplate!: TemplateRef<any>;
  @ViewChild('activateVisibilityTemplate') public activateVisibilityTemplate!: TemplateRef<any>;

  @Input() public password!: Password;

  @Output() public passwordDeleted: EventEmitter<Password> = new EventEmitter<Password>();

  public passwordForm: BehaviorSubject<Password> = new BehaviorSubject({} as Password);
  public userPassword: string = '';

  constructor(
    private injector: Injector,
    private passwordService: PasswordService
  ) {
    super(injector);
  }

  public ngOnInit(): void {
    this.passwordForm.next({...this.password});
  }

  public toggleEdit(): void {
    this.passwordForm.next({
      ...this.password,
      password: ''
    })
    this.showOverlay({
      template: this.editPasswordTemplate,
      disableAcceptButton: this.passwordForm.pipe(map(
        (form) => form.title === '' || form.password === ''
      )),
      useActionButton: true,
      useCancelButton: true,
      onAccept: () => this.onEditPassword()
    });
  }

  public toggleDelete(): void {
    this.passwordForm.next({
      ...this.password,
      password: ''
    })
    this.showOverlay({
      template: this.deletePasswordTemplate,
      onAccept: () => this.onDeletePassword(),
    });
  }

  public toggleVisibilityOverlay(): void {
    if (this.passwordService.checkIfPasswordsAreVisible()) {
      void this.togglePasswordVisible();
      return;
    }

    this.userPassword = '';
    this.showOverlay({
      template: this.activateVisibilityTemplate,
      onAccept: () => {
        void this.checkAccountPassword();
      }
    });
  }

  public async onEditPassword(): Promise<void> {
    if (this.formValid()) {
      const updatedPassword = this.passwordForm.getValue();
      if (!updatedPassword?._id || typeof updatedPassword.password !== 'string') return;
      const changes: PasswordUpdate = {
        title: updatedPassword.title,
        password: updatedPassword.password,
        username: updatedPassword.username,
        email: updatedPassword.email
      };
      this.password = await firstValueFrom(
        this.passwordService.updateOne(updatedPassword._id, changes)
      );
      this.overlayService.hide();
      this._resetPasswordForm()
    }
  }

  public async onDeletePassword(): Promise<void> {
    const password = this.passwordForm.getValue();
    if (!password._id) return;

    await firstValueFrom(this.passwordService.deleteOne(password._id));
    this.overlayService.hide();
    this.passwordDeleted.emit({...password});
    this._resetPasswordForm();
  }

  public onPasswordChanged(value: string, key: string): void {
    this.passwordForm.next({...this.passwordForm.getValue(), [key]: value});
  }

  public async submitAccountPassword(): Promise<void> {
    const wasVerified = await this.checkAccountPassword();
    if (wasVerified) {
      this.overlayService.hide();
    }
  }

  private async checkAccountPassword(): Promise<boolean> {
    if (this.passwordService.checkIfPasswordsAreVisible()) {
      await this.togglePasswordVisible();
      return true;
    }

    const {valid} = await firstValueFrom(
      this.passwordService.checkAccountPassword(this.userPassword)
    );

    if (!valid) {
      return false;
    }

    this.passwordService.setPasswordsVisible();
    await this.togglePasswordVisible();
    return true;
  }

  private async togglePasswordVisible(): Promise<void> {
    if (this.password.visible) {
      this.password = {...this.password, visible: false};
      return;
    }

    if (this.password.password) {
      this.password = {...this.password, visible: true};
      return;
    }

    if (!this.password._id) return;

    const uncensored = await firstValueFrom(
      this.passwordService.getUncensoredPassword(this.password._id)
    );

    this.password = {
      ...this.password,
      password: uncensored.password,
      visible: true
    };
  }

  private formValid(): boolean {
    const password = this.passwordForm.getValue();
    return typeof password.password === 'string' &&
      password.password.length > 0 &&
      password.title.trim().length > 0;
  }

  private _resetPasswordForm(): void {
    this.passwordForm.next({...this.password});
  }
}
