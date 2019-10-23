import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Post } from 'src/model/post';
import { Usuario } from 'src/model/user';
import { Comentario } from 'src/model/comment';
import { Contact } from 'src/model/contact';
import { post } from 'selenium-webdriver/http';
import { _MAT_INK_BAR_POSITIONER_FACTORY } from '@angular/material/tabs/typings/ink-bar';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:3001/post')
      .pipe(catchError(this.handleError('getPosts', []))
      );
  }

  getPost(id): Observable<Post> {
    return this.http.get<Post>(`http://localhost:3001/post/${id}`)
      .pipe(catchError(this.handleError<Post>(`getPost id = ${id}`)));
  }

  addPost(post): Observable<Post> {
    return this.http.post<Post>('http://localhost:3001/post', post, httpOptions)
      .pipe(catchError(this.handleError<Post>('addPost')));
  }

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>('http://localhost:3001/user')
      .pipe(catchError(this.handleError(`getUsers`, [])));
  }

  addUser(user): Observable<Usuario> {
    return this.http.post<Usuario>("http://localhost:3001/user", user, httpOptions)
      .pipe(catchError(this.handleError<Usuario>('addUser')));
  }

  getComments(post_id: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`http://localhost:3001/comment?post_id=${post_id}`)
      .pipe(catchError(this.handleError<Comentario[]>(`getComment post_id = ${post_id}`, [])));
  }

  addComment(comment): Observable<Comentario> {
    return this.http.post<Comentario>('http://localhost:3001/comment', comment, httpOptions)
      .pipe(catchError(this.handleError<Comentario>('addComment')));
  }

  addContact(contact): Observable<Contact> {
    return this.http.post<Contact>('http://localhost:3001/contact', contact, httpOptions)
      .pipe(catchError(this.handleError<Contact>('addContact')));
  }

  deletePost (post): Observable<Post> {
    return this.http.delete<Post>(`http://localhost:3001/post/${post}`, httpOptions).pipe(
      tap(_ => console.log(`remove o post com post=${post}`)),
      catchError(this.handleError<Post>('deletePost'))
    );
  }

  updatePost(id, post): Observable<any> {
    console.log(this.http.put(`http://localhost:3001/post/${post}`, post, httpOptions))
    return this.http.put(`http://localhost:3001/post/${post}`, post, httpOptions).pipe(
      tap(_ => console.log(`atualiza o post com id=${id}`)),
      catchError(this.handleError<any>('updateProduto'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}