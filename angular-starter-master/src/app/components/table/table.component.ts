import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { TopicService } from '../../services/topic.service';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'table-cmp',
  templateUrl: 'table.component.html'
})
export class TableComponent implements OnInit{

  public table: TableData;
  public isLoading: boolean;

  constructor(
    private router: Router,
    private topicService: TopicService,
  ) { }

  public ngOnInit(){

    this.isLoading = true;
    this.topicService.getTopics()
      .subscribe(
        topics => this.handleSuccessGetAllTopics(topics),
        error => console.log(error),
        () => this.isLoading = false
      );


    this.table = {
      headerRow: [ 'ID', 'Nume', 'Unitate de masura', 'Actiune'],
      dataRows: [
        ['1', 'Dakota', 'Oud', '$36,738'],
        ['2', 'Minerva', 'Sinaai-', '$23,789'],
        ['3', 'Sage', 'Baileux', '$56,142'],
        ['4', 'Philip', 'Overland Park', '$38,735'],
        ['5', 'Doris', 'Feldkirchen in Kärnten', '$63,542'],
        ['6', 'Mason', 'Gloucester', '$78,615']
      ]
    };
    // this.tableData2 = {
    //     headerRow: [ 'ID', 'Name',  'Salary', 'Country', 'City' ],
    //     dataRows: [
    //         ['1', 'Dakota Rice','$36,738', 'Niger', 'Oud-Turnhout' ],
    //         ['2', 'Minerva Hooper', '$23,789', 'Curaçao', 'Sinaai-Waas'],
    //         ['3', 'Sage Rodriguez', '$56,142', 'Netherlands', 'Baileux' ],
    //         ['4', 'Philip Chaney', '$38,735', 'Korea, South', 'Overland Park' ],
    //         ['5', 'Doris Greene', '$63,542', 'Malawi', 'Feldkirchen in Kärnten', ],
    //         ['6', 'Mason Porter', '$78,615', 'Chile', 'Gloucester' ]
    //     ]
    // };
  }

  handleSuccessGetAllTopics(topics) {
    this.table.headerRow = [ 'ID', 'Nume', 'Actiune'];
    for (let i = 0; i < topics.length; i++) {
      this.table.dataRows[i] = [i, topics[i], ''];
    }

  }

  public viewTopic(topic){
    this.router.navigate(['topics', topic[1]]);
  }

  public deleteTopic(topic) {
    console.log("Delete", topic);
  }
}
