package com.fdmgroup.sprint4project.dto;

import com.fdmgroup.sprint4project.model.CustomerType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateCustomerDTO {

	@NotBlank
	private String name;
	
	@NotBlank
	private String streetNumber;
	
	@NotBlank
	private String postalCode;
	
	@NotNull
    private CustomerType type;

    public CustomerType getType() {
        return type;
    }

    public void setType(CustomerType type) {
        this.type = type;
    }

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getStreetNumber() {
		return streetNumber;
	}

	public void setStreetNumber(String streetNumber) {
		this.streetNumber = streetNumber;
	}

	public String getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}
	
	
	
}
