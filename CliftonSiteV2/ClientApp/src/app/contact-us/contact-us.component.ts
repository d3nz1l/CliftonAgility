import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Validation } from '../validators/validation-helper.provider';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {

  private http: HttpClient;
  private baseUrl: string;
  public sending: boolean = false;
  public messageStatus: MessageStatus = MessageStatus.ShowForm;
  public validation: Validation;

  public messageStatusEnum = MessageStatus;
  public form: FormGroup;


  public questionTypes = [
    { value: "0", label: "Select a question category..." },
    { value: "1", label: "Request Information" },
    { value: "2", label: "Membership Enquiry" },
    { value: "3", label: "Send us a comment" },
    { value: "4", label: "Any Other Question" },
  ];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, title: Title, formBuilder: FormBuilder, validation: Validation) {

    this.http = http;
    this.baseUrl = baseUrl;
    this.validation = validation;

    title.setTitle("Contact Us - Clifton AC");

    this.form = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      questionType: ['Select a question category...', [Validators.required]],
      message: ['', [Validators.required]],
      recaptcha: [null, Validators.required]
    });
  }

  public resetForm(clearForm: boolean) {

    this.messageStatus = MessageStatus.ShowForm;

    this.form.get('recaptcha').setValue('');

    if (clearForm) {
      this.form.get('name').setValue('');
      this.form.get('emailAddress').setValue('');
      this.form.get('phoneNumber').setValue('');
      this.form.get('questionType').setValue('Select a question category...');
      this.form.get('message').setValue('');
    }
  }

  public sendMessage() {

    if (!this.form.valid) {

      return;
    }

    this.sending = true;

    var options = {
      headers: new HttpHeaders({
        'recaptcha-response': this.form.get('recaptcha').value
      })
    };

    this.http
      .post("/api/message/email", this.buildModelFromForm(), options)
      .subscribe(
        result => {

          console.log(result);
          this.sending = false;
          this.messageStatus = MessageStatus.MessageSent;
        },
        error => {

          console.log(error);
          this.sending = false;
          this.messageStatus = MessageStatus.MessageFailed;
        });
  }

  private buildModelFromForm(): ContactUsModel {

    var model = new ContactUsModel();
    model.name = this.form.get('name').value;
    model.emailAddress = this.form.get('emailAddress').value;
    model.phoneNumber = this.form.get('phoneNumber').value;
    model.messageType = this.form.get('questionType').value.value;
    model.text = this.form.get('message').value;

    return model;
  }
}

class ContactUsModel {

  public name: string = "";

  public emailAddress: string = "";

  public phoneNumber: string = "";

  public messageType: QuestionType = 0;

  public text: string = "";
}

export enum QuestionType {
  Undefined,
  RequestInfo,
  Membership,
  Comment,
  Other
}

export enum MessageStatus {
  ShowForm,
  MessageSent,
  MessageFailed
}
