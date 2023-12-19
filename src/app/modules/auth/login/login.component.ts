import {AfterViewInit, Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notifications/notification.service';
import { LoginService } from 'src/app/services/login.service';
import {ConfigService} from "../../../services/config.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(public loginService: LoginService, private formBuilder: FormBuilder, private router: Router,
    private notificationService: NotificationService,private configService: ConfigService) {
    this.configService.activeSectionLayout(false);
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.loginForm = this.formBuilder.group({
      emailUser: ['', new FormControl('', [Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe(
          data => {
            console.log(data)
          },

          err => this.notificationService.showError('Error en las credenciales', 'Login Faliido')
      );


    }
  }

}
