import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Injector, Input, OnInit, Output} from '@angular/core';
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

@Component({
  selector: 'app-password-item',
  standalone: true,
  imports: [CommonModule, SharedModule, DeleteButtonComponent, EditButtonComponent, ShowPasswordButtonComponent, FormsModule],
  templateUrl: './password-item.component.html',
  styleUrl: './password-item.component.scss',
})
export class PasswordItemComponent extends SharedHelperComponent implements OnInit {
  @Input() public password!: Password;

  @Output() public passwordDeleted: EventEmitter<Password> = new EventEmitter<Password>();

  public passwordForm: Password = {} as Password;
  public isEditing: boolean = false;
  public isDeleting: boolean = false;
  public isAccountPasswordOverlayVisible: boolean = false;
  public accountPass: string = '';

  constructor(
    private injector: Injector,
    private passwordService: PasswordService
  ) {
    super(injector);
  }

  public ngOnInit(): void {
    this.passwordForm = this.password;
  }

  public toggleEdit(): void {
    this.passwordForm.password = '';
    this.isEditing = !this.isEditing;
  }

  public toggleDelete(): void {
    this.isDeleting = !this.isDeleting;
  }

  public editPassword(): void {
    if (this.formValid()) {
      this.subscribe(
        this.passwordService.updatePassword(this.passwordForm._id, this.passwordForm),
        (password) => this.password = password,
        () => {
          this.toggleEdit();
          this._resetPasswordForm();
        }
      );
    }
  }

  public toggleAccountPasswordOverlay(isEditing?: boolean): void {
    if (!this.passwordService.checkIfPasswordsAreVisible()) {
      this.isAccountPasswordOverlayVisible = !this.isAccountPasswordOverlayVisible;
    } else {
      this.togglePasswordVisible();
    }
  }

  public checkAccountPassword(): void {
    if (!this.passwordService.checkIfPasswordsAreVisible()) {
      this.subscribe(
        this.passwordService.checkAccountPassword(this.accountPass),
        ((response) => {
          if (response.valid === true) {
            this.passwordService.setPasswordsVisible();
            this.isAccountPasswordOverlayVisible = false;
            this.togglePasswordVisible();
          }
        })
      );
    } else {
      this.togglePasswordVisible();
      this.isAccountPasswordOverlayVisible = false;
    }
  }

  public deletePassword(): void {
    if (this.formValid()) {
      this.subscribe(
        this.passwordService.deleteOne(this.passwordForm._id!),
        () => {
          this.toggleDelete();
          this.passwordDeleted.emit({ ...this.passwordForm });
          this._resetPasswordForm();
        }
      )
    }
  }

  private togglePasswordVisible(): void {
    if (!this.password.visible) {
      if (this.password.password) {
        this.password.visible = true;
      } else if (this.formValid()) {
        this.subscribe(this.passwordService.getUncensoredPassword(this.password._id!),
          (res) => {
            this.password = {
              ...this.password,
              visible: true,
              password: res.password
            };
          })
      }
    } else {
      this.password.visible = false;
    }
  }

  private formValid(): boolean {
    return this.passwordForm.password !== '' && this.passwordForm.title !== '';
  }

  private _resetPasswordForm(): void {
    this.passwordForm = this.password;
  }
}
