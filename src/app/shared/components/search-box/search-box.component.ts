import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  @ViewChild('txtInput')
  public input!: ElementRef<HTMLInputElement>;

  @Input()
  public placeHolder!: string;

  @Input()
  public onTermValue?: string;

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();

  private debouncer: Subject<string> = new Subject<string>();

  private debouncerSubscription?: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe(searchTerm => this.onDebounce.emit(searchTerm));
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  searchTerm() {
    const newTag = this.input.nativeElement.value;
    this.onValue.emit(newTag);
  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }

  
}
