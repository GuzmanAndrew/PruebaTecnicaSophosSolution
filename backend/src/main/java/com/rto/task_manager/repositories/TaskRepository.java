package com.rto.task_manager.repositories;

import com.rto.task_manager.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Integer> {

}
