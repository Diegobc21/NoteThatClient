import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Injector, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {DeleteButtonComponent} from 'src/app/shared/buttons/delete-button/delete-button.component';
import {EditButtonComponent} from 'src/app/shared/buttons/edit-button/edit-button.component';
import {RegularButtonComponent} from 'src/app/shared/buttons/regular-button/regular-button.component';
import {SharedHelperComponent} from 'src/app/utils/shared-helper/shared-helper.component';
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
export class SectionListComponent extends SharedHelperComponent {
  @ViewChild('createModal') createModal!: TemplateRef<any>;
  @ViewChild('editModal') editModal!: TemplateRef<any>;
  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>;

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
  public sectionForm: BehaviorSubject<Section> = new BehaviorSubject({
    title: ''
  });

  public isSectionMenuExpanded: boolean = true;

  public get currentSection(): Section | null {
    return this.currentSection$.getValue();
  }

  constructor(injector: Injector) {
    super(injector);
  }

  public expandSectionMenu(): void {
    this.isSectionMenuExpanded = !this.isSectionMenuExpanded;
  }

  public changeCurrentSection(section: Section): void {
    this.selectSection.emit(section);
  }

  public openCreateSection(): void {
    this.showOverlay({
      template: this.createModal,
      onAccept: () => this.onCreateSection(),
      onHideAction: () => this.resetAll(),
      disableAcceptButton: this.sectionForm.asObservable().pipe(
        map(value => !value?.title || value.title === '')
      ),
      useCancelButton: true
    });
  }

  public openEditSection(section: Section): void {
    if (!section._id) return;
    this.sectionForm.next({...section});
    this.temporalSectionTitle = section.title;

    this.showOverlay({
      template: this.editModal,
      onAccept: () => this.onEditSection(),
      onHideAction: () => this.resetAll(),
      disableAcceptButton: this.sectionForm.asObservable().pipe(
        map(value => !value?.title || value.title === '')
      ),
      useCancelButton: true
    });
  }

  public openDeleteSection(section: Section): void {
    if (!section?._id) return;
      this.showOverlay({
      template: this.deleteModal,
      onAccept: () => this.onDeleteSection(),
      onHideAction: () => this.resetAll(),
      disableAcceptButton: this.sectionForm.asObservable().pipe(
        map(value => !value?.title || value.title === '')
      )
    });
    this.sectionForm.next({...section});
  }

  public onCreateSection(): void {
    if (this.sectionForm.getValue()?.title !== '') {
      this.addSection.emit(this.sectionForm.getValue());
      this.resetAll();
    }
  }

  public onEditSection(): void {
    if (this.sectionForm.getValue()._id || this.sectionForm.getValue().title !== '') {
      this.editSection.emit(this.sectionForm.getValue());
      this.resetAll();
    }
  }

  public updateSection(title: string): void {
    if (this.sectionForm.getValue()._id) {
      this.sectionForm.next({ ...this.sectionForm.getValue(), title });
    }
  }

  public onDeleteSection(): void {
    if (this.sectionForm.getValue()._id) {
      this.deleteSection.emit(this.sectionForm.getValue());
      this.resetAll();
    }
  }

  private resetAll(): void {
    this.temporalSectionTitle = null;
    this.sectionForm.next({
      title: '',
    });
  }
}
