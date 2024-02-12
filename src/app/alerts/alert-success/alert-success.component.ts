import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-success',
  templateUrl: './alert-success.component.html',
  styleUrls: ['./alert-success.component.css']

})
export class AlertSuccessComponent implements OnInit {
  @Input() message: string = '';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {    
    setTimeout(() => {
      this.activeModal.close();
    }, 2000);
  }
}
