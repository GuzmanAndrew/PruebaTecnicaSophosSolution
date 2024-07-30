package com.rto.task_manager.controller;

import com.rto.task_manager.entities.Task;
import com.rto.task_manager.services.impl.TaskServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/task")
public class TaskController {

   @Autowired
   private TaskServiceImpl taskService;

   @PostMapping
   public ResponseEntity<Task> createTask(@RequestBody Task task) {
      return new ResponseEntity<>(taskService.createTask(task), HttpStatus.CREATED);
   }

   @GetMapping
   public ResponseEntity<List<Task>> getAllTasks() {
      return new ResponseEntity<>(taskService.getAllTasks(), HttpStatus.OK);
   }

   @GetMapping("/{id}")
   public ResponseEntity<Task> getTaskById(@PathVariable Integer id) {
      Task task = taskService.getTaskById(id);
      return (task != null) ? ResponseEntity.ok(task) : ResponseEntity.notFound().build();
   }

   @PutMapping("/{id}")
   public ResponseEntity<Task> updateTask(@PathVariable Integer id, @RequestBody Task task) {
      Task updatedTask = taskService.updateTask(id, task);
      return updatedTask != null ? ResponseEntity.ok(updatedTask) : ResponseEntity.notFound().build();
   }

   @DeleteMapping("/{id}")
   public ResponseEntity<Void> deleteTask(@PathVariable Integer id) {
      taskService.deleteTaskById(id);
      return ResponseEntity.noContent().build();
   }
}
