import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FbService {

  constructor(private http: Http) {}

  AudioUrlToDB(url){
    let obj = {
      active: 1,
      respond: url
    };
    let body = JSON.stringify(obj);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.patch(`https://wrinkle-8419a.firebaseio.com/Listener/PlayMessage1/.json`, body, options).map((res: Response) => res.json());
  }

  SendUserPass(obj){

    console.log("Pass thorughed the auth");
    console.log(obj);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.patch(`/authuser`, obj, options).map((res: Response) => res.json());
  }


}

