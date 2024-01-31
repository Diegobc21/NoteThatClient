import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, take} from 'rxjs';
import {PasswordService} from "../../core/services/password/password.service";
import {ClipboardService} from "../../core/services/clipboard/clipboard.service";
import {DeviceService} from "../../core/services/device/device.service";
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
  public passwordIdToShow: string = '';
  public newPasswordVisible: boolean = false;
  public isOpenSectionMenu: boolean = true;
  // TODO: move this logic to a new component
  public clipboardIcon: string = 'Copy';

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
    private clipboardService: ClipboardService,
    private deviceService: DeviceService,
    private screenSizeService: ScreenSizeService
  ) {
  }

  public ngOnInit(): void {
    this._startSubscriptions();
  }

  get isAnySection(): boolean {
    return this.sectionList.length > 0;
  }

  public copyToClipboard(text: string): void {
    if (this.clipboardService.copyToClipboard(text)) {
      this.clipboardIcon = 'check';
      setTimeout(() => {
        this.clipboardIcon = 'Copy';
      }, 1500)
    }
  }

  public triggerVisibility(passwordId: string): void {
    const pass = this.passwords.find((p) => p._id === passwordId)
    if (pass && !pass.visible) {
      this.passwordIdToShow = passwordId;
      this.toggleAccountPasswordOverlay();
    } else if (pass) {
      pass.visible = false;
    }
  }

  public changeCurrentSection(title: string): void {
    if (this.currentSection !== title) {
      this.currentSection = title;
      this.getPasswords();
    }
  }

  public createSection(event?: SubmitEvent | MouseEvent): void {
    if (this.sectionForm.title?.length > 0) {
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

  public createPassword(event?: SubmitEvent | MouseEvent): void {
    event?.preventDefault();

    if (this._formValid()) {
      this.subscriptions.push(
        this.passwordService
          .addPassword(
            this.currentSection,
            this.form.password,
            this.form.title,
            this.form.username ?? undefined
          )
          .subscribe({
            next: () => {
              this.getPasswords();
              this._resetPasswordForm();
            },
            error: (error) =>
              console.error('Error al añadir contraseña: ', error),
          })
      );
      this.toggleCreate();
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
    this.isCreatingPassword = !this.isCreatingPassword;
  }

  public toggleCreateSection(): void {
    this.isCreatingSection = !this.isCreatingSection;
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

  public toggleAccountPasswordOverlay(): void {
    this.isAccountPasswordOverlayVisible =
      !this.isAccountPasswordOverlayVisible;
    this.accountPass = '';
  }

  public getNewPasswordVisibility(): string {
    return this.newPasswordVisible ? 'text' : 'password';
  }

  public toggleNewPasswordVisibility(): void {
    this.newPasswordVisible = !this.newPasswordVisible;
  }

  public getEyeVisibleTypeImage(): string {
    const svg: string = this.newPasswordVisible ? 'eye' : 'eye-not-visible'
    return `../../../assets/svg/${svg}.svg`
  }

  public checkAccountPassword(): void {
    // TODO: terminar esto
    if (this.accountPass === '123456') {
      this.showPassword = true;
    }
    this.passwords.forEach((p) => {
      if (p._id === this.passwordIdToShow) {
        p.visible = true;
      }
    });
    this.toggleAccountPasswordOverlay();
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

  private _formValid(): boolean {
    return this.form.password !== '' && this.form.title !== '';
  }

  private _startSubscriptions(): void {
    this.getSections();
    this.isOpenSectionMenu = !this.deviceService.isMobile();
    this.subscriptions.push(
      this.screenSizeService.screenWidth.subscribe((width: number) => {
        this.isOpenSectionMenu = width >= 640;
      }));
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
