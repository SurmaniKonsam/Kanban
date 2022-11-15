package com.niit.TaskManagerService.configuration;

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
public class UserConfiguration {
    @Bean
    public DirectExchange directExchange(){return new DirectExchange("msgExchange");}
    @Bean
    public Queue msgQueue(){return new Queue("msgQueue");}
    @Bean
    public Binding userBinding (Queue queue, DirectExchange directExchange){
        return BindingBuilder.bind(queue).to(directExchange).with("msgRouting");
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
