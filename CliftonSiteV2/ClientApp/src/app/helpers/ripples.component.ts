import { Component, ElementRef, HostListener } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-home',
  template: ''
})
export class RippleComponent {

  constructor(
    private element: ElementRef,
    private deviceService: DeviceDetectorService) {


  }

  @HostListener("") elementClicked() {

    let wrapper = this.element.nativeElement;

    //TODO: Finish when I have time.
  }

  private isTouchDevice(): boolean {

    return !this.deviceService.isDesktop();
  }
}

