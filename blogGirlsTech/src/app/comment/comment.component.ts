import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Comentario} from 'src/model/comment';
import { AppService } from '../service/app.service';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  public title: string
  public comments: Comentario[]
  public post_id: number

  constructor(
    private _api: ApiService,
    private appService: AppService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.appService.setTitle('Página Principal');
    
    this.post_id = parseInt(this.route.snapshot.params['id'])
    this._api.getComments(this.post_id).subscribe(res => {
      this.comments = res.filter((post) => {
        return post.post_id == this.post_id;
      })
    }, err => {
      console.log(err);
    });
  }

}
