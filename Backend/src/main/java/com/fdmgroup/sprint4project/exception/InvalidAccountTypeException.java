package com.fdmgroup.sprint4project.exception;

public class InvalidAccountTypeException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public InvalidAccountTypeException(String message){
		super(message);
	}
}
