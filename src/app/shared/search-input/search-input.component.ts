import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    this.checkSearchIsClicked(event);
  }

  @ViewChild('searchInput') public searchInput!: ElementRef;

  public isExpanded: boolean = false;

  public checkSearchIsClicked(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!this.searchInput.nativeElement.contains(target)) {
      this.collapseSearch();
    }
  }

  public expandSearch(): void {
    this.isExpanded = true;
  }

  private collapseSearch(): void {
    this.isExpanded = false;
  }

}
