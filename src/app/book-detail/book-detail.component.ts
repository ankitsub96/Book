import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';;

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BookDetailComponent implements OnInit {
  loggedIn:boolean
  book = {};

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.loggedIn=JSON.parse(localStorage.getItem('loggedIn'))

    if(this.loggedIn==undefined){
      this.loggedIn=false;
      console.log('not logged in')
      this.router.navigate(['/login']);
    }

    this.getBookDetail(this.route.snapshot.params['id']);
  }

  deleteBook(id) {
    this.http.delete('http://localhost:3000/'+id)
      .subscribe(res => {
          this.router.navigate(['/books']);
        }, (err) => {
          console.log(err);
        }
      );
  }

  getBookDetail(id) {
    this.http.get('http://localhost:3000/'+id).subscribe(data => {
      this.book = data;
      // console.log(this.book._id)
    });
  }

}
