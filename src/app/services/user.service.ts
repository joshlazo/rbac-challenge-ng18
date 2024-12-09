import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, first, map, take } from 'rxjs';

import { ReqresService } from './reqres.service';

import { ResourceResponse } from '../models/resource.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private resources$ = new BehaviorSubject([]);

  constructor(
    private reqresService: ReqresService,
  ) {
    this.seedResources();
  }

  seedResources() {
    this.getResourcesData(1);
  }

  getResources() {
    return this.resources$.asObservable();
  }

  getResourcesData(page: number) {
    this.reqresService.getResourcesData(page).subscribe((res) => {
      this.resources$.next(res);
    })
  }
  
  addResource(form: any) {
    this.resources$.pipe(
      first(),
      map((res: any) => ({
        ...res,
        data: [...res.data, form]
      }))
    ).subscribe((res: any) =>
      this.resources$.next(res)
    );
  }

  updateResource(val: any) {
    this.resources$.pipe(
      first(),
      map((res: any) => ({
        ...res,
        data: res.data.map((resource: any) => {
          if (resource.id == val.id)
            return val;
          return resource;
        })
      }))
    ).subscribe(res =>
      this.resources$.next(res)
    );
  }

  deleteResource(_id: string) {
    this.resources$.pipe(
      map((res: any) => ({
        ...res,
        data: res.data.filter((user: any) => user.id !== Number(_id))
      }))
    ).subscribe(res =>
      this.resources$.next(res)
    );
  }
}
