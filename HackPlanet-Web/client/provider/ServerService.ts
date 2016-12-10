import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/Rx';


@Injectable()
export class ServerService{


    constructor(private http: Http) { }


    Refresh_ActiveSkill(skill){
        let obj = {
            active: 0
        };
        let body = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.patch(`https://wrinkle-8419a.firebaseio.com/Listener/${skill}/.json`, body, options).map((res: Response) => res.json());
    }


}