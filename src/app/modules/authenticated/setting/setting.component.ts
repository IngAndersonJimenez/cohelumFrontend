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
export class SettingComponent implements OnInit {

    pathImage: string = environment.sourceImage;
    imageHomeForms: Array<SettingTP> = [];
    isFormDirty: boolean = false;


    constructor(private formBuilder: FormBuilder, private settingService: SettingsService) {
    }

    ngOnInit(): void {
        this.getSettingSlide();
    }



    handleFileInput(fileInput: any, index: number) {
        const file = fileInput.files.item(0);

        console.log('Esto es file', file);

        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event: any) => {

            this.imageHomeForms[index].imagePreviews = [];
            const imageUrl = event.target.result;
            this.imageHomeForms[index].imagePreviews.push(imageUrl);
            this.imageHomeForms[index].value4 = file;
            this.isFormDirty = true;
        };
        reader.readAsDataURL(file);
    }



    onSubmit(index: number) {
        const setting = this.imageHomeForms[index];

        if (setting) {
            const image = setting.value4;
            const storageFolder = 'home/carrusel';
            const settingTP: SettingTP = {
                artefact: 'CarruselHome',
                description: 'Home',
                value1: setting.value1 ?? '',
                value2: setting.value2 ?? '',
                value3: '',
                value4: '',
                idSettingTP: setting.idSettingTP,
                imagePreviews: []
            };
            console.log('Esto llega a image: ' , image)
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
        this.settingService.getSlide("CarruselHome").subscribe(
            (data: any) => {
                this.imageHomeForms = data.responseDTO.map((setting: any) => {
                    const value4 = this.pathImage + setting.value4 ?? '';
                    return { ...setting, value4, imagePreviews: [] };
                });
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
                artefact: 'CarruselHome',
                description: 'Home',
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
        const storageFolder = 'home/carrusel';
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
            artefact: 'CarruselHome',
            description: 'Home',
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
