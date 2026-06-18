package com.fdmgroup.sprint4project.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotNull;

@Entity
@DiscriminatorValue("SAVINGS")
public class SavingsAccount extends Account {
	
	@NotNull(message = "Interest Rate for Savings Account cannot be null")
	private Double interestRate;

	public double getInterestRate() {
		return interestRate;
	}

	public void setInterestRate(double interestRate) {
		this.interestRate = interestRate;
	}
	
}
