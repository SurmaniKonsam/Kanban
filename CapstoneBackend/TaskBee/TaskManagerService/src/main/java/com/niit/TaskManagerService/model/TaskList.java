package com.niit.TaskManagerService.model;

import lombok.*;

import java.util.Date;
import java.util.List;

@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TaskList {
    String taskListName;
    List<String> category; //TO-DO,IN-PROGRESS,COMPLETE
    //@JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy/MM/dd")// for accepting date from jsonFormat, without this annotation we should send in yyyy/MM/dd format
    String date;
    List<TaskCard> listOfTasksInProject;
    TaskPriority projectPriority;
    List<String> listOfUsers;
}
