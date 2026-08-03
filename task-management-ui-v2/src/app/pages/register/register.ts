import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = this.fb.group({

    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]

  });

  register() {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.authService.register(this.registerForm.value as any).subscribe({

      next: () => {

        Swal.fire({
          icon: 'success',
          title: 'Registered successfully',
          confirmButtonColor: '#c96f4a'
        });

        this.router.navigate(['/login']);

      },

      error: (err) => {

        console.log(err);

        Swal.fire({
          icon: 'error',
          title: 'Registration failed',
          text: err?.error?.message || 'Please try again.',
          confirmButtonColor: '#c96f4a'
        });

      }

    });

  }

}