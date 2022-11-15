package com.niit.UserAuthentication.configuration;

import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserConfiguration {
    @Bean
    public Jackson2JsonMessageConverter consumerConverter(){return new Jackson2JsonMessageConverter();}
}
