package com.niit.TaskManagerService.controller;

import com.niit.TaskManagerService.exception.UserAlreadyExistsException;
import com.niit.TaskManagerService.exception.UserNotFoundException;
import com.niit.TaskManagerService.model.User;
import com.niit.TaskManagerService.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:4200/")
@RequestMapping("/task-manager")
public class TaskManagerController {
    private UserService userService;
    public TaskManagerController(UserService userService){
        this.userService=userService;
    }
    @PostMapping("/add-user")
    public ResponseEntity<?> addUser(@RequestBody User user)throws UserAlreadyExistsException {
        return new ResponseEntity<>(userService.saveNewUser(user), HttpStatus.OK);
    }
    @GetMapping("/find-user/{email}")
    public ResponseEntity<?> findUser(@PathVariable String email)throws UserNotFoundException{
        return new ResponseEntity<>(userService.getUserDetails(email),HttpStatus.OK);
    }
    @PutMapping("/update-user")
    public ResponseEntity<?> updateUser(@RequestBody User user)throws UserNotFoundException{
        return new ResponseEntity<>(userService.updateExistingUser(user),HttpStatus.OK);
    }
    @GetMapping("/get-all-users")
    public ResponseEntity<?> listAllUsers(){
        return new ResponseEntity<>(userService.allUsers(),HttpStatus.OK);
    }
}
