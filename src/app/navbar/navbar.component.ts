import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loggedIn =false;
  userInfo={
    name:"",
    username:"",
    password:"",
    lastLogin:{}
  }
  name='User'
  home:boolean
  books:boolean
  bookCreate:boolean
  bookDetails:boolean
  bookEdit:boolean

  @Input() route:string;


  constructor( private router: Router) { }

  logout(){
    localStorage.clear()
  }

  ngOnInit() {
    this.home=false
    this.books=false
    this.bookCreate=false
    this.bookDetails=false
    this.bookEdit=false
    switch(this.route){
      case 'home': this.home=true;
      break;
      case 'books': this.books=true;
      break;
      case 'bookCreate': this.bookCreate=true;
      break;
      case 'bookDetails': this.bookDetails=true;
      break;
      case 'bookEdit': this.bookEdit=true;
      break;

    }


    // console.log(router.url)
    this.loggedIn=JSON.parse(localStorage.getItem('loggedIn'))
    if(localStorage.getItem('userInfo')){
      this.name=JSON.parse(localStorage.getItem('userInfo')).name
      this.userInfo=JSON.parse(localStorage.getItem('userInfo'))
    }

    if(this.loggedIn==undefined){
      this.loggedIn=false;
      console.log('not logged in')
      this.router.navigate(['/login']);
    }
    if(this.userInfo==undefined){
      this.userInfo={ name: "", username: "", password: "", lastLogin: {} };
    }

    if(this.loggedIn){
      console.log('logged In')
      this.router.navigate(['/books']);
    }
    console.log('loggend In? ')
    console.log(this.loggedIn)

  }

}
