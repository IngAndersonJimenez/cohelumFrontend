import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../notifications/notification.service";
import {ContactService} from "../../../services/contact.service";
import {catchError, switchMap} from "rxjs";
import {ReasonEnum} from "../../../interface/Contact";

@Component({
    selector: 'app-extended-warranty',
    templateUrl: './extended-warranty.component.html',
    styleUrls: ['./extended-warranty.component.scss']
})
export class ExtendedWarrantyComponent implements OnInit {

    form!: FormGroup;
    selectedPDFName: string | undefined;
    showMessage: boolean = false;
    radicadoNumber: string | null = null;
    @ViewChild('radicadoInput', { static: false }) radicadoInput!: ElementRef;

    constructor(
        private formBuilder: FormBuilder,
        private notificationService: NotificationService,
        private contactService: ContactService
    ) {
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            nameContact: ['', Validators.required],
            typeDocument: ['', Validators.required],
            document: ['', Validators.required],
            email: ['',Validators.email],
            distributor: ['', Validators.required],
            number_bill: ['', Validators.required],
            cellphone: [''],
            date: [''],
            product: [''],
            attach: [''],
        });
    }

    createWarranty() {
        if (this.form.valid) {
            const formData = new FormData();
            formData.append('nameContact', this.form.get('nameContact')?.value);
            formData.append('typeDocument', this.form.get('typeDocument')?.value);
            formData.append('document', this.form.get('document')?.value);
            formData.append('email', this.form.get('email')?.value);
            formData.append('distributor', this.form.get('distributor')?.value);
            formData.append('number_bill', this.form.get('number_bill')?.value);
            formData.append('cellphone', this.form.get('cellphone')?.value);
            formData.append('date', this.form.get('date')?.value);
            formData.append('product', this.form.get('product')?.value);
            formData.append('attach', this.form.get('attach')?.value);
            this.contactService.getTokenPublic(this.form.value).pipe(
                switchMap((token) => this.contactService.createWarranty(formData, token)),
                catchError((error) => {
                    this.notificationService.showError("Error al intentar enviar la información", "Vuelve a intentar");
                    throw error;
                })
            ).subscribe({
                next: (data: any) => {
                    this.notificationService.showSuccess("Mensaje enviado correctamente", "Registro Exitoso");
                    this.openPopup(data.responseDTO.idRequestG)
                    this.form.reset();
                },
                error: (error) => {
                    this.form.reset();
                    console.error('Error al obtener el token:', error);
                }
            });
        }
    }

  onFileSelected(event: any, type: string): void {
    const input = event.target;
    const newFile = input.files ? input.files[0] : null;

    if (newFile) {
      const allowedPDFExtensions = ['pdf'];
      const fileExtension = newFile.name.split('.').pop().toLowerCase();

      if (type === 'pdf' && !allowedPDFExtensions.includes(fileExtension)) {
        console.error('Solo se permiten archivos PDF.');
        this.notificationService.showError("Solo se permiten archivos PDF.", "Vuelve a intentar");
        input.value = null;
      } else if (type === 'pdf' && newFile !== this.form.get('attach')?.value) {
        this.selectedPDFName = newFile.name;
        const reader = new FileReader();
        reader.onload = (e: any) => {
        };
        reader.readAsDataURL(newFile);

        const formData = new FormData();
        formData.append('attach', newFile);
        this.form.patchValue({ attach: formData.get('attach') });
      }
    }
  }
    copyToClipboard() {
        const inputElement = this.radicadoInput.nativeElement;
        inputElement.select();
        document.execCommand('copy');
        this.showMessage = false;
    }

    openPopup(idRequestG: number): void {
        const prefix= 'GE_';
        this.radicadoNumber = `${prefix}${idRequestG}`;
        this.showMessage = true;
    }
}
