/**
 * Created by razvanbretoiu on 02.07.2017.
 */
import * as Chartist from 'chartist';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { MessageService } from '../services/message.service';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-message',
  templateUrl: 'message.component.html'
})
export class MessageComponent implements OnInit, OnDestroy{

  public table: TableData;
  public topic: string;
  public lastTime: number;
  public isLoading: boolean;
  private idInterval2;
  private dateChart:any = {
    labels: [],
    series: [
      []
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
  )
  { }

  public ngOnInit() {

    this.route.params.subscribe((params) => {
      this.topic = params['topic'];

      this.isLoading = true;



      this.messageService.getMessagesFromTopic(this.topic)
        .subscribe(
          messages => this.handleSuccessGetMessagesFromTopic(messages),
          error => console.log(error),
          () => {
            this.idInterval2 = setInterval(() => {
              this.getMessageAfter5Seconds();
            }, 5000);
            this.isLoading = false
          }
        );


      this.table = {
        headerRow: [],
        dataRows: [
          []
        ]
      };
      // this.setChart();

      // let dataSales = {
      //   labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
      //   series: [
      //     [287, 385, 490, 562, 594, 626, 698, 895, 952],
      //     [67, 152, 193, 240, 387, 435, 535, 642, 744],
      //     [23, 113, 67, 108, 190, 239, 307, 410, 410]
      //   ]
      // };
      //
      // let optionsSales = {
      //   low: 0,
      //   high: 1000,
      //   showArea: true,
      //   height: '245px',
      //   axisX: {
      //     showGrid: false,
      //   },
      //   lineSmooth: Chartist.Interpolation.simple({
      //     divisor: 3
      //   }),
      //   showLine: true,
      //   showPoint: false,
      // };
      //
      // let responsiveSales = [
      //   ['screen and (max-width: 640px)', {
      //     axisX: {
      //       labelInterpolationFnc: function (value) {
      //         return value[0];
      //       }
      //     }
      //   }]
      // ];

      //Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);

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

      // Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);
      //
      // Chartist.Pie('#chartPreferences', {
      //   labels: ['62%', '32%', '6%' ],
      //   series: [62, 32, 6]
      // });
    });
  }


  private getMessageAfter5Seconds() {

    this.messageService.getMessagesFromTopicAndTime(this.topic, this.lastTime)
      .subscribe(
        messages => {

          let dataRows = [];
          for (let i = 0; i < messages.length; i++) {
            dataRows[i] = [i, messages[i].message, this.getDate(messages[i].time), messages[i].qos];

            // this.dateChart.series[0].concat
          }
          if (dataRows.length != 0) {
            this.lastTime = messages[messages.length - 1].time;
            this.table.dataRows = dataRows.concat(this.table.dataRows);
          }
          this.setChart(messages);
        },
        error => console.log(error),
      )

  }

  private handleSuccessGetMessagesFromTopic(messages) {

    this.table.headerRow = [ 'ID', 'Message', 'Timp', 'QoS'];
    for (let i = 0; i < messages.length; i++) {
      this.table.dataRows[i] = [i, messages[i].message, this.getDate(messages[i].time), messages[i].qos];
    }
    this.lastTime = messages[messages.length - 1].time;

    this.setChart(messages);
  }


  private getDate(timestamp): string{
    let date = new Date(timestamp*1000);
    // Hours part from the timestamp
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  }

  private getSeries(data, labelsLenght) {
    let series = [];


    for (let i = 0; i <data.length; i++) {
      series[i] = +data[i].message;
    }

    let ret = this.dateChart.series[0].concat(series);

    console.log(labelsLenght);
    if (ret.length > labelsLenght){

      let indexFrom = ret.length - labelsLenght;
      let ret2 = [];
      let j = 0;
      for (let i = indexFrom; i < ret.length; i++){
        ret2[j++] = ret[i]
      }
      ret = ret2;
    }

    return ret;
  }


  private getLabels(data) {

    let lebs  = [];
    for (let i = 0; i < data.length; i++) {
      lebs[i] = this.getDate(data[i].time)
    }

    if (lebs.length == 0) {
      return this.dateChart.labels;
    }

    let allLabels = this.dateChart.labels.concat(lebs);

    console.log(allLabels);
    let length = allLabels.length;
    let labels = [];


    if (length <= 6) {
      for (let i = 0; i < length; i++) {
        labels[i] = allLabels[i];
      }
    }else if (length > 0) {
      let i = 0;
      labels[i++] = allLabels[0];

      if (Math.round(length / 2) - 2 > 0)
        labels[i++] = allLabels[Math.round(length / 2) - 2];

      if (Math.round(length / 2) - 1 > 0)
        labels[i++] = allLabels[Math.round(length / 2) - 1];

      labels[i++] = allLabels[Math.round(length / 2)];

      if (Math.round(length / 2) + 1 < length)
        labels[i++] = allLabels[Math.round(length / 2) + 1];

      if (Math.round(length / 2) + 2 < length)
        labels[i++] = allLabels[Math.round(length / 2) + 2];

      labels[i] = allLabels[length - 1];
    }


    return labels;
  }



  private setChart(data) {

    console.log(data);


    //console.log(this.getSeries(data));

    let labes = this.getLabels(data);
    let series = this.getSeries(data, labes.length);
    this.dateChart = {
      labels: labes,
      series: [ series ]
    };

    console.log(this.dateChart.series[0]);
    let height = this.findMaxFromSeries(this.dateChart.series[0]);
    height += 5;
    // height max series

    let optionsSales = {
      low: 0,
      high: height,
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


    Chartist.Line('#chartMessageActivity', this.dateChart, optionsSales, responsiveSales);
  }

  ngOnDestroy() {
    if (this.idInterval2) {
      clearInterval(this.idInterval2);
    }
  }

  private findMaxFromSeries(series) {
    let max = -1;
    for (let i = 0; i  < series.length;i++) {
      if (series[i] > max)
        max = series[i];
    }

    return max;
  }


}
