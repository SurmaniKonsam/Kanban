package com.niit.TaskManagerService.service;

import com.niit.TaskManagerService.configuration.Producer;
import com.niit.TaskManagerService.model.TaskCard;
import com.niit.TaskManagerService.model.TaskList;
import com.niit.TaskManagerService.model.TaskPriority;
import com.niit.TaskManagerService.model.User;
import com.niit.TaskManagerService.rabbitmq.model.UserDTO;
import com.niit.TaskManagerService.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.niit.TaskManagerService.model.TaskPriority.NORMAL;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TaskManagerServiceTest {
    @Mock
    private UserRepository userRepository;
    @InjectMocks
    private UserServiceImpl userService;
    private User user;
    private TaskList taskList;
    private TaskCard taskCard;
    private TaskPriority taskPriority;

    @BeforeEach
    public void setUp(){
        List categorylist=new ArrayList<>();
        categorylist.add("TODO");
        categorylist.add("IN-PROGRESS");
        categorylist.add("COMPLETE");
        List users=new ArrayList();
        users.add("Nikhil");
        users.add("Surmani");
        users.add("Ayush");
        taskCard=new TaskCard("task1",NORMAL,"Do task1","TODO","Nikhil");
        List taskcardList=new ArrayList<TaskCard>();
        taskcardList.add(taskCard);
        taskList=new TaskList("project1",categorylist,"2022-10-19",taskcardList,NORMAL,users);
        List listOfTaskList=new ArrayList<TaskList>(); listOfTaskList.add(taskList);
        user=new User("nikhilreddy64@mailer.com","Nik@123","Nikhil","9898989898",
                listOfTaskList);

    }

    @AfterEach
    public void tearDown(){
        taskCard=null;
        taskList=null;
        user=null;
    }
    @Test
    public void givenUserToSaveReturnSavedUserSuccess() throws Exception{
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(null));
        when(userRepository.save(any())).thenReturn(user);
        assertEquals(user,userService.saveNewUser(user));

    }
}
