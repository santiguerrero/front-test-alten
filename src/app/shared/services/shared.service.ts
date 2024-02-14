import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post, URL_BASE, User, toggleMemory } from '../models/shared.interfaces';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private bhSubjectToggleValue = new BehaviorSubject(localStorage.getItem(toggleMemory) != null ?
  localStorage.getItem(toggleMemory) == 'false' ? false : true : false);
  
  public readonly toggleValueOBS = this.bhSubjectToggleValue.asObservable();

  constructor(private http: HttpClient) { }


  public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(URL_BASE + 'posts');
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(URL_BASE + 'users');
  }

  public nextToggleValue(v: boolean) {
    this.bhSubjectToggleValue.next(v);

  }
}
