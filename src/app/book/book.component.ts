import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpResponse } from '@angular/common/http';
// @Injectable()

// declare var $:any
// function(){
//   document.querySelector('#contentTable').addEventListener('load',()=>{
//     document.querySelector('#contentTable').DataTable()
//   })
// }
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  books: any;
  selectedEntities: any[];
  // private books: any[];
  // function to handle data/entities selected/deselected in the table 
  public setSelectedEntities($event: any) {
     this.selectedEntities = $event;
  }
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:3000').subscribe(data => {
      this.books = data;
    });
  }
  

}
