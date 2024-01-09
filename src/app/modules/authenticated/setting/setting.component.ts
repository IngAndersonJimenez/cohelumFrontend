import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent {

  constructor(private formBuilder: FormBuilder) { }

  imageHomeForm = new FormGroup({
    tittleImage: new FormControl(''),
    subTittleImage: new FormControl(''),
    image: new FormControl('', [Validators.required])
  });

  fileToUpload: any;
  imageUrl: any;
  handleFileInput(file: any) {
    this.fileToUpload = file.files.item(0);

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);

    this.imageHomeForm.patchValue({ image: 'hdhdhdh' });

  }

  onSubmit() {
    console.log(this.imageHomeForm.value);
    console.log(this.imageHomeForm.valid);
  }

}
