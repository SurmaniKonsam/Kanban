package com.niit.TaskManagerService.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.netflix.discovery.converters.Auto;
import com.niit.TaskManagerService.model.TaskCard;
import com.niit.TaskManagerService.model.TaskList;
import com.niit.TaskManagerService.model.TaskPriority;
import com.niit.TaskManagerService.model.User;
import com.niit.TaskManagerService.service.UserService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

import static com.niit.TaskManagerService.model.TaskPriority.NORMAL;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class ControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Mock
    private UserService userService;
    @InjectMocks
    private TaskManagerController taskManagerController;
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
        mockMvc= MockMvcBuilders.standaloneSetup(taskManagerController).build();
    }

    @AfterEach
    public void tearDown(){
        taskCard=null;
        taskList=null;
        user=null;
    }
    @Test
    public void givenUserToSaveReturnSaveSuccess() throws Exception{
        when(userService.saveNewUser(any())).thenReturn(user);

        mockMvc.perform(post("/task-manager/add-user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonToString(user)))
                .andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
        verify(userService,times(1)).saveNewUser(any());
    }

    private static String jsonToString(final Object ob)throws JsonProcessingException {
        String result;
        try{
            ObjectMapper mapper=new ObjectMapper();
            String jsonContent=mapper.writeValueAsString(ob);
            System.out.println("Json that is posted "+jsonContent);
            result=jsonContent;
        }catch(JsonProcessingException e){
            result="Json processing error";
        }
        return result;
    }
}
