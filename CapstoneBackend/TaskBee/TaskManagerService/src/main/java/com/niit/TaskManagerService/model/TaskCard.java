package com.niit.TaskManagerService.model;

import lombok.*;

@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TaskCard {
    String cardName;
    TaskPriority taskPriority;
    String description;
    String category;
    String cardAssignee;
}
