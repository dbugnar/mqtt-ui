import {Pipe, PipeTransform} from "@angular/core";
/**
 * Created by razvanbretoiu on 04.05.2017.
 */

@Pipe({name: 'mapValues'})
export class MapValuesPipe implements PipeTransform {
  transform(value: any, args?: any[]): Object[] {
    let returnArray = [];

    value.forEach((entryVal, entryKey) => {
      returnArray.push({
        key: entryKey,
        value: entryVal
      });
    });

    return returnArray;
  }
}
