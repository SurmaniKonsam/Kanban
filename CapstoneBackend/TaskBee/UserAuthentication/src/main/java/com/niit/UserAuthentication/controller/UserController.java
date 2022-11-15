package com.niit.UserAuthentication.controller;

import com.niit.UserAuthentication.exception.UserAlreadyExistsException;
import com.niit.UserAuthentication.exception.UserNotFoundException;
import com.niit.UserAuthentication.model.User;
import com.niit.UserAuthentication.security.SecurityTokenGenerator;
import com.niit.UserAuthentication.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:4200/")
@RequestMapping("/authenticate")
public class UserController {
    private UserService userService;
    private SecurityTokenGenerator securityTokenGenerator;

    @Autowired
    public UserController(UserService userService, SecurityTokenGenerator securityTokenGenerator) {
        this.userService = userService;
        this.securityTokenGenerator = securityTokenGenerator;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) throws UserAlreadyExistsException
    {
        try {

            return  new ResponseEntity<>(userService.registerUser(user), HttpStatus.CREATED);
        }
        catch(UserAlreadyExistsException userAlreadyExistsException)
        {
            throw userAlreadyExistsException;
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) throws UserNotFoundException {
        try {
            User fromDb = userService.loginUser(user.getUserEmail(),user.getPassword());
            Map<String, String> token = securityTokenGenerator.generateToken(fromDb);
            return new ResponseEntity<>(token, HttpStatus.OK);
        } catch (UserNotFoundException userNotFoundException) {
            throw userNotFoundException;

        } catch (Exception e)
        {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<?> getAllUsers()
    {
        List<User> list=userService.getAllUsers();
        ResponseEntity responseEntity = new ResponseEntity<>(list,HttpStatus.OK);
        return responseEntity;
    }

    @PutMapping("/update/{userEmail}")
    public ResponseEntity<?> updateUser(@RequestBody User user,@PathVariable String userEmail) throws UserNotFoundException
    {
        return new ResponseEntity<>(userService.updateUser(user,userEmail),HttpStatus.OK);
    }
}
