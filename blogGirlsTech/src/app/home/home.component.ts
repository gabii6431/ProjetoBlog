import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Post } from 'src/model/post';
import { AppService } from '../service/app.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title: string;
  body: string;
  isLoadingResults = true;
  dataSource: Post[];

  constructor(
    private _api: ApiService,
    private router: Router,
    private appService: AppService) { }
    

  ngOnInit() {
    this.appService.setTitle('Página Principal');
    this._api.getPosts().subscribe(res => {
      this.dataSource = res;
    }, err => {
      console.log(err);
    });

  }

  deletePosts(post: number){
    console.log(post);
    this.isLoadingResults = true;
    this.appService.setTitle('Delete Post');
    this._api.deletePost(post).subscribe(res => {
      this.isLoadingResults = false;
      //this.router.navigate(['/home']);
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
}

