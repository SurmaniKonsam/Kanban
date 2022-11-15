package com.niit.UserAuthentication.service;

import com.niit.UserAuthentication.exception.UserAlreadyExistsException;
import com.niit.UserAuthentication.exception.UserNotFoundException;
import com.niit.UserAuthentication.model.User;

import java.util.List;

public interface UserService {

    boolean registerUser(User user) throws UserAlreadyExistsException;
    User loginUser(String userEmail,String password) throws UserNotFoundException;
    List<User> getAllUsers();
    User updateUser(User user,String userEmail) throws UserNotFoundException;
}
