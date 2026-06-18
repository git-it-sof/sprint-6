package com.fdmgroup.sprint4project.exception;

public class InvalidPostalCodeException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public InvalidPostalCodeException(String message){
		super(message);
	}
}
