import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loggedIn =true;
  userInput={
    name:"",
    username:"",
    password:"",
    passwordCheck:"",

  }

  userInfo={
    name:"",
    username:"",
    password:"",
    passwordCheck:"",
    lastLogin:{}
  }
  updateUserInfo(userInput:any){
    console.log(userInput)
    var valid:boolean;
    for(var key in userInput){
      if(!userInput[key]){
        valid=false;
        break;
      }
    }
    if(valid==true){
      this.userInfo.name= userInput.name;
      this.userInfo.username= userInput.username;
      if(userInput.password===userInput.passwordCheck){
        this.userInfo.password= userInput.password;
      }
      this.userInfo.lastLogin= new Date()
      console.log(this.userInfo.lastLogin)
    }
  }
  // openModal(){
  //   $('#RegisterModal').modal('show');
  //   }
  constructor(private http: HttpClient, private router: Router) { }

  // saveBook() {
  //   this.http.post('http://localhost:3000/login', this.userInfo)
  //     .subscribe(res => {
  //         let id = res['_id'];
  //         this.router.navigate(['/book-details', id]);
  //       }, (err) => {
  //         console.log(err);
  //       }
  //     );
  // }
  ngOnInit() {
  }

}
