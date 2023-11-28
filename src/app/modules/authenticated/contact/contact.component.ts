import {Component, OnInit, Renderer2} from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Contact } from "../../../interface/Contact";
import { ContactService } from "../../../services/contact.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contacts!: Contact[];
  selectedRow: any;
  messageForm: FormGroup;
  pdfSrc: SafeResourceUrl = '';

  constructor(
      private contactService: ContactService,
      private fb: FormBuilder,
      private sanitizer: DomSanitizer,
      private renderer: Renderer2
  ) {
    this.messageForm = this.fb.group({
      nameContact: [''],
      email: [''],
      reason: [''],
      attach: [''],
      department: [''],
      city: [''],
      cellphone: [''],
      comment: ['']
    });
  }

  ngOnInit() {
    this.loadContacts();
  }

  onDetailsButtonClick(contact: any): void {
    this.selectedRow = this.selectedRow === contact ? null : contact;
    if (this.selectedRow) {
      this.messageForm.enable();

      if (contact.attach) {
        // Renderizar el PDF en un objeto SafeResourceUrl
        this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(`data:application/pdf;base64, ${contact.attach}`);
      }

      this.messageForm.patchValue({
        nameContact: this.selectedRow?.nameContact || '',
        email: this.selectedRow?.email || '',
        reason: this.selectedRow?.reason || '',
        attach: this.selectedRow.attach || '',
        department: this.selectedRow?.department || '',
        city: this.selectedRow?.city || '',
        cellphone: this.selectedRow?.cellphone || '',
        comment: this.selectedRow?.comment || ''
      });
    } else {
      this.messageForm.disable();
    }
    contact.read = true;
  }

  loadContacts() {
    this.contactService.getContact().subscribe(
        (data: any) => {
          this.contacts = data.responseDTO;
        },
        error => {
          console.error('Error al cargar los contactos', error);
        }
    );
  }


  markAsRead(contact: any) {
    const token = this.contactService.getToken();

    this.contactService.updateStatusRead(true, contact.idContact, token).subscribe(
        response => {
          console.log('Mensaje marcado como leído:', response);
        },
        error => {
          console.error('Error al marcar como leído:', error);
        }
    );
  }
}
