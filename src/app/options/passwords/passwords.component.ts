import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription, take} from 'rxjs';
import {SpinnerService} from 'src/app/core/services/spinner/spinner.service';
import {DeviceService} from "../../core/services/device/device.service";
import {PasswordService} from "../../core/services/password/password.service";
import {ScreenSizeService} from "../../core/services/screen-size/screen-size.service";

interface Password {
  _id: string;
  password: string;
  title: string;
  user: string;
  section: string;
  username?: string;
  email?: string;
  visible?: boolean;
}

interface Section {
  _id: string;
  title: string;
  user: string;
  creationDate?: Date;
}

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrl: './passwords.component.scss',
})
export class PasswordsComponent implements OnInit, OnDestroy {
  public isCreatingPassword: boolean = false;
  public isCreatingSection: boolean = false;
  public currentSection: string = '';
  public accountPass: string = '';
  public sectionList: Section[] = [];
  public savedPassword: Password | undefined;
  public savedSection: Section | undefined;
  public showPassword: boolean = false;
  public newPasswordVisible: boolean = false;
  public isOpenSectionMenu: boolean = true;
  public passwordIdToShow: string = '';

  public form: Password = {
    _id: '',
    password: '',
    title: '',
    username: '',
    user: '',
    email: '',
    section: '',
  };

  public sectionForm: any = {
    title: '',
  };

  public passwords: Password[] = [];
  public isDeleteOverlayVisible = false;
  public isDeleteSectionOverlayVisible = false;
  public isAccountPasswordOverlayVisible = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private passwordService: PasswordService,
    private deviceService: DeviceService,
    private screenSizeService: ScreenSizeService,
    private spinnerService: SpinnerService
  ) {
  }

  public ngOnInit(): void {
    this._startSubscriptions();
  }

  get isAnySection(): boolean {
    return this.sectionList.length > 0;
  }

  get loadingContent(): Observable<boolean> {
    return this.spinnerService.spinnerVisible$;
  }

  public changeCurrentSection(title: string): void {
    if (this.currentSection !== title) {
      this.currentSection = title;
      this.getPasswords();
    }
  }

  public createSection(event?: any): void {
    if (this.sectionForm.title?.length > 0) {
      event?.preventDefault();
      this.subscriptions.push(
        this.passwordService.addSection(this.sectionForm.title).subscribe({
          complete: () => {
            this.toggleCreateSection();
            this.getSections();
            this.currentSection = this.sectionForm.title;
            this.sectionForm.title = '';
            this.getPasswords();
          },
        })
      );
    }
  }

  public deleteSection(): void {
    if (this.savedSection) {
      this.passwordService.deleteOneSection(this.savedSection._id).subscribe({
        next: () => {
          this.toggleDeleteSectionOverlay();
          this.sectionList = this.sectionList.filter(
            (section: Section) => section._id !== this.savedSection?._id
          );
          this.currentSection = this.sectionList[0]?.title ?? '';
          this.getPasswords();
        },
        error: (error) => {
          console.error('Error al eliminar sección:', error);
        },
        complete: () => (this.savedSection = undefined),
      });
    }
  }

  public deletePassword(): void {
    if (this.savedPassword) {
      this.passwordService.deleteOne(this.savedPassword._id).subscribe({
        next: (deletedPasswordId: string) => {
          this.passwords = this.passwords.filter(
            (pass: Password) => pass._id !== deletedPasswordId
          );
          this.toggleDeleteOverlay();
        },
        error: (error) => {
          console.error('No se pudo eliminar la contraseña: ', error);
        },
        complete: () => (this.savedSection = undefined),
      });
    }
  }

  public createPassword(event?: any): void {
    if (this._formValid()) {
      event?.preventDefault();
      this.subscriptions.push(
        this.passwordService
          .addPassword({
              section: this.currentSection,
              password: this.form.password,
              title: this.form.title,
              email: this.form.email,
              username: this.form.username
            }
          )
          .subscribe({
            next: () => {
              this.getPasswords()
              this.toggleCreate();
            },
            error: (error) =>
              console.error('Error al añadir contraseña: ', error),
          })
      );
    }
  }


  public onDeletePassword(password: Password): void {
    this.saveSelectedPassword(password);
    this.toggleDeleteOverlay();
  }

  public onDeleteSection(sectionId: Section): void {
    this.savedSection = sectionId;
    this.toggleDeleteSectionOverlay();
  }

  public toggleDeleteOverlay(): void {
    this.isDeleteOverlayVisible = !this.isDeleteOverlayVisible;
  }

  public toggleDeleteSectionOverlay(): void {
    this.isDeleteSectionOverlayVisible = !this.isDeleteSectionOverlayVisible;
  }

  public toggleCreate(): void {
    this._resetPasswordForm();
    this.newPasswordVisible = false;
    this.isCreatingPassword = !this.isCreatingPassword;
  }

  public toggleCreateSection(): void {
    this.isCreatingSection = !this.isCreatingSection;
    this._resetNewSection();
  }

  public toggleOpenSectionMenu(): void {
    this.isOpenSectionMenu = !this.isOpenSectionMenu;
  }

  public getSections(): void {
    this.subscriptions.push(this.passwordService
      .getUserSections()
      .pipe(take(1))
      .subscribe({
        next: (value: Section[]) => {
          if (value) {
            this.sectionList = value;
            this.currentSection = this.sectionList[0]?.title;
          }
          this.getPasswords();
        },
        error: (err) => console.log('No se pudo obtener las secciones: ', err),
      }));
  }

  public getPasswords(): void {
    if (this.currentSection?.length > 0) {
      this.subscriptions.push(this.passwordService
        .getPasswordsBySection(this.currentSection)
        .pipe(take(1))
        .subscribe({
          next: (value: Password[]) => {
            if (value) {
              this.passwords = value;
            }
          },
          error: (err) => console.log('Error al obtener contraseñas: ', err),
        }));
    }
  }

  public triggerVisibility(passwordId: string): void {
    const pass: Password | undefined = this.passwords.find((p: Password) => p._id === passwordId)
    if (pass?.visible) {
      pass.visible = false;
    } else {
      this.passwordIdToShow = passwordId;
      this.toggleAccountPasswordOverlay();
    }
  }

  public checkAccountPassword(): void {
    this.passwordService.checkAccountPassword(this.accountPass)
      .subscribe((response) => {
        if (response.valid === true) {
          this.passwordService.setPasswordsVisible();
          this.showPassword = true;
          this.isAccountPasswordOverlayVisible = false;
          this.makePasswordVisible();
        }
      });
  }

  public toggleAccountPasswordOverlay(): void {
    if (!this.passwordService.checkIfPasswordsAreVisible()) {
      this.accountPass = '';
      this.isAccountPasswordOverlayVisible = !this.isAccountPasswordOverlayVisible;
    } else {
      this.makePasswordVisible();
      this.isAccountPasswordOverlayVisible = false;
    }
  }

  private makePasswordVisible(): void {
    this.passwords.find((p: Password) => {
      if (p._id === this.passwordIdToShow) {
        p.visible = true;
      }
    });
  }

  public getNewPasswordVisibility(): string {
    return this.newPasswordVisible ? 'text' : 'password';
  }

  public toggleNewPasswordVisibility(): void {
    this.newPasswordVisible = !this.newPasswordVisible;
  }

  private saveSelectedPassword(password: Password): void {
    this.savedPassword = password;
  }

  private _resetPasswordForm(): void {
    this.form._id = '';
    this.form.password = '';
    this.form.section = '';
    this.form.user = '';
    this.form.username = '';
    this.form.title = '';
  }

  private _resetNewSection(): void {
    this.sectionForm.title = '';
  }

  private _formValid(): boolean {
    return this.form.password !== '' && this.form.title !== '';
  }

  private _startSubscriptions(): void {
    this.getSections();
    this.isOpenSectionMenu = window.innerWidth > 640;
    this.subscriptions.push(
      this.screenSizeService.screenWidth$.subscribe((width: number) => {
        this.isOpenSectionMenu = width >= 640;
      }));
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    this.passwordService.setPasswordsNotVisible();
  }
}
