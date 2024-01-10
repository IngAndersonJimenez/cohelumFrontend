import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SettingsService} from "../../../services/settings.service";
import {SettingTP} from "../../../interface/settings/SettingTP";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit{

  pathImage: string = environment.sourceImage;
  imageHomeForms: FormGroup[] = [];
  constructor(private formBuilder: FormBuilder,private settingService:SettingsService) { }

  ngOnInit(): void {
        this.getSettingSlide()
    }

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
      this.imageHomeForm.patchValue({ image: this.imageUrl });
    }
    reader.readAsDataURL(this.fileToUpload);

  }

  onSubmit() {

  }

  getSettingSlide() {
    this.settingService.getSlide("CarruselHome").subscribe(
        (data: any) => {
          data.responseDTO.forEach((setting: any) => {
            // Crea un FormGroup para cada configuración y agrégalo al array
            const formGroup: FormGroup = this.createFormGroup(setting);
            this.imageHomeForms.push(formGroup);
          });
        }
    );
  }
  createFormGroup(setting: any): FormGroup {
    // Crea y devuelve un FormGroup basado en la configuración proporcionada
    return this.formBuilder.group({
      tittleImage: [setting.value1, Validators.required],
      subTittleImage: [setting.value2],
      image: [this.pathImage + setting.value4, Validators.required]
    });
  }

  deleteForm(index: number) {

    this.imageHomeForms.splice(index, 1);
  }

  newForm() {
    const nuevoFormGroup = this.createFormGroup({
      tittleImage: '',
      subTittleImage: '',
      image: ''
    });

    this.imageHomeForms.push(nuevoFormGroup);
  }
}
