package com.niit.TaskManagerService.repository;

import com.niit.TaskManagerService.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User,String> {
    public User findByEmail(String email);
}
