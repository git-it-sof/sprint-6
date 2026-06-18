package com.fdmgroup.sprint4project.dto;

import com.fdmgroup.sprint4project.model.AccountType;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public class CreateAccountDTO {
	
	@PositiveOrZero
	private double balance;
	
	@NotNull
    private AccountType type;
	
	
	private Double interestRate;

    public AccountType getType() {
        return type;
    }

    public void setType(AccountType type) {
        this.type = type;
    }

	public double getBalance() {
		return balance;
	}

	public void setBalance(double balance) {
		this.balance = balance;
	}

	public Double getInterestRate() {
		return interestRate;
	}

	public void setInterestRate(Double interestRate) {
		this.interestRate = interestRate;
	}
	
}
