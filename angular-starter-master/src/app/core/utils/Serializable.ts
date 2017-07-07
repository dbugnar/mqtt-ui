/**
 * Created by razvanbretoiu on 26.04.2017.
 */

export class Serializable {

  fillFromJSON(json: string) {

    let jsonObj = JSON.parse(json);
    for (let propName in jsonObj) {
      this[propName] = jsonObj[propName]
    }
  }

  fillFromJSONObject(jsonObj: any) {
    for (let propName in jsonObj) {
      this[propName] = jsonObj[propName]
    }
  }
}
