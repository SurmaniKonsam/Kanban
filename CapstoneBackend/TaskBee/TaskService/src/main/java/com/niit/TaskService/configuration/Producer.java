package com.niit.TaskService.configuration;

import com.niit.TaskService.model.TaskCard;
import com.niit.TaskService.rabbitmq.model.TaskDTO;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Producer {
    private RabbitTemplate rabbitTemplate;
    private DirectExchange directExchange;
    @Autowired
    public Producer(RabbitTemplate rabbitTemplate, DirectExchange directExchange) {
        this.rabbitTemplate = rabbitTemplate;
        this.directExchange = directExchange;
    }
    public void sendMsgToRabbitMQserver(TaskDTO taskCard){
        rabbitTemplate.convertAndSend(directExchange.getName(),"taskRouting",taskCard);
    }
}
