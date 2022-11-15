package com.niit.TaskManagerService.rabbitmq.model;

import com.niit.TaskManagerService.model.TaskPriority;
import lombok.*;


public class TaskDTO {
    String emailId;
    String projectName;
    String cardName;
    String cardAssignee;
    String description;
    TaskPriority taskPriority;
    String categories;

    public TaskDTO() {
    }

    @Override
    public String toString() {
        return "TaskDTO{" +
                "emailId='" + emailId + '\'' +
                ", projectName='" + projectName + '\'' +
                ", cardName='" + cardName + '\'' +
                ", cardAssignee='" + cardAssignee + '\'' +
                ", description='" + description + '\'' +
                ", taskPriority=" + taskPriority +
                ", categories='" + categories + '\'' +
                '}';
    }

    public TaskDTO(String emailId, String projectName, String cardName, String cardAssignee, String description, TaskPriority taskPriority, String categories) {
        this.emailId = emailId;
        this.projectName = projectName;
        this.cardName = cardName;
        this.cardAssignee = cardAssignee;
        this.description = description;
        this.taskPriority = taskPriority;
        this.categories = categories;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getCardName() {
        return cardName;
    }

    public void setCardName(String cardName) {
        this.cardName = cardName;
    }

    public String getCardAssignee() {
        return cardAssignee;
    }

    public void setCardAssignee(String cardAssignee) {
        this.cardAssignee = cardAssignee;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TaskPriority getTaskPriority() {
        return taskPriority;
    }

    public void setTaskPriority(TaskPriority taskPriority) {
        this.taskPriority = taskPriority;
    }

    public String getCategories() {
        return categories;
    }

    public void setCategories(String categories) {
        this.categories = categories;
    }
}
