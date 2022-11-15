package com.niit.TaskManagerService.repository;

import com.niit.TaskManagerService.model.TaskCard;
import com.niit.TaskManagerService.model.TaskList;
import com.niit.TaskManagerService.model.TaskPriority;
import com.niit.TaskManagerService.model.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;

import static com.niit.TaskManagerService.model.TaskPriority.NORMAL;
import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(SpringExtension.class)
@DataMongoTest
public class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;
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
    public void givenUserToSaveShouldReturnUser(){
        userRepository.insert(user);
        User user1=userRepository.findByEmail(user.getEmail());
        assertEquals(user.getEmail(),user1.getEmail());
    }
}
