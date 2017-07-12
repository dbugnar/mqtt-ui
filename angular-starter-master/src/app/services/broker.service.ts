/**
 * Created by razvanbretoiu on 12.07.2017.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
@Injectable()
export class BrokerService {

  constructor(
    private http:Http
  ) { }
}
