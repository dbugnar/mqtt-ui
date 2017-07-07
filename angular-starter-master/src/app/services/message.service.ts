import {Injectable} from "@angular/core";
import { Http } from "@angular/http";
import { HOST } from '../core/constants';
import { Utils } from '../core/utils/Utils';
import {Observable} from "rxjs";

/**
 * Created by razvanbretoiu on 02.07.2017.
 */

@Injectable()
export class MessageService {

  constructor(private http: Http,) {
  }

  getAllMessages(): Observable<any[]> {
    return this.http.get(HOST + "messages/all", Utils.getHeader())
      .map(Utils.extractData)
      .catch(Utils.handleError);
  }

  getAllMessagesWithTime(timestamp: number): Observable<any> {

    return this.http.get(HOST + "messages/all/" + timestamp, Utils.getHeader())
      .map(Utils.extractData)
      .catch(Utils.handleError);
  }

  getMessagesFromTopic(topic: string): Observable<any> {

    return this.http.get(HOST + "messages/on_topic?topic=" + topic, Utils.getHeader())
      .map(Utils.extractData)
      .catch(Utils.handleError);
  }

  getMessagesFromTopicAndTime(topic: string, timestamp: number): Observable<any> {

    return this.http.get(HOST + "messages/on_topic/starting_from?topic=" + topic +"&time=" + timestamp, Utils.getHeader())
      .map(Utils.extractData)
      .catch(Utils.handleError);
  }
}

