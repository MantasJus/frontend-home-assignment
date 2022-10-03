import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter-bar',
  template: `
  <form [formGroup]="searchBarForm" class="search-bar">
    <div class="search-container" (click)="searchInput.focus()">
        <svg width="18" height="18" viewBox="0 0 18 18">
            <path d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0Z">
            </path>
        </svg>
        <input #searchInput formControlName="searchQuery" type="text" placeholder="Name, Capital, Language">
    </div>
    <select formControlName="regionSelection">
        <option value="" [selected]="selectedRegion==''">All Regions</option>
        <option *ngFor="let region of regions" [selected]="selectedRegion==region">{{region}}</option>
    </select>
  </form>
  `,
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit, OnDestroy {
  searchBarForm!: FormGroup;
  inputsSub$!: Subscription;

  @Input() regions: string[] | null= null;
  @Input() selectedRegion: string = '';
  @Input() searchQuery: string = '';
  @Output() filterQuerys = new EventEmitter<{searchQuery: string, regionSelect: string}>();

  constructor() { }

  ngOnInit(): void {
    this.searchBarForm = new FormGroup({
      searchQuery: new FormControl(this.searchQuery),
      regionSelection: new FormControl(this.selectedRegion)
    });
    this.inputsSub$ = this.searchBarForm.valueChanges.subscribe(() =>
      this.filterQuerys.emit({
        searchQuery: this.searchBarForm.value.searchQuery, 
        regionSelect: this.searchBarForm.value.regionSelection
      })
    );
  }

  ngOnDestroy(): void {
    this.inputsSub$.unsubscribe();
  }
}
