import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-warning',
  templateUrl: './alert-warning.component.html',
  styleUrls: ['./alert-warning.component.css']
})
export class AlertWarningComponent {
  @Input() message: string = '';

  constructor(public activeModal: NgbActiveModal) {}

 
  closeModal(): void {
    this.activeModal.close();
  }
}
