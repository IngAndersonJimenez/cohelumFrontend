import {Component, OnInit} from '@angular/core';
import {Contact} from "../../../interface/Contact";
import {ContactService} from "../../../services/contact.service";


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit{

  contacts!: Contact[];

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.loadContacts()
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

}
