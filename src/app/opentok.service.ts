import { Injectable } from '@angular/core';

import * as OT from '@opentok/client';
import config from '../config';

@Injectable()
export class OpentokService {

  session: OT.Session;
  token: string;

  constructor() { }
  gettoken(tokenid: string) {
    // this.token = tokenid;
  }
  getOT() {
    return OT;
  }
  initSession() {
     this.token = config.TOKEN;
    if (config.API_KEY && config.TOKEN && config.SESSION_ID) {
      this.session = this.getOT().initSession(config.API_KEY, config.SESSION_ID);
    //  console.log('Token ID ' , this.token);
      return Promise.resolve(this.session);
    }
  }
  connect() {
    return new Promise((resolve, reject) => {
      this.session.connect(this.token, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(this.session);
        }
      });
    });
  }
}
