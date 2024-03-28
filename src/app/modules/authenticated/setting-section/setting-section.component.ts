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
  imageHomeForms: Array<SettingTP> = [];
  isFormDirty: boolean = false;


  constructor(private formBuilder: FormBuilder, private settingService: SettingsService) {
  }

  ngOnInit(): void {
    this.getSettingSlide();
  }




/*
  onSelected(fileInput: any, index: number) {
    const file = fileInput.files.item(0);
    if (!file) return;
    const fileType = file.type.startsWith('image') ? 'image' : file.type.startsWith('video') ? 'video' : null;
    if (!fileType) return;

    if (fileType === 'image') {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        // Previsualización para imágenes
        const imageUrl = event.target.result;
        this.imageHomeForms[index].imagePreviews.push(imageUrl);
        this.imageHomeForms[index].value4 = file;
        this.isFormDirty = true;
      };
      reader.readAsDataURL(file);
    } else if (fileType === 'video') {
      // Previsualización para videos
      const videoUrl = URL.createObjectURL(file);
      this.imageHomeForms[index].imagePreviews = [videoUrl];
      this.imageHomeForms[index].value4 = file;
      this.isFormDirty = true;
    }
  }
*/

  onSelected(fileInput: any, index: number) {
    const file = fileInput.files.item(0);
    if (!file) return;
    const fileType = file.type.startsWith('image') ? 'image' : file.type.startsWith('video') ? 'video' : null;
    if (!fileType) return;
    if (fileType === 'image') {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageHomeForms[index].imagePreviews = [event.target.result];
        this.imageHomeForms[index].fileType = fileType;
        this.imageHomeForms[index].value4 = file;
        this.isFormDirty = true;
      };
      reader.readAsDataURL(file);
    } else if (fileType === 'video') {
      this.imageHomeForms[index].imagePreviews = [URL.createObjectURL(file)];
      this.imageHomeForms[index].fileType = fileType;
      this.imageHomeForms[index].value4 = file;
      this.isFormDirty = true;
    }
  }

  onSubmit(index: number) {
    const setting = this.imageHomeForms[index];

    if (setting) {
      const image = setting.value4;
      const storageFolder = 'home/SocialSeccion';
      const settingTP: SettingTP = {
        artefact: 'SocialSeccion',
        description: 'sección',
        value1: setting.value1 ?? '',
        value2: setting.value2 ?? '',
        value3: '',
        value4: '',
        idSettingTP: setting.idSettingTP,
        imagePreviews: []
      };
      this.settingService.createSettingTP(settingTP).subscribe(
          (result) => {
            const idSettingTP = result.responseDTO.idSettingTP;
            if (image) {
              this.settingService.createImageSettingTP(idSettingTP, storageFolder, image).subscribe(
                  (imageResult) => {
                    this.getSettingSlide();
                    this.isFormDirty = false;
                  }
              );
            }
          }
      );
    }
  }




  getSettingSlide() {
    this.settingService.getSlide("SocialSeccion").subscribe(
        (data: any) => {
          console.log("Respuesta del backend:", data);
          this.imageHomeForms = data.responseDTO.map((setting: any) => {
            const value4 = this.pathImage + (setting.value4 ?? '');
            const imagePreviews = value4 ? [value4] : [];

            // Determinar fileType basado en la extensión de value4
            const extension = value4.split('.').pop()!.toLowerCase();
            const imageExtensions = ['jpg', 'jpeg', 'png', 'webp'];
            const videoExtensions = ['mp4', 'webm'];
            let fileType = 'image'; // Default a imagen si no se puede determinar
            if (imageExtensions.includes(extension)) {
              fileType = 'image';
            } else if (videoExtensions.includes(extension)) {
              fileType = 'video';
            }

            return { ...setting, value4, imagePreviews, fileType };
          });
          console.log("Datos procesados para imageHomeForms:", this.imageHomeForms);
        }
    );
  }




  updateSettingTP(index: number) {
    const setting = this.imageHomeForms[index];
    const idSettingTP = setting.idSettingTP;

    if (idSettingTP !== undefined) {
      const formImagePath = setting.value4;
      const relativeImagePath = formImagePath.replace(this.pathImage, '');

      const updatedSettingTP: SettingTP = {
        artefact: 'SocialSeccion',
        description: 'sección',
        value1: setting.value1 ?? '',
        value2: setting.value2 ?? '',
        value3: '',
        value4: relativeImagePath,
        idSettingTP: setting.idSettingTP,
        imagePreviews: []
      };

      this.settingService.updateSettingTP(updatedSettingTP, idSettingTP).subscribe(
          (result) => {
            this.getSettingSlide();
          }
      );
    }
  }



  updateImage(index: number) {
    const storageFolder = 'home/SocialSeccion';
    const setting = this.imageHomeForms[index];
    const idSettingTP = setting.idSettingTP;
    const image = setting.value4;

    if (idSettingTP !== undefined && image) {
      this.settingService.createImageSettingTP(idSettingTP, storageFolder, image).subscribe(
          data => {
            this.getSettingSlide();
          }
      );
    }
  }

  deleteForm(index: number) {
    const setting = this.imageHomeForms[index];
    const idSettingTP = setting.idSettingTP;

    if (idSettingTP !== undefined) {
      this.settingService.updateStatusSettingTP(idSettingTP, false).subscribe(
          data => {
            this.getSettingSlide()
          }
      );
    }
  }


  newForm() {
    const nuevoSetting: SettingTP = {
      artefact: 'SocialSeccion',
      description: 'sección',
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      idSettingTP: 0,
      imagePreviews: []
    };

    this.imageHomeForms.push(nuevoSetting);
  }

}
