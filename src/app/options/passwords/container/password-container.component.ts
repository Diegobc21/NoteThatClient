import {CommonModule} from '@angular/common';
import {Component, Injector, OnDestroy} from '@angular/core';
import {PasswordService} from 'src/app/core/services/password/password.service';
import {SharedHelperComponent} from 'src/app/utils/shared-helper/shared-helper.component';
import {SectionListComponent} from '../section-list/section-list.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import {BehaviorSubject, firstValueFrom, map, Observable, withLatestFrom} from "rxjs";
import {Password, Section} from "../../../interfaces/password.interface";
import {PasswordListComponent} from "../password-list/password-list.component";
import {SectionService} from "../../../core/services/section/section.service";

@Component({
  selector: 'app-password-container',
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule, SectionListComponent, PasswordListComponent],
  templateUrl: './password-container.component.html',
  styleUrl: './password-container.component.scss',
})
export class PasswordContainerComponent extends SharedHelperComponent implements OnDestroy {
  public passwords$: Observable<Password[]> = new Observable<Password[]>();
  public isAnyPassword$: Observable<boolean> = new Observable<boolean>();
  public isAnySection$: Observable<boolean> = new Observable<boolean>();
  public currentSection$: BehaviorSubject<Section | null> = new BehaviorSubject<Section | null>(null);
  public sectionsLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public sectionList: Section[] = [];

  constructor(
    private injector: Injector,
    private passwordService: PasswordService,
    private sectionService: SectionService,
  ) {
    super(injector);
    this.getData();
  }

  private getData(): void {
    this.isAnySection$ = this.currentSection$.asObservable().pipe(map(s => !!s));
    this.isAnyPassword$ = this.passwords$.pipe(map(pList => pList.length > 0))
    this.loadSections();
  }

  public changeSection(section: Section): void {
    if (this.currentSection$.getValue() !== section) {
      this.currentSection$.next(section);
    }
  }

  public createSection(section: Section): void {
    if (!!section?.title) {
      this.sectionsLoading$.next(true);
      let newSection: Section;
      firstValueFrom(this.sectionService.addOne(section)).then(
        (section) => {
          newSection = section;
          this.currentSection$.next(newSection);
          this.loadSections();
          this.sectionsLoading$.next(false);
        }
      );
    }
  }

  public deleteSection(section: Section): void {
    if (section) {
      firstValueFrom(this.sectionService.deleteOne(section._id!)
      .pipe(withLatestFrom(this.isAnySection$))).then(
        ([_, isAnySection]) => {
          this.sectionList = this.sectionList.filter((s: Section) => s._id !== section._id);
          if (this.currentSection$.getValue()?._id === section?._id && isAnySection) {
            this.currentSection$.next(this.sectionList[0] ?? null);
          }
        }
      );
    }
  }

  public override ngOnDestroy() {
    super.ngOnDestroy();
    this.passwordService.setPasswordsNotVisible();
  }

  private loadSections(): void {
    this.sectionsLoading$.next(true);
    firstValueFrom(this.sectionService.getUserSections()).then(
      (sections) => {
        if (sections?.length > 0) {
          this.sectionList = sections;
          if (!this.currentSection$?.getValue()) {
            this.currentSection$.next(sections[0]);
          }
        }
        this.sectionsLoading$.next(false)
      }
    );
  }
}
