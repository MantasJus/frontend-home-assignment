import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const CountId = this.route.snapshot.paramMap.get('abr');
  }

}
