import {Component, OnDestroy} from '@angular/core';
import {PasswordService} from "../../core/services/password.service";
import {Subscription, takeUntil} from "rxjs";

interface Password {
  password: string,
  url: string,
  username?: string,
  user?: string,
  section?: string
}

interface Section {
  title: string,
  user: string,
  creationDate?: Date
}

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrl: './passwords.component.scss',
})
export class PasswordsComponent implements OnDestroy {

  public isCreatingPassword: boolean = false;
  public isCreatingSection: boolean = false;
  public currentSection: string = '';
  public sectionList: Section[] = [];

  public form: Password = {
    password: '',
    url: '',
    username: '',
    user: '',
    section: ''
  };

  public sectionForm: any = {
    title: ''
  };


  public passwords: Password[] = [];

  private subscriptions: Subscription[] = [];

  constructor(private passwordService: PasswordService) {
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
    this.subscriptions.push(this.passwordService.addSection(this.sectionForm.title).subscribe({
      complete: () => this.toggleCreateSection()
    }));
  }

  public deleteSection(): void {
    console.log('borrar sección');
  }

  public postCreate(event?: SubmitEvent | MouseEvent): void {
    event?.preventDefault();

    if (this._formValid()) {
      this.subscriptions.push(this.passwordService.addPassword(this.currentSection, this.form.password, this.form.url).subscribe({
          next: () => {
            console.log('Contraseña añadida correctamente');
          },
          error: (error) => {
            console.error('Error al añadir contraseña:', error);
          }
        }
      ));
      this.toggleCreate();
    }
  }

  public delete(): void {
    console.log('borrar contraseña');
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
    this.getPasswords();
  }

  public getSections(): void {
    this.passwordService.getUserSections().subscribe({
      next: (value: Section[]) => {
        if (value) {
          this.currentSection = value[0].title;
          this.sectionList = value;
        }
      }
    });
  }

  public getPasswords(): void {
    if (this.currentSection) {
      console.log('contraseñas')
      this.passwordService.getPasswordsBySection(this.currentSection).subscribe({
          next: (value: Password[]) => {
            if (value) {
              this.passwords = value;
            }
          },
          error: (err) => console.log('Error al obtener contraseñas: ', err)
        }
      );
    }
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
