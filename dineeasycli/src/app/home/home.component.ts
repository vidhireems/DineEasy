import { Component, OnInit } from '@angular/core';
import { HomeService } from './../home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  restaurants!: any[];

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.getItems().subscribe(data => this.restaurants = data);;
  }

}
