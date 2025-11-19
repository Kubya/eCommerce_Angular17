import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LogninUpService } from '../../shared/services/lognin-up.service';
import { User } from '../../core/model/object-model';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-signin-up',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './signin-up.component.html',
  styleUrls: ['./signin-up.component.css']
})
export class SigninUpComponent {

  regfrom: boolean = false;
  signUpfrom!: FormGroup;
  signInfrom!: FormGroup;
  signUpSubmited: boolean = false;

  href: string = '';
  user_reg_data: any;
  user_dto?: User;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LogninUpService
  ) {}

ngOnInit(): void {

  this.href = this.router.url;
  this.regfrom = (this.href === '/sign-up');

  this.signUpfrom = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    role: ['', Validators.required],
    mobNumber: ['', Validators.required],
    gender: ['', Validators.required],
    language: ['', Validators.required],
    dob: ['', Validators.required],
    age: ['', Validators.required],
    aboutUs: ['', Validators.required],
    uplodePhoto: ['', Validators.required],
    agree: [false, Validators.requiredTrue],

    address: this.fb.group({
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required]
    }),

    roleChoice: ['', Validators.required]
  });

  this.signInfrom = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  // Auto-save form data as user fills it
  this.signUpfrom.valueChanges
    .pipe(debounceTime(1000)) // Wait 1 second after user stops typing
    .subscribe(() => {
      this.autoSaveFormData();
    });
}

  get rf() {
    return this.signUpfrom!.controls;
  }

  // ----------------------------------------
  // AUTO-SAVE FORM DATA
  // ----------------------------------------
  autoSaveFormData() {
    if (this.signUpfrom.invalid) {
      return;
    }

    const formData = new FormData();

    Object.keys(this.signUpfrom.value).forEach(key => {
      if (key === 'address') {
        formData.append('address1', this.signUpfrom.value.address.address1);
        formData.append('address2', this.signUpfrom.value.address.address2);
        formData.append('city', this.signUpfrom.value.address.city);
        formData.append('state', this.signUpfrom.value.address.state);
        formData.append('zipcode', this.signUpfrom.value.address.zipcode);
      } else if (key !== 'agree' && key !== 'roleChoice') {
        formData.append(key, this.signUpfrom.value[key]);
      }
    });

    // Call auto-save API
    this.loginService.autoSaveFormData(formData).subscribe({
      next: (response: any) => {
        console.log('Form data auto-saved:', response);
      },
      error: (error: any) => {
        console.error('Error auto-saving form data:', error);
      }
    });
  }

  // ----------------------------------------
  // FILE UPLOAD HANDLER
  // ----------------------------------------
  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.signUpfrom.patchValue({ uplodePhoto: file });
  }

  // ----------------------------------------
  // SUBMIT SIGN-UP
  // ----------------------------------------
  // onSubmitSignUp() {

  //   this.signUpSubmited = true;

  //   if (this.signUpfrom.invalid) {
  //     return;
  //   }

  //   this.user_reg_data = this.signUpfrom.value;
  //   this.user_dto = {
  //     name: this.user_reg_data.name,
  //     email: this.user_reg_data.email,
  //     password: this.user_reg_data.password,
  //     role: this.user_reg_data.role,
  //     mobNumber: this.user_reg_data.mobNumber,
  //     gender: this.user_reg_data.gender,
  //     language: this.user_reg_data.language,
  //     dob: this.user_reg_data.dob,
  //     age: this.user_reg_data.age,
  //     aboutUs: this.user_reg_data.aboutUs,
  //     uplodePhoto: this.user_reg_data.uplodePhoto,
  //     roleChoice: this.user_reg_data.roleChoice,
  //     address: `${this.user_reg_data.address.address1}, ${this.user_reg_data.address.address2 || ''
  //       }, ${this.user_reg_data.address.city}, ${this.user_reg_data.address.state
  //       }, ${this.user_reg_data.address.zipcode}`
  //   };
  //   // -----------------------------
  //   // API CALL
  //   // -----------------------------
  //   this.loginService.UserRegistration(this.user_dto).subscribe({
  //     next: () => {
  //       alert("Registration Successful");
  //       this.router.navigate(['/sign-in']);
  //     },
  //     error: () => {
  //       alert("Registration Failed. Please try again.");
  //     }
  //   });
  // }
  onSubmitSignUp() {
  this.signUpSubmited = true;

  if (this.signUpfrom.invalid) {
    return;
  }

  const formData = new FormData();

  Object.keys(this.signUpfrom.value).forEach(key => {
    if (key === 'address') {
      formData.append('address1', this.signUpfrom.value.address.address1);
      formData.append('address2', this.signUpfrom.value.address.address2);
      formData.append('city', this.signUpfrom.value.address.city);
      formData.append('state', this.signUpfrom.value.address.state);
      formData.append('zipcode', this.signUpfrom.value.address.zipcode);
    } else {
      formData.append(key, this.signUpfrom.value[key]);
    }
  });

  this.loginService.UserRegistration(formData).subscribe({
    next: () => {
      alert("Registration Successful");
      this.router.navigate(['/sign-in']);
    },
    error: () => {
      alert("Registration Failed!");
    }
  });
}


}

