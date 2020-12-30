import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss'],
})
export class BookCreateComponent implements OnInit {
  loggedIn:boolean
  book = {};

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.loggedIn=JSON.parse(localStorage.getItem('loggedIn'))
    // console.log('in bookCreate:  ')
    // console.log(this.loggedIn)
    if(this.loggedIn==undefined){
      this.loggedIn=false;
      console.log('not logged in')
      this.router.navigate(['/login']);
    }
  }

  saveBook() {
    this.http.post('http://localhost:3000/', this.book)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/book-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
