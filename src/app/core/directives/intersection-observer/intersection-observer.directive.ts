import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output,} from '@angular/core';
import {delay, filter, Subject} from 'rxjs';

interface IntersectionSubject {
  entry: IntersectionObserverEntry;
  observer: IntersectionObserver;
}

@Directive({
  selector: '[appIntersectionObserver]',
  standalone: true,
})
export class IntersectionObserverDirective implements OnDestroy, OnInit, AfterViewInit {
  @Input() debounceTime: number = 0;
  @Input() threshold: number = 0.2;

  private options: IntersectionObserverInit = {
    threshold: this.threshold,
    rootMargin: '0px'
  };
  @Output() visible: EventEmitter<boolean> = new EventEmitter<boolean>();

  private observer: IntersectionObserver | null = null;
  private subject$: Subject<{}> = new Subject<any>();

  constructor(private element: ElementRef) {
  }

  public ngOnInit(): void {
    this.createObserver();
  }

  public ngAfterViewInit(): void {
    this.startObservingElements();
  }

  private createObserver() {
    const isIntersecting = (entry: IntersectionObserverEntry) =>
      entry.isIntersecting || entry.intersectionRatio > 0;

    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (isIntersecting(entry)) {
          this.subject$.next({entry, observer});
        }
      });
    }, this.options);
  }

  private startObservingElements() {
    if (this.observer) {
      this.observer.observe(this.element.nativeElement);

      this.subject$
        .pipe(delay(this.debounceTime), filter(Boolean))
        .subscribe(async (subject: IntersectionSubject | any): Promise<void> => {
          const target: HTMLElement | null | undefined = subject.entry?.target;

          if (target) {
            (await this.isVisible(target))
              ? this.visible.emit(true)
              : this.visible.emit(false);
          }
        });
    }
  }

  private isVisible(element: HTMLElement): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const observer: IntersectionObserver = new IntersectionObserver(
        ([entry]) => {
          resolve(entry.intersectionRatio >= this.threshold);
        }, this.options
      );

      if (element) {
        observer?.observe(element);
      }
    });
  }

  public ngOnDestroy(): void {
    this.observer?.disconnect();

    this.subject$.next({} as any);
    this.subject$.complete();
  }
}
