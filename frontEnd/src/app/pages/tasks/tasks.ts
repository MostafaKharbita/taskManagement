import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { TaskService } from '../../core/services/task.service';
import { AuthService } from '../../core/services/auth.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks implements OnInit {
  private taskService = inject(TaskService);
  private router = inject(Router);
  private authService = inject(AuthService);

  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  searchText = '';
  selectedStatus = 'ALL';
  selectedPriority = 'ALL';

  ngOnInit(): void {
    document.title = 'My Tasks';

    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (data) => {
        this.tasks = [...data];
        this.filteredTasks = [...data];
      },

      error: (err) => {
        console.log(err);

        Swal.fire({
          icon: 'error',
          title: 'Could not load tasks',
          text: 'Please try again.',
          confirmButtonColor: '#c96f4a',
        });
      },
    });
  }

  filterTasks() {
    this.filteredTasks = this.tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        task.description.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesStatus =
        this.selectedStatus === 'ALL' || task.status === this.selectedStatus;

      const matchesPriority =
        this.selectedPriority === 'ALL' ||
        task.priority === this.selectedPriority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }

  editTask(id: number) {
    this.router.navigate(['/task-form', id]);
  }

  async deleteTask(id: number) {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Delete this task?',
      text: "This can't be undone.",
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d64545',
      cancelButtonColor: '#8a7c6d',
    });

    if (!result.isConfirmed) {
      return;
    }

    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.loadTasks();
      },

      error: (err) => {
        console.log(err);

        Swal.fire({
          icon: 'error',
          title: 'Delete failed',
          text: 'Please try again.',
          confirmButtonColor: '#c96f4a',
        });
      },
    });
  }

  async logout() {
    const result = await Swal.fire({
      icon: 'question',
      title: 'Logout?',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#c96f4a',
      cancelButtonColor: '#8a7c6d',
    });

    if (!result.isConfirmed) {
      return;
    }

    this.authService.logout();

    this.router.navigate(['/login']);
  }
}
