import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Warranty} from "../../../interface/warranty/Warranty";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ContactService} from "../../../services/contact.service";
import {environment} from "../../../environments/environment";



@Component({
  selector: 'app-extended-warranty-c',
  templateUrl: './extended-warranty-c.component.html',
  styleUrls: ['./extended-warranty-c.component.scss']
})
export class ExtendedWarrantyCComponent implements OnInit{

  messageForm:FormGroup;
  warranty!: Warranty[];
  dataSource = new MatTableDataSource<Warranty>(this.warranty);
  selectedRow: any;
  displayedColumns: string[] = ['email', 'nameContact', 'typeDocument','document', 'actions'];
  pdfSrc: SafeResourceUrl = '';
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  pathImage: string = environment.sourceImage;

  constructor(
      private contactService: ContactService,
      private fb: FormBuilder,
      private sanitizer: DomSanitizer,
      private cdr: ChangeDetectorRef
  ) {
    this.messageForm = this.fb.group({
      nameContact: [''],
      email: [''],
      typeDocument: [''],
      document: [''],
      distributor: [''],
      number_bill: [''],
      cellphone: [''],
      date: [''],
      product: [''],
      attach: ['']
    });
  }

  ngOnInit(): void {
    this.getWarranty()
  }
  refreshTable() {
    this.dataSource = new MatTableDataSource<Warranty>(this.warranty);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onDetailsButtonClick(warranty: any): void {
    this.selectedRow = this.selectedRow === warranty ? null : warranty;

    if (this.selectedRow) {
      this.messageForm.enable();

      if (warranty.attach) {
        this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.pathImage + `${warranty.attach}`);
      }

      this.messageForm.patchValue({
        nameContact: this.selectedRow?.nameContact || '',
        email: this.selectedRow?.email || '',
        distributor: this.selectedRow?.distributor || ''
      });
      if (!warranty.read) {
        this.markAsRead(warranty);
      }

    } else {
      this.messageForm.disable();
    }
  }

  markAsRead(warranty: Warranty): void {
    const token = this.contactService.getToken();
    this.contactService.updateStatusRead(true, warranty.idRequestG, token).subscribe(() => {
      const contactIndex = this.warranty.findIndex(c => c.idRequestG === warranty.idRequestG);
      if (contactIndex !== -1) {
        this.warranty[contactIndex].read = true;
        this.cdr.detectChanges();
        this.contactService.newMessageCount = Math.max(0, this.contactService.newMessageCount - 1);
      }
    });
  }

  getWarranty(){
    this.contactService.getWarranty().subscribe(
        (data: any) => {
          this.warranty = data.responseDTO;
          this.refreshTable();
        }
    )
  }
}
