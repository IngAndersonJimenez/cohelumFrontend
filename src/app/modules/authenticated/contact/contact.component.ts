import {ChangeDetectorRef, Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Contact} from "../../../interface/Contact";
import {ContactService} from "../../../services/contact.service";
import {ResponseMessageDTO} from "../../../interface/header/ResponseMessageDTO";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {InventoryCategory} from "../../../interface/products/inventoryCategory";

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
    dataSource = new MatTableDataSource<Contact>(this.contacts);
    displayedColumns: string[] = ['email', 'reason', 'comment', 'actions'];
    @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort!: MatSort;

    constructor(
        private contactService: ContactService,
        private fb: FormBuilder,
        private sanitizer: DomSanitizer,
        private cdr: ChangeDetectorRef
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

    refreshTable() {
        this.dataSource = new MatTableDataSource<Contact>(this.contacts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
                reason: this.selectedRow?.reason || ''
            });
            if (!contact.read) {
                this.markAsRead(contact);
            }

        } else {
            this.messageForm.disable();
        }
    }


    loadContacts() {
        this.contactService.getContact().subscribe(
            (data: any) => {
                this.contacts = data.responseDTO.reverse();
                this.refreshTable();
            },
            error => {
                console.error('Error al cargar los contactos', error);
            }
        );
    }


    markAsRead(contact: Contact): void {
        console.log('Esto trae contact: ', contact);
        const token = this.contactService.getToken();
        this.contactService.updateStatusRead(true, contact.idRequest, token).subscribe(() => {
            const contactIndex = this.contacts.findIndex(c => c.idRequest === contact.idRequest);
            if (contactIndex !== -1) {
                this.contacts[contactIndex].read = true;

                // Forzar la detección de cambios manualmente
                this.cdr.detectChanges();
                this.contactService.newMessageCount = Math.max(0, this.contactService.newMessageCount - 1);
            }
        });
    }



}
