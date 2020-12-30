import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BookEditComponent implements OnInit {
  loggedIn:boolean
  book = {};

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loggedIn=JSON.parse(localStorage.getItem('loggedIn'))

    if(this.loggedIn==undefined){
      this.loggedIn=false;
      console.log('not logged in')
      this.router.navigate(['/login']);
    }

    this.getBook(this.route.snapshot.params['id']);
  }

  getBook(id:any) {
    this.http.get('http://localhost:3000/'+id).subscribe(data => {
      this.book = data;
    });
  }

  updateBook(id:any, data:object) {
    this.http.put('http://localhost:3000/'+id, data)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/book-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
