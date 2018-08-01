import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {

  private http: HttpClient;
  private baseUrl: string;
  private sending: boolean = false;
  private messageSent: boolean = false;

  private questionTypes = [
    { value: "", label: "Select a question category..." },
    { value: "1", label: "Request Information" },
    { value: "2", label: "Membership Enquiry" },
    { value: "3", label: "Send us a comment" },
    { value: "4", label: "Sell us something/Make us an offer" },
    { value: "5", label: "Any Other Question" },
  ];

  private model: ContactUsModel = new ContactUsModel();

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, title: Title) {

    this.http = http;
    this.baseUrl = baseUrl;

    title.setTitle("Contact Us - Clifton AC");
  }

  private sendMessage(form: NgForm) {

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

class ContactUsModel {

  public name: string = "";

  public emailAddress: string = "";

  public phoneNumber: string = "";

  public questionType: string = "";

  public message: string = "";
}

enum QuestionType {
  RequestInfo = 1,
  Membership,
  Comment,
  SellToUs,
  Other
}
