import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  threads = [];
  subName: string= '';
  filter: string;
  filters: string[]=['top','new','controversial','rising','hot'];
  subscription: Subscription;
  @ViewChild('input') inputField: ElementRef;

  constructor(private http: HttpClient){
  };

  ngOnInit(){
    this.inputField.nativeElement.focus();
    this.getSub('');
  }

  public getSub(input: string){
    this.subName = input;
    let url = '';
    if(input != '')
     url = `https://cors-anywhere.herokuapp.com/reddit.com/r/${this.subName}/.json`;

    else url = `https://cors-anywhere.herokuapp.com/reddit.com/.json`;

    let obs = this.http.get(url);
    this.subscription = obs.subscribe((parent) => {
      this.threads = parent['data'].children;
    });
  }

  public onFilter(filter: string){
    let url='';
    if(this.subName != '')
       url = `https://cors-anywhere.herokuapp.com/reddit.com/r/${this.subName}/${filter}/.json`;

    else url = `https://cors-anywhere.herokuapp.com/reddit.com/${filter}/.json`;

    let obs = this.http.get(url);
    this.subscription = obs.subscribe((parent) => {
      this.threads = parent['data'].children;
    });
  };

  public onSearch(event: any,input: string){
    if(event.keyCode === 13){
      console.log(event.target);
      event.preventDefault();

      this.getSub(input);
    }
  }
}
