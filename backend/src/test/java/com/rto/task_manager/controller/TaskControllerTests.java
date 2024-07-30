package com.rto.task_manager.controller;

import com.rto.task_manager.entities.Task;
import com.rto.task_manager.services.TaskService;
import com.rto.task_manager.services.impl.TaskServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@SpringBootTest
@SpringJUnitConfig
public class TaskControllerTests {

   @Mock
   private TaskServiceImpl taskService;

   @InjectMocks
   private TaskController taskController;

   @BeforeEach
   public void setUp() {
      MockitoAnnotations.openMocks(this);
   }

   @Test
   public void testGetTaskById() {
      Task task = Task.builder()
              .id(1L)
              .title("test")
              .description("test")
              .build();
      when(taskService.getTaskById(1)).thenReturn(task);

      ResponseEntity<Task> response = taskController.getTaskById(1);
      assertEquals(HttpStatus.OK, response.getStatusCode());
      assertEquals(task, response.getBody());
   }

   @Test
   public void testGetAllTasks() {
      Task task1 = Task.builder()
              .id(1L)
              .title("test")
              .description("test")
              .build();
      Task task2 = Task.builder()
              .id(2L)
              .title("test 2")
              .description("test 2")
              .build();
      List<Task> tasks = Arrays.asList(task1, task2);
      when(taskService.getAllTasks()).thenReturn(tasks);

      ResponseEntity<List<Task>> response = taskController.getAllTasks();
      assertEquals(HttpStatus.OK, response.getStatusCode());
      assertEquals(tasks, response.getBody());
   }

   @Test
   public void testCreateTask() {
      Task task = Task.builder()
              .id(1L)
              .title("test")
              .description("test")
              .build();
      when(taskService.createTask(task)).thenReturn(task);

      ResponseEntity<Task> response = taskController.createTask(task);
      assertEquals(HttpStatus.CREATED, response.getStatusCode());
      assertEquals(task, response.getBody());
   }

   @Test
   public void testUpdateTask() {
      Task task = Task.builder()
              .id(1L)
              .title("test")
              .description("test")
              .build();
      when(taskService.updateTask(1, task)).thenReturn(task);

      ResponseEntity<Task> response = taskController.updateTask(1, task);
      assertEquals(HttpStatus.OK, response.getStatusCode());
      assertEquals(task, response.getBody());
   }

   @Test
   public void testDeleteTask() {
      doNothing().when(taskService).deleteTaskById(1);

      ResponseEntity<Void> response = taskController.deleteTask(1);
      assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
   }
}
