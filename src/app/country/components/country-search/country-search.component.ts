import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-country-search',
  templateUrl: './country-search.component.html',
  styles: [],
})
export class CountrySearchComponent implements OnInit {

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  @Input() placeholder: string = 'Search by...';

  debouncer: Subject<string> = new Subject();

  term: string = '';

  constructor() {}

  ngOnInit(): void {
    this.debouncer
    .pipe(debounceTime(300))
    .subscribe((value) => {
      this.onDebounce.emit(value);
    });
  }

  search(): void {
    this.onEnter.emit(this.term);
  }

  pressKey() {
    this.debouncer.next(this.term);
  }
}
