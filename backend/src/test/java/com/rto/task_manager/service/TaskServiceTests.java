package com.rto.task_manager.service;

import com.rto.task_manager.entities.Task;
import com.rto.task_manager.repositories.TaskRepository;
import com.rto.task_manager.services.impl.TaskServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
@SpringJUnitConfig
public class TaskServiceTests {

   @Mock
   private TaskRepository taskRepository;

   @InjectMocks
   private TaskServiceImpl taskService;

   @BeforeEach
   public void setUp() {
      MockitoAnnotations.openMocks(this);
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

      when(taskRepository.findAll()).thenReturn(tasks);

      List<Task> result = taskService.getAllTasks();
      assertEquals(tasks, result);
      verify(taskRepository, times(1)).findAll();
   }

   @Test
   public void testGetTaskById() {
      Task task = Task.builder()
              .id(1L)
              .title("test")
              .description("test")
              .build();

      when(taskRepository.findById(anyInt())).thenReturn(Optional.of(task));

      Task result = taskService.getTaskById(1);
      assertEquals(task, result);
      verify(taskRepository, times(1)).findById(anyInt());
   }

   @Test
   public void testCreateTask() {
      Task task = Task.builder()
              .id(1L)
              .title("test")
              .description("test")
              .build();

      when(taskRepository.save(any(Task.class))).thenReturn(task);

      Task result = taskService.createTask(task);
      assertEquals(task, result);
      verify(taskRepository, times(1)).save(any(Task.class));
   }

   @Test
   public void testUpdateTask() {
      Task existingTask = Task.builder()
              .id(1L)
              .title("test")
              .description("test")
              .build();
      Task updatedTask = Task.builder()
              .id(1L)
              .title("updated test")
              .description("updated test")
              .build();

      when(taskRepository.findById(anyInt())).thenReturn(Optional.of(existingTask));
      when(taskRepository.save(any(Task.class))).thenReturn(updatedTask);

      Task result = taskService.updateTask(1, updatedTask);
      assertEquals(updatedTask, result);
      verify(taskRepository, times(1)).findById(anyInt());
      verify(taskRepository, times(1)).save(any(Task.class));
   }

   @Test
   public void testDeleteTask() {
      doNothing().when(taskRepository).deleteById(anyInt());

      taskService.deleteTaskById(1);
      verify(taskRepository, times(1)).deleteById(anyInt());
   }
}
