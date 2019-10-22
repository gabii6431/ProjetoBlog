import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Post } from 'src/model/post';
import { AppService } from '../service/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title: string;
  body: string;

  dataSource: Post[];

  constructor(
    private _api: ApiService,
    private appService: AppService) { }


  ngOnInit() {
    this.appService.setTitle('Página Principal');
    this._api.getPosts().subscribe(res => {
      this.dataSource = res;
    }, err => {
      console.log(err);
    });
  }
}

