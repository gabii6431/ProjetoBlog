import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewUserComponent } from './new-user/new-user.component';
import { ContactComponent } from './contact/contact.component';
import { NewPostComponent } from './new-post/new-post.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { CommentComponent } from './comment/comment.component';
import {NewCommentComponent} from './new-comment/new-comment.component'


const routes: Routes = [
  {
    path: 'new-user',
    component: NewUserComponent,
    data: { title: 'New user' }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { title: 'Contact' }
  },
  {
    path: 'new-post',
    component: NewPostComponent,
    data: { title: 'New Post' }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'About' }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  {
    path: 'comment/:id',
    component: CommentComponent,
    data: { title: 'Comment' }
  },
  {
    path: 'new-comment/:id',
    component: NewCommentComponent,
    data: { title: 'Comment' }
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
