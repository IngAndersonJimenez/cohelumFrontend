import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-footer-public',
  templateUrl: './footer-public.component.html',
  styleUrls: ['./footer-public.component.scss']
})
export class FooterPublicComponent {

  formSubscribe!: FormGroup;
  showMessage: boolean = false;
  radicadoNumber: string | null = null;
  @ViewChild('radicadoInput', { static: false }) radicadoInput!: ElementRef;

  constructor(private contactService: ContactService, private loginService: LoginService, private formBuilder: FormBuilder) {

    this.formSubscribe = this.formBuilder.group({
      emailContact: ['', [Validators.required, Validators.email]]
    });

  }


  postSuscribe() {
    console.log("Correo")
    console.log(this.formSubscribe.get('emailContact'))

    const formData = new FormData();
    formData.append('nameContact', ' ');
    formData.append('email', this.formSubscribe.get('emailContact')?.value);
    formData.append('reason', 'SUSCRIPCION');
    formData.append('comment', 'Suscriptor a boletines y novedades');
    formData.append('cellphone', ' ');
    formData.append('department', ' ');
    formData.append('city', ' ');
    const emptyPdfBlob = new Blob([''], { type: 'application/pdf' });
    formData.append('attach', emptyPdfBlob, 'empty.pdf');
    this.getTokenPublic(formData);
  }

  private getTokenPublic(formData: FormData) {
    this.loginService.getTokenPublic().subscribe(data => {
      this.contactService.createContact(formData, data.token).subscribe(data => {
        console.log(data)
        let response: any = data;

        this.openPopup(response.responseDTO.reason, response.responseDTO.idRequest);
        this.formSubscribe.reset();
      })
    }
    );
  }

  openPopup(reason: string, idRequest: number): void {
    const prefix = 'SUSCR_';
    this.radicadoNumber = `${prefix}${idRequest}`;
    this.showMessage = true;
  }
  copyToClipboard() {
    const inputElement = this.radicadoInput.nativeElement;
    inputElement.select();
    document.execCommand('copy');
    this.showMessage = false;
  }



}
