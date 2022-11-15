package com.niit.TaskService.configuration;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TaskConfiguration {
    @Bean
    public DirectExchange directExchange(){return new DirectExchange("taskExchange");}
    @Bean
    public Queue taskQueue(){return new Queue("taskQueue");}
    @Bean
    public Binding taskBinding (Queue queue, DirectExchange directExchange){
        return BindingBuilder.bind(queue).to(directExchange).with("taskRouting");
    }
    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory){
        RabbitTemplate rabbitTemplate=new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(producerConverter());
        return rabbitTemplate;
    }
    @Bean
    public Jackson2JsonMessageConverter producerConverter(){return new Jackson2JsonMessageConverter();}
}
