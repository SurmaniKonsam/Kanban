package com.niit.TaskService.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document
public class TaskCard {
    @Id
    @Transient
    String emailId;
    String projectName;
    String cardName;
    String cardAssignee;
    String description;
    TaskPriority taskPriority;
    String categories;
}


