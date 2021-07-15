import { Component, Output, EventEmitter, Input } from '@angular/core';

export interface ErrorMessageType {
  type: string,
  message: string
}

@Component({
  selector: 'app-file-loader',
  templateUrl: './file-loader.component.html',
  styleUrls: [ './file-loader.component.scss' ]
})
export class FileLoaderComponent {

  @Output('onFileLoad') onFileLoad: EventEmitter<File> = new EventEmitter<File>();
  @Input('messages') messages: ErrorMessageType[] = []

  public file: File | null = null;
  public isLoaded: boolean = false;

  constructor() {
  }

  public onSelect(event: any): void {
    const file = event.addedFiles[0];
    const format = file.name.split('.')[1];
    if(format !== 'csv'){
      this.messages.push({ type: 'format', message: 'Your file format is not .csv' })
      return
    }

    this.file = file;
    this.onFileLoad.emit(file);
    this.isLoaded = true
  }

  public downloadTemplate(): void {

  }

  public removeFile() {
    this.file = null;
    this.isLoaded = false;
  }
}
