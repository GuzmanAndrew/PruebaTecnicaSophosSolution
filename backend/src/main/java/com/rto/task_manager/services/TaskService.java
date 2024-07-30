package com.rto.task_manager.services;

import com.rto.task_manager.entities.Task;

import java.util.List;

public interface TaskService {

   Task createTask(Task task);

   List<Task> getAllTasks();

   Task getTaskById(Integer id);

   Task updateTask(Integer id, Task task);

   void deleteTaskById(Integer id);
}
