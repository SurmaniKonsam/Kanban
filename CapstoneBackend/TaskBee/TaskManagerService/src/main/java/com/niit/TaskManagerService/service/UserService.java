package com.niit.TaskManagerService.service;

import com.niit.TaskManagerService.exception.UserAlreadyExistsException;
import com.niit.TaskManagerService.exception.UserNotFoundException;
import com.niit.TaskManagerService.model.TaskCard;
import com.niit.TaskManagerService.model.TaskList;
import com.niit.TaskManagerService.model.User;

import java.util.List;

public interface UserService {
    public User getUserDetails(String email)throws UserNotFoundException;
    public List<TaskList> findAllProjects();
    public User saveNewUser(User user)throws UserAlreadyExistsException;
    public User updateExistingUser(User user)throws UserNotFoundException;
    public User updateExistingUser2(String email, String projectName, TaskCard taskCard)throws UserNotFoundException;
    public List<User> allUsers();
}
