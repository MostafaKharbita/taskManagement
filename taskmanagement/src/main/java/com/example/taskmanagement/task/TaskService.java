package com.example.taskmanagement.task;

import com.example.taskmanagement.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    private User getCurrentUser() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        return (User) authentication.getPrincipal();
    }

    public Task createTask(Task task) {

        task.setUser(getCurrentUser());

        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {

        return taskRepository.findByUser(getCurrentUser());
    }

    public Task getTaskById(Long id) {

        return taskRepository
                .findByIdAndUser(id, getCurrentUser())
                .orElse(null);
    }

    public Task updateTask(Long id, Task updatedTask) {

        Task task = taskRepository
                .findByIdAndUser(id, getCurrentUser())
                .orElse(null);

        if (task == null) {
            return null;
        }

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setStatus(updatedTask.getStatus());
        task.setPriority(updatedTask.getPriority());

        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {

        Task task = taskRepository
                .findByIdAndUser(id, getCurrentUser())
                .orElse(null);

        if (task != null) {
            taskRepository.delete(task);
        }
    }
}