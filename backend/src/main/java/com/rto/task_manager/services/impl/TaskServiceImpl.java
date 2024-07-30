package com.rto.task_manager.services.impl;

import com.rto.task_manager.entities.Task;
import com.rto.task_manager.repositories.TaskRepository;
import com.rto.task_manager.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

   @Autowired
   private TaskRepository taskRepository;

   @Override
   public Task createTask(Task task) {
      return taskRepository.save(task);
   }

   @Override
   public List<Task> getAllTasks() {
      return taskRepository.findAll();
   }

   @Override
   public Task getTaskById(Integer id) {
      return taskRepository.findById(id).orElse(null);
   }

   @Override
   public Task updateTask(Integer id, Task task) {
      Task existingTask = taskRepository.findById(id).orElse(null);

      if (existingTask != null) {
         existingTask.setTitle(task.getTitle());
         existingTask.setDescription(task.getDescription());
         return taskRepository.save(existingTask);
      }

      return null;
   }

   @Override
   public void deleteTaskById(Integer id) {
      taskRepository.deleteById(id);
   }
}
