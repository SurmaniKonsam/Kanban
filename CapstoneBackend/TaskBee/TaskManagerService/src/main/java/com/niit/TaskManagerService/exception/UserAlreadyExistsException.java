package com.niit.TaskManagerService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.BAD_REQUEST, reason="Duplicate User Error")
public class UserAlreadyExistsException extends Exception {
}
