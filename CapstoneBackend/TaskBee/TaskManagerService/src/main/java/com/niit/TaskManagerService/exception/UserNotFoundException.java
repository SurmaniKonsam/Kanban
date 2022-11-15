package com.niit.TaskManagerService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.BAD_REQUEST, reason="User NOT Found")
public class UserNotFoundException extends Exception {

}
