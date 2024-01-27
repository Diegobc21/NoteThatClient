import { Component, OnDestroy, OnInit } from '@angular/core';
import { PasswordService } from '../../core/services/password.service';
import { Subscription, take } from 'rxjs';

interface Password {
  _id: string;
  password: string;
  url: string;
  username?: string;
  user?: string;
  section?: string;
}

interface Section {
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
    console.log('ver');
  }

  public changeCurrentSection(title: string): void {
    this.currentSection = title;
    this.getPasswords();
  }

  public createSection(): void {
    this.subscriptions.push(
      this.passwordService.addSection(this.sectionForm.title).subscribe({
        complete: () => {
          this.getSections();
          this.toggleCreateSection();
        },
      })
    );
  }

  public toggleDeleteOverlay(): void {
    this.isDeleteOverlayVisible = !this.isDeleteOverlayVisible;
  }

  public deleteSection(): void {
    console.log('delete section');
  }

  public deletePassword(): void {
    if (this.saveSelectedPassword !== undefined){
      this.passwordService
        .deleteOne(this.savedPasswordId)
        .pipe(take(1))
        .subscribe({
          next: (deletedPasswordId: string) => {
            this.passwords = this.passwords.filter(
              (n: Password) => n._id !== deletedPasswordId
            );
            this.toggleDeleteOverlay();
          },
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
            next: () => {
              console.log('Contraseña añadida correctamente');
            },
            error: (error) => {
              console.error('Error al añadir contraseña:', error);
            },
            complete: () => this.getPasswords(),
          })
      );
      this.toggleCreate();
    }
  }

  public saveSelectedPassword(password: Password): void {
    this.savedPasswordId = password._id;
  }

  public delete(passwordId: string): void {
    this.savedPasswordId = passwordId;
    this.toggleDeleteOverlay();
  }

  public toggleCreate(): void {
    this.isCreatingPassword = !this.isCreatingPassword;
  }

  public toggleCreateSection(): void {
    this.isCreatingSection = !this.isCreatingSection;
  }

  private _formValid(): boolean {
    return this.form.password !== '' && this.form.url !== '';
  }

  private _startSubscriptions(): void {
    this.getSections();
  }

  public getSections(): void {
    this.passwordService
      .getUserSections()
      .pipe(take(1))
      .subscribe({
        next: (value: Section[]) => {
          if (value) {
            this.currentSection = value[0].title;
            this.sectionList = value;
          }
        },
        complete: () => {
          this.getPasswords();
        },
      });
  }

  public getPasswords(): void {
    if (this.currentSection) {
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

  public ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
