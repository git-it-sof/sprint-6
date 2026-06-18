package com.fdmgroup.sprint4project.dto;

import jakarta.validation.constraints.NotBlank;

public class UpdateCustomerDTO {
	
	@NotBlank
	private String name;
	
	@NotBlank
	private String streetNumber;
	
	@NotBlank
	private String postalCode;
	
	
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
