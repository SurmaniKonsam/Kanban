package com.niit.TaskService.controller;


import com.niit.TaskService.model.TaskCard;
import com.niit.TaskService.service.TaskServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:4200/")
@RequestMapping("/task-card")
public class TaskController {
    public ResponseEntity responseEntity;
    public TaskServiceImpl taskService;


    @Autowired
    public TaskController(TaskServiceImpl taskService){
        this.taskService = taskService;
    }


    @PostMapping("/persist-data")
    public ResponseEntity<?> persistData(@RequestBody TaskCard taskCard){
        taskService.saveTaskCard(taskCard);
        responseEntity = new ResponseEntity(taskCard, HttpStatus.CREATED);
        return responseEntity;
    }
}
