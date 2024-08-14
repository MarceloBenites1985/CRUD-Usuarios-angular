import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'

import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private dataBaseStore: AngularFirestore) { }

  getAllUsers() {
    return this.dataBaseStore.collection('users', user => user.orderBy('name')).valueChanges({ idFild: 'firebaseId' })as Observable<any['']>;
  }

  addUser(user: User){
    return this.dataBaseStore.collection('users').add(user);
  }

  update(userId: string, user:User){
    return this.dataBaseStore.collection('users').doc(userId).update(user);
  }

  deleteUser(userId: string){
    return this.dataBaseStore.collection('users').doc(userId).delete();
  }
}
