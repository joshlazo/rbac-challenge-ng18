import { Injectable } from '@angular/core';

import { ReqresService } from './reqres.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private reqresService: ReqresService,
  ) { }

  login(creds: { email: string, password: string }) {
    return this.reqresService.login(creds);
  }
}
