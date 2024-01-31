import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {MediaCheckService} from "../../core/services/media-check/media-check.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnDestroy {

  @ViewChild('searchInput') public searchInput!: ElementRef;
  @ViewChild('input') public input!: ElementRef;

  public isExpanded: boolean = false;

  private clickSubscription: Subscription;

  constructor(private mediaCheckService: MediaCheckService) {
    this.clickSubscription =
      this.mediaCheckService.getClicks()
        .subscribe((event: MouseEvent | undefined) => {
          if (this.isExpanded) {
            if (event && !this.searchInput.nativeElement.contains(event.target)) {
              this.collapseSearch();
            }
          }
        });
  }

  public ngOnDestroy(): void {
    this.clickSubscription.unsubscribe();
  }

  public expandSearch(): void {
    this.isExpanded = true;
  }

  private collapseSearch(): void {
    this.isExpanded = false;
  }

}
