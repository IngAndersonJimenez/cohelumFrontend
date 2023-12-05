import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NotificationService } from "../../../notifications/notification.service";
import { ContactService } from "../../../services/contact.service";
import { LoginService } from "../../../services/login.service";
import { ReasonEnum } from "../../../interface/Contact";
import {BehaviorSubject, catchError, Observable, switchMap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  form!: FormGroup;
  optionsReason: ReasonEnum[] = [ReasonEnum.Garantia, ReasonEnum.ContactoGeneral];
  selectedPDFName: string | undefined;
  showMessage: boolean = false;
  radicadoNumber: string | null = null;
  @ViewChild('radicadoInput', { static: false }) radicadoInput!: ElementRef;

  constructor(
      private formBuilder: FormBuilder,
      private notificationService: NotificationService,
      private contactService: ContactService,
      private loginService: LoginService,
      private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nameContact: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      reason: ['', Validators.required],
      attach: [''],
      comment: ['', Validators.required],
      cellphone: [null, Validators.required],
      department: [''],
      city: ['']
    });

    const attachControl = this.form.get('attach');
    attachControl?.disable();

    this.form.get('reason')?.valueChanges.subscribe((selectedReason) => {
      if (selectedReason === ReasonEnum.Garantia) {
        attachControl?.enable();
      } else {
        attachControl?.disable();
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('nameContact', this.form.get('nameContact')?.value);
      formData.append('email', this.form.get('email')?.value);
      formData.append('reason', this.form.get('reason')?.value);
      const attachFile = this.form.get('attach')?.value;
      if (attachFile) {
        formData.append('attach', attachFile);
      }

      formData.append('comment', this.form.get('comment')?.value);
      formData.append('cellphone', this.form.get('cellphone')?.value);
      formData.append('department', this.form.get('department')?.value);
      formData.append('city', this.form.get('city')?.value);

      this.contactService.getTokenPublic(this.form.value).pipe(
          switchMap((token) => this.contactService.createContact(formData, token)),
          catchError((error) => {
            console.error('Error al enviar datos al backend:', error);
            this.notificationService.showError("Error al intentar enviar la información", "Vuelve a intentar");
            throw error;
          })
      ).subscribe({
        next: (data) => {
          this.notificationService.showSuccess("Mensaje enviado correctamente", "Registro Exitoso");
          this.form.reset()
          console.log('Datos enviados con éxito al backend:', data);
        },
        error: (error) => {
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
        return;
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
  openPopup() {
    this.radicadoNumber = '12345';
    this.showMessage = true;
  }
  copyToClipboard() {
    const inputElement = this.radicadoInput.nativeElement;
    inputElement.select();
    document.execCommand('copy');
    this.showMessage = false;
  }

}

