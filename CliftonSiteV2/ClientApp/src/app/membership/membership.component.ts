import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss']
})
export class MembershipComponent {

  private http: HttpClient;
  private baseUrl: string;
  public sending: boolean = false;
  public messageSent: boolean = false;

  public model: MembershipModel = new MembershipModel();

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, title: Title) {

    this.http = http;
    this.baseUrl = baseUrl;

    title.setTitle("Contact Us - Clifton AC");
  }

  public sendMessage(form: NgForm) {

    if (!form.valid) {

      return;
    }

    this.sending = true;

    this.http
      .post(this.baseUrl + "api/message/email", this.model)
      .subscribe(
        result => {

          this.sending = false;
          this.messageSent = true;
        },
        error => {

          this.sending = false;
          this.messageSent = false;
        });
  }
}

class MembershipModel {

  public name: string = "";

  public emailAddress: string = "";

  public phoneNumber: string = "";

  public questionType: string = "6";

  public experienceLevel: string = "";

  public message: string = "";

  public dogs: MembershipDog[] = [];
}

class MembershipDog {

  public name: string = ""

  public breed: string = "";

  public dateOfBirth: string = "";
}
