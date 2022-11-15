package com.niit.TaskAPIGateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@SpringBootApplication
@EnableEurekaClient
public class TaskApiGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(com.niit.TaskAPIGateway.TaskApiGatewayApplication.class, args);
	}
	@Bean
	public RouteLocator routeLocator(RouteLocatorBuilder builder){
		return builder.routes()
				.route(p->p.path("/authenticate/**").uri("http://localhost:8081/"))
				.route(p->p.path("/task-card/**").uri("http://localhost:8022/"))
				.route(p->p.path("/task-manager/**").uri("http://localhost:8082/"))
				.build();
	}


}
