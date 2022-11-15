package com.niit.TaskService.repository;

import com.niit.TaskService.model.TaskCard;
import org.springframework.data.mongodb.repository.MongoRepository;



public interface TaskRepository extends MongoRepository<TaskCard,Integer> {
}
