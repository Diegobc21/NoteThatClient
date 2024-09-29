import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {DeleteButtonComponent} from 'src/app/shared/buttons/delete-button/delete-button.component';
import {EditButtonComponent} from 'src/app/shared/buttons/edit-button/edit-button.component';
import {RegularButtonComponent} from 'src/app/shared/buttons/regular-button/regular-button.component';
import {SubscribeHelperComponent} from 'src/app/utils/subscribe-helper/subscribe-helper.component';
import {LucideIconComponent} from "../../../shared/lucide-icon/lucide-icon.component";
import {SharedModule} from "../../../shared/shared.module";
import {Section} from "../../../interfaces/password.interface";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-section-list',
  standalone: true,
  imports: [
    CommonModule,
    DeleteButtonComponent,
    EditButtonComponent,
    RegularButtonComponent,
    LucideIconComponent,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './section-list.component.html',
  styleUrl: './section-list.component.scss',
})
export class SectionListComponent extends SubscribeHelperComponent {
  @Input() public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @Input() public sectionList: Section[] = [];

  public isAnySection$: Observable<boolean> = new Observable<boolean>();
  public currentSection$: BehaviorSubject<Section | null> = new BehaviorSubject<Section | null>(null);
  public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  @Output('selectSection') public selectSection: EventEmitter<Section> = new EventEmitter<Section>();
  @Output('addSection') public addSection: EventEmitter<Section> = new EventEmitter<Section>();
  @Output('editSection') public editSection: EventEmitter<Section> = new EventEmitter<Section>();
  @Output('deleteSection') public deleteSection: EventEmitter<Section> = new EventEmitter<Section>();

  public temporalSectionTitle: string | null = null;
  public sectionForm: Section = {
    title: '',
  };

  public isOpenSectionMenu: boolean = true;
  public isCreatingSection: boolean = false;
  public isEditingSection: boolean = false;
  public isDeletingSection: boolean = false;

  public get currentSection(): Section | null {
    return this.currentSection$.getValue();
  }

  public toggleOpenSectionMenu(): void {
    this.isOpenSectionMenu = !this.isOpenSectionMenu;
  }

  public changeCurrentSection(section: Section): void {
    this.selectSection.emit(section);
  }

  public openCreateSection(): void {
    this.isCreatingSection = true;
  }

  public openEditSection(section: Section): void {
    this.sectionForm = {...section};
    this.temporalSectionTitle = section.title;
    this.isEditingSection = true;
  }

  public openDeleteSection(section: Section): void {
    if (section._id) {
      this.sectionForm = {...section};
      this.isDeletingSection = true;
    }
  }

  public onCreateSection(): void {
    if (this.sectionForm?.title !== '') {
      this.addSection.emit(this.sectionForm);
      this.subscribe(this.currentSection$.asObservable(),
        () => this.isCreatingSection = false);
      this.resetAll();
    }
  }

  public onEditSection(): void {
    if (this.sectionForm._id || this.sectionForm.title !== '') {
      this.editSection.emit(this.sectionForm);
      this.subscribe(this.currentSection$.asObservable(),
        () => this.isEditingSection = false);
      this.resetAll();
    }
  }

  public onDeleteSection(): void {
    if (this.sectionForm._id) {
      this.deleteSection.emit(this.sectionForm);
      this.subscribe(this.currentSection$.asObservable(),
        () => this.isDeletingSection = false);
      this.resetAll();
    }
  }

  private resetAll(): void {
    this.temporalSectionTitle = null;
    this.sectionForm = {
      title: '',
    }
  }
}
