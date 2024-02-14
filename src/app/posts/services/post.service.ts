import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, URL_BASE, User } from 'src/app/shared/models/shared.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }


  public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(URL_BASE + 'posts');
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(URL_BASE + 'users');
  }

}
