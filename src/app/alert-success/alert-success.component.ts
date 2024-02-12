import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-success',
  template: `
    <div class="modal-content success-modal">
      <div class="modal-header">
        <h4 class="modal-title">Éxito</h4>
      </div>
      <div class="modal-body">
        <p>{{ message }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      .success-modal {
        background-color: #dff0d8;
        width: auto;
        font-size: 16px;
      }
    `
  ]
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
