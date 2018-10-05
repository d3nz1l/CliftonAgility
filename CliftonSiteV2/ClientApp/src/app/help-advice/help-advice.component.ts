import { Component, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ColorHelper } from '../helpers/color-helper.component';

@Component({
  selector: 'app-help-advice',
  templateUrl: './help-advice.component.html',
  styleUrls: ['./help-advice.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HelpAdviceComponent {

  public openTabs: boolean[] = [];

  public trainingHelp = [
    new HelpItem("cutlery", "Feeding before training", "If you intend to use food as a reward during training we recommend not feeding them before, or only giving your dog a small meal in the afternoon. If you do fed your dog before training we recommend feeding them at least 2 hours before training."),
    new HelpItem("traffic", "Wait/Stay with recall", "Please try to have a wait or stay with recall on your dog. This will help in training and also be a really BIG help in competitions."),
    new HelpItem("gesture", "Always have a poo bag", "Please try to have a poo bag with you at all times for all those little accidents our dogs have."),
    new HelpItem("puzzle-piece", "Setting up/Packing away", "This is self-help club, so please try to arrive early to help setup the equipment for your class. The longer it takes to setup, the later the class will start, meaning the class will be shorter as we are unable to run in to the later classes time."),
    new HelpItem("male", "What to wear", "We suggest wearing old clothes as the training surface can be a little dusty. Also, we recommend a good pair of trainers or walking boots as you'll be moving around the arena with your dog, hopefully quite quickly."),
    new HelpItem("thumb-up", "What your dog needs", "We suggest your dog has a flat collar with nothing dangling from it as this could get caught on the equipment. Also, bring some kind of reward for your dog, whether it's titbits, or some kind of toy. Your dog is here to have fun as well."),
    new HelpItem("mood", "Remain calm whist training", "We've had times where things go completely wrong when training, but please try to remain calm and listen to your trainer as they've seen it all before and will have some good advice."),
    new HelpItem("hospital", "If your dog is unwell", "if your dog is unfit to train please let one of the committee members know, as you will not be able to train with that dog."),
    new HelpItem("hospital-alt", "Dog Vaccinations", "It is recommended that your dog is kept up to date with all vaccinations and is flea, tick and worm treated. This is for the benefit of dogs that train with us."),
    new HelpItem("alert-circle-o", "If your absent from training", "If you know you're going to be absent from training for any length of time, please let a member of the committee know. As if you're absent for more 4 consecutive weeks, your name can be removed from the club register.")
  ];

  constructor(title: Title) {

    title.setTitle("Help/Advice - Clifton AC");
  }
}

class HelpItem {
  public title: string;

  public description: string;

  public icon: string;

  constructor(icon: string, title: string, description: string) {
    this.title = title;
    this.description = description;
    this.icon = icon;
  }
}
