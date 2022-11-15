package com.niit.TaskService.service;



import com.niit.TaskService.configuration.Producer;
import com.niit.TaskService.model.TaskCard;
//import com.example.demo.Rabbit.Producer;
import com.niit.TaskService.rabbitmq.model.TaskDTO;
import com.niit.TaskService.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskServiceImpl implements TaskService{
    private TaskRepository taskRepository;
    private Producer producer;

    @Autowired
    TaskServiceImpl(TaskRepository taskRepository,Producer producer){
        this.taskRepository = taskRepository;
        this.producer = producer;
    }

    @Override
    public TaskCard saveTaskCard(TaskCard taskCard){

//        TaskCardDto taskCardDto = new TaskCardDto();
//        taskCardDto.setCardName(taskCard.getCardName());
//        taskCardDto.setCardAssignee(taskCard.getCardAssignee());
//        taskCardDto.setCategories(taskCard.getCategories());
//        taskCardDto.setDescription(taskCard.getDescription());
//        taskCardDto.setTaskPriority(taskCard.getTaskPriority());
//        taskCardDto.setProjectName(taskCard.getProjectName());
//        producer.sendMessageToRabbitMqServer(taskCardDto);
        TaskDTO taskDTO=new TaskDTO();
        taskDTO.setEmailId(taskCard.getEmailId());
        taskDTO.setProjectName(taskCard.getProjectName());
        taskDTO.setCardName(taskCard.getCardName());
        taskDTO.setCardAssignee(taskCard.getCardAssignee());
        taskDTO.setDescription(taskCard.getDescription());
        taskDTO.setTaskPriority(taskCard.getTaskPriority());
        taskDTO.setCategories(taskCard.getCategories());
        producer.sendMsgToRabbitMQserver(taskDTO);
        return taskRepository.save(taskCard);
    }
}
