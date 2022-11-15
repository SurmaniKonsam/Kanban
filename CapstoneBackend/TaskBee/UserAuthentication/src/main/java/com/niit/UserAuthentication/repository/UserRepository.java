package com.niit.UserAuthentication.repository;

import com.niit.UserAuthentication.exception.UserNotFoundException;
import com.niit.UserAuthentication.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,String> {
    User findByUserEmailAndPassword(String userEmail,String password) ;
}
