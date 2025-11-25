import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LogninUpService } from '../../shared/services/lognin-up.service';
import { User } from '../../core/model/object-model';
import { debounceTime } from 'rxjs/operators';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-signin-up',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule

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
  user_data: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LogninUpService
  ) { }

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
      })
    });

    this.signInfrom = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  get rf() {
    return this.signUpfrom!.controls;
  }

  // ----------------------------------------
  // LOAD SAVED FORM DATA
  // ----------------------------------------
  loadSavedFormData(email: string) {
    this.loginService.getSavedFormData(email).subscribe({
      next: (data: any) => {
        console.log('Loaded saved form data:', data);
        this.signUpfrom.patchValue({
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
          mobNumber: data.mobNumber,
          gender: data.gender,
          language: data.language,
          dob: data.dob,
          age: data.age,
          aboutUs: data.aboutUs,
          address: {
            address1: data.address1,
            address2: data.address2,
            city: data.city,
            state: data.state,
            zipcode: data.zipcode
          }
        });
      },
      error: (error: any) => {
        console.error('Error loading saved form data:', error);
      }
    });
  }

  // ----------------------------------------
  // GET FORM DATA
  // ----------------------------------------
  getFormData() {
    if (this.signUpfrom.invalid) {
      console.log('Form is invalid');
      return null;
    }

    const formValues = this.signUpfrom.value;
    const userData = {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      role: formValues.role,
      mobNumber: formValues.mobNumber,
      gender: formValues.gender,
      language: formValues.language,
      dob: formValues.dob,
      age: formValues.age,
      aboutUs: formValues.aboutUs,
      uplodePhoto: formValues.uplodePhoto,
      address: {
        address1: formValues.address.address1,
        address2: formValues.address.address2,
        city: formValues.address.city,
        state: formValues.address.state,
        zipcode: formValues.address.zipcode
      }
    };

    console.log('114', userData);
    return userData;
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
    const file: File = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      // store base64 string (without the data: prefix) and filename
      const base64 = (reader.result as string) || '';
      // store the full data URL so backend can detect the mime type if needed
      this.signUpfrom.patchValue({ uplodePhoto: base64 });
      // optional: also store filename in form if needed
      // this.signUpfrom.patchValue({ uplodePhotoName: file.name });
    };
    reader.readAsDataURL(file);
  }

  onSubmitSignUp() {
    this.signUpSubmited = true;

    if (this.signUpfrom.invalid) {
      return;
    }

    // Build a plain JSON object to send to the server (skip file upload for now)
    const fv = this.signUpfrom.value;
    const userPayload: any = {
      name: fv.name,
      email: fv.email,
      password: fv.password,
      role: fv.role,
      mobNumber: fv.mobNumber,
      gender: fv.gender,
      language: fv.language,
      dob: fv.dob,
      age: fv.age,
      aboutUs: fv.aboutUs,
      // include the base64 data URL for the uploaded photo (if present)
      uplodePhoto: fv.uplodePhoto || null,
      address: {
        address1: fv.address.address1,
        address2: fv.address.address2,
        city: fv.address.city,
        state: fv.address.state,
        zipcode: fv.address.zipcode
      }
    };

    console.log('Submitting registration (JSON payload):', userPayload);

    // Send as JSON (no file) to avoid backend multipart parsing errors.
    this.loginService.UserRegistration(userPayload).subscribe({
      next: (response: any) => {
        console.log('Registration response:', response);
        alert("Registration Successful");
        this.router.navigate(['/sign-in']);
      },
      error: (error: any) => {
        console.error('Registration error:', error);
        alert("Registration Failed! Error: " + (error?.error || error?.message || error));
      }
    });
  }
  // onSubmitSignIn() {
  //   this.loginService.aurthLogin(this.signInfrom.value.email, this.signInfrom.value.password).subscribe(
  //     data => {
  //       this.user_data = data;
  //       if (this.user_data.length == 0) {
  //         if (this.user_data[0].role == 'seller') {
  //           sessionStorage.setItem('user_session_id', this.user_data[0].id);
  //           sessionStorage.setItem('user_role', this.user_data[0].role);
  //           alert("Login Successful");
  //           this.router.navigate(['/seller-dashboard']);
  //         }
  //         else if (this.user_data[0].role == 'buyer') {
  //           sessionStorage.setItem('user_session_id', this.user_data[0].id);
  //           sessionStorage.setItem('user_role', this.user_data[0].role);
  //           alert("Login Successful");
  //           this.router.navigate(['/buyer-dashboard']);
  //         } else {
  //           alert("Invalid User login_details");
  //         }
  //       } else {
  //         alert("InvalidId");
  //       }
  //       console.log(this.user_data);
  //     },
  //     error => {
  //       console.log('my error', error);
  //     }
  //   )
  // }
  onSubmitSignIn() {
    if (this.signInfrom.invalid) {
      alert("Please enter valid login details");
      return;
    }

    const email = this.signInfrom.value.email;
    const password = this.signInfrom.value.password;

    this.loginService.aurthLogin(email, password).subscribe({
      next: (res: any) => {
        console.log("API Response:", res);

        // If no user found
        if (!res || res.length === 0) {
          alert("Invalid Email or Password");
          return;
        }

        // User found
        const user = res[0];

        // Store local
        localStorage.setItem('user_session_id', user.id);
        localStorage.setItem('role', user.role);


        alert("Login Successful");

        // Role-based routing
        if (user.role === 'seller') {
          this.router.navigate(['/seller-dashboard']);
        } else if (user.role === 'buyer') {
          this.router.navigate(['/buyer-dashboard']);
        } else if (user.role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/home']);
        }
      },

      error: (err) => {
        console.error("Login API Error:", err);
        alert("Server Error, Try again later.");
      }
    });
  }









}


