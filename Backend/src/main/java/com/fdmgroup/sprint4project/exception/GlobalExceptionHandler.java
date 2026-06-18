package com.fdmgroup.sprint4project.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(InvalidPostalCodeException.class)
	public ResponseEntity<String> handleInvalidPostalCode(InvalidPostalCodeException ex) {

	    return ResponseEntity
	            .badRequest()
	            .body(ex.getMessage());
	}
	
	@ExceptionHandler(CustomerNotFoundException.class)
	public ResponseEntity<String> handleNotFound(CustomerNotFoundException ex) {

	    return ResponseEntity
	            .status(HttpStatus.NOT_FOUND)
	            .body(ex.getMessage());
	}
}
