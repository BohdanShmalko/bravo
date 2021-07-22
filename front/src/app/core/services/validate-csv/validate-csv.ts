import { Injectable } from '@angular/core';
import {ErrorMessageType} from "../../../user/catalog/components/file-loader/file-loader.component";

export interface RowsCsvType {
  unique?: boolean,
  rowName: string,
  canBeNull?: boolean
  combineRows?: string[]
}

@Injectable({
  providedIn: 'root'
})
export class ValidateCsv {

  public validate(rowData: string | ArrayBuffer | null, rows: RowsCsvType[]): ErrorMessageType[] {
    //TODO in future
    const stringData: string = `${rowData}`;
    const [header, ...middleData] = stringData.split('\r\n').filter((str: string) => str)
    const data = middleData.map((str: string) => str.replace("\"", ''));
    return [];
  }
}
