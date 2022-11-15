package com.niit.TaskManagerService.configuration;

import com.niit.TaskManagerService.rabbitmq.model.UserDTO;
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
    public void sendMsgToRabbitMQserver(UserDTO userDto){
        rabbitTemplate.convertAndSend(directExchange.getName(),"msgRouting",userDto);
    }
}
