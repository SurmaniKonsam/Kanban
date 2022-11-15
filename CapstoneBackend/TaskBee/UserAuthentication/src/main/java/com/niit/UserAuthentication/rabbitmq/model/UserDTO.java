package com.niit.UserAuthentication.rabbitmq.model;

public class UserDTO {
    String email,password;

    public UserDTO() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "UserDTO{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    public UserDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
