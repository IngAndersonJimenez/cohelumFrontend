import { Component } from '@angular/core';
import { ShowCaseGallery } from 'src/app/model/ShowCaseGallery';
import { LoginService } from 'src/app/services/login.service';
import { SettingsService } from 'src/app/services/settings.service';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-showcase-public',
  templateUrl: './showcase-public.component.html',
  styleUrls: ['./showcase-public.component.scss']
})
export class ShowcasePublicComponent {

  pathImage: string = environment.sourceImage;

  gallerySocial: Array<ShowCaseGallery> = [];

  activeIndex: number = 0;

  titleInformative: string = '';
  description: string = '';

  constructor(private settingsService: SettingsService, private loginService: LoginService) {
    this.getTokenPublic();

  }

  changeData(index: number) {
    if (this.gallerySocial.length > 0) {
      this.titleInformative = this.gallerySocial[index].getTitleInfo();
      this.description = this.gallerySocial[index].getDescription();
    }
  }

  changeDataSum() {

    if (this.activeIndex < (this.gallerySocial.length - 1)) {
      this.activeIndex = this.activeIndex + 1;
      this.titleInformative = this.gallerySocial[this.activeIndex].getTitleInfo();
      this.description = this.gallerySocial[this.activeIndex].getDescription();
    }
  }

  changeDataRest() {
    if (this.activeIndex > 0) {
      this.activeIndex = this.activeIndex - 1;
      this.titleInformative = this.gallerySocial[this.activeIndex].getTitleInfo();
      this.description = this.gallerySocial[this.activeIndex].getDescription();
    }
  }

  private getItemsArtefacCarrusel(token: string) {
    let response: any;
    this.settingsService.getElementsByArtefact("SocialSeccion", token).subscribe(data => {
      response = data;
      let index: number = 1;
      for (let iter of response.responseDTO) {
        this.gallerySocial.push(
          new ShowCaseGallery(index, this.pathImage + iter.value4, iter.value1, iter.value2));
        index++;
      }
      this.changeData(0);
    });
  }

  private getTokenPublic() {
    this.loginService.getTokenPublic().subscribe(data => {
      this.getItemsArtefacCarrusel(data.token);
    });
  }

}
