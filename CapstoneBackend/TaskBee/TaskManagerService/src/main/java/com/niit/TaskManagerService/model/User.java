package com.niit.TaskManagerService.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document
public class User {
    @Id
    String email;
    String password;
    String name;
    String phoneNumber;
    List<TaskList> taskList;
}
