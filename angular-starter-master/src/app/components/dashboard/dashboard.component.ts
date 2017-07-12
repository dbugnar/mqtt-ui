import * as Chartist from 'chartist';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'dashboard-cmp',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  public dashboardData: any;

  public activeClients;
  public messagesReceived;
  public uptime;
  public messagesSent;
  public isLoading:boolean;


  constructor(
    private dashboardService: DashboardService,
  ){}



  public ngOnInit() {

    this.isLoading = true;
    this.dashboardService.getBrokerDetails()
      .subscribe(
        data => this.handleSuccessGetBrokerDetails(data),
        error => console.log(error),
        () => this.isLoading = false,
      );



  }



  handleSuccessGetBrokerDetails(data) {

    this.activeClients = data.clients_active;
    this.messagesReceived = data.messages_received;
    this.messagesSent = data.messages_sent;
    this.uptime = data.uptime;
    this.isLoading = true;
    this.setDataForCharts();

  }

  setDataForCharts() {

    let dataSales = {
      labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
      series: [
        [287, 385, 490, 562, 594, 626, 698, 895, 952],
        [67, 152, 193, 240, 387, 435, 535, 642, 744],
        [23, 113, 67, 108, 190, 239, 307, 410, 410]
      ]
    };

    let optionsSales = {
      low: 0,
      high: 1000,
      showArea: true,
      height: '245px',
      axisX: {
        showGrid: false,
      },
      lineSmooth: Chartist.Interpolation.simple({
        divisor: 3
      }),
      showLine: true,
      showPoint: false,
    };

    let responsiveSales = [
      ['screen and (max-width: 640px)', {
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];

    Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);
    //
    //
    // let data = {
    //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    //   series: [
    //     [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
    //     [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
    //   ]
    // };
    //
    // let options = {
    //   seriesBarDistance: 10,
    //   axisX: {
    //     showGrid: false
    //   },
    //   height: '245px'
    // };
    //
    // let responsiveOptions = [
    //   ['screen and (max-width: 640px)', {
    //     seriesBarDistance: 5,
    //     axisX: {
    //       labelInterpolationFnc: function (value) {
    //         return value[0];
    //       }
    //     }
    //   }]
    // ];
    //
    // Chartist.Line('#chartActivity', data, options, responsiveOptions);
    //
    // let dataPreferences = {
    //   series: [
    //     [25, 30, 20, 25]
    //   ]
    // };
    //
    // let optionsPreferences = {
    //   donut: true,
    //   donutWidth: 40,
    //   startAngle: 0,
    //   total: 100,
    //   showLabel: false,
    //   axisX: {
    //     showGrid: false
    //   }
    // };
    //
    // Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);
    //
    // Chartist.Pie('#chartPreferences', {
    //   labels: [ '62%', '32%', '6%' ],
    //   series: [62, 32, 6]
    // });
  }
}
