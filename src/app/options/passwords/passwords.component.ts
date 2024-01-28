import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { PasswordService } from '../../core/services/password.service';

interface Password {
  _id: string;
  password: string;
  url: string;
  username?: string;
  user?: string;
  section?: string;
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
  public sectionList: Section[] = [];
  public savedPasswordId: string = '';
  public savedSectionId: string = '';

  public form: Password = {
    _id: '',
    password: '',
    url: '',
    username: '',
    user: '',
    section: '',
  };

  public sectionForm: any = {
    title: '',
  };

  public passwords: Password[] = [];
  public isDeleteOverlayVisible = false;
  public isDeleteSectionOverlayVisible = false;

  private subscriptions: Subscription[] = [];

  constructor(private passwordService: PasswordService) {}

  public ngOnInit(): void {
    this._startSubscriptions();
  }

  get isAnySection(): boolean {
    return this.sectionList.length > 0;
  }

  get isAnyPassword(): boolean {
    return this.passwords.length > 0;
  }

  public triggerVisibility(): void {
    console.log('contraseñas visibles');
  }

  public changeCurrentSection(title: string): void {
    if (this.currentSection !== title) {
      this.currentSection = title;
      this.getPasswords();
    }
  }

  public createSection(): void {
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
    if (this.savedSectionId !== '') {
      this.passwordService
        .deleteOneSection(this.savedSectionId)
        .subscribe({
          next: () => {
            this.toggleDeleteSectionOverlay();
            this.sectionList = this.sectionList.filter(
              (section: Section) => section._id !== this.savedSectionId
            );
            this.currentSection = this.sectionList[0]?.title ?? '';
            this.getPasswords();
          },
          error: (error) => {
            console.error('Error al eliminar sección:', error);
          },
          complete: () => (this.savedSectionId = ''),
        });
    }
  }

  public deletePassword(): void {
    if (this.savedPasswordId !== '') {
      this.passwordService
        .deleteOne(this.savedPasswordId)
        .subscribe({
          next: (deletedPasswordId: string) => {
            this.passwords = this.passwords.filter(
              (pass: Password) => pass._id !== deletedPasswordId
            );
            this.toggleDeleteOverlay();
          },
          error: (error) => {
            console.error('No se pudo eliminar la contraseña: ', error);
          },
          complete: () => (this.savedSectionId = ''),
        });
    }
  }

  public postCreate(event?: SubmitEvent | MouseEvent): void {
    event?.preventDefault();

    if (this._formValid()) {
      this.subscriptions.push(
        this.passwordService
          .addPassword(this.currentSection, this.form.password, this.form.url)
          .subscribe({
            next: () => this.getPasswords(),
            error: (error) =>
              console.error('Error al añadir contraseña: ', error),
          })
      );
      this.toggleCreate();
    }
  }

  public saveSelectedPassword(password: Password): void {
    this.savedPasswordId = password._id;
  }

  public onDeletePassword(passwordId: string): void {
    this.savedPasswordId = passwordId;
    this.toggleDeleteOverlay();
  }

  public onDeleteSection(sectionId: string): void {
    this.savedSectionId = sectionId;
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

  public getSections(): void {
    this.passwordService
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
      });
  }

  public getPasswords(): void {
    if (this.currentSection?.length > 0) {
      this.passwordService
        .getPasswordsBySection(this.currentSection)
        .pipe(take(1))
        .subscribe({
          next: (value: Password[]) => {
            if (value) {
              this.passwords = value;
            }
          },
          error: (err) => console.log('Error al obtener contraseñas: ', err),
        });
    }
  }

  private _formValid(): boolean {
    return this.form.password !== '' && this.form.url !== '';
  }

  private _startSubscriptions(): void {
    this.getSections();
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
