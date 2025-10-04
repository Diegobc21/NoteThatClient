import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Injector, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {SharedModule} from "../../../../shared/shared.module";
import {DeleteButtonComponent} from "../../../../shared/buttons/delete-button/delete-button.component";
import {EditButtonComponent} from "../../../../shared/buttons/edit-button/edit-button.component";
import {
  ShowPasswordButtonComponent
} from "../../../../shared/buttons/show-password-button/show-password-button.component";
import {Password} from "../../../../interfaces/password.interface";
import {SharedHelperComponent} from "../../../../utils/shared-helper/shared-helper.component";
import {PasswordService} from "../../../../core/services/password/password.service";
import {FormsModule} from "@angular/forms";
import {BehaviorSubject, firstValueFrom, map} from "rxjs";

@Component({
  selector: 'app-password-item',
  standalone: true,
  imports: [CommonModule, SharedModule, DeleteButtonComponent, EditButtonComponent, ShowPasswordButtonComponent, FormsModule],
  templateUrl: './password-item.component.html',
  styleUrl: './password-item.component.scss',
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
    if (this.formValid()) {
      this.passwordForm.next({
        ...this.password,
        password: ''
      })
      this.showOverlay({
        template: this.deletePasswordTemplate,
        onAccept: () => this.onDeletePassword(),
      });
    }
  }

  public toggleVisibilityOverlay(): void {
    if (!this.passwordService.checkIfPasswordsAreVisible()) {
      this.passwordForm.next({
        ...this.password,
        password: ''
      });
      this.showOverlay({
        template: this.activateVisibilityTemplate,
        onAccept: async () => {
          await this.checkAccountPassword();
          this.overlayService.hide();
        }
      });
    } else {
      this.checkAccountPassword();
    }
  }

  public async onEditPassword(): Promise<void> {
    if (this.formValid()) {
      const newPassword = this.passwordForm.getValue();
      this.password = await firstValueFrom(
        this.passwordService.updatePassword(newPassword._id, newPassword)
      );
      this.toggleEdit();
      this._resetPasswordForm()
    }
  }

  public async onDeletePassword(): Promise<void> {
    if (this.formValid()) {
      await firstValueFrom(this.passwordService.deleteOne(this.passwordForm.getValue()._id!))
      this.toggleDelete();
      this.passwordDeleted.emit({...this.passwordForm.getValue()});
      this._resetPasswordForm();
    }
  }

  public onPasswordChanged(password: string, key: string): void {
    if (!password) return;
    this.passwordForm.next({...this.password, [key]: password});
  }

  public async checkAccountPassword(): Promise<void> {
    if (!this.passwordService.checkIfPasswordsAreVisible()) {
      const valid = await firstValueFrom(
        this.passwordService.checkAccountPassword(this.userPassword).pipe(map(
          res => res.valid
        )));
      if (valid === true) {
        this.passwordService.setPasswordsVisible();
        await this.togglePasswordVisible();
      }
    } else {
      await this.togglePasswordVisible();
    }
  }

  private async togglePasswordVisible(): Promise<void> {
    if (!this.password?.visible) {
      if (this.password?.password) {
        this.password.visible = true;
      } else if (this.formValid()) {
        const uncensured = await firstValueFrom(this.passwordService.getUncensoredPassword(this.password._id!));
        if (!uncensured) return;
        this.password = {
          ...this.password,
          password: uncensured.password,
          visible: true
        };
      }
    } else {
      this.password.visible = false;
    }
  }

  private formValid(): boolean {
    const password = this.passwordForm.getValue();
    return password?.password !== '' && password?.title !== '';
  }

  private _resetPasswordForm(): void {
    this.passwordForm.next({...this.password});
  }
}
