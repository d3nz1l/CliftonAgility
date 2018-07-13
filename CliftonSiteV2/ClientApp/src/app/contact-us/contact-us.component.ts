import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {

  private questionTypes = [
    { id: "", name: "Selct a question..." },
    { id: "0", name: "Request Information" },
    { id: "1", name: "Membership Enquiry" },
    { id: "2", name: "Send us a comment" },
    { id: "3", name: "Sell us something/Make us an offer" },
    { id: "4", name: "Any Other Question" },
  ];

  private model: ContactUsModel = new ContactUsModel();
}

class ContactUsModel {

  public name: string = "";

  public emailAddress: string = "";

  public phoneNumber: string = "";

  public questionType: string = "";

  public message: string = "";
}
