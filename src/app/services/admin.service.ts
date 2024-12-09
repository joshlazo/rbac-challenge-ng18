import { Injectable } from '@angular/core';

import { ReqresService } from './reqres.service';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private users$ = new BehaviorSubject([]);

  constructor(
    private reqresService: ReqresService,
  ) {
    this.seedUsers();
  }

  seedUsers() {
    this.getUsersData(1);
  }

  getUsers() {
    return this.users$.asObservable();
  }

  getUsersData(page: number) {
    this.reqresService.getUsersData(page).subscribe((res) => {
      this.users$.next(res);
    })
  }

  getUserById(id: any) {
    return this.reqresService.getUserById(id);
  }

  deleteUser(_id: string) {
    this.users$.pipe(
      map((res: any) => ({
        ...res,
        data: res.data.filter((user: any) => user.id !== Number(_id))
      }))
    ).subscribe(res =>
      this.users$.next(res)
    );
  }
}
