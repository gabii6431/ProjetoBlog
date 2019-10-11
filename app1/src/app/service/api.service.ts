import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Cadastro } from '../shared/cadastro.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:4200/cadastro';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // getUsers (): Observable<Cadastro[]> {
  //   return this.http.get<Cadastro[]>(apiUrl)
  //     .pipe(
  //       tap(users => console.log('leu os users')),
  //       catchError(this.handleError('getUsers', []))
  //     );
  // }

  // getUser(id: number): Observable<Cadastro> {
  //   const url = `${apiUrl}/${id}`;
  //   return this.http.get<Cadastro>(url).pipe(
  //     tap(_ => console.log(`leu o user id=${id}`)),
  //     catchError(this.handleError<Cadastro>(`getUser id=${id}`))
  //   );
  // }

  addUser (cadastro): Observable<Cadastro> {
    console.log(cadastro)
    return this.http.post<Cadastro>(apiUrl, JSON.stringify(cadastro), httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((cadastro: Cadastro) => console.log(`adicionou o user com w/ name=${cadastro.fullname}`)),
      catchError(this.handleError<Cadastro>('addUser'))
    );
  }

  // updateUser(id, cadastro): Observable<any> {
  //   const url = `${apiUrl}/${id}`;
  //   return this.http.put(url, cadastro, httpOptions).pipe(
  //     tap(_ => console.log(`atualiza o user com id=${id}`)),
  //     catchError(this.handleError<any>('updateUser'))
  //   );
  // }

  // deleteUser (id): Observable<Cadastro> {
  //   const url = `${apiUrl}/delete/${id}`;

  //   return this.http.delete<Cadastro>(url, httpOptions).pipe(
  //     tap(_ => console.log(`remove o user com id=${id}`)),
  //     catchError(this.handleError<Cadastro>('deleteUser'))
  //   );
  // }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}