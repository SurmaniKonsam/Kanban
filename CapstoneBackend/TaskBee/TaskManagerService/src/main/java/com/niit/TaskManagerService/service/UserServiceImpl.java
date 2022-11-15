package com.niit.TaskManagerService.service;

import com.niit.TaskManagerService.configuration.Producer;
import com.niit.TaskManagerService.exception.UserAlreadyExistsException;
import com.niit.TaskManagerService.exception.UserNotFoundException;
import com.niit.TaskManagerService.model.TaskCard;
import com.niit.TaskManagerService.model.TaskList;
import com.niit.TaskManagerService.model.User;
import com.niit.TaskManagerService.rabbitmq.model.UserDTO;
import com.niit.TaskManagerService.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private Producer producer;
    @Autowired
    public UserServiceImpl(UserRepository userRepository,Producer producer){
        this.userRepository=userRepository;
        this.producer=producer;
    }
    @Override
    public User getUserDetails(String email) throws UserNotFoundException {
        if(userRepository.findById(email).isPresent()){
            return userRepository.findByEmail(email);
        }else{
            throw new UserNotFoundException();
        }
    }

    @Override
    public List<TaskList> findAllProjects() {
        return null;
    }

    @Override
    public User saveNewUser(User user) throws UserAlreadyExistsException {
        UserDTO userDTO=new UserDTO();
        userDTO.setEmail(user.getEmail());
        userDTO.setPassword(user.getPassword());
        if(userRepository.findById(user.getEmail()).isPresent()){
            throw new UserAlreadyExistsException();
        }
        producer.sendMsgToRabbitMQserver(userDTO);
        return userRepository.save(user);
    }

    @Override
    public User updateExistingUser(User user) throws UserNotFoundException {
        if(userRepository.findById(user.getEmail()).isPresent()){
            return userRepository.save(user);
        }else {
            throw new UserNotFoundException();
        }
    }

    @Override
    public User updateExistingUser2(String email, String projectName, TaskCard taskCard) throws UserNotFoundException {
        if(userRepository.findById(email).isPresent()){
            User user=userRepository.findByEmail(email);
            if(user.getTaskList().isEmpty()){
                System.out.println("First add a project");
            }else{
                if(user.getTaskList().stream().filter(userProjects->
                    userProjects.getTaskListName()==projectName).toList().isEmpty()){
                    System.out.println("Project "+projectName+" doesn't exist");
                }else{
                    user.getTaskList().stream().filter(userProjects->
                            userProjects.getTaskListName()==projectName)
                                    .filter(userTasks1->userTasks1.getListOfTasksInProject().add(taskCard));
                }
            }
        }else throw new UserNotFoundException();
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> allUsers() {
        return userRepository.findAll();
    }
}
