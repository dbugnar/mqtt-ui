/**
 * Created by razvanbretoiu on 02.07.2017.
 */
import {Injectable} from "@angular/core";
import { Http } from "@angular/http";
import { HOST } from '../core/constants';
import { Utils } from '../core/utils/Utils';
import {Observable} from "rxjs";


@Injectable()
export class DashboardService {

  constructor(
    private http: Http,
  ) {}

  getBrokerDetails() :Observable<any>{
    return this.http.get( HOST + "broker/info", Utils.getHeader())
      .map(Utils.extractData)
      .catch(Utils.handleError);
  }
}
