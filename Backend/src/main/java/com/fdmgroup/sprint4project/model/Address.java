package com.fdmgroup.sprint4project.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

@Entity
public class Address {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ADDRESS_ID")
	private long addressId;
	
	@NotNull(message = "Street number cannot be null")
	@Column(name = "STREET_NUMBER")
	private String streetNumber;
	
	@NotNull(message = "Postal code cannot be null")
	@Column(name = "POSTAL_CODE")
	private String postalCode;
	
	@NotNull(message = "City cannot be null")
	@Column(name = "CITY")
	private String city;
	
	@NotNull(message = "Province cannot be null")
	@Column(name = "PROVINCE")
	private String province;

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

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public long getAddressId() {
		return addressId;
	}
	
	
}
