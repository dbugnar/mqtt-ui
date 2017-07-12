import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardService} from "../services/dashboard.service";
/**
 * Created by razvanbretoiu on 12.07.2017.
 */

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-broker',
  templateUrl: 'broker.component.html'
})
export class BrokerComponent implements OnInit, OnDestroy {

  public table: TableData;
  public isLoading:boolean;
  private idInterval;


  constructor(
    private dashboardService:DashboardService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.dashboardService.getBrokerDetails()
      .subscribe(
        data => this.handleSuccessGetBrokerDetails(data),
        error => console.log(error),
        () => {
          this.idInterval = setInterval(() => {
            this.callBrokerDetailsEach5Seconds();
          }, 5000);
          this.isLoading = false
        }
      );
    this.table = {
      headerRow : [ 'Status', 'Valoare'],
      dataRows: [
        ['1', 'Dakota'],
        ['2', 'Minerva']
      ]
    };
  }

  callBrokerDetailsEach5Seconds(){

    this.dashboardService.getBrokerDetails()
      .subscribe(
        data => this.handleSuccessGetBrokerDetails(data),
        error => console.log(error),
        () => this.isLoading = false
      );
  }

  handleSuccessGetBrokerDetails(data) {

    this.table.headerRow = [ 'Status', 'Valoare'];

    let i = 0;
    for (let property in data) {
      if (data.hasOwnProperty(property)) {
        // do stuff
        let status = property.replace("_", " ");
        status = status.replace("_", " ");
        status = status.replace("_", " ");
        status = status.replace("_", " ");
        if (status != 'version') {
          this.table.dataRows[i] = [status, data[property]];
          i++;
        }
      }
    }
  }

  ngOnDestroy() {
    if (this.idInterval) {
      clearInterval(this.idInterval);
    }
  }

}
