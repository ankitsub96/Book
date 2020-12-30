import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loggedIn =false;
  validInput=false;
  userRegistered=false;
  getShadow(type){
    if(type=='login'){
      if(this.userRegistered==true){
        return "0px 0px 20px 16px white"
      }else{
      return null}
    }else if(type=='register'){
      if(this.userRegistered==false){
        return "0px 0px 20px 16px white"
      }else{
      return null}
    }
  }

  @ViewChild('registerFail') registerFailedText:ElementRef
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
    lastLogin:{}
  }
  updateUserInfo(userInput:any){
    // console.log(userInput)
    for(var key in userInput){
      if(!this.userInput[key]){
        this.validInput=false;
        return;
      }
    }
    if(this.userInput[key]){
      this.userInfo.name= userInput.name;
      this.userInfo.username= userInput.username;
      if(userInput.password&&(userInput.password==userInput.passwordCheck)){
        this.userInfo.password= userInput.password;
        this.validInput=true
        this.userInfo.lastLogin= new Date()
        this.saveUser(this.userInfo)
      }else{
        this.validInput=false
        console.log('diff passw')
        console.log(this.validInput)
        this.registerFail('The passwords do not match')
      }
    }
    // console.log(this.userInfo)
  }
  saveUser(userInfo:any) {
    console.log(userInfo)
    this.http.post('http://localhost:3000/register', userInfo)
      .subscribe(res => {
        if(res){
          localStorage.setItem('userInfo', JSON.stringify(res))
          localStorage.setItem('loggedIn', 'true')
          console.log('localstorage userinfo::  ')
          console.log(JSON.parse(localStorage.getItem('userInfo')))
          this.router.navigate(['/books']);
        }else{
          console.log('unknown error, maybe network error')
        }

      }, (err) => {
        console.log('error  is:')
      console.log(err.error.text);
      if(err.error.text=="userNameTaken"){
        this.registerFail("Username has already been registered, either try to log-in or use a different username")
      }
      }
    );
  }
  registerFail(msg:String){
    console.log(msg)
    this.registerFailedText.nativeElement.textContent=msg
  }



  @ViewChild('loginFail') loginFailedText:ElementRef
  userFindInput={
    username:"",
    password:"",
  }
  userFindInfo={
    username:"",
    password:"",
  }
  getUserInfo(userFindInput:any){
    // console.log(userInput)
    for(var key in userFindInput){
      if(!this.userFindInput[key]){
        this.validInput=false;
        this.loginFail("Please provide correct Inputs")
        return;
      }
    }
    if(this.userFindInput[key]){
      this.userFindInfo.username= userFindInput.username;
      this.userFindInfo.password= userFindInput.password;
        this.validInput=true
        this.findUser(this.userFindInfo)
    }
    // console.log(this.userInfo)
  }
  findUser(userFindInfo:any) {
    console.log(userFindInfo)
    this.http.post('http://localhost:3000/login', userFindInfo)
      .subscribe(res => {
        console.log(res)
        if(res){
          localStorage.setItem('userInfo', JSON.stringify(res))
          localStorage.setItem('loggedIn', 'true')
          console.log('localstorage userinfo::  ')
          console.log(JSON.parse(localStorage.getItem('userInfo')))
          this.router.navigate(['/books']);
        }else{
          console.log('unknown error, maybe network error')
        }
      }, (err) => {
        console.log('error  is:')
        console.log(err.error.text);
        if(err.error.text=="wrongPassword"){
          this.loginFail("Incorrect Password. Please recheck your Password field")
        }else if(err.error.text=="noUserFound"){
          this.loginFail("This User is not registered with us. Kindly register first")
        }
      }
    );
  }
  loginFail(msg:String){
    console.log('error invoked')
    console.log(msg)
    this.loginFailedText.nativeElement.textContent=msg
  }

  register(){
    this.userRegistered=false
    console.log('needs register')
  }
  login(){
    this.userRegistered=true
    console.log('needs login')
  }


  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit(){
    console.log((this.userRegistered))
    this.loggedIn=JSON.parse(localStorage.getItem('loggedIn'))
    if(this.loggedIn==undefined){
      this.loggedIn=false;
    }
    if(this.userInfo==undefined){
      this.userInfo={ name: "", username: "", password: "", lastLogin: {} };
    }

    if(this.loggedIn){
      console.log('logged In')
      this.router.navigate(['/books']);
    }

    console.log(this.userInfo)
    console.log('loggend In? ')
    console.log(this.loggedIn)
  }




}
