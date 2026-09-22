import {CommonModule} from '@angular/common';
import {Component, Injector} from '@angular/core';
import {SharedHelperComponent} from 'src/app/utils/shared-helper/shared-helper.component';
import {SectionListComponent} from '../section-list/section-list.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import {BehaviorSubject, firstValueFrom} from "rxjs";
import {Section} from "../../../interfaces/password.interface";
import {PasswordListComponent} from "../password-list/password-list.component";
import {SectionService} from "../../../core/services/section/section.service";

@Component({
    selector: 'app-password-container',
    imports: [CommonModule, SharedModule, FormsModule, SectionListComponent, PasswordListComponent],
    templateUrl: './password-container.component.html',
    styleUrl: './password-container.component.scss'
})
export class PasswordContainerComponent extends SharedHelperComponent {
  public currentSection$: BehaviorSubject<Section | null> = new BehaviorSubject<Section | null>(null);
  public sectionsLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public sectionList: Section[] = [];

  constructor(
    private injector: Injector,
    private sectionService: SectionService,
  ) {
    super(injector);
    this.getData();
  }

  private getData(): void {
    void this.loadSections();
  }

  public changeSection(section: Section): void {
    if (this.currentSection$.getValue()?._id !== section._id) {
      this.currentSection$.next(section);
    }
  }

  public async createSection(section: Section): Promise<void> {
    if (!section.title.trim()) return;

    this.sectionsLoading$.next(true);
    try {
      const savedSection = await firstValueFrom(
        this.sectionService.addOne({title: section.title})
      );
      this.sectionList = [...this.sectionList, savedSection];
      this.currentSection$.next(savedSection);
    } finally {
      this.sectionsLoading$.next(false);
    }
  }

  public async editSection(section: Section): Promise<void> {
    if (!section._id || !section.title.trim()) return;

    const updatedSection = await firstValueFrom(
      this.sectionService.updateOne(section._id, {title: section.title})
    );
    this.sectionList = this.sectionList.map(current =>
      current._id === updatedSection._id ? updatedSection : current
    );

    if (this.currentSection$.getValue()?._id === updatedSection._id) {
      this.currentSection$.next(updatedSection);
    }
  }

  public async deleteSection(section: Section): Promise<void> {
    if (!section._id) return;

    await firstValueFrom(this.sectionService.deleteOne(section._id));
    this.sectionList = this.sectionList.filter(current => current._id !== section._id);

    if (this.currentSection$.getValue()?._id === section._id) {
      this.currentSection$.next(this.sectionList[0] ?? null);
    }
  }

  private async loadSections(): Promise<void> {
    this.sectionsLoading$.next(true);
    try {
      const sections = await firstValueFrom(this.sectionService.getUserSections());
      const selectedId = this.currentSection$.getValue()?._id;
      this.sectionList = sections;
      this.currentSection$.next(
        sections.find(section => section._id === selectedId) ?? sections[0] ?? null
      );
    } finally {
      this.sectionsLoading$.next(false);
    }
  }
}
