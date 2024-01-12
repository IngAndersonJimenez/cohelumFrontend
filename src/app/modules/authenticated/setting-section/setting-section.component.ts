import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SettingsService} from "../../../services/settings.service";
import {SettingTP} from "../../../interface/settings/SettingTP";

@Component({
  selector: 'app-setting-section',
  templateUrl: './setting-section.component.html',
  styleUrls: ['./setting-section.component.scss']
})
export class SettingSectionComponent implements OnInit{

  pathImage: string = environment.sourceImage;
  imageHomeForms: FormGroup[] = [];

  constructor(private formBuilder: FormBuilder, private settingService: SettingsService) { }

  ngOnInit(): void {
    this.getSettingSlide();
  }

  handleFileInput(fileInput: any, index: number) {
    const file = fileInput.files.item(0);
    console.log('Esto es file', file)
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageHomeForms[index].patchValue({
        imageUrl: event.target.result,
        image: file,
      });
    };
    reader.readAsDataURL(file);
  }


  onSubmit(index: number) {
    const formGroup = this.imageHomeForms[index];

    if (formGroup.valid) {
      console.log('esto trae fromgroup ', formGroup)
      const image = formGroup.value.image;
      const storageFolder = 'home/seccion2';
      const settingTP: SettingTP = {
        artefact: 'Sección2',
        description: 'sección',
        value1: formGroup.value.tittleImage ?? '',
        value2: formGroup.value.subTittleImage ?? '',
        value3: '',
        value4: ''
      };
      console.log('FormGroup Value:', formGroup.value);
      this.settingService.createSettingTP(settingTP).subscribe(
          (result) => {
            const idSettingTP = result.responseDTO.idSettingTP;
            console.log('El id es: ', idSettingTP);
            if (image) {
              console.log('Valor de imageSettingTP antes de la solicitud:', image);
              this.settingService.createImageSettingTP(idSettingTP,storageFolder,image).subscribe(
                  (imageResult) => {
                    console.log('Imagen subida con éxito:', imageResult);
                  }
              );
            }
          }
      );
    }
  }

  getSettingSlide() {
    this.settingService.getSlide("Sección2").subscribe(
        (data: any) => {
          data.responseDTO.forEach((setting: any) => {
            const formGroup: FormGroup = this.createFormGroup(setting);
            this.imageHomeForms.push(formGroup);
          });
        }
    );
  }

  createFormGroup(setting: any): FormGroup {
    return this.formBuilder.group({
      tittleImage: [setting.value1, Validators.required],
      subTittleImage: [setting.value2],
      image: [this.pathImage + setting.value4],
      imageUrl: [this.pathImage + setting.value4]
    });
  }

  deleteForm(index: number) {

    const formGroup = this.imageHomeForms[index];
    const idSettingTP = formGroup.get('idSettingTP')?.value;

    if (idSettingTP !== undefined) {
      this.settingService.updateStatusSettingTP(idSettingTP, false).subscribe(
          data => {
            this.getSettingSlide()
          }
      );
    }
  }

  newForm() {
    const nuevoFormGroup = this.createFormGroup({
      tittleImage: '',
      subTittleImage: '',
      image: ''
    });

    this.imageHomeForms.push(nuevoFormGroup);
  }

  updateSettingTP(index: number) {
    const formGroup = this.imageHomeForms[index];
    const idSettingTP = formGroup.get('idSettingTP')?.value;
    if (idSettingTP !== undefined) {
      const settingTP: SettingTP = {
        artefact: 'Sección2',
        description: 'sección',
        value1: formGroup.value.tittleImage ?? '',
        value2: formGroup.value.subTittleImage ?? '',
        value3: '',
        value4: ''
      };
      this.settingService.updateSettingTP(settingTP, idSettingTP).subscribe(
          (result) => {
            console.log('Actualizacion exitosa!',result)
          }
      );
    }
  }

  updateImage(index: number){
    const storageFolder = 'home/Sección2';
    const formGroup = this.imageHomeForms[index];
    const idSettingTP = formGroup.get('idSettingTP')?.value;
    const image = formGroup.get('image')?.value;
    if (idSettingTP !== undefined) {
      this.settingService.createImageSettingTP(idSettingTP,storageFolder,image).subscribe(
          data => {
            this.getSettingSlide()
          }
      )
    }
  }
}
