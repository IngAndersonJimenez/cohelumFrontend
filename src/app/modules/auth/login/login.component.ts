import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notifications/notification.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  public loginForm!: FormGroup;

  constructor(public loginService: LoginService, private formBuilder: FormBuilder, private router: Router,
    private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.buildForm()
  }

  private buildForm() {
    this.loginForm = this.formBuilder.group({
      emailUser: ['', new FormControl('', [Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.loginService.login(this.loginForm.value).subscribe(
          data => console.log(data),
          err => this.notificationService.showError('Error en las credenciales', 'Login Faliido')
      );


      this.router.navigate(['/cohelum/authenticated/content-user/dashboard']);
    }
  }

}
