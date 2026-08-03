import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm {

  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  taskId: number | null = null;

  taskForm = this.fb.group({

    title: ['', Validators.required],
    description: [''],
    status: ['TODO', Validators.required],
    priority: ['HIGH', Validators.required]

  });

  get title() { return this.taskForm.get('title'); }

  constructor() {

    this.taskId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.taskId) {
      this.loadTask();
    }

  }

  loadTask() {

    this.taskService.getTaskById(this.taskId!).subscribe({

      next: (task) => {

        this.taskForm.patchValue({

          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority

        });

      },

      error: (err) => {

        console.log(err);

        Swal.fire({
          icon: 'error',
          title: 'Could not load task',
          text: 'Please try again.',
          confirmButtonColor: '#c96f4a'
        });

      }

    });

  }

  saveTask() {

    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    if (this.taskId) {

      this.taskService.updateTask(this.taskId, this.taskForm.value as any).subscribe({

        next: () => {

          Swal.fire({
            icon: 'success',
            title: 'Task updated',
            confirmButtonColor: '#c96f4a'
          });

          this.router.navigate(['/tasks']);

        },

        error: (err) => {

          console.log(err);

          Swal.fire({
            icon: 'error',
            title: 'Update failed',
            text: 'Please try again.',
            confirmButtonColor: '#c96f4a'
          });

        }

      });

    } else {

      this.taskService.createTask(this.taskForm.value as any).subscribe({

        next: () => {

          Swal.fire({
            icon: 'success',
            title: 'Task created',
            confirmButtonColor: '#c96f4a'
          });

          this.router.navigate(['/tasks']);

        },

        error: (err) => {

          console.log(err);

          Swal.fire({
            icon: 'error',
            title: 'Creation failed',
            text: 'Please try again.',
            confirmButtonColor: '#c96f4a'
          });

        }

      });

    }

  }

}