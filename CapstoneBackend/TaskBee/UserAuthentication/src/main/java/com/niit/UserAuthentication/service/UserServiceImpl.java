package com.niit.UserAuthentication.service;

import com.niit.UserAuthentication.exception.UserAlreadyExistsException;
import com.niit.UserAuthentication.exception.UserNotFoundException;
import com.niit.UserAuthentication.model.User;
import com.niit.UserAuthentication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean registerUser(User user) throws UserAlreadyExistsException {
        if (userRepository.existsById(user.getUserEmail()))
            throw new UserAlreadyExistsException();
            userRepository.save(user);
        return true;
    }

    @Override
    public User loginUser(String userEmail, String password) throws UserNotFoundException {
        Optional<User> isUser= Optional.ofNullable(userRepository.findByUserEmailAndPassword(userEmail, password));
        if (isUser.isEmpty())
            throw new UserNotFoundException();
        return isUser.get();
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User updateUser(User user, String userEmail) throws UserNotFoundException {
        if(userRepository.findById(userEmail).isEmpty())
            throw new UserNotFoundException();
        return userRepository.save(user);
    }
}
