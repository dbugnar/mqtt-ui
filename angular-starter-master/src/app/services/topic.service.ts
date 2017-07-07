/**
 * Created by razvanbretoiu on 02.07.2017.
 */
import {Injectable} from "@angular/core";
import { Http } from "@angular/http";
import { HOST } from '../core/constants';
import { Utils } from '../core/utils/Utils';
import {Observable} from "rxjs";

@Injectable()
export class TopicService {

  constructor(
    private http: Http,
  )
  {}

  getTopics() :Observable<any[]>{
    return this.http.get( HOST + "topics/list", Utils.getHeader())
      .map(Utils.extractData)
      .catch(Utils.handleError);
  }

  removeTopic(topic: string) :Observable<any>{
    return this.http.post( HOST + "topics/remove/" + topic, {}, Utils.getHeader())
      .map(Utils.extractData)
      .catch(Utils.handleError);
  }


}
