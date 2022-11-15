package com.niit.UserAuthentication.configuration;

import com.niit.UserAuthentication.exception.UserAlreadyExistsException;
import com.niit.UserAuthentication.model.User;
import com.niit.UserAuthentication.rabbitmq.model.UserDTO;
import com.niit.UserAuthentication.service.UserService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Consumer {
    @Autowired
    private UserService userService;
    @RabbitListener(queues = "msgQueue")
    public void getMsgFromRabbitMQ(UserDTO userDTO) throws UserAlreadyExistsException {
        User user=new User();
        user.setUserEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        userService.registerUser(user);
    }
}
